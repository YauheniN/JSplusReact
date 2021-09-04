let numberOfFilms = +prompt('Сколько фильмов Вы уже посмотрели?', '');

let personalMovieDb = {
    count : numberOfFilms,
    movies : {},
    actors : {},
    genres : [],
    privat : false
}

personalMovieDb["count"] = numberOfFilms;

for (i = 0; i < 2; i++) {
    oneLastMovie = prompt('Один из последних просмотренных фильмов?', '');
    personalMovieDb.movies[`${oneLastMovie}`] = prompt('На сколько Вы его оцените?', '');
}
 console.log(personalMovieDb);