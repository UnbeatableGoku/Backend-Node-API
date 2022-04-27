const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
const bcrypt = require('bcrypt');
const Otp = require('../models/otp');
const nodemailer = require('nodemailer');
const res = require('express/lib/response');

// require('cookie-parser')
const JWT_SECRET = 'none';

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const oldUser = await User.findOne({ email });
    if (oldUser) return res.status(409).send('User already exists.');

    if (!(email && password)) {
      res.status(400).send('Email or Password is missing');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User({
      email,
      password: encryptedPassword
    });
    user.save();
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      error
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.sendStatus(404).send('Invalid email');
    console.log(user);
    const passwordcompare = await bcrypt.compare(password, user.password);
    console.log('password', passwordcompare);
    if (passwordcompare) {
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email
        },
        JWT_SECRET,
        {
          expiresIn: 86400 //1day
        }
      );
      return await res.json({ user, token: token });
    } else {
      return res.json({ message: 'Invalid password' });
    }
  } catch (error) {
    res.json(error);
  }
};

exports.isSignedIn = expressjwt({
  secret: JWT_SECRET,
  userProperty: 'auth',
  algorithms: ['HS256']
});

exports.changePassword = async (req, res) => {
  const { otpCode, email, password } = req.body;
  try {
    let response = {};
    let data = await Otp.find({ email: email }).sort({ expiresIn: -1 }).limit(1); //gets latest otp entry
    let currentOtp = data[0];
    console.log(currentOtp);
    if (currentOtp.code !== otpCode) return res.json('Wrong Otp');
    if (currentOtp) {
      let currentTime = new Date().getTime();
      let diff = currentOtp.expiresIn - currentTime;
      if (diff < 0) {
        response.message = 'Token expired';
        response.statusText = 'error';
      } else {
        let user = await User.findOne({ email });
        user.password = await bcrypt.hash(password, 10); //storing hashed password
        user.save();
        response.message = 'Password changed successfully';
        response.statusText = 'success';
      }
      res.send(response);
    }
  } catch (error) {}
};

const mailer = (email, otp) => {
  const transporter = nodemailer.createTransport({
    port: 465, // true for 465, false for other ports
    host: 'smtp.gmail.com',
    service: 'gmail',
    auth: {
      user: 'dummy4test.acc@gmail.com',
      pass: 'dummy4test.ACC'
    },
    secure: false
  });

  const mailData = {
    from: 'dummy4test.acc@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'OTP for forget password',
    text: `That was easy!`,
    html: `<b>Hey there! </b>
         <br> This is your ${otp}<br/>`
  };
  transporter.sendMail(mailData, (error, info) => {
    if (error) return console.log('error', error);
    res.status(200).send({ message: 'mail send', message_id: info.messageId });
  });
};

exports.emailSend = async (req, res) => {
  try {
    const { email } = req.body;
    const responseType = {};
    let data = await User.findOne({ email });
    console.log('user exists', data);

    if (data) {
      function generateOTP() {
        const digits = '0123456789';
        const otpLength = 4;
        let otp = '';
        for (let i = 1; i <= otpLength; i++) {
          var index = Math.floor(Math.random() * digits.length);
          otp = otp + digits[index];
        }
        return otp;
      }
      let otpcode = generateOTP();
      let otpData = new Otp({
        email: req.body.email,
        code: otpcode,
        expiresIn: new Date().getTime() + 300 * 1000
      });
      let otpResponse = await otpData.save();
      console.log(otpResponse);
      mailer(email, otpcode);
    } else {
      responseType.statusText = 'error';
      responseType.message = 'no account on this email';
    }
    res.status(200).send(responseType);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
