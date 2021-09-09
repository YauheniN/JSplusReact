/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv img'),
          genre = document.querySelector('.promo__genre'),
          imgBack = document.querySelector('.promo__bg'),
          movieList = document.querySelector('.promo__interactive-list'),
          btn = document.querySelector('button'),
          addForm = document.querySelector('form.add'),
          inputMovie = addForm.querySelector('.adding__input'),
          checkbox = addForm.querySelector('[type="checkbox"]'),
          del = document.querySelectorAll('.delete');

    addForm.addEventListener('submit', function (event) {
        event.preventDefault();
        let newMovie = inputMovie.value;
        const favorite = checkbox.checked;

        if (newMovie) {
            if (newMovie.length > 21) {
                newMovie = newMovie.slice(0, 21) + '...';
            }

            if (favorite) {
                console.log("Add favorite film")
            }
    
            movieDB.movies.push(newMovie);
            sortArr(movieDB.movies);
            createMovieList(movieDB.movies, movieList);
        }

        event.target.reset();
    });

    const sortArr = (arr) => {
        arr.sort();}
    
    function createMovieList(films, parentElement) {
        parentElement.innerHTML = '';
        sortArr(films);

        films.forEach(function (film, key) {
            parentElement.innerHTML += `
            <li class="promo__interactive-item">${key + 1}. ${film}
                <div class="delete"></div>
            </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, key) =>{
            btn.addEventListener('click', function (event) {
                btn.parentElement.remove();
                movieDB.movies.splice(key, 1);
                createMovieList(films, parentElement);
            })   
        })
    }    

    const delAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    const makeChange = () => {
        genre.textContent = 'драма';
        imgBack.style.backgroundImage = 'url("../img/bg.jpg")';
    }

    makeChange();
    createMovieList(movieDB.movies, movieList);
    delAdv(adv);
    
})



