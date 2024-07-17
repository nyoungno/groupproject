document.addEventListener('DOMContentLoaded', function () {
    new Swiper('.indexSwiperBox', {
        direction: 'horizontal',
        loop: true,
        speed: 800,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        on: {
            slideChangeTransitionStart: function () {
                const activeSlide = this.slides[this.activeIndex];
                const animatedElements = activeSlide.querySelectorAll('.animate__animated');
                animatedElements.forEach(el => {
                    el.classList.remove('animate__fadeInDown', 'animate__fadeInUp');
                    void el.offsetWidth; // 리플로우 트리거
                    el.classList.add(el.classList.contains('animate__fadeInDown') ? 'animate__fadeInDown' : 'animate__fadeInUp');
                });
            }
        }
    });
});