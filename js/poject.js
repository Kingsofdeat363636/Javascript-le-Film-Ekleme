const form = document.getElementById("films-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
// UI objesi start 
const ui = new UI();

// storage objesi üret
const storage = new Storage();

// All eventleri Loading
eventListeners();

function eventListeners() {
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function() {

        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);



    });
    cardbody.addEventListener("click", deleteFilm);
}

function addFilm(e) {
    const title = titleElement.value;
    const url = urlElement.value;
    const director = directorElement.value;


    if (director === "" || title === "" || url === "") {
        ui.displayMessages("Boş Bırakmayınız.", "danger");
    } else {
        // New Film
        const newFilm = new Film(title, director, url);

        ui.addFilmToUI(newFilm); //Arayüz Film Ekleme
        storage.addFilmToStorage(newFilm); //storage!a film ekleme

        ui.displayMessages("Film Başarıyla Eklendi.", "success");
    }

    ui.clearInputs(titleElement, urlElement, directorElement);
    e.preventDefault();
}

function deleteFilm(e) {
    if (e.target.id === "delete-film") {
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("Silme İşlemi Başarılıdr...", "success");
    }
}