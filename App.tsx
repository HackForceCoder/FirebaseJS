import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  UserCredential,
  getReactNativePersistence
} from 'firebase/auth';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  query,
  where
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDzL8z5UoBwNVF8cSLdUkV0ch4NvrEWvao",
  authDomain: "test-c9e08.firebaseapp.com",
  projectId: "test-c9e08",
  storageBucket: "test-c9e08.appspot.com",
  messagingSenderId: "565828800306",
  appId: "1:565828800306:web:46a8d4be7ca2865bef512b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage) });
const db = getFirestore(app);


// Default app
export default function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <TextInput
        placeholder="email"
        onChangeText={text => {
          setEmail(text);
        }}
      />

      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={text => {
          setPassword(text);
        }}
      />

      <Button
        title="SIGN UP"
        onPress={() => {
          createUserWithEmailAndPassword(auth, email, password).then(
            (userCredential: UserCredential) => {
              alert("USER SIGNED UP SUCCESFULLY!\n" + userCredential.user.email);
              console.log("USER SIGNED UP SUCCESFULLY!\n", userCredential.user.email);
            }).catch((error: any) => {
              if (error.code == "auth/missing-password") {
                alert("Password is missing or invalid. Try again");
              }
              console.log("ERROR:", error.code, "\n", error.message)
            });
        }}
      />

      <Button
        title="LOG IN"
        onPress={() => {
          signInWithEmailAndPassword(auth, email, password).then(
            (userCredential: UserCredential) => {
              alert("LOGGED IN SUCCESSFULLY!\n" + userCredential.user.email);
              console.log("LOGGED IN SUCCESSFULLY!\n", userCredential.user.email);
            }).catch((error: any) => {
              if (error.code == "auth/missing-password") {
                alert("Password is missing or invalid. Try again");
              }
              console.log("ERROR:", error.code, "\n", error.message)
            });
        }}
      />

      <Button
        title="LOG OUT"
        onPress={() => {
          auth.signOut().then(() => {
            alert("LOGGED OUT SUCCESSFULLY!");
            console.log("LOGGED OUT SUCCESSFULLY!");
          });
        }}
      />


      {/* -------------------- Dog Firebase -------------------- */}
      
      <TextInput
        placeholder="Name"
        onChangeText={text => {
          setName(text);
        }}
      />

      <TextInput
        placeholder="Breed"
        onChangeText={text => {
          setBreed(text);
        }}
      />

      <Button
        title="Add"
        onPress={async () => {
          try {
            var dogCollection = collection(db, "dog");
            const newDoc = await addDoc(dogCollection, {
              name: name,
              breed: breed
            });

            console.log("ID of the new dog:", newDoc.id);
          } catch (e) {
            console.log("Dog error:\n", e);
          }
        }}
      />

      <Button
        title="Get all"
        onPress={async () => { }}
      />

      <Button
        title="Query"
        onPress={async () => { }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

