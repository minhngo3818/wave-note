import { writable } from "svelte/store";
import { auth, googleProvider } from "$lib/firebase/firebase";
import { signInWithRedirect, signOut } from "firebase/auth";
import { redirect } from "@sveltejs/kit";
import type User from "$lib/interfaces/user";
import { db } from "$lib/firebase/firebase";
import { collection,doc,  addDoc, getDocs, updateDoc, query, where, limit } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { ref, getStorage, uploadBytes, getDownloadURL } from "firebase/storage"


export const userStore = writable<User| null>(null)


export const userRef = collection(db, "user")


export const login = () => {
    signInWithRedirect(auth, googleProvider)
  }


export const logout = () => {
    signOut(auth)
    redirect(302, "/")
  }


export const uploadAvatar = async (pic: File, id?:string|null) => {
  const avatarPath = `images/${id}/${pic.name}`
  console.log(avatarPath)
  const storage = getStorage()
  const avatarRef = ref(storage, avatarPath)
  const metadata = {
    contentType: 'image/jpeg'
  }
  await uploadBytes(avatarRef, pic, metadata)
  return avatarPath
}


export const getAvatar = async(path:string) => {
  const storage = getStorage()
  return getDownloadURL(ref(storage, `gs://wave-note.appspot.com/${path}`))
}


export const updateUser = async (id?:string|null, displayName?:string|null, bio?:string|null, avatarURL?:string|null) => {
  const userDocRef = doc(db, "user", `${id}`)
  const data:any = {
    updatedAt: serverTimestamp()
  }
  if (displayName) {data["displayName"] = displayName}
  if (bio) {data["bio"] = bio}
  if (avatarURL) {data["photoURL"] = avatarURL}
  await updateDoc(userDocRef, data)
   .catch((error) => alert("Hmm... update failed"))
}


auth.onAuthStateChanged(async userToRetreive => {
    if(userToRetreive) {
      const token = await userToRetreive.getIdTokenResult()
      const queryUser = query(userRef, where("uid", "==", token.claims.user_id))
      const userSnapshot = await getDocs(queryUser)

      if (userSnapshot.size > 1) {
        alert("duplicate profile")
        return
      }

      if (userSnapshot.empty) {
        let data = {
          uid: token.claims.user_id,
          displayName: token.claims.name,
          photoURL: null,
          bio: null,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }

        await addDoc(userRef, data).then(doc => {
          console.log(doc)
          userStore.set( {
              id: doc.id,
              uid: data.uid,
              displayName: data.displayName
            }
          )
        }).catch(error => {
          alert("Cannot create a profile. Internal server error")
        })
  
      } else {

        const userInst = userSnapshot.docs[0].data()
        userStore.update(() => {
          return {
                id: userSnapshot.docs[0].id,
                uid: userInst.uid,
                displayName: userInst.displayName,
                photoURL: userInst .photoURL,
                bio: userInst.bio
            }}
          )
      }
    } else {
      userStore.update((user) => null)
    }
  })