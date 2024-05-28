import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import fs from "fs";
import fetch, { Response } from "node-fetch";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { log } from "./logger";

const s3 = new S3Client({ region: process.env.AWS_REGION });

export const uploadFile = async (
  filePath: string,
  bucketName: string,
  key: string
) => {
  const fileStream = fs.createReadStream(filePath);
  const uploadParams = { Bucket: bucketName, Key: key, Body: fileStream };
  await s3.send(new PutObjectCommand(uploadParams));
};

export const downloadFile = async (
  bucketName: string,
  key: string,
  downloadPath: string
) => {
  const downloadParams = { Bucket: bucketName, Key: key };
  const command = new GetObjectCommand(downloadParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

  const response: Response = await fetch(url);
  const fileStream = fs.createWriteStream(downloadPath);

  await new Promise<void>((resolve, reject) => {
    if (response.body && response.body != null) {
      response.body.pipe(fileStream);
      response.body.on("error", reject);
      fileStream.on("finish", resolve);
    }else{
        reject(new Error("Response body is null"))
    }
  });
};
