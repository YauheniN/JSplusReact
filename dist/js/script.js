window.addEventListener('DOMContentLoaded', () =>{

    //Tab
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            //item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }  
    
    function showTabContent(i = 0) {
        // tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader_item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    console.log(i);
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })

    //Timer
    const stopTimerDate = '2021-09-27';

    function getRemainingTime(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()),
              days = Math.floor( t / (1000 * 60 * 60 * 24) ),
              hours = Math.floor( t / (1000 * 60 * 60) % 24 ),
              minutes = Math.floor( t / (1000 * 60) % 60 ),
              seconds = Math.floor( t / 1000 % 60);

        return {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        }      
    }

    function addZero(num) {
        if (num >=0 && num < 10){
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(endTime) {
        const timer = document.querySelector(".timer"),
              days = timer.querySelector("#days"),
              hours = timer.querySelector("#hours"),
              minutes = document.querySelector("#minutes"),
              seconds = document.querySelector("#seconds"),
              setTimer = setInterval(updateClock, 1000);

        updateClock();      

        function updateClock() {
            const t = getRemainingTime(endTime);
            days.innerHTML = addZero(t.days);
            hours.innerHTML = addZero(t.hours);
            minutes.innerHTML = addZero(t.minutes);
            seconds.innerHTML = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(setTimer);
            }
        }      
    }

    setClock(stopTimerDate);

    //modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        //   modalClose = document.querySelector('[data-close]'),
          modal = document.querySelector('.modal');

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');  
        document.body.style.overflow ='';  
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimeoutID);
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', openModal);
    })

    // modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal  || event.target.getAttribute('data-close' == 'close')) {
            closeModal(); 
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    })

    const modalTimeoutID = setTimeout(openModal,15000);
   
    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    //startClass

    class MenuCard {
        constructor (src, alt, title, desc, price, selectorParent, ...classes) {
            this.src  = src;
            this.alt = alt;
            this.title = title;
            this.desc = desc;
            this.price = price;
            this.selectorParent = document.querySelector(selectorParent);
            this.transfer = 27;
            this.classes = classes;
            this.changeCurrency();
        }

        changeCurrency() {
            this.price = this.price * this.transfer;
        }  

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(elementClass => element.classList.add(elementClass));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.desc}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.selectorParent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status code equal ${res.status}`);
        }
        return await res.json();
    };

    // getResource('http://localhost:3000/menu')
    //     .then((data) => {
    //         data.forEach( ({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

     axios.get('http://localhost:3000/menu')
      .then((data) => {
        console.log(data);  
        data.data.forEach( ({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });   

    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));
        
    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');
    //         element.classList.add('menu');
    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;

    //         document.querySelector('.menu .container').append(element);
    //     })
    // }    

    // new MenuCard(
    //     'img/tabs/vegy.jpg',
    //     'vegy',
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     '.menu .container'
    //     ).render();

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Мы скоро с Вами свяжемся',
        error: 'Что-то пошло не так'
    };

    forms.forEach(item => {
                bindPostDataForm(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    }
    
    function bindPostDataForm (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;    
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');
            // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
            // const object = {};
            // formData.forEach((value, key) => {
            //     object[key] = value;
            // });
            // request.send(JSON.stringify(object));
            // console.log(JSON.stringify(object));

            // fetch('server.php', {
            //     method: 'POST',
            //     headers: {
            //         'Content-type': 'application/json'
            //     },
            //     body: JSON.stringify(object)
            // })
            postData('http://localhost:3000/requests', json)
            // .then(data => data.text())
                .then(data => {
                        console.log(data);
                        showThanksmodal(message.success);
                        statusMessage.remove();
                }).catch(() => {
                    showThanksmodal(message.error);
                }).finally(() => {
                    form.reset();
                })

            // request.addEventListener('load', () => {
            //     if (request.status === 200){
            //         console.log(request.response);
            //         showThanksmodal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksmodal(message.error);
            //     }
            // });
        })
    }

    function showThanksmodal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');

        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class ='modal__content'>
                <div class="modal__close" data-close="">×</div>
                <div class='modal__title'>${message}</div>
            </div>        
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
})