"use strict";

const API_KEY = "api_key=df963f294602456b736580035f01a3b3";
const BASEURL = "https://api.themoviedb.org/3";
const API_URL = BASEURL + "/trending/all/day?" + API_KEY;
const SEARCH_URL = BASEURL + "/search/movie?" + API_KEY;

const heroElem = document.getElementById("hero");
const formElem = document.getElementById("form");
const searchElem = document.getElementById("search");

const getColor = (vote_average) => {
  if (vote_average >= 8) {
    return "green";
  } else if (vote_average >= 5) {
    return "orange";
  } else {
    return "red";
  }
};

const displayMovies = (movies) => {
  heroElem.innerHTML = "";
  movies.map((movie) => {
    const { title, poster_path, vote_average, overview, name } = movie;
    const movieElem = document.createElement("div");
    movieElem.classList.add("movie-card");
    movieElem.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${
      title || name
    }" />
        <div class="movie-desc">
          <h3>${title || name}</h3>
          <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="movie-overview">
          <h3>Overview</h3>

          ${overview}
        </div>
    `;
    heroElem.appendChild(movieElem);
  });
};

const getMovies = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      displayMovies(data.results);
    });
};
getMovies(API_URL);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchedItem = searchElem.value;
  if (searchedItem) {
    getMovies(SEARCH_URL + "&query=" + searchedItem);
  } else {
    getMovies(API_URL);
  }
});
