<script>
  import { beforeUrlChange } from "@roxi/routify";
  import Time from "svelte-time";
  import Menu from "svelte-hamburgers";
  import "svelte-hamburgers/dist/css/types/spin.css";
  import "svelte-hamburgers/dist/css/base.css";
  export let files;
  let open;

  $beforeUrlChange(()=>{
    open = false
    return true
  })
</script>

<div class="nav-wrapper">
  <nav class="container">
    <ul>
      <li>
        <Menu bind:open />
      </li>
      <li>
        <strong>realtime-logs</strong>
      </li>
    </ul>
  </nav>
</div>

{#if open}
  <div class="container ">
    <article class="files">
      <small>
        <ul>
          {#each $files as file}
            <li>
              <a href="/{file.url}">
                {file.path}
                <small style="color: gray">
                  <Time relative timestamp={file.stats.mtime} />
                </small>
              </a>
            </li>
          {/each}
        </ul>
      </small>
    </article>
  </div>
{/if}

<style>
  .files {
    position: absolute;
    top: 32px;
  }
  li {
    list-style: none;
  }
</style>
