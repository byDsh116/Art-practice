document.addEventListener('DOMContentLoaded', () => {
    class CookieConsent {
        constructor({ popup, btnConfirm, btnCancel, activeClass = '' } = {}) {
            this.popup = document.querySelector(popup)
            this.btnConfirm = document.querySelector(btnConfirm)
            this.btnCancel = document.querySelector(btnCancel)
            this.activeClass = activeClass
            this.consentPropertyType = 'site_consent'
        }

        getItem = (key) => {
            const cookies = document.cookie
                .split(';')
                .map(cookie => cookie.split('='))
                .reduce((acc, [key, value]) => ({
                    ...acc,
                    [key.trim()]: value
                }), {})

            return cookies[key]
        }

        setItem = (key, value) => {
            document.cookie = `${key}=${value};expires=Sun, 10 Jul 2023 18:00:00 GMT`
        }

        hasConsented = () => {
            if (this.getItem(this.consentPropertyType) === 'true') {
                return true;
            } else {
                return false;
            }
        }

        changeStatus = (prop) => {
            this.setItem(this.consentPropertyType, prop)
            if (this.hasConsented()) {
                myScripts()
            }
        }

        /// ниже упростить код
        bindTriggers = () => {
            this.btnConfirm.addEventListener('click', () => {
                this.changeStatus(true)
                this.popup.classList.remove(this.activeClass)
            })

            this.btnCancel.addEventListener('click', () => {
                this.changeStatus(false)
                this.popup.classList.remove(this.activeClass)
            })
        }
        init = () => {
            try {
                if (this.hasConsented()) {
                    myScripts()
                } else {
                    this.popup.classList.add(this.activeClass)
                }

                this.bindTriggers()
            } catch (e) {
                console.error('Переданы не все данные')
            }
        }
    }

    new CookieConsent({
        activeClass: 'popup_active',
        popup: '.popup',
        btnConfirm: '[data-confirm]',
        btnCancel: '[data-cancel]'
    }).init()
    function myScripts() {
        console.log('Loading...')
    }
})
