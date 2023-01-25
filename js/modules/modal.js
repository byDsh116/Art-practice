function closeModal(modalSelector) {
    modal = document.querySelector(modalSelector),


        modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
    modal = document.querySelector(modalSelector),


        modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if (modalTimerId) {
        clearInterval(modalTimerId)
    }
}

function modal(triggerSelector, modalSelector, modalTimerId)

const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector),
    modalCloseBtn = document.querySelector('[data-close]');

modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId))
})


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


function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal(modalSelector, modalTimerId);
        window.removeEventListener('scroll', showModalByScroll);
    }
}
window.addEventListener('scroll', showModalByScroll);



new MenuCard(
    'https://avatars.mds.yandex.net/get-mpic/4420830/img_id4944321220846543068.jpeg/orig',
    'painting',
    'Живопись',
    'Собрание картин от классики до современного искусства',
    '4',
    '.menu .container',
    'menu__item',


).render()

new MenuCard(
    'https://i.pinimg.com/236x/5e/99/46/5e9946a28f551beb610db5be0b856bc7.jpg',
    'architecture',
    'Архитектура',
    '',
    'im price',
    '.menu .container',
    'menu__item',

).render()


new MenuCard(
    'https://i.pinimg.com/236x/a3/e1/6c/a3e16c1a56c38868b5aac5e654fa9e22.jpg',
    'im art',
    'Арты на основе классики',
    'im descr',
    '4',
    '.menu .container',
    'menu__item',


).render()

export default modal
export { openModal, closeModal }