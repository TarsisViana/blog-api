import { Router } from "express";
const router = Router();

import fs from "node:fs";

router.get("/", (req, res) => {
  fs.readFile("./downloads/test.md", "utf8", (err, data) => {
    if (err) {
      res.send({ msg: "file not found", err });
    } else {
      res.send(data);
    }
  });
});

export default router;
