import cheapwatch from "cheap-watch";
import { createApp } from "./server.js";
import fs from "fs";
import { stores } from "./store.js";

/**
 * @param {string} path
 * @param {fs.Stats} stats
 * @returns {FileItem}
 */
const createFileItem = (path, stats) => {
  return { path, stats, url: path.replace(/\./gm, "_") };
};

export const monitor = async (dir, options) => {
  const server = await createApp(dir, options);

  /**
   * @param {FileItem} file
   */
  const addFile = (file) => {
    console.log("watching file", file.path);
    stores.files.push(file);
    fs.watchFile(dir + "/" + file.path, () => {});
  };

  console.log("[realtime-logs] watching: " + dir);
  const watch = new cheapwatch({ dir });
  await watch.init();

  for (const [path, stats] of watch.paths) {
    if (!stats.isDirectory()) {
      addFile(createFileItem(path, stats));
    }
  }

  watch.on("+", ({ path, stats, isNew }) => {
    const fileItem = createFileItem(path, stats);
    if (!stats.isDirectory()) {
      if (isNew) stores.files.push(fileItem);
      server.broadcast(["update-file", fileItem]);
      const index = stores.files.findIndex((file) => file.path === path);
      stores.files[index] = fileItem;
    }
  });
};
