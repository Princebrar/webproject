import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query ,deleteDoc,doc } from "firebase/firestore";

async function getSavedSongs(userId) {
    const songs = [];
    const itemsQuery = query(collection(db, `users/${userId}/items`));
    console.log("Items Query is: " + itemsQuery);
    const querySnapshot = await getDocs(itemsQuery);
    console.log("Query Snapshot is: " + querySnapshot);
    querySnapshot.forEach((doc) => {
        songs.push({ data: doc.data(), segmentNumber: doc.ref._key.path.segments[8] });
    });
    return songs;
}

async function saveSong(userId, song) {
    const itemsRef = collection(db, `users/${userId}/items`);
    const docRef = await addDoc(itemsRef, song);
    console.log("Item Added: "+docRef.id);
    return docRef.id;
}

async function deleteSong(userId, song) {
    const songRef = doc(db, `users/${userId}/items/${song.segmentNumber}`);
    await deleteDoc(songRef);
    console.log("Item Deleted: "+song);
    console.log("Item Deleted: "+song.segmentNumber);
    return true;
}
export { getSavedSongs, saveSong , deleteSong };