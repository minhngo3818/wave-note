<script lang="ts">
    import Notes from "$lib/components/Notes.svelte";
    import { userStore } from "$lib/stores/userStore";
    import retrowave from "$lib/assets/retrowave-synthwave.gif"
</script>


<div class="homepage">
    <h1 class="brand">Welcome to <span>Wave Note</span></h1>

    {#if $userStore?.uid}
        <Notes  />
    {:else}
        <p class="greeting">Wave Note, where the neon-lit future meets the art of note-taking. 
            Our sleek interface will transport you to a world of endless inspiration and possibilities.     
            Whether you're jotting down your to-do list or drafting your next great idea,   
            our streamlined design will help you stay focused and stay inspired. So put on your shades,     
            fire up the synthwave playlist, and let's create something amazing together!</p>
        <img class="retrowave" src={retrowave} alt="retrowave"/>
    {/if}
</div>


<style>
    .homepage {
        height:auto;
        margin-bottom: 0;
    }

    .brand {
        font-family: "vcr";
        font-size: 48px;
        color: white
    }

    .brand span {
        background-color: #e837e8;
        background-image: linear-gradient(45deg, #f3ec78, #e837e8);
        background-size: 100%;
        background-repeat: repeat;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent; 
        -moz-background-clip: text;
        -moz-text-fill-color: transparent;
    }

    .greeting {
        margin: 20px 0;
        padding: 10px 0;
        color: white;
        font-family: "vcr";
        font-size: 20px;
        line-height: 24px;
    }

    .retrowave {
        width: 100%;
        border-radius: 10px;
        border: 2px solid blueviolet;
        box-shadow: 0 5px 10px 5px rgba(149, 75, 218, 0.4);
        object-fit: fill;
    }
</style>

