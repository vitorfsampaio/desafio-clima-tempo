//Code destined to create a new function called eraseButton, wich is responsible for erase the value of the search input 

const searcher = document.querySelector('#ipesquisa');
const eraseButton = document.querySelector('.fa-solid');

eraseButton.addEventListener('click', () => {
    searcher.value = ''
})