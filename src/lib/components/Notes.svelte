<script lang="ts">
    import {db} from "../firebase/firebase"
    import {collection, doc, query, orderBy, where, onSnapshot} from "firebase/firestore"
    import { serverTimestamp } from "firebase/firestore";
    import { addDoc,  deleteDoc } from "firebase/firestore";
    import { userStore } from "$lib/stores/userStore";
    import NoteItem from "./NoteItem.svelte";
    import type Note from "$lib/interfaces/note";

    export let notes:Array<Note> = [];

    const notesRef = collection(db, "note")
    const q = query(notesRef, where("uid", "==", $userStore?.uid), orderBy("createdAt"))
        onSnapshot(q, (snapshot) => {
            notes = snapshot.docs.map((doc) => {
                console.log(doc)
                return {
                    nid: doc.id,
                    uid: doc.data().uid,
                    content: doc.data().content,
                    createdAt: doc.data().createdAt.toDate().toDateString(),
                    updatedAt: doc.data().updatedAt.toDate().toDateString()
                }
            })
    })

    let newNote:string|null = null

    const addNote = async () => {
        let data = {
            uid: $userStore?.uid,
            content: newNote,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        }
        await addDoc(notesRef, data)
        newNote = null
    }

    const removeNote = async(event:any ) => {
        const {nid}  = event.detail
        await deleteDoc(doc(db, "note", nid) )
    }

</script>


<div class="note-form">
    <span>
        <label for="new-note">Save your memory</label>
        <button on:click={addNote}>Add</button>
    </span>
    <textarea name="new-note" bind:value={newNote} rows="3"/>
</div>

<ul class="notes">
   {#each notes as note}
    <NoteItem nid={note.nid} content={note.content} updatedAt={note.updatedAt} on:remove={removeNote}/>
   {/each}
   <li class="hidden"></li>
   <li class="hidden"></li>
</ul>




<style>
    .notes {
        display: flex;
        justify-content:space-between;
        flex-wrap: wrap;
        width: 100%;
        padding: 0;
    }

    .note-form {
        width: 100%;
        margin: 2rem 0;
        display: flex;
        flex-direction: column;
    }

    .note-form label {
        float: left;
        flex-grow: 1;
        color:rgb(255, 90, 255);
        font-family: "vcr";
        font-size: 1.8rem;
        font-weight: bold;
    }

    .note-form span {
        display: flex;
        height: 32px;
        margin-bottom: 12px;
    }

    .note-form span button {
        width: 120px;
        color: white;
        font-family: "vcr";
        font-size: 1rem;
        font-weight: 600;
        background-color: blueviolet ;
        border: 2px solid rgb(222, 163, 222);
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
    }


    .note-form span button:hover {
        color: black;
        background-color: rgb(194, 157, 228);
    }

    .note-form textarea {
        padding: 1.2rem;
        font-family: "vcr";
        font-size: 1rem;
        color: white;
        border-radius: 10px;
        outline: none;
        background-color:#252525;
        border: 2px solid blueviolet;
        transition: all 0.2 ease-in-out;
        -webkit-transition: all .2s ease-out;
        -moz-transition: all .2s ease-out;
        -ms-transition: all .2s ease-out;
        -o-transition: all .2s ease-out;
    }

    .note-form textarea:focus {
        border: 2px solid #cccccc;
    }

    .hidden {
        opacity: 0;
        height: 0;
        width: 300px;
    }
</style>

