/**
 * Fetches Discord information for a given user ID.
 * This function sends a request to the Discord API to retrieve information about a specific user.
 *
 * @param {string} userId - The ID of the user to fetch information for.
 *   This parameter specifies the unique identifier of the user.
 * @return {Promise<[string, string]>} - A promise that resolves to an array containing the avatar URL and username of the user.
 *   The promise resolves to an array with two values: the avatar URL and the username.
 *   The avatar URL is a string representing the URL of the user's avatar image.
 *   The username is a string representing the username of the user.
 *   The return value allows the caller to access the fetched information in a structured format.
 *   The promise is asynchronous and may take some time to complete.
 *   If the API request fails or encounters an error, the promise will be rejected with an error object.
 *   The caller should handle any potential errors by catching the error and taking appropriate action.
 *   The caller can use the avatar URL and username to display the user's information in the application.
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
