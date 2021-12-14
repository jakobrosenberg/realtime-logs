<script>
  import { Router, createRouter } from "@roxi/routify";
  let numWindows = 4;
  let windows = [];
  $: windows = [...new Array(numWindows)].map((window, index) => windows[index] || {});
  $: console.log(windows);
</script>
