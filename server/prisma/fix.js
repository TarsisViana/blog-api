import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const delete1 = await prisma.folders.deleteMany({
    where: {
      OR: [
        {
          id: "5ec5003c-48b9-4e68-88f7-df396b1e701c",
        },
        {
          id: "0dac3b4d-a318-4a08-8a53-35309ac9513e",
        },
        {
          id: "14c7c443-a3b5-4ec9-a7d5-c79aea101cf3",
        },
      ],
    },
  });
}

async function clearPosts() {
  const deleteFiles = await prisma.file.deleteMany();
  const deleteArticles = await prisma.article.deleteMany();
}

clearPosts()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
