import { PrismaClient } from "@prisma/client";
import { body, query, validationResult } from "express-validator";

const prisma = new PrismaClient();

const lengthErr = "Must be between 4 and 10 characters.";
const nameErr = "Name already exists.";

const validadeFolderName = [
  body("folderName")
    .trim()
    .notEmpty()
    .isAlphanumeric()
    .withMessage("Name must contain only letters and numbers")
    .isLength({ min: 4, max: 10 })
    .withMessage(lengthErr)
    .custom(checkName),
];

async function checkName(folderName, { req }) {
  const usedName = await prisma.users.findUnique({
    where: {
      id: req.user.id,
    },
    select: {
      folders: {
        where: {
          parentId: req.body.parentId,
          name: folderName,
        },
      },
    },
  });
  if (usedName.folders.length > 0) throw new Error(nameErr);
}

export const createNewFolder = [
  validadeFolderName,
  async (req, res) => {
    const { folderName, parentFolder } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const folder = await prisma.folders.create({
      data: {
        name: folderName,
        parentId: parentFolder || null,
        usersId: req.user.id,
      },
    });

    res.json({
      folder,
      message: `Folder ${folderName} created successfully!`,
    });
  },
];

export async function getFolders(req, res) {
  const parentFolder = req.params.parentFolder || null;
  let folderList;
  try {
    folderList = await prisma.users.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        folders: {
          where: {
            parentId: parentFolder,
          },
        },
      },
    });
  } catch (err) {
    res.json({ message: err });
    return;
  }

  res.json({ folderList });
}
