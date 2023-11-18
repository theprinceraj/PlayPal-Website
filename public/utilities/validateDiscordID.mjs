/**
 * Checks if the given Discord ID is valid.
 *
 * Discord user IDs are numerical strings of 17 to 19 digits.
 *
 * @param {string} Id - The Discord user ID to be checked. Must be a string of 17 to 19 digits.
 * @return {boolean} Returns true if the ID is valid, false otherwise.
 * @throws {TypeError} Throws a TypeError if the provided ID is not a string.
 * @example
 * // Returns true
 * isValidDiscordID("12345678901234567");
 *
 * // Returns false
 * isValidDiscordID("123"); 
 * isValidDiscordID("12345678901234567890");
 *
 * // Throws TypeError: Id must be a string
 * isValidDiscordID(12345678901234567);
 */
export function isValidDiscordID(Id){
    if(typeof Id !== "string"){
        throw new TypeError("Id must be a string");
    }
    // Discord user IDs are numerical strings of 17 to 19 digits
    const regex = /^[0-9]{17,19}$/;
    return regex.test(Id);
}

