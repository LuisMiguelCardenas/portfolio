/**
* Template Name: iPortfolio - v3.1.0
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

//Portfolio Container

// const portfolio = [
//   {
//     description: 'Esta es la descripción del proyecto',
//     img: 'assets/img/portfolio/portfolio-1.jpg'
//   },
//   {
//     description: 'Esta es la descripción del proyecto',
//     img: 'assets/img/portfolio/portfolio1.jpg'
//   }
// ]

// const portfilioCard = document.getElementById('portfolioContainer');
// portfilioCard.innerHTML = portfolio.map(item => (`
//     <div class="col-lg-4 col-md-6 portfolio-item filter-app">
//     <div class="portfolio-wrap">
//       <img src=${item.img} class="img-fluid" alt="">
//       <div class="portfolio-links">
//         <p class="portfolio-text">${item.description}</p>
//         <a href=${item.img} data-gallery="portfolioGallery" class="portfolio-lightbox" title="App 1"><i class="bx bx-plus"></i></a>
//         <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
//       </div>
//     </div>
//     </div>           
//           `)).join('');





//skills contaienr 

const skills = [
  {
    title:'HTML',
    image:'https://img.icons8.com/color/144/000000/html-5--v1.png'
  },
  {
    title:'CSS',
    image:'https://img.icons8.com/color/144/000000/css3.png'
  },
  {
    title:'javaScript',
    image:'https://img.icons8.com/color/144/000000/javascript--v1.png'
  },
  {
    title:'Bootsrap',
    image:'https://img.icons8.com/color/144/000000/bootstrap.png'
  },
  {
    title:'sass',
    image:'https://img.icons8.com/color/144/000000/sass.png'
  },
  {
    title:'JQuery',
    image:'https://img.icons8.com/ios-filled/150/000000/jquery.png'
  },
  {
    title:'React JS',
    image:'https://img.icons8.com/ultraviolet/120/000000/react--v2.png'
  },
  {
    title:'Git',
    image:'https://img.icons8.com/color/144/000000/git.png'
  }
]

const toLearn = [
  {
    title:'Node JS',
    image:'https://img.icons8.com/color/144/000000/nodejs.png'
  },
  {
    title:'Mongo DB',
    image:'https://img.icons8.com/color/144/000000/mongodb.png'
  }
]

const skillsContainer = document.getElementById('skills-container');
skillsContainer.innerHTML = skills.map(item => (`           
          <div class="card m-2" style="width: 11rem;">
            <img src=${item.image} class="card-img-top" alt="...">
            <div class="card-body">
                <p class="skill-text text-center">${item.title}</p>
            </div>
          </div>`)).join('');


const skillsToLearnContainer = document.getElementById('skillToLearn');
skillsToLearnContainer.innerHTML = toLearn.map(item => (`           
          <div class="card m-2" style="width: 11rem;">
            <img src=${item.image} class="card-img-top" alt="...">
            <div class="card-body">
                <p class="skill-text text-center">${item.title}</p>
            </div>
          </div>`)).join('');
        