const messageBtn = document.querySelector(".card-body .btn-outline-secondary");
const moreBtn = document.querySelector(".card-body .btn-outline-primary");

messageBtn.addEventListener('click', () => {
    // Direct to the given link
    window.location.href = "https://discord.com/users/564327207133249536";
});

const searchButton = document.querySelector('.search__icon');
const searchInput = document.querySelector('.search__field');
searchButton.addEventListener('click', () => {
    const inputValue = searchInput.value;
    alert(inputValue);
});