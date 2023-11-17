import { fetchRaiderStats } from "../utilities/fetchRaiderStats.mjs";
import { fetchDiscordInfo } from '../utilities/fetchDiscordInfo.mjs';
import config from '../../config.json' assert {type: 'json'};

export async function displayProfileCard(userId) {

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

    const completeMarkup = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>PlayPal | Raider Stats</title>
        <link rel="apple-touch-icon" sizes="180x180" href="./assets/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="./assets/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="./assets/favicon-16x16.png">
        <link rel="manifest" href="./assets/site.webmanifest">
        <link rel="stylesheet" href="../styles/bootstrap.css">
        <link rel="stylesheet" href="../styles/style.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css">
    </head>
    <body>
    <div class="card" style="width: 18rem;">
    ${cardWithModalMarkup}
    </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
            crossorigin="anonymous"></script>
    </body>    
    </html>`
    return completeMarkup;
}