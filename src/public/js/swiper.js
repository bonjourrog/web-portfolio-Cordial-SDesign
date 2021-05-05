const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    slidesPerView: 1,
    spaceBetween: 0,
    direction: 'horizontal',
    loop: true,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    breakpoints: {
    // when window width is >= 320px
    1200: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    900: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    800: {
      slidesPerView: 2,
      spaceBetween: 23
    },
  }
  });
