<script>
  import { files, HOST, lastUpdatedFile } from "./stores.js";
  import { params } from "@roxi/routify";

  let content = "";
  /** @type {HTMLElement}*/
  let mainElem;

  const refresh = () => {
    if (file)
      fetch(HOST + "/file/" + file.path)
        .then((res) => res.text())
        .then((res) => {
          const { scrollHeight, clientHeight, scrollTop } = mainElem;
          const fromBottom = scrollHeight - (clientHeight + scrollTop);
          content = res;
          setTimeout(() => {
            mainElem.scrollTo({ top: scrollHeight - (clientHeight + fromBottom), behavior: "smooth" });
          }, 0);
        });
  };

  $: url = $params.file.join("/");
  $: file = $files?.find((f) => f.url === url);
  $: if (file) refresh();
  $: if ($lastUpdatedFile?.path === file?.path) refresh();
</script>

<main bind:this={mainElem}>
  <pre>
    {content}
  </pre>
</main>

<style>
  main {
    height: 100%;
    width: 100%;
    overflow: auto;
  }
  pre {
    padding: 32px;
  }
</style>
