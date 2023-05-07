<script lang="ts">
  import { login, logout, userStore } from "$lib/stores/userStore";
</script>


<div id="page">
  <nav class="center">
      <a href="/">Home</a>
    {#if $userStore}
      <a href=/profile>Profile</a>
      <button  on:click={logout}>Logout</button>
    {:else}
      <button  on:click={login}>Login</button>
    {/if}
  </nav>

  <main class="center">
    <slot />
  </main>

  <footer class="center">©Tuyen Ngo 2023 | <a href="https://github.com/minhngo3818">Github</a></footer>>
</div>


<style>
    @font-face {
        font-family: 'vcr';
        src: url('../lib/assets/vcr-osd-mono-webfont.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
      }

    :global(html) {
      overflow-y: scroll;
      background-color: #191919;
      overflow-x: hidden;
      font: "vcr";
    }

    #page {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
  
    .center {
      padding-top: 20px;;
      padding-left: max(1rem, calc(40vw - 350px));
      padding-right: max(1rem, calc(40vw - 350px));
    }
  
    nav,
    footer {
      font-size: 0.7rem;
    }
  
    nav {
      font-weight: 500;
      padding-top: 1rem;
      padding-bottom: 1rem;
      border-bottom: solid 2px blueviolet;
    }

    nav a,button{
      margin-right: 10px;
      font-family: "vcr";
      font-size: 20px;  
      color: white;
      border-radius: 0.25rem;
      border: 1px;
      border-color: blueviolet;
      text-decoration: none;
      padding: 0.5rem 2rem;
      background-color: blueviolet;
      transition: all 0.2s ease-in-out;
    }

    nav a:hover, button:hover {
      background-color: rgb(194, 157, 228);
      color: black;
      cursor: pointer;
    }
  
    footer {
      text-align: center;
      padding: 2rem 0;
      font-family: "vcr";
      font-size: 1.2rem;
      color: white;
      margin-top: auto;
    }
  </style>