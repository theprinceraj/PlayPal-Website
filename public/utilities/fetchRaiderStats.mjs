import config from '../../config.json' assert {type: 'json'};
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
    // Initialize Realtime Database and get a reference to the service
    const database = getDatabase(app);
    const searchResult = ref(database, 'raiders/' + userId);
    onValue(searchResult, snap => {
        const data = snap.val();
        console.log(data);
        return data;
    })
}
