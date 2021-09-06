
let personalMovieDB = {
    count : 0,
    movies : {},
    actors : {},
    genres : [],
    privat : true,
    start : function () {
        while (personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)) {
            personalMovieDB.count = +prompt('Сколько фильмов Вы уже посмотрели?', '');
        }
    },
    rememberMyFilms : function () {
        for (i = 0; i < 2; i++) {
            let markMovie, oneLastMovie;
            do {
                oneLastMovie = prompt(`Один из последних просмотренных фильмов?`, '');
                markMovie = prompt('На сколько Вы его оцените?', '');
            }
            while (oneLastMovie == null || oneLastMovie == '' || oneLastMovie.length > 50 || markMovie == null || markMovie == '');
            personalMovieDB.movies[`${oneLastMovie}`] = markMovie;
        }
    },
    detectPersonalLevel : function () {
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
    },
    showMyDB : function () {
        if (!personalMovieDB.privat) {
            console.log(personalMovieDB);
        }
    },
    writeYourGenres : function () {
        for(let i = 1; i<=3; i++) {
            let oneBestGenres;
            do {
                oneBestGenres = prompt(`Ваш любимый жанр под номером ${i}?`, '');
            }
            while (oneBestGenres == null || oneBestGenres == '' || oneBestGenres > 50);
            personalMovieDB.genres.push(oneBestGenres);
        }
        personalMovieDB["genres"].forEach((item, index) => {
            console.log(`Любимый жанр №${index + 1} - это ${item}`);
        })
    },
    toggleVisibleMyDB : function () {
        if (personalMovieDB.privat) {
            personalMovieDB["privat"] = false;
        } else {
            personalMovieDB["privat"] = true;
        }
    }
}


