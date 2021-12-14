import { createServer } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import routify from "@roxi/routify/vite-plugin";
import { mdsvex } from "mdsvex";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const startViteServer = async ({ port }) => {
  console.log("start vite server", port);
  const server = await createServer({
    clearScreen: false,
    root: __dirname + "/..",
    plugins: [
      routify({
        routifyDir: __dirname + "/../.routify",
        routesDir: __dirname + "/../src/routes",
      }),
      svelte({
        emitCss: true,
        extensions: [".md", ".svelte"],
        preprocess: [mdsvex({ extension: "md" })],
      }),
    ],

    server: { port },
  });
  await server.listen();

  server.printUrls();
  return server;
};
