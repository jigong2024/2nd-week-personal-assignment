// 본인의 API 키를 넣어주셔야 합니다.
const API_KEY = "8734eaecc60720874a9c1c5b4590a01f";
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

fetch(URL)
  .then((response) => response.json())
  .then((data) => {
    const movies = data.results;
    const movieContainer = document.getElementById("movie-container");
    movies.forEach((movie) => {
      const card = createMovieCard(movie);
      movieContainer.appendChild(card);
    });
  })
  .catch((error) => console.error("Error:", error));

function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>${movie.overview}</p>
      <span>Rating: ${movie.vote_average}</span>
    `;
  card.addEventListener("click", () => alert(`Movie ID: ${movie.id}`));
  return card;
}

// function createMovieCard(movie) {
//   const card = document.createElement('div');
//   card.className = 'movie-card';
//   card.innerHTML = `
//     <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
//     <h3>${movie.title}</h3>
//     <p>${movie.overview}</p>
//     <span>Rating: ${movie.vote_average}</span>
//   `;
//   card.addEventListener('click', () => alert(`Movie ID: ${movie.id}`));
//   return card;
// }

// 검색 기능 구현
document.getElementById("search-button").addEventListener("click", () => {
  const query = document.getElementById("search-input").value.toLowerCase();
  const movieCards = document.querySelectorAll(".movie-card");
  movieCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    // console.log(title);
    if (title.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// 스크롤이벤트
window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollPercentage = (scrollTop / scrollHeight) * 100;

  document.getElementById("progress-bar").style.width = scrollPercentage + "%";
  document.getElementById("progress-percent").textContent =
    Math.round(scrollPercentage) + "%";
});
