<script lang="ts">
    import Profile from "$lib/components/Profile.svelte";
    import ProfileEdit from "$lib/components/ProfileEdit.svelte";

    let isEdit = false;

    const setEdit= () => {
        isEdit = !isEdit
    }

</script>

<section>
    <span class="profile-header">
        <h1>Profile</h1>
        <button on:click={setEdit}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048">
                <path fill="currentColor" d="M2048 335q0 66-25 128t-73 110L633 1890L0 2048l158-633L1475 98q48-48 110-73t128-25q69 0 130 26t106 72t72 107t27 130zM326 1428q106 35 182 111t112 183L1701 640l-293-293L326 1428zm-150 444l329-82q-10-46-32-87t-55-73t-73-54t-87-33l-82 329zM1792 549q25-25 48-47t41-46t28-53t11-67q0-43-16-80t-45-66t-66-45t-81-17q-38 0-66 10t-53 29t-47 41t-47 48l293 293z">
            </path></svg>
        </button>
    </span>
    <Profile />
</section>

<ProfileEdit isEdit={isEdit} setEdit={setEdit}  />


<style>
    .profile-header {
        display: flex;
        align-items: center;;
    }

    .profile-header h1 {
        flex-grow: 1;
        font-family: "vcr";
        font-size: 36px;
        color: white;
        background-color: rgb(232, 55, 232);
        background-image: linear-gradient( #f3ec78, rgb(232, 55, 232));
        background-size: 100%;
        background-repeat: repeat;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent; 
        -moz-background-clip: text;
        -moz-text-fill-color: transparent;
    }

    .profile-header button {
        display: flex;
        width: 36px;
        height: 36px;
        font-size: 1rem;
        justify-content: center;
        align-items: center;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        color: white;
        background-color: blueviolet;
        transition: background-color 0.2s ease-in-out;
    }

    .profile-header button:hover {
        background-color: #c29de4;
        color: black;
    }

    .profile-header button:active {
        background-color: #f3ec78;
    }
</style>


