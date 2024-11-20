import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createNewFile(req, res) {
  const { originalname, mimetype, destination, filename, path, size } =
    req.file;

  try {
    const file = await prisma.file.create({
      data: {
        name: originalname,
        fileName: filename,
        destination,
        fileType: mimetype,
        size,
        path,
        User: {
          connect: { id: req.user.id },
        },
      },
    });

    res.json({
      file,
      message: `File ${originalname} uploaded successfully!`,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
}

export async function deleteFile(req, res) {
  const { fileName } = req.body;
  try {
    const file = await prisma.file.delete({ where: { fileName } });
  } catch (err) {
    res.json({ message: err });
  }
  res.json({ file, message: "File deleted" });
}

export async function getPubFiles(req, res) {
  try {
    const fileList = await prisma.file.findMany({
      where: {
        published: true,
      },
      select: {
        id,
      },
    });

    res.json({ fileList });
  } catch (err) {
    res.json({ message: err });
  }
}
