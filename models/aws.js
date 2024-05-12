const AWS = require('aws-sdk');
const fs = require('fs');
require('dotenv').config();
const s3 = new AWS.S3({
  accessKeyId:process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-south-2" // Specify the correct region here
});

// filePath is the path of the file in your local system
// const filePath = "./models/trail.png";
// const fileContent = fs.readFileSync(filePath);

// const params = {
//   Bucket: "swechaschools",
//   Key: "apple.jpg",
//   Body: fileContent,
// };
// const params = {
//     Bucket: "swechaschools",
//     Key:"apple.jpg"
//   };
// s3.upload(params, function(err, data) {
//   if (err) {
//     throw err;
//   }
//   console.log(`File uploaded successfully. ${data.Location}`);
// });

// s3.listObjectsV2(params, function(err, data) {
//     if (err) {
//       console.log("Error retrieving images:", err);
//     } else {
//       console.log("Images in the bucket:");
//       data.Contents.forEach(function(image) {
//         console.log(image.Key);
//       });
//     }
//   });

//   s3.getObject(params, function(err, data) {
//     if (err) {
//       console.log("Error downloading image:", err);
//     } else {
//       fs.writeFile(params.Key, data.Body, function(err) {
//         if (err) {
//           console.log("Error saving image:", err);
//         } else {
//           console.log("Image downloaded successfully.");
//         }
//       });
//     }
//   });

module.exports = s3