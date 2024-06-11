import fs from "fs/promises";

const upload = async (file: Express.Multer.File, directory: string) => {
  const key = `${directory}/${Date.now().toString()}-${file.originalname}`;
  await fs.writeFile(`./uploads/${key}`, file.buffer);
  return `${process.env.HOST}/uploads/${key}`;
};

const remove = async (url: string) => {
  const key = url.split(process.env.HOST!)[1];
  await fs.unlink(`./${key}`);
};

export default {
  upload,
  remove,
};
