const pesquisaForm = document.querySelector('#pesquisaForm');
const pesquisa = document.querySelector('#ipesquisa');
const resultado = document.querySelector('#resultado')

async function BuscaCidade(pesquisa) {
    try {
        const cidade = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${pesquisa.value}&limit=5&appid=12493105c51d36dc8befb9f811f0e8f7`)

        const cidadeConvertida = await cidade.json()

        var lugar = cidadeConvertida[0].name;

        var latitudeDoLugar = cidadeConvertida[0].lat;
        var longitudeDoLugar = cidadeConvertida[0].lon;

        const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitudeDoLugar}&lon=${longitudeDoLugar}&appid=12493105c51d36dc8befb9f811f0e8f7&lang=pt_br`)

        const apiConvertida = await api.json()

        const dataAtual = new Date();

        const dia = String(dataAtual.getDate()).padStart(2, '0');
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        const ano = String(dataAtual.getFullYear()).slice(-4);
        
        const dataFormatada = `${dia}/${mes}/${ano}`;

        var nomeDaCidade = apiConvertida.name
        var temperaturaDaCidade = (apiConvertida.main.temp - 273).toFixed(0)
        var condicoesDaCidade = (apiConvertida.weather[0].description).toUpperCase()
        
        resultado.innerHTML = `
            <p class="data">${dataFormatada}</p>
            <h3 class="cidade">${nomeDaCidade}</h3>
            <h1 class="temp">${temperaturaDaCidade}°</h1>
            <p class="status">${condicoesDaCidade}</p>
        `
        resultado.setAttribute('style', 'display: block');

    } catch (error) {
        alert('Cidade não encontrada, tente novamente!')
        pesquisa.value = ''
    }
}

pesquisaForm.addEventListener('submit', (event) => {
    event.preventDefault();
    BuscaCidade(pesquisa)
});