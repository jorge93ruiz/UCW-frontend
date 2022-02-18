// global functions
function bodyScrollingToggle() {
  document.body.classList.toggle("hidden-scrolling");
}

// hide all sections except active
(() => {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    if (!section.classList.contains("active")) {
      section.classList.add("hide");
    }
  });
})();

/*----------------preloader effect----------------*/
window.addEventListener('load', (event) => {
  document.querySelector(".preloader").classList.add("fade-out");
  document.querySelector(".wrapper").style.visibility = "visible";
  if (document.body.classList.contains("hidden-scrolling")) {
    bodyScrollingToggle();
  }
});

/*----------------navigation bar effect----------------*/
(() => {
  // get nav-bar
  const navBar = document.querySelector(".nav-bar");

  // When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      navBar.style.top = "0";
    } else {
      navBar.style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
  }
})();

/*----------------section tabs----------------*/
(() => {
  const hamburgerBtn = document.querySelector(".hamburger-btn"),
  navBarResponsive = document.querySelector(".nav-bar-responsive"),
  navBarResponsiveTabs = navBarResponsive.querySelectorAll(".tab");
  closeNavBar = navBarResponsive.querySelector(".close-btn");
  hamburgerBtn.addEventListener("click", showNavMenu);
  closeNavBar.addEventListener("click", hideNavMenu);

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("tab")) {
      if (event.target.hash !== "") {
        // prevent default anchor click behavior
        event.preventDefault();
        const hash = event.target.hash;
        // deactivate existing active 'section'
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");
        // activate new 'section'
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");
        // add hash (#) to url
        window.location.hash = hash;

        // if navigation bar for small screens is open
        if (navBarResponsive.classList.contains("open")) {
          // deactivate existing active tab
          if (navBarResponsive.querySelector(".tab.active")) {
            navBarResponsive.querySelector(".tab.active").classList.add("outer-shadow", "hover-in-shadow");
            navBarResponsive.querySelector(".tab.active").classList.remove("inner-shadow", "active");
          }
          // activate new tab
          event.target.classList.add("active", "inner-shadow");
          event.target.classList.remove("hover-in-shadow", "outer-shadow");
          hideNavMenu();
        }
        // if navigation bar for small screens if not open
        else {
          // deactivate existing active tab
          if (navBarResponsive.querySelector(".tab.active")) {
            navBarResponsive.querySelector(".tab.active").classList.add("outer-shadow", "hover-in-shadow");
            navBarResponsive.querySelector(".tab.active").classList.remove("inner-shadow", "active");
          }
          // activate new tab in nav-bar-responsive
          navBarResponsiveTabs.forEach((tab) => {
            if (hash === tab.hash) {
              tab.classList.add("active", "inner-shadow");
              tab.classList.remove("hover-in-shadow", "outer-shadow");
            }
          });
        }
      }
    }
  });

  function showNavMenu() {
    navBarResponsive.classList.add("open");
    bodyScrollingToggle();
  }

  function hideNavMenu() {
    navBarResponsive.classList.remove("open");
    bodyScrollingToggle();
  }
})();

/*----------------contactus form----------------*/
// (() => {
//   $(document).ready(function() {
//     $("form#contactusForm").on('submit', function(e) {
//       e.preventDefault();
//       $.ajax({
//         type: 'POST',
//         url: "includes/sendEmail.inc.php",
//         data: new FormData(this),
//         contentType: false,
//         cache: false,
//         processData: false,
//         success: function(result) {
//           document.querySelector(".alert-screen .alert-screen-inner p").innerHTML = result;
//           document.querySelector(".alert-screen").classList.add("visible");
//         },
//         complete: function(result) {
//           $("form#contactusForm")[0].reset();
//         }
//       });
//     });
//   });
// })();

/*----------------news popup----------------*/
(() => {
  const popup = document.querySelector(".news-popup"),
  closeBtn = popup.querySelector(".close-pp");

  // $('body').on('click', '.news-items', (event) => {  
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("pp-btn")) {
      if (event.target.closest(".news-item-inner")) {
        // get news-item
        const newsItem = event.target.closest(".news-item-inner").parentElement;
        popupDetails(newsItem);
        popUpTogle();
      }
    }
  });

  closeBtn.addEventListener("click", () => {
    popUpTogle();
  });

  function popUpTogle() {
    popup.classList.toggle("open");
    bodyScrollingToggle();
  }

  function popupDetails(newsItem) {
    // get news-item title / content
    const title = newsItem.querySelector(".news-item-title").innerHTML;
    var content = "";
    if (newsItem.querySelector(".news-item-content")) {
      content = newsItem.querySelector(".news-item-content").innerHTML;
    }
    else if (newsItem.querySelector(".news-item-media")) {
      content = newsItem.querySelector(".news-item-media").innerHTML;
    }
    // set news-item title / content into popup
    popup.querySelector(".pp-title").innerHTML = title;
    popup.querySelector(".pp-content").innerHTML = content;
  }
})();

/*----------------events carousel----------------*/
(() => {

  // set item with depending on screen
  let itemWidth = 570;
  let itemsOnScreen = 2;
  if (window.matchMedia("(max-width: 769px)").matches) {
    itemWidth = 300;
    itemsOnScreen = 1;
  }
  else if (window.matchMedia("(max-width: 1140px)").matches) {
    itemWidth = 700;
    itemsOnScreen = 1;
  }

  let prevBtn = document.querySelector("span.prev"),
  nextBtn = document.querySelector("span.next"),
  carouselItems = document.querySelectorAll(".carousel-item"),
  carouselContainer = document.querySelector(".events-carousel-inner"),
  carouselVisibleArea = document.querySelector(".carousel-visible-area"),
  carouselPage = Math.ceil(carouselItems.length / itemsOnScreen),
  l = 0,
  moveWidth = itemWidth,
  maxMove = itemWidth * (carouselItems.length - itemsOnScreen);

  // set carouselContainer width
  carouselContainer.style.width = (itemWidth * carouselItems.length) + 'px';
  carouselVisibleArea.style.width = (itemWidth * itemsOnScreen) + 'px';

  let leftMover = () => {
    l = l - moveWidth;
    if (l < 0) {
      l = maxMove;
    }
    for (const i of carouselItems) {
      if (carouselPage > 1) {
        i.style.left = '-' + l + 'px';
      }
    }
  }

  let rightMover = () => {
    l = l + moveWidth;
    if (carouselItems.length == itemsOnScreen) {
      l = 0;
      return;
    }
    for (const i of carouselItems) {
      if (l > maxMove) {
        l = 0;
      }
      i.style.left = '-' + l + 'px';
    }
  }

  prevBtn.addEventListener("click", leftMover);
  nextBtn.addEventListener("click", rightMover);

})();

/*----------------our story tabs----------------*/
(() => {

  const ourstorySection = document.querySelector(".ourstory-section"),
  tabsContainer = document.querySelector(".ourstory-tabs");

  tabsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("tab-item") && 
    !event.target.classList.contains("active")) {
      const target = event.target.getAttribute("data-target");
      // deactivate existing active tab-item
      tabsContainer.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
      tabsContainer.querySelector(".active").classList.remove("active");
      // activate new tab-item
      event.target.classList.remove("outer-shadow", "hover-in-shadow");
      event.target.classList.add("active");
      // deactivate existing active tab-content
      ourstorySection.querySelector(".tab-content.active").classList.remove("active");
      // activate new tab-content
      ourstorySection.querySelector(target).classList.add("active");
    }
  });

})();

/*----------------our story popup----------------*/
(() => {

  const popup = document.querySelector(".ourstory-popup"),
  closeBtn = popup.querySelector(".close-pp");

  // $('body').on('click', '.founder-items', (event) => {
  document.addEventListener("click", (event) => {
    if (event.target.closest(".founder-item-inner")) {
      // get founder-item
      const founderItem = event.target.closest(".founder-item-inner").parentElement;
      popupDetails(founderItem);
      popUpTogle();
    }
  });

  closeBtn.addEventListener("click", () => {
    popUpTogle();
  });

  function popUpTogle() {
    popup.classList.toggle("open");
    bodyScrollingToggle();
  }

  function popupDetails(founderItem) {
    // get image from founder-item
    const img = founderItem.querySelector(".founder-item-img img").getAttribute("src");
    // set img into popup
    popup.querySelector(".pp-img img").src = img;
    // get content and name from founder-item
    const name = founderItem.querySelector(".founder-item-title").innerHTML,
    story = founderItem.querySelector(".founder-item-content").innerHTML;
    // set story and name into popup
    popup.querySelector(".pp-title").innerHTML = name;
    popup.querySelector(".pp-content").innerHTML = story;
  }

})();

/*----------------your story popup----------------*/
(() => {

  const popup = document.querySelector(".yourstory-popup"),
  closeBtn = popup.querySelector(".close-pp");

  // $('body').on('click', '.story-items', (event) => {
  document.addEventListener("click", (event) => {
    if (event.target.closest(".story-item-inner")) {
      // get story-item
      const storyItem = event.target.closest(".story-item-inner").parentElement;
      popupDetails(storyItem);
      popUpTogle();
    }
  });

  closeBtn.addEventListener("click", () => {
    popUpTogle();
  });

  function popUpTogle() {
    popup.classList.toggle("open");
    bodyScrollingToggle();
  }

  function popupDetails(storyItem) {
    // get image from story-item
    const img = storyItem.querySelector(".story-item-img img").getAttribute("src");
    // set img into popup
    popup.querySelector(".pp-img img").src = img;
    // get story and name from story-item
    const name = storyItem.querySelector(".story-item-title").innerHTML,
    story = storyItem.querySelector(".story-item-content").innerHTML;
    // set story and name into popup
    popup.querySelector(".pp-title").innerHTML = name;
    popup.querySelector(".pp-content").innerHTML = story;
  }

})();