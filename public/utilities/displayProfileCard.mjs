import 'dotenv/config';
import fs from 'fs';
import { fetchRaiderStats } from "../utilities/fetchRaiderStats.mjs";
import { fetchDiscordInfo } from '../utilities/fetchDiscordInfo.mjs';

/**
 * Retrieves the necessary data and generates a profile card for the specified user.
 *
 * This function fetches the user's Discord information and raider statistics using the provided user ID.
 * It then generates a profile card markup by replacing the placeholders in the template with the fetched data.
 * The generated profile card includes the user's Discord username, avatar URL, raider statistics such as 
 * elixir gained, total raids, raids won, raids lost, total XP, highest XP, lowest XP, and the XP gained 
 * in the user's last 5 raids.
 *
 * @param {string} userId - The ID of the user for whom the profile card is generated.
 * @return {string} The generated profile card markup.
 */
export async function displayProfileCard(userId) {

    try {
        const [avatarURL, discordUsername] = await fetchDiscordInfo(userId, process.env.discordBotToken);
        const raiderData = await fetchRaiderStats(userId);
        const markupTemplate = fs.readFileSync('./public/views/searchResult.html', 'utf-8');
        const finalMarkup = markupTemplate.replace('${discordUsername}', discordUsername)
            .replace('${avatarURL}', avatarURL)
            .replace('${raiderData.raids.total}', raiderData.raids.total)
            .replace('${raiderData.xp.total}', raiderData.xp.total)
            .replace('${raiderData.xp.highest}', raiderData.xp.highest)
            .replace('${raiderData.xp.lowest}', raiderData.xp.lowest)
            .replace('${raiderData.xp.last5Raids[0]}', raiderData.xp.last5Raids[0])
            .replace('${raiderData.xp.last5Raids[1]}', raiderData.xp.last5Raids[1])
            .replace('${raiderData.xp.last5Raids[2]}', raiderData.xp.last5Raids[2])
            .replace('${raiderData.xp.last5Raids[3]}', raiderData.xp.last5Raids[3])
            .replace('${raiderData.xp.last5Raids[4]}', raiderData.xp.last5Raids[4])
            .replace('${userId}', userId);;

        return finalMarkup;
    } catch (error) {
        console.error(error);
    }
}