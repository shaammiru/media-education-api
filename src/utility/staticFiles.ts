import path from "path";
import fs from "fs/promises";
import { v4 } from "uuid";

const baseDirectory =
  process.env.NODE_ENV === "development" ? "api/dev/uploads" : "api/uploads";
const staticDirectory = path.join(__dirname, `../../${baseDirectory}`);

const upload = async (file: Express.Multer.File, directory: string) => {
  const fileName = `${Date.now().toString()}-${v4()}.${
    file.mimetype.split("/")[1]
  }`;
  const filePath = path.join(staticDirectory, directory, fileName);
  await fs.writeFile(filePath, file.buffer);
  return `${process.env.HOST}/${baseDirectory}/${directory}/${fileName}`;
};

const remove = async (url: string) => {
  const fileName = url.split(`/${process.env.STATIC_DIR}`)[1];
  const filePath = path.join(staticDirectory, fileName);
  await fs.unlink(filePath);
};

export default {
  staticDirectory,
  upload,
  remove,
};
