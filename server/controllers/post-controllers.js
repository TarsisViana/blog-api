import fs from "node:fs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createPost(req, res) {
  //const file = await createNewFile(req, res);

  try {
    const article = await createNewArticle(req, res);

    res.json(article);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
}

export async function createNewArticle(req, res) {
  try {
    const { originalname, mimetype, destination, filename, path, size } =
      req.file;
    const article = await prisma.article.create({
      data: {
        title: req.body.articleTitle,
        number: parseInt(req.body.number),
        file: {
          create: {
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
        },
      },
      include: {
        file: true,
      },
    });
    res.json({
      article,
      message: `Post ${article.title} uploaded successfully!`,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
}

export async function getPostFile(req, res) {
  const post = await prisma.article.findUnique({
    where: {
      id: req.params.articleId,
    },
    select: {
      title: true,
      file: {
        select: {
          path: true,
        },
      },
    },
  });

  fs.readFile(`./${post.file.path}`, "utf8", (err, data) => {
    if (err) {
      res.json({ msg: "file not found", err });
    } else {
      res.json({ text: data, title: post.title });
    }
  });
}

export async function getPostList(req, res) {
  try {
    const postArr = await prisma.article.findMany({
      select: {
        title: true,
        id: true,
      },
    });

    res.json(postArr);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
}
