import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import JustValidate from 'just-validate';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import "/src/sass/style.scss";

const burger = document.querySelector(".burger"),
    close = document.querySelector(".header__menu-close"),
    menu = document.querySelector(".header__menu");

burger.addEventListener("click", () => {
    menu.classList.add("header__menu_active");
    document.body.style.overflow = "hidden";
});

close.addEventListener("click", () => {
    menu.classList.remove("header__menu_active");
    document.body.style.overflow = "";
});



// 
document.addEventListener('DOMContentLoaded', () => {
    let swiper = null;

    const initSwiper = () => {
        swiper = new Swiper('.works__slider', {
            slidesPerView: window.innerWidth >= 1200 ? 3 : 1,
            spaceBetween: window.innerWidth >= 1200 ? 5 : 0,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".icon-right-open",
                prevEl: ".icon-left-open",
            },
            observer: true,
            observeParents: true,
            modules: [Navigation, Pagination],
        });
    };

    initSwiper();

    window.addEventListener('resize', () => {
        const shouldBe3 = window.innerWidth >= 1200;
        if ((shouldBe3 && swiper.params.slidesPerView !== 3) ||
            (!shouldBe3 && swiper.params.slidesPerView !== 1)) {
            swiper.destroy(true, true);
            initSwiper();
        }
    });
});




try {
    const tabs = document.querySelectorAll(".catalog__tab");
    const contents = document.querySelectorAll(".catalog__content-item");

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            // Удаляем активный класс у всех табов и контента
            tabs.forEach((t) => t.classList.remove("catalog__tab_active"));
            contents.forEach((c) => (c.style.display = "none"));

            // Добавляем активный класс к нажатому табу и показываем соответствующий контент
            tab.classList.add("catalog__tab_active");
            contents[index].style.display = "flex";
        });
    });

    // Показываем первый контент при загрузке
    contents.forEach((c, i) => (c.style.display = i === 0 ? "flex" : "none"));
} catch (e) { }

// Обратите внимание, что значение block (в двух местах) можно спокойно поменять на flex, если вам это необходимо

try {
    const mainFormValidator = new JustValidate('form');
    mainFormValidator.addField('#name', [
        {
            rule: 'required',
            errorMessage: 'Please fill the name'
        },
        {
            rule: 'minLength',
            value: 2,
            errorMessage: 'Please type at least 2 letters'
        },

    ])
        .addField('#email', [
            {
                rule: 'required',
            },
            {
                rule: 'email',
                errorMessage: 'Please type your email'
            },

        ])
        .addField('#question', [
            {
                rule: 'required',
            },
            {
                rule: 'minLength',
                value: 5,
            },

        ], {
            errorsContainer: document
                .querySelector('#question')
                .parentElement.querySelector('.error-message'),
        })
        .addField('#checkbox', [
            {
                rule: 'required',
            },

        ],
            {
                errorsContainer: document
                    .querySelector('#checkbox')
                    .parentElement.parentElement.querySelector('.checkbox-error-message'),
            }
        )
        .onSuccess((event) => {
            const form = event.currentTarget;
            const formData = new FormData(form);

            fetch('https://httpbin.org/post', {
                method: "POST",
                body: formData,
            })
                .then(res => res.json())
                .then(data => {
                    console.log('success', data);
                    form.reset();
                });
        });
}
catch (e) {

}

try {
    const footerFormValidator = new JustValidate('.footer__form');
    footerFormValidator.addField('.footer__input', [
        {
            rule: 'required',
        },
        {
            rule: 'email',
            errorMessage: 'Please type your email'
        },
    ], {
        errorsContainer: document
            .querySelector('.footer__input')
            .parentElement.querySelector('.error-message'),
    }
    )
        .addField('.footer__checkbox', [
            {
                rule: 'required',
            }

        ],
            {
                errorsContainer: document
                    .querySelector('.footer__checkbox ')
                    .parentElement.parentElement.querySelector('.checkbox-error-message'),
            })
        .onSuccess((event) => {
            const footerForm = event.currentTarget;
            const footerFormData = new FormData(footerForm);

            fetch('https://httpbin.org/post', {
                method: "POST",
                body: footerForm,
            })
                .then(res => res.json())
                .then(data => {
                    console.log('success', data);
                    footerForm.reset();
                });
        });
}

catch (e) {

}
