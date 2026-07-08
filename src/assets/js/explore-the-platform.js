// Your custom JavaScript
$(document).ready(function () {

  // Smooth mobile menu handling
  // Close mobile menu when clicking outside
  $(document).click(function (e) {
    if (!$(e.target).closest('.navbar').length) {
      $('.navbar-collapse').collapse('hide');
    }
  });

  // Close mobile menu when clicking a link
  $('.navbar-nav>li>a').on('click', function () {
    $('.navbar-collapse').collapse('hide');
  });


  // Custom play button logic - load video on click
  document.querySelectorAll('.video-wrapper').forEach(wrapper => {
    const playBtn = wrapper.querySelector('.video-play-btn');
    if (!playBtn) return;
    const thumbnail = wrapper.querySelector('.video-thumbnail');
    const videoSrc = wrapper.getAttribute('data-video-src');

    playBtn.addEventListener('click', () => {
      // Create video element
      const video = document.createElement('video');
      video.setAttribute('controls', '');
      video.style.width = '100%';

      // Set height based on screen size
      if (window.innerWidth <= 768) {
        video.style.height = '300px';
      } else {
        video.style.height = '500px';
      }

      video.style.objectFit = 'cover';
      video.style.display = 'block';

      // Create source element
      const source = document.createElement('source');
      source.setAttribute('src', videoSrc);
      source.setAttribute('type', 'video/mp4');

      video.appendChild(source);
      wrapper.appendChild(video);

      // Hide thumbnail and play button
      wrapper.classList.add('playing');

      // Play the video
      video.play();

      // Handle pause/ended events
      video.addEventListener('pause', () => {
        // Optionally remove video and show thumbnail again
        // For now, keep video player visible
      });

      video.addEventListener('ended', () => {
        // Optionally remove video and show thumbnail again
        // For now, keep video player visible
      });
    });
  });

  // Testimonials Video Swiper
  if (document.querySelector('.testimonial-video-slider')) {
    const testimonialVideoSwiper = new Swiper('.testimonial-video-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: false,
      navigation: {
        nextEl: '.testimonial-video-navigation .swiper-button-next',
        prevEl: '.testimonial-video-navigation .swiper-button-prev',
      },
      // autoplay: {
      //     delay: 5000,
      //     disableOnInteraction: false,
      // },

      pagination: {
        el: '.testimonial-video-pagination',
        clickable: true,
      },
      breakpoints: {
        1200: {
          slidesPerView: 1,
          spaceBetween: 100
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 100
        }
      }
    });
  }

  if (document.querySelector('.features-one-slider')) {
    var featuresOneSwiper = new Swiper(".features-one-slider", {
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: false,
      loop: false,
      navigation: {
        nextEl: '.features-one-navigation .swiper-button-next',
        prevEl: '.features-one-navigation .swiper-button-prev',
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      touchEventsTarget: 'container',
      simulateTouch: true,
      grabCursor: true,
      breakpoints: {
        0: { // mobile
          slidesPerView: 1,
          spaceBetween: 15,
        },
        768: { // tablet
          slidesPerView: 1,
          spaceBetween: 20,
        },
        992: { // desktop - show partial next slide
          slidesPerView: 1.6,
          spaceBetween: 24,
        },
      },
    });
  }

  // Only initialize features-two swiper if element exists
  if (document.querySelector('.features-two-slider')) {
    var featuresTwoSwiper = new Swiper(".features-two-slider", {
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: false,
      loop: false,
      navigation: {
        nextEl: '.features-two-navigation .swiper-button-next',
        prevEl: '.features-two-navigation .swiper-button-prev',
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      touchEventsTarget: 'container',
      simulateTouch: true,
      grabCursor: true,
      breakpoints: {
        0: { // mobile
          slidesPerView: 1,
          spaceBetween: 15,
        },
        768: { // tablet
          slidesPerView: 1,
          spaceBetween: 20,
        },
        992: { // desktop - show partial next slide
          slidesPerView: 1.6,
          spaceBetween: 24,
        },
      },
    });
  }

  if (document.querySelector('.features-sales-slider')) {
    var featuresSalesSwiper = new Swiper(".features-sales-slider", {
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: false,
      loop: false,
      navigation: {
        nextEl: '.features-sales-navigation .swiper-button-next',
        prevEl: '.features-sales-navigation .swiper-button-prev',
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      touchEventsTarget: 'container',
      simulateTouch: true,
      grabCursor: true,
      breakpoints: {
        0: { // mobile
          slidesPerView: 1,
          spaceBetween: 15,
        },
        768: { // tablet
          slidesPerView: 1,
          spaceBetween: 20,
        },
        992: { // desktop - show partial next slide
          slidesPerView: 1.6,
          spaceBetween: 24,
        },
      },
    });
  }

  if (document.querySelector('.features-support-slider')) {
    var featuresSupportSwiper = new Swiper(".features-support-slider", {
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: false,
      loop: false,
      navigation: {
        nextEl: '.features-support-navigation .swiper-button-next',
        prevEl: '.features-support-navigation .swiper-button-prev',
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      touchEventsTarget: 'container',
      simulateTouch: true,
      grabCursor: true,
      breakpoints: {
        0: { // mobile
          slidesPerView: 1,
          spaceBetween: 15,
        },
        768: { // tablet
          slidesPerView: 1,
          spaceBetween: 20,
        },
        992: { // desktop - show partial next slide
          slidesPerView: 1.6,
          spaceBetween: 24,
        },
      },
    });
  }

  if (document.querySelector('.features-data-slider')) {
    var featuresDataSwiper = new Swiper(".features-data-slider", {
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: false,
      loop: false,
      navigation: {
        nextEl: '.features-data-navigation .swiper-button-next',
        prevEl: '.features-data-navigation .swiper-button-prev',
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      touchEventsTarget: 'container',
      simulateTouch: true,
      grabCursor: true,
      breakpoints: {
        0: { // mobile
          slidesPerView: 1,
          spaceBetween: 15,
        },
        768: { // tablet
          slidesPerView: 1,
          spaceBetween: 20,
        },
        992: { // desktop - show partial next slide
          slidesPerView: 1.6,
          spaceBetween: 24,
        },
      },
    });
  }

  // Mobile-only Tinder-style card swiper
  var proofMobileSwiper = null;
  
  // Destroy existing instance if it exists (hot reload support)
  if (window.proofMobileSwiperInstance) {
    try {
      window.proofMobileSwiperInstance.destroy(true, true);
    } catch (e) {}
  }
  
  // Only initialize if .proofSwiper element exists
  if (document.querySelector('.proofSwiper')) {
    try {
      // Tinder-like creative effect with proper centering
      proofMobileSwiper = new Swiper(".proofSwiper", {
        effect: 'creative',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 1,
        speed: 500,
        creativeEffect: {
          prev: {
            translate: ['-100%', 0, 0],
            rotate: [0, 0, -15],
            opacity: 0,
          },
          next: {
            translate: ['100%', 0, 0],
            rotate: [0, 0, 15],
            opacity: 0,
          },
        },
        navigation: {
          nextEl: '.proof-mobile-navigation .swiper-button-next',
          prevEl: '.proof-mobile-navigation .swiper-button-prev',
        },
        pagination: {
          el: ".proof-mobile-pagination",
          clickable: true,
        },
        on: {
          init: function () {
            console.log('✅ Tinder card swiper initialized!');
          },
        },
      });
      
      window.proofMobileSwiperInstance = proofMobileSwiper;
      
    } catch (error) {
      console.error('❌ Swiper error:', error.message);
    }
  }

  // Only initialize testimonial swiper if element exists
  if (document.querySelector('.testimonial-slider')) {
    var testimonialSwiper = new Swiper(".testimonial-slider", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: false,
      navigation: {
        nextEl: '.testimonial-carousel-navigation .swiper-button-next',
        prevEl: '.testimonial-carousel-navigation .swiper-button-prev',
      },
      pagination: {
        el: ".testimonial-slider-pagination",
        clickable: true,
      },
      // autoplay: {
      //   delay: 5000,
      //   disableOnInteraction: false,
      // },
      breakpoints: {
        768: {
          slidesPerView: 1,
        }
      }
    });
  }


});

