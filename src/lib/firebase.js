import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJfwfYSUFyqK5A1LlUPR_mtxm1e8_copk",
    authDomain: "notesforge-ac3d8.firebaseapp.com",
    projectId: "notesforge-ac3d8",
    storageBucket: "notesforge-ac3d8.firebasestorage.app",
    messagingSenderId: "41071304953",
    appId: "1:41071304953:web:33504690f13384767a0228",
    measurementId: "G-BEMJ51VX26"
};

// Initialize Firebase
// We wrap this in a try-catch to prevent app crash if config is missing
let app;
let analytics;
let db;

try {
    // Only initialize if config is present (basic check)
    if (firebaseConfig.apiKey) {
        app = initializeApp(firebaseConfig);

        // Initialize Analytics conditionally (it might not be supported in all envs)
        isSupported().then(yes => {
            if (yes) analytics = getAnalytics(app);
        });

        db = getFirestore(app);
    } else {
        console.warn("Firebase config missing. Analytics will not work.");
    }
} catch (e) {
    console.error("Firebase initialization error:", e);
}

export { app, analytics, db };

/**
 * Log a custom event to Firebase Analytics and Firestore (for custom dashboard)
 * @param {string} eventName Name of the event
 * @param {object} params Additional parameters
 */
export const trackEvent = async (eventName, params = {}) => {
    // 1. Log to Google Analytics (Standard)
    if (analytics) {
        logEvent(analytics, eventName, params);
    }

    // 2. Log to Firestore (For our Custom Admin Dashboard)
    // We only do this if we have a DB connection
    if (db) {
        try {
            await addDoc(collection(db, "events"), {
                event: eventName,
                ...params,
                timestamp: serverTimestamp(),
                // Add basic browser info if available
                userAgent: navigator.userAgent,
                path: window.location.pathname
            });
        } catch (e) {
            console.error("Error logging to Firestore:", e);
        }
    }
};
