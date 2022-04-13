// global functions
function bodyScrollingToggle() {
  document.body.classList.toggle("hidden-scrolling");
}

// 
// section handlers
// 
(() => {
  const sections = document.querySelectorAll(".section");
  const hash = window.location.hash;

  // when loading page
  if (!hash) {
    sections.forEach((section) => {
      (section.id == "home") ? section.classList.add("active") : section.classList.add("hide");
    });
  } else {
    sections.forEach((section) => {
      (section.id == hash.slice(1)) ? section.classList.add("active") : section.classList.add("hide");
    });
  }

  // when hash changes
  // window.onhashchange = () => {
  //   document.querySelector(".section.active").classList.add("hide");
  //   document.querySelector(".section.active").classList.remove("active");
  //   document.querySelector(location.hash).classList.add("active");
  // };
})();

(() => {
  // when hash changes
  // window.onhashchange = () => {
  //   console.log(location.hash);
  //   document.querySelector(".section.active").classList.add("hide");
  //   document.querySelector(".section.active").classList.remove("active");
  //   console.log(document.querySelector(location.hash));
  //   // document.querySelector(location.hash).classList.add("active");
  // };
})();

// 
// preloader effect
// 
window.addEventListener('load', (event) => {
  document.querySelector(".preloader").classList.add("fade-out");
  document.querySelector(".wrapper").style.visibility = "visible";
  if (document.body.classList.contains("hidden-scrolling")) {
    bodyScrollingToggle();
  }
});

// 
// navbar effect
// 
// (() => {
//   // get nav-bar
//   const navBar = document.querySelector(".nav-bar");

//   // When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar
//   var prevScrollpos = window.pageYOffset;
//   window.onscroll = function() {
//     var currentScrollPos = window.pageYOffset;
//     if (prevScrollpos > currentScrollPos) {
//       navBar.style.top = "0";
//     } else {
//       navBar.style.top = "-50px";
//     }
//     prevScrollpos = currentScrollPos;
//   }
// })();

// 
// section tabs
// 
(() => {
  const hamburgerBtn = document.querySelector(".hamburger-btn"),
  navBarResponsive = document.querySelector(".nav-bar-responsive"),
  navBarResponsiveTabs = navBarResponsive.querySelectorAll(".tab");
  closeNavBar = navBarResponsive.querySelector(".close-btn");
  hamburgerBtn.addEventListener("click", showNavMenu);
  closeNavBar.addEventListener("click", hideNavMenu);

  // activate tab when reloading page
  if (window.location.hash) {
    navBarResponsive.querySelector(".tab.active").classList.add("outer-shadow", "hover-in-shadow");
    navBarResponsive.querySelector(".tab.active").classList.remove("inner-shadow", "active");
    navBarResponsive.querySelector('a[href="'+location.hash+'"]').classList.add("active", "inner-shadow");
    navBarResponsive.querySelector('a[href="'+location.hash+'"]').classList.remove("hover-in-shadow", "outer-shadow");
  }

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

// 
// contactus form
// 
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

// 
// show news items
// 
(() => {
  const newsItemsContainer = document.querySelector(".news-items");
  const newsItems = newsItemsContainer.querySelectorAll(".news-item");
  const showMoreBtn = newsItemsContainer.querySelector(".show-more-btn");
  let visibleItems = 6; // modify to limit visible items when after load

  if (visibleItems >= newsItems.length) showMoreBtn.style.display = "none";

  // hide news items
  showItems(newsItems, visibleItems);

  showMoreBtn.addEventListener('click', () => {
    visibleItems = visibleItems + 2;
    showItems(newsItems, visibleItems);

    // TODO: refactor if statement to be placed in one place only
    if (visibleItems >= newsItems.length) showMoreBtn.style.display = "none";
  });

  function showItems(items, visible) {
    for (let i = 0; i < visible; i++) {
      if (items[i]) items[i].classList.add("show");
    }
  }
})();

// 
// news popup
// 
(() => {
  const popup = document.querySelector(".news-popup"),
  closeBtn = popup.querySelector(".close-pp");
  const newsItemsContainer = document.querySelector(".news-items");

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

  // news popup from news banner in home page
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("banner-item-img")) {
      if (event.target.closest(".item")){
        title = event.target.closest(".item").querySelector("label").innerHTML;
        newsItemsContainer.querySelectorAll(".news-item-inner").forEach((item) => {
          if (item.querySelector(".news-item-title").innerHTML == title) {
            popupDetails(item.parentElement);
            popUpTogle();
          }
        });
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

// 
// events carousel
// 
(() => {

  // get carousel section
  let carousel = document.querySelector(".events-carousel.carousel");

  // visible area
  let visibleArea;
  if (!window.matchMedia("(max-width: 1140px)").matches) {
    visibleArea = 1140;
  } else {
    visibleArea = window.innerWidth;
  }

  // item width and amount of items on screen
  let itemWidth,
  itemsOnScreen;
  if (!window.matchMedia("(max-width: 1140px)").matches) {
    itemWidth = 550;
    itemsOnScreen = 2;
  } else {
    itemWidth = Math.floor(visibleArea * 0.9);
    itemsOnScreen = 1;
  }

  // get carousel items adn set width
  let carouselItems = carousel.querySelectorAll(".carousel-item");
  carouselItems.forEach((item) => {
    item.style.width = itemWidth + "px";
  });

  // get and set carousel visible area
  let carouselVisibleArea = carousel.querySelector(".carousel-visible-area");
  carouselVisibleArea.style.width = (itemWidth * itemsOnScreen) + "px";

  // get and set carousel container width
  let carouselContainer = carousel.querySelector(".carousel-items");
  carouselContainer.style.width = (itemWidth * carouselItems.length) + "px";

  // get prev and next buttons
  let prevBtn = carousel.querySelector("span.prev"),
  nextBtn = carousel.querySelector("span.next");

  // set variables
  let carouselPage = Math.ceil(carouselItems.length / itemsOnScreen),
  l = 0,
  moveWidth = itemWidth,
  maxMove = itemWidth * (carouselItems.length - itemsOnScreen);

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

// 
// our story tabs
// 
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

// 
// our story popup
// 
(() => {

  const popup = document.querySelector(".ourstory-popup"),
  closeBtn = popup.querySelector(".close-pp");

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("pp-btn")) {
      if (event.target.closest(".founder-item-inner")) {
        // get founder-item
        const founderItem = event.target.closest(".founder-item-inner").parentElement;
        popupDetails(founderItem);
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

// 
// show your story items
// 
(() => {
  const storyItemsContainer = document.querySelector(".story-items");
  const storyItems = storyItemsContainer.querySelectorAll(".story-item");
  const showMoreBtn = storyItemsContainer.querySelector(".show-more-btn");
  let visibleItems = 6; // modify to limit visible items when after load

  if (visibleItems >= storyItems.length) showMoreBtn.style.display = "none";

  // hide news items
  showItems(storyItems, visibleItems);

  showMoreBtn.addEventListener('click', () => {
    visibleItems = visibleItems + 3;
    showItems(storyItems, visibleItems);

    // TODO: refactor if statement to be placed in one place only
    if (visibleItems >= storyItems.length) showMoreBtn.style.display = "none";
  });

  function showItems(items, visible) {
    for (let i = 0; i < visible; i++) {
      if (items[i]) items[i].classList.add("show");
    }
  }
})();

// 
// your story popup
// 
(() => {

  const popup = document.querySelector(".yourstory-popup"),
  closeBtn = popup.querySelector(".close-pp");

  // $('body').on('click', '.story-items', (event) => {
  document.addEventListener("click", (event) => {
    if(event.target.classList.contains("pp-btn")) {
      if (event.target.closest(".story-item-inner")) {
        // get story-item
        const storyItem = event.target.closest(".story-item-inner").parentElement;
        popupDetails(storyItem);
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

// 
// EXAMPLE OF SHOW ELEMENT WHEN SCROLLING DOWN
// 
// (() => {
//   const item = document.querySelector(".news-banner-bg");

//   window.onscroll = () => {
//     if (document.documentElement.scrollTop > item.getBoundingClientRect().top + 50) {
//       item.classList.add("visible");
//     } else {
//       item.classList.remove("visible");
//     }
//   }
// })();
