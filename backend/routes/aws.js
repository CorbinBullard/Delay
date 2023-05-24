const {boto3, botocore} = require("boto3")
const os = require('os')

const s3 = boto3.client("s3", process.env.S3_KEY, process.env.S3_SECRET);
