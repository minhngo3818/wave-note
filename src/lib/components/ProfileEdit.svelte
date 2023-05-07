<script lang="ts">
    import { fly } from "svelte/transition";
    import { userStore } from "$lib/stores/userStore";
    import { updateUser, uploadAvatar, getAvatar } from "$lib/stores/userStore";
    import type User from "$lib/interfaces/user";

    export let isEdit:Boolean = false
    export let setEdit:()=>void

    let displayName = $userStore?.displayName
    let bio = $userStore?.bio
    let avatar:File|null

    const getFile = (event:Event) => {
        const target = event.target as HTMLInputElement
        if (target.files) {
            avatar = target.files[0]
        }
    }

    const updateProfile = async() => {
        let avatarURL:any;
        if (avatar)
        {
            const avatarPath = await uploadAvatar(avatar, $userStore?.id)
            avatarURL = await getAvatar(avatarPath)
        }

        updateUser( $userStore?.id, displayName, bio, avatarURL)

        userStore.update((user) => {
            const newUser:User|null = user
            if (newUser && displayName && bio) {
                newUser.displayName = displayName,
                newUser.bio = bio
                newUser.photoURL = avatarURL
            }
            return newUser
         })

        isEdit = false
    }

</script>


{#if isEdit}
<div  class="profile-edit-form">
    <form in:fly={{delay:200, y: -200}} on:submit={updateProfile}>
        <h3>Edit Form</h3>
        <div>
            <label for="display-name">Name: </label>
            <input name="display-name" bind:value={displayName} />
        </div>
        <div>
            <label for="bio">Bio: </label>
            <textarea name="bio"  rows="8" bind:value={bio}/>
        </div>
        <div>
            <label for="avatar">Avatar: </label>
            <input type="file" name="avatar" id="avatar" on:change={getFile}/>
        </div>
        <span>
            <button type="submit">Change</button>
            <button on:click={setEdit}>Cancel</button>
        </span>
    </form>
</div>
{/if}


<style>
    .profile-edit-form {
        top: 0;
        left: 0;
        background-color: rgb(125, 125, 125, 0.4);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
    }

    .profile-edit-form  form {
        width: 100%;
        max-width: 500px;
        min-height: 400px;
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border: 3px solid blueviolet;
        border-radius: 10px;
        box-shadow: 0 5px 10px 5px rgba(178, 97, 254, 0.3);
        background-color: #252525;
        z-index: 10;
    }

    .profile-edit-form  form h3 {
        text-align: center;
        font-family: "vcr";
        font-size: 1.8rem;
        color: #e837e8;
        margin: 10px;
    }

    .profile-edit-form  form div {
        display: flex;
        flex-direction: column;
        margin: 0.5rem auto;
        width: 85%;
    }

    .profile-edit-form  form div label {
        font-family: "vcr";
        font-size: 1.5rem;
        color: white;
        margin: 10px 0;
    }

    .profile-edit-form  form div input {
        height: 32px;
        font-family: "vcr";
        font-size: 1rem;
        color: white;
        padding: 0 15px;
        border:2px rgba(178, 97, 254, 0.3);
        border-radius: 5px;
        outline: none;
        background-color: #454545;
    }

    .profile-edit-form  form div textarea {
        font-family: "vcr";
        font-size: 1rem;
        color: white;
        padding: 10px 15px;
        border:2px rgba(178, 97, 254, 0.3);
        border-radius: 5px;
        outline: none;
        background-color: #454545;
    }

    .profile-edit-form form span {
        margin: 1rem auto;
        display: flex;
        justify-content: flex-end;
        float: right;
        width: 85%;
    }

    .profile-edit-form form button {
        width: 100px;
        height: 32px;
        margin-left: 10px;
        font-size: 1rem;
        font-family: "vcr";
        color: white;
        cursor: pointer;
        background-color: blueviolet;
        border: none;
        border-radius: 5px;
        transition: all 0.2s ease-in-out;
    }

    .profile-edit-form form button:hover {
        background-color: #c29de4;
        color: black;
    }

    .profile-edit-form form button:active {
        background-color: #f3ec78;
    }
</style>