const AWS = require("aws-sdk");
const fs = require("fs");

const BUCKET_NAME = "blog-totem";

module.exports.uploadFile = async (fileName, id) => {
  AWS.config.update({ region: "eu-west-3" });

  s3 = new AWS.S3();
  const fileContent = fs.readFileSync(fileName);
  const newFileName =
    id + fileName.substring(fileName.lastIndexOf("."), fileName.length);
  const params = {
    Bucket: BUCKET_NAME,
    Key: newFileName,
    Body: fileContent,
  };

  let location = null;

  await s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }

    location = data.Location;
  });
  return newFileName;
};

module.exports.getLink = (fileName) => {
  AWS.config.update({ region: "eu-west-3" });

  s3 = new AWS.S3();
  return s3.getSignedUrl("getObject", { Bucket: BUCKET_NAME, Key: fileName });
};
