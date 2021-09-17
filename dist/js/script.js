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
})