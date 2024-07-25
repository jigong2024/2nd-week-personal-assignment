const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzM0ZWFlY2M2MDcyMDg3NGE5YzFjNWI0NTkwYTAxZiIsIm5iZiI6MTcyMTcyMDA5MS4zNjg5NjgsInN1YiI6IjY2OWY1YTc4ZjE3YTkxMjZkMjRjNzllOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6xinT6ON5bbcF1rtCI91rJqxJgHiMJjM9wNYlDXrbyE'
  }
};


function getDate() {
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
   const movies = response.results
   displayMovies(movies);
  })
  .catch(err => console.error(err));

}

function displayMovies(movies) {
  console.log(movies);
  const container = document.getElementById('movie-container');
  container.innerHTML = '';

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"/>
      <h3>${movie.title}</h3>
      <p>${movie.overview}</p>
      <p>${movie.vote_average}</p> -->
    `;
    container.appendChild(card);
  });
}



window.onload = getDate;

