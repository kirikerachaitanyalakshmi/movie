let search = document.querySelector("#search");
search.addEventListener("keyup", (e) => {
    let searchtext = e.targetvalue;
    searchMovies(searchtext);
    let formtext = document.getElementById("divblock");
    formtext.style.display = "none";
    search.classList.add("afterkeypress");
    document.querySelector("#formblock").classList.add("afterkey_formblock");
});
let btn = document.querySelector("#btn");
btn.addEventListener("click", () => {
    window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new SpeechRecognition();
    let p = document.createElement("p");
    recognition.interimResults = true;
    recognition.addEventListener("result", (e) => {
        let transcript = [...e.results]
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join("");
        console.log(transcript);
        search.value = transcript;
    });
    recognition.start();
});
function searchMovies(searchtext) {
    console.log(searchtext);
    const imdbApi = `http://www.omdbapi.com/?s=${searchtext}&apikey=96c45faf`;
    window
        .fetch(imdbApi)
        .then((data) => {
            data
                .json()
                .then((movieData) => {
                    let movies = movieData.Search;
                    let output = [];
                    for (let movie of movies) {
                        console.log(movie);
                        output += `
                        <div>
                              <img src="${movie.Poster}"/>
                              <h1>${movie.Title}</h1>
                               <p>${movie.Year}</p>
                               <a href="http://www.imdb.com/title/${movie.imdbID}/" target="_blanck">movie details</a>
                          </div>
           `;
                    }
                    document.getElementById("template").innerHTML = output;

                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
}