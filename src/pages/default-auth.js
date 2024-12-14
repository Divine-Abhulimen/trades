import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import * as firebaseui from "firebaseui";

// Import Firebase config
import { auth } from "./assets/config.js";

// Initialize FirebaseUI
const ui = new firebaseui.auth.AuthUI(auth);

// FirebaseUI configuration
const uiConfig = {
  signInSuccessUrl: "/", // URL to redirect after successful login
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  tosUrl: "/terms", // Terms of Service URL
  privacyPolicyUrl: "/privacy", // Privacy Policy URL
};

// Start the UI
export const startFirebaseUI = (elementId) => {
  ui.start(elementId, uiConfig);
};
