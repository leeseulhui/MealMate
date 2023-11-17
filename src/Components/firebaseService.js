import { collection, addDoc, getFirestore, doc, updateDoc, getDocs } from "firebase/firestore";
import { getFirebase } from "./LoginSignup/firebase_config";
import { deleteDoc } from "firebase/firestore";


const db = getFirestore(getFirebase());

export const updateMarkerData = async (partyId, updatedParty) => {
  const markerRef = doc(db, "markers", partyId);
  try {
    await updateDoc(markerRef, updatedParty);
    console.log("Document successfully updated!");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export const saveMarkerData = async (markerData) => {
  const markerCollection = collection(db, "markers");
  try {
    const docRef = await addDoc(markerCollection, markerData);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id; // 마커 ID 반환
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getMarkers = async () => {
  const markerCollection = collection(db, "markers");
  const markerSnapshot = await getDocs(markerCollection);
  const markers = [];
  markerSnapshot.forEach((doc) => {
    markers.push({ id: doc.id, ...doc.data() });
  });
  return markers;
};

export const deleteMarkerData = async (partyId) => {
  const markerRef = doc(db, "markers", partyId);
  try {
    await deleteDoc(markerRef);
    console.log("Document successfully deleted!");
  } catch (e) {
    console.error("Error removing document: ", e);
  }
};
