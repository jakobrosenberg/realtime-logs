import express from "express";
import cors from "cors";
import { startViteServer } from "./viteServer.js";
import { stores } from "./store.js";
import { read } from "read-last-lines";

export const createApp = (dir, options) => {
  const app = express();
  app.use(cors());
  const port = 4512;

  const server = {
    app,
    broadcast: (x) => x,
  };

  startViteServer(options);

  app.get("/files", async (req, res) => {
    res.json(stores.files);
    res.end();
  });

  app.get("/events", async (req, res) => {
    server.broadcast = (data) => res.write(`data: ${JSON.stringify(data)}\n\n`);

    res.set({
      "Cache-Control": "no-cache",
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
    });
    res.flushHeaders();

    // Tell the client to retry every 10 seconds if connectivity is lost
    res.write("retry: 10000\n\n");
  });

  app.get("/file/*", async (req, res) => {
    const path = dir + "/" + req.url.replace(/^\/file\//, "");
    const content = await read(path, 200, "utf-8");
    res.send(content);
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

  return server;
};
