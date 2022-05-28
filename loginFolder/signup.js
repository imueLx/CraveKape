// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth,
     signInWithPopup, 
     GoogleAuthProvider,
     createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
     
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPlffj3uQTbkiYna3JloBsE_CcDTwjCkM",
    authDomain: "crave-kape.firebaseapp.com",
    databaseURL: "https://crave-kape-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "crave-kape",
    storageBucket: "crave-kape.appspot.com",
    messagingSenderId: "957553092704",
    appId: "1:957553092704:web:4aef4656a990ebefffbb05"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(app);
const auth = getAuth(app);
const database = getDatabase(app);


document.getElementById("googleSignUp").addEventListener("click", function(){
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;

            alert(user.displayName)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            alert(errorMessage, errorCode);
        });
});

document.getElementById("btnSignUp").addEventListener("click", function(){

var fname = document.getElementById("fname").value;
var lname = document.getElementById("lname").value;     
var email = document.getElementById("email").value; 
var password = document.getElementById("password").value; 
const signupForm = document.querySelector('.signup')

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            
            // ...
            set(ref(database, 'users/' + user.uid), {
                firstname: fname,
                lastname: lname,
                email: email   
            })
                .then(() => {
                    // Data saved successfully!
                    alert("User Created Successful");
                    signupForm.reset();
                    window.location.replace("login.html");
                })
                .catch((error) => {
                    // The write failed...
                    alert(error);
                });
            })
            .catch((error) => { 
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                alert(errorCode, errorMessage)
                });

});
