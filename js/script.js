import tabs from './modules/tabs'
import cards from './modules/cards'
import forms from './modules/forms'
import modal, { openModal } from './modules/modal'
import timer from './modules/timer'
import slider from './modules/slider'

window.addEventListener('DOMContentLoaded', function () {
    const modalTimerId = setTimeout(() => openModal('.modal'), 3000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active')
    cards()
    forms('form', modalTimerId)
    modal('[data-modal]', '.modal', modalTimerId)
    timer('.timer', '2023-02-25')
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner' ,


    })
})