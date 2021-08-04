import express from "express";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
  const videoMeta = JSON.parse(fs.readFileSync("meta.json", "utf-8"));
  res.status(200).json(videoMeta);
});

app.post("/", (req: express.Request, res: express.Response) => {
  const videoMeta = JSON.stringify(req.body);
  fs.writeFileSync("meta.json", videoMeta);
  res.status(200).json({});
});

app.listen(5000, () => console.log("Listening."));
