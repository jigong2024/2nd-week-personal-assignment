// API
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

// 카드 붙이기
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

// 검색
document
  .getElementById("search-button")
  .addEventListener("click", performSearch);

function performSearch() {
  const searchInput = document.getElementById("search-input");
  const query = searchInput.value.trim().toLowerCase();
  const movieCards = document.querySelectorAll(".movie-card");

  // 유효성 검사
  if (query === "") {
    alert("검색어를 입력해주세요.");
    searchInput.focus();
    return;
  }

  let resultCount = 0;

  movieCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();

    if (title.includes(query)) {
      card.style.display = "block";
      resultCount++;
    } else {
      card.style.display = "none";
    }
  });

  // 검색 결과 확인
  if (resultCount === 0) {
    alert("검색 결과가 없습니다.");
    resetDisplay(movieCards);
  }
}

function resetDisplay(cards) {
  cards.forEach((card) => (card.style.display = "block"));
}

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

// 검색 입력란 깜박깜박
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector("#search-input");
  searchInput.focus();
});
