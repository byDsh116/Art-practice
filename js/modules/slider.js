function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
    let slideIndex = 1;
    let offset = 0

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`
        current.textContent = `0${slideIndex}`

    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex
    }

    slidesField.style.width = 100 * slides.length + '%'
    slidesField.style.display = 'flex'
    slidesField.style.transition = '0.5s all'

    slidesWrapper.style.overflow = 'hidden'

    slides.forEach(slide => {
        slide.style.width = width
    })

    slider.style.position = 'relative'

    const indicators = document.createElement('ol'),
        dots = []
    indicators.classList.add('carousel-indicators')
    slider.append(indicators)

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li')
        dot.setAttribute('data-slide-to', i + 1)
        dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `
        if (i == 0) { // ограничить доступ к 0му элементу
            dot.style.opacity = 1
        }
        indicators.append(dot)
        dots.push(dot)
    }

    const getOffset = (isForward) => {

        if (isForward) {
            return +width.replace(/\D/g, '') * (slides.length - 1)
        } else {
            return +width.replace(/\D/g, '')
        }
    }

    next.addEventListener('click', () => {
        if (offset == (getOffset(true))) {
            offset = 0
        } else {
            offset += getOffset(false)
        }

        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex == slides.length) {
            slideIndex = 1
        } else {
            slideIndex++
        }

        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex
        }

        dots.forEach(dot => dot.style.opacity = '.5')
        dots[slideIndex - 1].style.opacity = 1
    })

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = getOffset(true)
        } else {
            offset -= getOffset(false)
        }

        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex == 1) {
            slideIndex = slides.length
        } else {
            slideIndex--
        }


        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex
        }
        dots.forEach(dot => dot.style.opacity = '.5')
        dots[slideIndex - 1].style.opacity = 1
    })

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to')
            slideIndex = slideTo
            offset = getOffset(true)

            slidesField.style.transform = `translateX(-${offset}px)`

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`
            } else {
                current.textContent = slideIndex
            }
            dots.forEach(dot => dot.style.opacity = '.5')
            dots[slideIndex - 1].style.opacity = 1

        })


    })
}

export default slider
