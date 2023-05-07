<script lang="ts">
    import { userStore } from "$lib/stores/userStore";
    import avatar from "$lib/assets/user.jpeg"
    import { fade } from "svelte/transition"

    let isReveal = false;
    function reveal() {
        isReveal = !isReveal;
    }

    let baseDelay = 200;
</script>


<section>
    <div class="profile-container">
        <div class="profile-left">
            <img in:fade  src={ $userStore?.photoURL ? $userStore.photoURL : avatar }  alt="avatar"/>
            <h2 in:fade={{delay: baseDelay}}>{$userStore?.displayName}</h2>
            <button in:fade={{delay: baseDelay*2}} on:click={reveal}>
                <p class="profile-text">{!isReveal ? "Secret" : $userStore?.uid}</p>
            </button>
        </div>
        <div in:fade={{delay: baseDelay*3}} class="profile-right">
            <h3>Bio</h3>
            <p class="profile-text">{$userStore?.bio ? $userStore.bio : "Your bio"}</p>
        </div>
    </div>
</section>


<style>
    .profile-container {
        position: relative
    }

    .profile-container .profile-left {
        float:left;
        width: 30%;
    }

    .profile-left h2 {
        padding: 10px 0;
        font-family: "vcr";
        font-size: 1.5rem;
        text-align: center;;
        color: white;
        border-radius: 10px;
        border: 2px solid blueviolet;
        background-color: #252525;
    }

    .profile-left img {
        width: 100%;
        object-fit: fill;
        border-radius: 16px;
        border: 3px solid blueviolet;
        box-shadow: 0 5px 5px 5px rgba(160, 90, 225, 0.5);
    }

    .profile-left button {
        width:100%;
        color: white;
        font-family: "vcr";
        font-size: 1rem;
        background-color: blueviolet;
        border: none;
        border-radius: 10px;
        cursor: pointer;
    }

    .profile-left button:active {
        background-color: #f3ec78;
    }

    .profile-container .profile-right {
        float: right;
        min-height: 300px;
        padding: 32px 32px;
        width: 50%;
        border-radius: 10px;
        border: 2px solid blueviolet;
        background-color: #252525;
    }

    .profile-right h3 {
        margin: 0 0 20px 0;
        padding-bottom: 5px;
        color: white;
        font-family: "vcr";
        font-size: 1.6rem;
        border-bottom: 2px solid white;
    }

    .profile-text {
        word-break:  break-all;
        white-space: normal;
        font-family: "vcr";
        font-size: 1rem;
        color: white;
    }
</style>
