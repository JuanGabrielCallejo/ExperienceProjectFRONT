import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const uploadToS3 = async (archivo, ruta) => {
  try {
    const s3 = new S3Client({
      region: "eu-north-1",
      credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
      },
      endpoint: "http://s3.eu-north-1.amazonaws.com",
    });

    const params = {
      Bucket: "surflog-archivos",
      Key: ruta,
      Body: archivo,
    };

    await s3.send(new PutObjectCommand(params));
    console.log("Object uploaded successfully!");
  } catch (error) {
    console.error("Error uploading object:", error);
  }
};

export const getFromS3 = async (ruta) => {
  const client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    },
    endpoint: "http://s3.eu-north-1.amazonaws.com",
  });
  const command = new GetObjectCommand({
    Bucket: "surflog-archivos",
    Key: ruta,
    ACL: "public-read",
  });
  const url = await getSignedUrl(client, command, { expiresIn: 3600 });
  console.log("url img: ");
  console.log(url);
  return url;
};

// export const getFromS3 = async (ruta) => {
//   try {
//     const s3 = new S3Client({
//       region: "eu-north-1",
//       credentials: {
//         accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
//         secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
//       },
//       endpoint: "http://s3.eu-north-1.amazonaws.com",
//     });

//     const params = {
//       Bucket: "surflog-archivos",
//       Key: ruta,
//     };

//     // const response = await s3.send(new GetObjectCommand(params));
//     // const data = await streamToBuffer(response.Body);
//     const signedUrl = s3.getSignedUrl("getObject", params);
//     console.log("Recuperado objeto de S3.");
//     // return data;
//     return signedUrl;
//   } catch (error) {
//     console.error("Error recuperando objeto:", error);
//   }
// };
