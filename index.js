document.addEventListener('DOMContentLoaded', () => {
  const filmsList = document.querySelector('.films');
  const movieDetails = document.querySelector('.movie-details');
  const movieTitle = document.getElementById('movie-title');
  const movieRuntime = document.getElementById('movie-runtime');
  const movieShowtime = document.getElementById('movie-showtime');
  const movieAvailableTickets = document.getElementById('movie-available-tickets');
  const buyTicketButton = document.getElementById('buy-ticket');
  const moviePoster = document.getElementById('movie-poster');

  fetch('http://localhost:3000/films')
    .then(response => response.json())
    .then(data => {
      moviePoster.src = data.poster;
      movieTitle.textContent = data.title;
      movieRuntime.textContent = data.runtime;
      movieShowtime.textContent = data.showtime;
      movieAvailableTickets.textContent = data.capacity - data.tickets_sold;
    });

  fetch('http://localhost:3000/films')
    .then(response => response.json())
    .then(data => {
      data.forEach(film => {
        const li = document.createElement('li');
        li.classList.add('film-item');
        li.textContent = film.title;
        filmsList.appendChild(li);
      });
    });

  filmsList.addEventListener('click', event => {
    const filmTitle = event.target.textContent;
    fetch('http://localhost:3000/films')
      .then(response => response.json())
      .then(data => {
        const film = data.find(film => film.title === filmTitle);
        if (film) {
          moviePoster.src = film.poster;
          movieTitle.textContent = film.title;
          movieRuntime.textContent = film.runtime;
          movieShowtime.textContent = film.showtime;
          movieAvailableTickets.textContent = film.capacity - film.tickets_sold;
        }
      });
  });

  buyTicketButton.addEventListener('click', () => {
    const availableTickets = parseInt(movieAvailableTickets.textContent);
    if (availableTickets > 0) {
      movieAvailableTickets.textContent = availableTickets - 1;
    }
  });
});