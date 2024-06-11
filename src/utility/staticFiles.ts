import path from "path";
import fs from "fs/promises";
import { v4 } from "uuid";

const staticDirectory = path.join(__dirname, "../../api/uploads");

const upload = async (file: Express.Multer.File, directory: string) => {
  const fileName = `${Date.now().toString()}-${v4()}.${
    file.mimetype.split("/")[1]
  }`;
  const filePath = path.join(staticDirectory, directory, fileName);
  await fs.writeFile(filePath, file.buffer);
  return `${process.env.HOST}/api/uploads/${directory}/${fileName}`;
};

const remove = async (url: string) => {
  const fileName = url.split("/api/uploads/")[1];
  const filePath = path.join(staticDirectory, fileName);
  await fs.unlink(filePath);
};

export default {
  upload,
  remove,
};
