<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import {fly} from "svelte/transition"

    const dispatch = createEventDispatcher()

    function remove() {
        dispatch('remove', {nid})
    }

    export let nid:String|null =null;
    export let content:String|null = null;
    export let updatedAt:String|null = null;
</script>


<li class="note" in:fly="{{ x: 900, duration: 500 }}">
    <span class="note-header">
        <span>{updatedAt}</span>
        <button on:click={remove}>X</button>
    </span>
    <p>{content}</p>
</li>



<style>
    .note {
        width: 100%;
        display:flex;
        flex-direction: column;
        max-width:300px;
        min-height:300px;
        margin-bottom: 2rem;
        background-color: #252525;
        list-style-type: none;
        border-radius: 10px;
        box-sizing: border-box;
        box-shadow: 0 10px 10px 5px rgb(0,0,0, 0.2);
        transition: all 0.2s ease-in-out;
    }

    .note:hover {
        transform: scale(1.05);
    }

    .note-header {
        width: 100%;
        height: 36px;
        display: flex;
        align-items:  center;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: blueviolet;
    }

    .note-header span {
       flex-grow:  1;
       padding: 0 1rem;
       color: white;
       font-size: 1rem;
       font-family: "vcr";
       font-weight: 800;
    }

    .note-header button {
        margin: 0px 10px;
        border: none;
        background-color: transparent;
        color: white;
        font-size: 1rem;
        font-weight: 800;
        cursor: pointer;
    }

    .note-header button:hover {
        outline: 2px solid white;
    }

    .note-header button:active {
        background-color: white;
    }

    .note p {
        padding: 0.25rem 1rem;
        font-family: "vcr";
        font-size: 16px;
        color: white;
    }

</style>


