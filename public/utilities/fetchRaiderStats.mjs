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
 * Fetches the raider stats for a given user ID.
 *
 * @param {string} userId - The ID of the user.
 * @return {object} The raider stats data.
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
