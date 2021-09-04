let numberOfFilms = +prompt('Сколько фильмов Вы уже посмотрели?', '');
let markMovie, oneLastMovie;
let personalMovieDB = {
    count : numberOfFilms,
    movies : {},
    actors : {},
    genres : [],
    privat : false
}

personalMovieDB["count"] = numberOfFilms;

for (i = 0; i < 2; i++) {
    do {
        oneLastMovie = prompt(`Один из последних просмотренных фильмов?`, '');
        markMovie = prompt('На сколько Вы его оцените?', '');
    }
    while (oneLastMovie == null || oneLastMovie == '' || oneLastMovie.length > 50 || markMovie == null || markMovie == '');

    personalMovieDB.movies[`${oneLastMovie}`] = markMovie;
}

if (personalMovieDB['count'] >=0 && personalMovieDb['count'] < 10) {
    alert('Просмотрено довольно мало фильмов');}
else if (personalMovieDB['count'] >= 10 && personalMovieDb['count'] < 30) {
    alert('Вы классический зритель');}
else if (personalMovieDB['count'] >=30) {
    alert('Вы киноман');
}
else {
    alert('Произошла ошибка');
} 

 console.log(personalMovieDb);