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


  // Custom play button logic - load video on click (skip YouTube embeds)
  document.querySelectorAll('.video-wrapper:not(.youtube-embed)').forEach(wrapper => {
    const playBtn = wrapper.querySelector('.video-play-btn');
    if (!playBtn) return;
    
    const thumbnail = wrapper.querySelector('.video-thumbnail');
    const videoSrc = wrapper.getAttribute('data-video-src');

    playBtn.addEventListener('click', () => {
      // Pause all other playing videos first
      document.querySelectorAll('.video-wrapper video').forEach(existingVideo => {
        existingVideo.pause();
      });

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

  // Function to pause all YouTube iframes
  function pauseAllYouTubeVideos() {
    document.querySelectorAll('.video-wrapper.youtube-embed iframe, .video-testimonial iframe').forEach(iframe => {
      iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    });
  }

  // Testimonials Video Swiper
  const testimonialVideoSwiper = new Swiper('.testimonial-video-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    navigation: {
      nextEl: '.testimonial-video-navigation .swiper-button-next',
      prevEl: '.testimonial-video-navigation .swiper-button-prev',
    },
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
    },
    on: {
      slideChange: function() {
        pauseAllYouTubeVideos();
      }
    }
  });

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


});


// Testimonials Carousel Swiper (3-card layout with bleed)
var testimonialsCarouselSwiper = new Swiper(".testimonials-carousel-swiper", {
  slidesPerView: 1.2,
  spaceBetween: 30,
  centeredSlides: true,
  loop: false,
  initialSlide: 1,
  navigation: {
    nextEl: '.carousel-next',
    prevEl: '.carousel-prev',
  },
  pagination: {
    el: ".carousel-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 2.5,
      spaceBetween: 40,
      centeredSlides: true,
    }
  }
});

// Single Testimonial Swiper
var singleTestimonialSwiper = new Swiper(".single-testimonial-slider", {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: false,
  navigation: {
    nextEl: '.single-next',
    prevEl: '.single-prev',
  },
  pagination: {
    el: ".single-testimonial-pagination",
    clickable: true,
  },
});

// Category Tabs Functionality with filtering
$(document).ready(function() {
  const testimonialData = {
    tunnel: [
      { name: "Lauren and Greg Hough", company: "Swell Wash", subtitle: "Tunnel Car Wash / New Jersey", text: "\"Ultimately, partnering with EverWash came down to their ingrained focus on membership and customer engagement. EverWash brought us proven tools, technology, and best practices to actually grow a successful membership base, not just manage it. We are thrilled to be an EverWash partner!\"", avatar: "/assets/images/lauren-greg-hough.png", readMore: "/blog/2025-03-31-wash-partner-story-swell-wash/" },
      { name: "Daniel Lee", company: "Whittier Express Car Wash", subtitle: "Tunnel Car Wash / Whittier, CA", text: "\"EverWash made our transition as new owners seamless. With their help, we easily communicated updates to our customers, putting everyone at ease. The transition team was incredibly helpful, communicative, and cooperative—it truly felt like a team effort.\"", avatar: "/assets/images/daniel-lee.jpg", readMore: "/blog/2025-02-04-wash-partner-story-whittier-express-car-wash/" },
      { name: "Rico Danesi", company: "Exclusive Car Wash", subtitle: "Tunnel Car Wash / Danbury CT", text: "\"EverWash helped us stabilize revenue by growing a membership program that's not weather-dependent. Starting with zero members, we've grown exponentially every year.\"", avatar: "/assets/images/rico-danesi.png", readMore: "/blog/2024-10-14-wash-partner-story-exclusive-car-wash/" },
      { name: "Tim Terrizzi", company: "Pit Stop Car Wash", subtitle: "Tunnel Car Wash / Philadelphia PA", text: "\"If I've struggled, I could reach out to anyone for advice, resources, whatever, and there's a dialogue…I appreciate that aspect of EverWash probably above anything else.\"", avatar: "/assets/images/tim-terrizzi.png", readMore: "/blog/2024-10-11-wash-partner-story-pit-stop-car-wash/" }
    ],
    iba: [
      { name: "Allan Yates", company: "Mountain City Suds", subtitle: "In-Bay Automatic / Mountain City TN", text: "\"The community is going crazy for EverWash. Even in winter, we see around 200 cars daily. People are coming from miles away just for the membership.\"", avatar: "/assets/images/allan-yates.png", readMore: "/blog/2024-10-14-wash-partner-story-mountain-city-suds/" },
      { name: "Kim Allen", company: "ProClean AutoSpa", subtitle: "In-Bay Automatic / Colorado", text: "\"EverWash made it easy for us to offer memberships and compete with tunnel washes. The membership program has created consistent, predictable revenue, and the loyalty of our customers is unmatched.\"", avatar: "/assets/images/kim-allen.png", readMore: "/blog/2024-10-14-wash-partner-story-proclean-autospa/" },
      { name: "Doyle Zimbleman", company: "Super Spray Car Wash", subtitle: "In-Bay Automatic / Tahlequah OK", text: "\"From day one, their team has been amazing. They've made running a membership program easy, and the customer service is top-notch.\"", avatar: "/assets/images/doyle-zimbleman.png", readMore: "/blog/2024-10-14-wash-partner-story-super-spray-car-wash/" },
      { name: "Craig Gilham", company: "Sudz Car Wash", subtitle: "In-Bay Automatic / Gonzalez TX", text: "\"EverWash helped me grow my memberships by 60% in just 12 months. Their support with marketing, technology integration, and member management has been invaluable.\"", avatar: "/assets/images/daniel-lee.jpg", readMore: "/blog/2024-10-14-wash-partner-story-sudz-car-wash/" },
      { name: "Taylor Irwin", company: "Rocky Mountain Car Wash", subtitle: "In-Bay Automatic / Rocky Mountains", text: "\"EverWash is the type of partner that listens to their customers, implements change to stay competitive, and truly cares about the operator's success and growth.\"", avatar: "/assets/images/taylor-irwin.png", readMore: "/blog/2024-10-14-wash-partner-story-rocky-mountain-car-wash/" }
    ],
    general: [
    ]
  };
  
  function updateCarousel(category) {
    const testimonials = category === 'all' 
      ? [...testimonialData.tunnel, ...testimonialData.iba, ...testimonialData.general]
      : (testimonialData[category] || []);
    
    if (testimonialsCarouselSwiper && testimonialsCarouselSwiper.destroy) {
      testimonialsCarouselSwiper.destroy(true, true);
    }
    
    const swiperWrapper = $('.testimonials-carousel-swiper .swiper-wrapper');
    swiperWrapper.empty();
    
    testimonials.forEach(function(testimonial) {
      const companyHtml = testimonial.company ? `<p class="testimonial-company">${testimonial.company}</p>` : '';
      const subtitleHtml = testimonial.subtitle ? `<p class="author-subtitle">${testimonial.subtitle}</p>` : '';
      const readMoreHtml = testimonial.readMore ? `<div class="testimonial-read-more"><a href="${testimonial.readMore}" class="btn__secondary btn-sm">Read More</a></div>` : '';
      const slide = `
        <div class="swiper-slide">
          <div class="testimonial-card">
            <svg class="quote-icon" width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 17.92V32h12.8V17.92H6.016c0-3.36 2.688-6.08 6.016-6.08V5.44C5.76 5.44 0 11.2 0 17.92zM27.2 11.84c0-3.36 2.688-6.08 6.016-6.08V5.44C26.944 5.44 21.184 11.2 21.184 17.92V32H34.016V17.92H27.2z" fill="#A5B4FC"/>
            </svg>
            ${companyHtml}
            <p class="testimonial-text">${testimonial.text}</p>
            <div class="testimonial-author">
              <img src="${testimonial.avatar}" alt="${testimonial.name}" class="author-avatar">
              <div class="author-info">
                <p class="author-name">${testimonial.name}</p>
                ${subtitleHtml}
              </div>
            </div>
            ${readMoreHtml}
          </div>
        </div>
      `;
      swiperWrapper.append(slide);
    });
    
    testimonialsCarouselSwiper = new Swiper(".testimonials-carousel-swiper", {
      slidesPerView: 1.2,
      spaceBetween: 30,
      centeredSlides: true,
      loop: false,
      initialSlide: Math.min(1, testimonials.length - 1),
      navigation: {
        nextEl: '.carousel-next',
        prevEl: '.carousel-prev',
      },
      pagination: {
        el: ".carousel-pagination",
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 2.5,
          spaceBetween: 40,
          centeredSlides: true,
        }
      }
    });
  }
  
  updateCarousel('all');
  
  $('.category-tab').on('click', function() {
    $('.category-tab').removeClass('active');
    $(this).addClass('active');
    updateCarousel($(this).data('category'));
  });
});


// Testimonials Video Swiper
const testimonialVideoSwiper = new Swiper('.testimonial-video-slider', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: false,
  navigation: {
    nextEl: '.testimonial-video-navigation .swiper-button-next',
    prevEl: '.testimonial-video-navigation .swiper-button-prev',
  },
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
