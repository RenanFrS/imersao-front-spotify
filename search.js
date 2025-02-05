const resultArtist = document.getElementById("result-artist");
const playlistContainer = document.getElementById("result-playlists");
const searchInput = document.getElementById("search-input");

// Função que faz uma requisição para a API local buscando artistas cujo nome contenha o termo pesquisado
function requestApi(searchTerm) {
  fetch(`http://localhost:3000/artists?name_like=${searchTerm}`) // Faz a requisição para a API fake (JSON Server)
    .then((response) => response.json()) // Converte a resposta para JSON
    .then((results) => displayResults(results)); // Chama a função para exibir os resultados
}

// Função que exibe os resultados na interface
function displayResults(results) {
  hidePlaylists(); // Oculta a lista de playlists ao exibir os resultados do artista
  const artistImage = document.getElementById("artist-img");
  const artistName = document.getElementById("artist-name");

  results.forEach((element) => {
    artistImage.src = element.urlImg; // Define a imagem do artista com a URL retornada pela API
    artistName.innerText = element.name; // Define o nome do artista com o valor retornado pela API
  });

  resultArtist.classList.remove("hidden"); // Exibe a seção do artista
}

// Função que oculta a seção de playlists
function hidePlaylists() {
  playlistContainer.classList.add("hidden");
}

// Evento acionado ao digitar no campo de busca
searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase(); // Obtém o valor do input e transforma em minúsculas
  if (searchTerm === "") { 
    // Se o campo de busca estiver vazio, exibe as playlists e oculta a seção de artista
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }
  requestApi(searchTerm); // Chama a API para buscar artistas correspondentes
});
