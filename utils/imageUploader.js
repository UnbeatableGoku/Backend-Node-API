/**
 * THIS FUNCTION WILL OVERWRITE THE FILE WITH SAME NAME
 * SO DIRECTLY PASS DIFFERENT FILENAME IF REQUIRED
 */

const fs = require('fs');

exports.imageUploader = async (folderName, fileName, imageData) => {
    try {
        // Regular expression for image type:
        // This regular image extracts the "jpeg" from "image/jpeg"
        var imageTypeRegularExpression = /\/(.*?)$/;

        // decodes image
        var imageBuffer = decodeBase64Image(imageData);

        //checks and creates if dir is available or not
        fs.promises.mkdir(`./images/${folderName}/`, { recursive: true }).catch(console.error);

        //path of image
        var userUploadedFeedMessagesLocation = `./images/${folderName}/`;

        // This variable is actually an array which has 5 values,
        // The [1] value is the real image extension
        var imageTypeDetected = imageBuffer.type.match(imageTypeRegularExpression);

        var userUploadedImagePath =
            userUploadedFeedMessagesLocation +
            fileName.replace(/ /g, '-') +
            '.' +
            imageTypeDetected[1];

        // writing file on disk
        fs.writeFileSync(userUploadedImagePath, imageBuffer.data, function () {
            console.log(
                'DEBUG - feed:message: Saved to disk image attached by user:',
                userUploadedImagePath
            );
        });

        return userUploadedImagePath;
    } catch (error) {
        console.log('ERROR:', error);
    }
};

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = Buffer.from(matches[2], 'base64');

    return response;
}
