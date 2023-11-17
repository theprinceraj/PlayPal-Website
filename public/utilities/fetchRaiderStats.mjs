import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.apiKey || config.apiKey,
    authDomain: process.env.authDomain || config.authDomain,
    databaseURL: process.env.databaseURL || config.databaseURL,
    projectId: process.env.projectId || config.projectId,
    storageBucket: process.env.storageBucket || config.storageBucket,
    messagingSenderId: process.env.messagingSenderId || config.messagingSenderId,
    appId: process.env.appId || config.appId,
    measurementId: process.env.measurementId || config.measurementId,
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
