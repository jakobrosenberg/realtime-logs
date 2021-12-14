<script>
  import Navigation from "./_navigation.svelte";
  import { lastUpdatedFile, files, HOST } from "./stores";

  const source = new EventSource(`${HOST}/events`);

  const fetchFiles = () => {
    fetch(`${HOST}/files`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        $files = data;
      });
  };
  fetchFiles();
  source.addEventListener("message", (message) => {
    try {
      const [action, data] = JSON.parse(event.data);
      console.log({ action, data });
      if (action === "update-file") {
        $lastUpdatedFile = data;
      }
    } catch (err) {
      console.log(err);
    }
  });
</script>

<div class="app">
  <Navigation {files} />
  <div class="container-fluid">
    <main>
      <slot />
    </main>
  </div>
</div>

<style>
  .app {
    position: fixed;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .container-fluid {
    height: 100%;
    overflow: hidden;
    margin-bottom: 16px;
    flex: 1 1 0;
  }
  main {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
</style>
