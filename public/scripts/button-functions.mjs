import { displayProfileCard } from '../utilities/displayProfileCard.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.search__icon');
    const searchInput = document.querySelector('.search__field');

    searchButton.addEventListener('click', async () => {
        const userId = searchInput.value;
        alert(userId);

        await displayProfileCard(userId);
    });

    const form = document.querySelector('#searchForm');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const userId = searchInput.value;
        alert(userId);

        await displayProfileCard(userId)
    });
});