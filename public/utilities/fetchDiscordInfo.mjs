/**
 * Fetches user information from Discord API.
 * @param {string} userId - The ID of the user to fetch information for.
 * @returns {Promise<[string, string]>} - A Promise that resolves to an array containing the avatar URL and username.
 */
export async function fetchDiscordInfo(userId) {
  try {
    const response = await fetch(`https://discord.com/api/v10/users/${userId}`, {
      headers: {
        Authorization: `Bot ${process.env.discordBotToken}` // For bot token
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const user = await response.json();
    const avatarURL = `https://cdn.discordapp.com/avatars/${userId}/${user.avatar}.png?size=1024`;
    const username = user.username;
    return [avatarURL, username];
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}
