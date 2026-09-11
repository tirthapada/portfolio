import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

const httpLogger = (pinoHttp as any).default || (pinoHttp as any);

app.use(
  httpLogger({
    logger,
    serializers: {
      req(req: any) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: any) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import path from "node:path";
import fs from "node:fs";

app.use("/api", router);

// Serve static frontend portfolio assets
const possibleStaticDirs = [
  path.resolve(process.cwd(), "artifacts/tirthapada-portfolio/dist"),
  path.resolve(process.cwd(), "dist"),
  path.resolve(process.cwd(), "public"),
  path.resolve(__dirname, "../public"),
  path.resolve(__dirname, "../../tirthapada-portfolio/dist"),
];

const staticDir = possibleStaticDirs.find((dir) => fs.existsSync(dir) && fs.existsSync(path.join(dir, "index.html")));

if (staticDir) {
  app.use(express.static(staticDir));
  app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
      return res.sendFile(path.join(staticDir, "index.html"));
    }
    next();
  });
} else {
  app.get("/", (_req, res) => {
    res.json({
      message: "Tirthapada Portfolio API Server is Running",
      healthz: "/api/healthz",
    });
  });
}

export default app;
