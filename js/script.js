let numberOfFilms;
let markMovie, oneLastMovie;
let personalMovieDB = {
    count : numberOfFilms,
    movies : {},
    actors : {},
    genres : [],
    privat : false
}

function start() {
    while (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)) {
        numberOfFilms = +prompt('Сколько фильмов Вы уже посмотрели?', '');
    }
    personalMovieDB["count"] = numberOfFilms;    
}

function rememberMyFilms() {
    for (i = 0; i < 2; i++) {
        do {
            oneLastMovie = prompt(`Один из последних просмотренных фильмов?`, '');
            markMovie = prompt('На сколько Вы его оцените?', '');
        }
        while (oneLastMovie == null || oneLastMovie == '' || oneLastMovie.length > 50 || markMovie == null || markMovie == '');
        personalMovieDB.movies[`${oneLastMovie}`] = markMovie;
    }
}

function detectPersonalLevel() {
    if (personalMovieDB['count'] >=0 && personalMovieDB['count'] < 10) {
        alert('Просмотрено довольно мало фильмов');}
    else if (personalMovieDB['count'] >= 10 && personalMovieDB['count'] < 30) {
        alert('Вы классический зритель');}
    else if (personalMovieDB['count'] >=30) {
        alert('Вы киноман');
    }
    else {
        alert('Произошла ошибка');
    } 
}

function showMyDB() {
    if (!personalMovieDB.privat) {
        console.log(personalMovieDB);
    }
}

function writeYourGenres() {
    for(let i = 1; i<=3; i++) {
        let oneBestGenres;
        do {
            oneBestGenres = prompt(`Ваш любимый жанр под номером ${i}?`, '');
        }
        while (oneBestGenres == null || oneBestGenres == '' || oneBestGenres > 50);
        personalMovieDB.genres.push(oneBestGenres);
    }
}

start();
rememberMyFilms();
detectPersonalLevel();
writeYourGenres();
showMyDB();
