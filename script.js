const searchForm = document.querySelector('#pesquisaForm');
const search = document.querySelector('#ipesquisa');
const result = document.querySelector('#resultado')

async function searchCity(search) {
    try {
        const city = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${search.value}&limit=5&appid=12493105c51d36dc8befb9f811f0e8f7`)

        const convertedCity = await city.json()

        var lat = convertedCity[0].lat;
        var lon = convertedCity[0].lon;

        const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=12493105c51d36dc8befb9f811f0e8f7&lang=pt_br`)

        const convertedApi = await api.json()

        const currentDate = new Date();

        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = String(currentDate.getFullYear()).slice(-4);

        const fixedDate = `${day}/${month}/${year}`;

        var cityName = convertedApi.name
        var cityTemp = (convertedApi.main.temp - 273).toFixed(0)
        var cityConditions = (convertedApi.weather[0].description).toUpperCase()

        result.innerHTML = `
            <p class="data">${fixedDate}</p>
            <h3 class="cidade">${cityName}</h3>
            <h1 class="temp">${cityTemp}°</h1>
            <p class="status">${cityConditions}</p>
        `
        result.setAttribute('style', 'display: block');

    } catch (error) {
        alert('Cidade não encontrada, tente novamente!')
        search.value = ''
    }
}

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    searchCity(search)
});