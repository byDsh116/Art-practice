window.addEventListener('DOMContentLoaded', function () {

    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        })

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i)
                }
            })
        }
    })

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 3000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector,...classes) {
            this.src = src
            this.alt = alt
            this.title = title
            this.descr = descr
            this.price = price
            this.classes = classes
            this.parent = document.querySelector(parentSelector)
            this.transfer = 27 //???
            this.change() //????
        }

        change() {  //?????
            this.price = this.price * this.transfer  //?????
            console.log(this.price)
        }

        render() {
            const element = document.createElement('div')
            if(this.classes.length === 0){
                this.element = 'menu__item'
                element.classList.add(this.element)
            } else{
                this.classes.forEach(className => element.classList.add(className))
            }
            element.innerHTML = `
                        <div class="menu__item">
                            <img src=${this.src} alt=${this.alt}> 
                            <h3 class="menu__item-subtitle">${this.title}</h3>
                            <div class="menu__item-descr">${this.descr}</div>
                            <div class="menu__item-divider"></div>
                            <div class="menu__item-price">
                                <div class="menu__item-cost">Цена:</div>
                                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                            </div>
                        </div>
    `
            this.parent.append(element)
        }
    }

new MenuCard(
    'https://i.pinimg.com/236x/a3/e1/6c/a3e16c1a56c38868b5aac5e654fa9e22.jpg',
    'im art',
    'im title',
    'im descr',
    '4',
    '.menu .container', 
    'menu__item',
    

).render()

new MenuCard(
    'https://i.pinimg.com/236x/a3/e1/6c/a3e16c1a56c38868b5aac5e654fa9e22.jpg',
    'im art',
    'im title',
    'im descr',
    'im price',
    '.menu .container', 
    'menu__item',

).render()





});

// TIMER 

const deadLine = '2022-11-15'

function getTimerRemaining(endTime) {
    let days, hours, minutes, seconds
    const t = Date.parse(endTime) - Date.parse(new Date())

    if (t <= 0) {
        days = 0
        hours = 0
        minutes = 0
        seconds = 0
    } else {
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
    }

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    }
}

function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`
    } else {
        return num
    }
}

function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
        days = document.querySelector('#days'),
        hours = document.querySelector('#hours'),
        minutes = document.querySelector('#minutes'),
        seconds = document.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000)

    updateClock()

    function updateClock() {
        const t = getTimerRemaining(endtime)

        days.innerHTML = getZero(t.days)
        hours.innerHTML = getZero(t.hours)
        minutes.innerHTML = getZero(t.minutes)
        seconds.innerHTML = getZero(t.seconds)

        if (t.total <= 0) {
            clearInterval(timeInterval)
        }

    }
}

setClock('.timer', deadLine)

