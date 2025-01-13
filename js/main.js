$(document).ready(function () {
  // Smooth page loading

  $("body").addClass("smoothLoading");
  setTimeout(() => {
    $("body").removeClass("smoothLoading");
  }, 1600);

  // Initial slider

  $(".project__slider").slick({
    autoplay: true,
    dots: true,
  });

  // Smooth Scrool to anchor for all browser

  let scroll = new SmoothScroll('a[href*="#"]', {
    header: "[data-scroll-header]",
    speed: 1000,
    speedAsDuration: true,
  });

  // Animation when change scroll

  const header = document.querySelector(".header");
  const headerLogo = document.querySelector(".header__logo-link");
  const headerLink = document.querySelectorAll(".header__link");
  const skillItem = document.querySelectorAll(".skills__item ");
  const titleSkills = document.querySelector(".title__skills");
  const titleEducation = document.querySelector(".education__wrapper");
  const itemSection = document.querySelectorAll("main>div");
  const hamburgerLine = document.querySelectorAll(".header__line");
  const switchScroll = document.querySelectorAll(".header__switch-scroll");

  window.addEventListener("scroll", () => {
    // animation section

    animOnScroll(titleSkills, skillItem);
    animOnScroll(titleEducation);

    // animation navigation

    animChangeNavigation(itemSection, headerLink);
  });

  window.addEventListener("load", () => {
    if (
      window.pageYOffset >
      titleSkills.getBoundingClientRect().top -
        window.innerHeight -
        titleSkills.offsetHeight / 2
    ) {
      skillItem.forEach((item) => {
        item.classList.add("skills__item_show");
      });
    }

    // Add class active for navigation when reload page and pageYOffset > height nav

    if (
      window.pageYOffset >
      document.querySelector(".header").getBoundingClientRect().height
    ) {
      header.classList.add("header_active");
      headerLogo.classList.add("header__logo-link_active");
      headerLink.forEach((link) => {
        if (link.classList.contains("header__link-select")) {
          link.classList.add("header__link-select_active");
        }
        link.classList.add("header__link_active");
      });
      hamburgerLine.forEach((line) => {
        line.style.backgroundColor = "#000";
      });
      switchScroll.forEach((elem) => {
        if (elem.classList.contains("header__switch-lang_active")) {
          elem.classList.add("header__scroll_select");
        }
        elem.classList.add("header__scroll_active");
      });
    }
  });

  // Show hamburger

  const hamburger = document.querySelector(".header__hamburger");
  const hambNav = document.querySelector(".header__navigation");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");

    hambNav.classList.toggle("header__navigation_active");

    headerLink.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        hambNav.classList.remove("header__navigation_active");
      });
    });
  });

  // Show subtitle

  showSubtitle();
  setInterval(() => {
    showSubtitle();
  }, 8000);

  function showSubtitle() {
    const subLogo = document.querySelectorAll(".logo__subtitle");

    subLogo.forEach((subtitle, time) => {
      setTimeout(() => {
        subtitle.classList.add("logo__subtitle_show");
        setTimeout(() => {
          subtitle.classList.remove("logo__subtitle_show");
        }, 1800);
      }, 2700 * ++time);
    });
  }

  // Function anim nav

  function animChangeNavigation(elemSection, elemLink) {
    elemSection.forEach((section) => {
      const animItemHeight = section.offsetHeight;
      const animItemOffset =
        section.getBoundingClientRect().top + window.pageYOffset;
      const headerHeight =
        document.querySelector(".header").getBoundingClientRect().height +
        window.pageYOffset;

      // Get pageYOffset distance to unreachable section

      let scrollLastEl =
        window.pageYOffset +
        window.innerHeight -
        elemSection[elemSection.length - 1].getBoundingClientRect().height;
      const lastElPosition =
        elemSection[elemSection.length - 1].getBoundingClientRect().top +
        window.pageYOffset;

      if (
        (animItemOffset < headerHeight) &
          (headerHeight < animItemOffset + animItemHeight) ||
        scrollLastEl > lastElPosition
      ) {
        elemLink.forEach((item) => {
          header.classList.add("header_active");
          headerLogo.classList.add("header__logo-link_active");
          headerLink.forEach((link) => {
            if (link.classList.contains("header__link_select")) {
              link.classList.add("header__link-select_active");
            }
            link.classList.add("header__link_active");
          });
          hambNav.classList.add("header__navigation_active-scroll");
          hamburgerLine.forEach((line) => {
            line.style.backgroundColor = "#000";
          });

          switchScroll.forEach((elem) => {
            if (elem.classList.contains("header__switch-lang_active")) {
              elem.classList.add("header__scroll_select");
            }
            elem.classList.add("header__scroll_active");
          });

          if (section.id === item.hash.replace(/#/, "")) {
            item.classList.add("header__link-select_active");
          } else {
            item.classList.remove("header__link-select_active");
          }

          if (
            section.id === "home" &&
            window.pageYOffset <
              document.querySelector(".header").getBoundingClientRect().height
          ) {
            headerLink.forEach((link) => {
              link.classList.remove("header__link-select_active");
              link.classList.remove("header__link_active");
            });
            header.classList.remove("header_active");
            headerLogo.classList.remove("header__logo-link_active");
            hamburgerLine.forEach((line) => {
              line.style.backgroundColor = "#fff";
            });
            switchScroll.forEach((elem) => {
              if (elem.classList.contains("header__switch-lang_active")) {
                elem.classList.remove("header__scroll_select");
              }
              elem.classList.remove("header__scroll_active");
            });
          }

          if (
            section.id === "home" &&
            window.pageYOffset <
              document.querySelector(".header").getBoundingClientRect()
                .height &&
            window.innerWidth <= 767
          ) {
            header.classList.remove("header_active");
            headerLogo.classList.remove("header__logo-link_active");
            hambNav.classList.remove("header__navigation_active-scroll");
            hamburgerLine.forEach((line) => {
              line.style.backgroundColor = "#fff";
            });
          }
        });
      }
    });
  }

  // Function anim section

  function animOnScroll(elem, arrElems) {
    const animItemHeight = elem.offsetHeight;
    const animItemOffset =
      elem.getBoundingClientRect().top + window.pageYOffset;
    const animStart = 4;

    let animItemPoint = window.innerHeight - animItemHeight / animStart;

    if (animItemHeight > window.innerHeight) {
      animItemPoint = window.innerHeight - window.innerHeight / animStart;
    }

    if (
      window.pageYOffset > animItemOffset - animItemPoint &&
      window.pageYOffset < animItemOffset + animItemHeight
    ) {
      if (elem.classList.contains("title__skills")) {
        arrElems.forEach((item) => {
          item.classList.add("skills__item_show");
        });
      }

      
      if (elem.classList.contains("education__wrapper")) {
        elem.classList.add("active");
      }

      if (elem.classList.contains('education__wrapper_count'))  {
        elem.classList.remove('education__wrapper_count');
        setTimeout(()=> {
          taskCounter(1, countTask, countTask.max, 50);
        }, 100);
      
        setTimeout(()=> {
          taskCounter(1, countRank, countRank.max, 200);
        }, 4000);
      }
    }
  }

  let countTask = document.querySelector('.counter__tasks');
  let countRank = document.querySelector('.counter__rank');

  function taskCounter(from, count, to, timer) {

    
    let current = from;

    let counter = setInterval(()=>{
      
      count.value = current;
      
      if (current == to) {
        clearInterval(counter);
      }
      current++;
      
    }, timer);
  }

});
