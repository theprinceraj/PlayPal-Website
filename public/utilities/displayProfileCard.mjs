import { fetchRaiderStats } from "../utilities/fetchRaiderStats.mjs";
import { fetchDiscordInfo } from '../utilities/fetchDiscordInfo.mjs';
import config from '../../config.json' assert {type: 'json'};

export default async function displayProfileCard(userId) {

    const [avatarURL, discordUsername] = await fetchDiscordInfo(userId, process.env.discordBotToken || config.discordBotToken);
    const raiderData = await fetchRaiderStats(userId);

    const cardWithModalMarkup = `<img class="card-img-top"
    src="${avatarURL}"
    alt="Discord Profile Image">
<div class="card-body">
    <h5 class="card-title">${discordUsername}</h5>
    <p class="card-text">🛡️ Raider Stats</p>
</div>
<ul class="list-group list-group-flush">
    <li class="list-group-item">🪄 <b>Elixir Gained</b>: ${raiderData.elixirGained}</li>
    <li class="list-group-item">⚔️ <b>Raids</b>: Total - ${raiderData.raids.total}, Won - ${raiderData.raids.won}, Lost - ${raiderData.raids.lost}</li>
    <li class="list-group-item">📊 <b>Experience</b>: Total - ${raiderData.xp.total}, Highest - ${raiderData.xp.highest}, Lowest - ${raiderData.xp.lowest}</li>
</ul>
<div class="card-body">
    <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
        data-bs-target="#moreDetailsModal">More</button>
    <button onClick="window.location.href = 'https://discord.com/users/${userId}';" type="button" class="btn btn-outline-secondary">Message</button>
</div>

<div class="modal fade" id="moreDetailsModal" tabindex="-1" aria-labelledby="moreDetailsModalLabel"
aria-hidden="true">
<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">More Details</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p><b>🧾 Last 5 Raids Xp:</b></p>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${raiderData.xp.last5Raids[0]}</li>
                <li class="list-group-item">${raiderData.xp.last5Raids[1]}</li>
                <li class="list-group-item">${raiderData.xp.last5Raids[2]}</li>
                <li class="list-group-item">${raiderData.xp.last5Raids[3]}</li>
                <li class="list-group-item">${raiderData.xp.last5Raids[4]}</li>
            </ul>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
    </div>
</div>
</div>`;

    return cardWithModalMarkup;
}