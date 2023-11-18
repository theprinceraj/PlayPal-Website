import 'dotenv/config';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
};
const app = initializeApp(firebaseConfig);

/**
 * Fetches raider stats for a given user ID.
 * 
 * This function retrieves the raider stats from the database for the specified user ID. It uses the 
 * 'getDatabase' function to obtain a reference to the database and then queries the 'raiders' collection 
 * with the provided user ID. The function returns a promise that resolves with the fetched data or rejects 
 * with an error in case of any issues.
 *
 * @param {string} userId - The ID of the user.
 * @return {Promise} A promise that resolves with the fetched data or rejects with an error.
 */
export async function fetchRaiderStats(userId) {
    return new Promise((resolve, reject) => {
        const database = getDatabase(app);
        const searchResult = ref(database, 'raiders/' + userId);
        onValue(searchResult, (snap) => {
            const data = snap.val();
            resolve(data); // Resolve the promise with the fetched data
        }, (error) => {
            reject(error); // Reject the promise in case of an error
        });
    });
}
