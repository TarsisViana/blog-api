import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createNewFile(req, res) {
  const { originalname, mimetype, destination, filename, path, size } =
    req.file;

  const parentFolder = req.body.parentFolder || null;
  console.log("parentfolder" + parentFolder);
  console.log(req.file);

  try {
    var file = await prisma.files.create({
      data: {
        name: originalname,
        fileName: filename,
        destination,
        fileType: mimetype,
        size,
        path,
        folderId: parentFolder,
        userId: req.user.id,
      },
    });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
    return;
  }

  res.json({
    file,
    message: `File ${originalname} uploaded successfully!`,
  });
}

export async function deleteFile(req, res) {
  const { fileName } = req.body;
  try {
    const file = await prisma.files.delete({ where: { fileName } });
  } catch (err) {
    res.json({ message: err });
  }
  res.json({ file, message: "File deleted" });
}

export async function getFiles(req, res) {
  const parentFolder = req.params.parentFolder || null;
  console.log(parentFolder);
  let fileList;
  try {
    fileList = await prisma.users.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        files: {
          where: {
            folderId: parentFolder,
          },
        },
      },
    });
  } catch (err) {
    res.json({ message: err });
    return;
  }

  res.json({ fileList });
}
