/*----------------toggle admin panel----------------*/
(() => {
  const adminPanelinner = document.querySelector(".admin-panel-inner");

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("toggle-panel-btn-inner") || event.target.parentElement.classList.contains("toggle-panel-btn-inner") || event.target.parentElement.classList.contains("toggle-panel-btn")) {
      adminPanelinner.classList.toggle("visible");
    }
    // hide admin panel when clicking elsewhere
    else if (!event.target.classList.contains("admin-panel-inner") && 
    !event.target.parentElement.parentElement.classList.contains("admin-panel-inner")) {
      if (adminPanelinner.classList.contains("visible")) {
        adminPanelinner.classList.remove("visible");
      }
    }
  });
})();

/*----------------new news popup----------------*/
(() => {
  const popup = document.querySelector(".news-popup-new"),
  newBtn = document.querySelector(".newnews-btn"),
  closeBtn = popup.querySelector(".close-pp");

  newBtn.addEventListener("click", () => {
    popUpTogle();
  });

  closeBtn.addEventListener("click", () => {
    popUpTogle();
  });

  function popUpTogle() {
    popup.classList.toggle("open");
    bodyScrollingToggle();
  }

  $(document).ready(function() {
    $("form#newsPopupNew").on('submit', function(e) {
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: "includes/newNews.inc.php",
        data: new FormData(this),
        contentType: false,
        cache: false,
        processData: false,
        success: function(result) {
          document.querySelector(".alert-screen .alert-screen-inner p").innerHTML = result;
          document.querySelector(".alert-screen").classList.add("visible");
          popUpTogle();
          // reload managenews-table
          $(".managenews-table").load(location.href + " .managenews-table");
          // reload news section
          $(".news-items-container").load(location.href + " .news-items");
        },
        complete: function(result) {
          $("form#newsPopupNew")[0].reset();
        }
      });
    });
  });
})();

/*----------------preview uploaded image news----------------*/
(() => {
  const imgInput = document.querySelector("#newsImg"),
  imgView = document.querySelector("#newsImgView");

  imgInput.addEventListener("change", (event) => {
    const reader = new FileReader();
    reader.onload = function() {
      imgView.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  });
})();

/*----------------news edit/delete popup----------------*/
(() => {
  $('body').on('click', '.managenews-table table', (event) => {
    // when edit button is clicked
    if (event.target.classList.contains("edit-btn")) {
      if (event.target.closest(".news-item")) {
        const newsItem = event.target.closest(".news-item");
        popUpTogle();
        popupDetails(newsItem);
      }
    }
    // when delete button is clicked
    else if (event.target.classList.contains("before-delete-btn")) {
      if (event.target.closest(".news-item")) {
        const newsItem = event.target.closest(".news-item");
        // get id from news-item
        const id = newsItem.querySelector(".news-item-id").getAttribute("id");
        // set id into confirmation screen
        document.querySelector(".news-delete.delete-confirmation-screen").querySelector(".pp-id").value = id;
        bodyScrollingToggle();
        deleteConfirmationToggle();
      }
    }
  });

  // close popup
  $('body').on('click', '.news-popup-editable .close-pp', () => {
    popUpTogle();
  });

  // cancel delete confirmation screen
  $('body').on('click', '.news-delete.delete-confirmation-screen .cancel-btn', () => {
    deleteConfirmationToggle();
    bodyScrollingToggle();
  });

  // toggle popup
  function popUpTogle() {
    document.querySelector(".news-popup-editable").classList.toggle("open");
    bodyScrollingToggle();
  }

  // display delete confirmation screen
  function deleteConfirmationToggle() {
    document.querySelector(".news-delete.delete-confirmation-screen").classList.toggle("open");
  }

  function popupDetails(newsItem) {
    // catch news-popup-editable
    const popup = document.querySelector(".news-popup-editable");
    // get id from news item
    const id = newsItem.querySelector(".news-item-id").getAttribute("id");
    // set id into popup
    popup.querySelector(".pp-id").value = id;
    // get image from news-item
    const img = newsItem.querySelector("img").getAttribute("src");
    // set img into popup
    popup.querySelector(".pp-img img").src = img;
    // set img src into input
    popup.querySelector(".pp-img input").value = img;
    // get news title / intro / url / media / content from news-item
    const title = newsItem.querySelector(".news-item-title").innerHTML,
    intro = newsItem.querySelector(".news-item-intro").innerHTML,
    url = newsItem.querySelector(".news-item-url").innerHTML,
    media = newsItem.querySelector(".news-item-media").innerHTML,
    content = newsItem.querySelector(".news-item-content").innerHTML;
    // set news title / content / url / media / content into popup
    popup.querySelector(".pp-title").value = title;
    popup.querySelector(".pp-intro").value = intro;
    popup.querySelector(".pp-url").value = url;
    // popup.querySelector(".pp-media").value = media;
    popup.querySelector(".pp-content").value = content;
  }

  $(document).ready(function() {
    $("form#newsPopupEdit").on('submit', function(e) {
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: "includes/editNews.inc.php",
        data: new FormData(this),
        contentType: false,
        cache: false,
        processData: false,
        success: function(result) {
          document.querySelector(".alert-screen .alert-screen-inner p").innerHTML = result;
          document.querySelector(".alert-screen").classList.add("visible");
          popUpTogle();
          // reload managenews-table
          $(".managenews-table").load(location.href + " .managenews-table");
          // reload news section
          $(".news-items-container").load(location.href + " .news-items");
        },
        complete: function(result) {
          $("form#newsPopupEdit")[0].reset();
        }
      });
    });
  });

  $(document).ready(function() {
    $("form#newsPopupDelete").on('submit', function(e) {
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: "includes/deleteNews.inc.php",
        data: new FormData(this),
        contentType: false,
        cache: false,
        processData: false,
        success: function(result) {
          document.querySelector(".alert-screen .alert-screen-inner p").innerHTML = result;
          document.querySelector(".alert-screen").classList.add("visible");
          deleteConfirmationToggle();
          bodyScrollingToggle();
          // reload managenews-table
          $(".managenews-table").load(location.href + " .managenews-table");
          // reload news section
          $(".news-items-container").load(location.href + " .news-items");
        },
        complete: function(result) {
          $("form#newsPopupDelete")[0].reset();
        }
      });
    });
  });
})();

/*----------------new your story popup----------------*/
(() => {
  const popup = document.querySelector(".yourstory-popup-new"),
  newBtn = document.querySelector(".newstory-btn"),
  closeBtn = popup.querySelector(".close-pp");

  newBtn.addEventListener("click", () => {
    popUpTogle();
  });

  closeBtn.addEventListener("click", () => {
    popUpTogle();
  });

  function popUpTogle() {
    popup.classList.toggle("open");
    bodyScrollingToggle();
  }

  $(document).ready(function() {
    $("form#yourstoryPopupNew").on('submit', function(e) {
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: "includes/newStory.inc.php",
        data: new FormData(this),
        contentType: false,
        cache: false,
        processData: false,
        success: function(result) {
          document.querySelector(".alert-screen .alert-screen-inner p").innerHTML = result;
          document.querySelector(".alert-screen").classList.add("visible");
          popUpTogle();
          // reload managestories-table
          $(".managestories-table").load(location.href + " .managestories-table");
          // reload your story section
          $(".story-items-container").load(location.href + " .story-items");
        },
        complete: function(result) {
          $("form#yourstoryPopupNew")[0].reset();
        }
      });
    });
  });
})();

/*----------------preview uploaded image your story----------------*/
(() => {
  const imgInput = document.querySelector("#storyImg"),
  imgView = document.querySelector("#storyImgView");

  imgInput.addEventListener("change", (event) => {
    const reader = new FileReader();
    reader.onload = function() {
      imgView.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  })
})();

/*----------------yourstory edit/delete popup----------------*/
(() => {
  const popup = document.querySelector(".yourstory-popup-editable"),
  closeBtn = popup.querySelector(".close-pp"),
  deleteConfirmationScreen = document.querySelector(".yourstory-delete.delete-confirmation-screen"),
  cancelConfirmation = deleteConfirmationScreen.querySelector(".cancel-btn");

  $('body').on('click', '.managestories-table table', (event) => {
    // when edit button is clicked
    if (event.target.classList.contains("edit-btn")) {
      if (event.target.closest(".story-item")) {
        const storyItem = event.target.closest(".story-item");
        popUpTogle();
        popupDetails(storyItem);
      }
    }
    // when delete button is clicked
    else if (event.target.classList.contains("before-delete-btn")) {
      if (event.target.closest(".story-item")) {
        const storyItem = event.target.closest(".story-item");
        // get id from story-item
        const id = storyItem.querySelector(".story-item-id").getAttribute("id");
        // set id into confirmation screen
        deleteConfirmationScreen.querySelector(".pp-id").value = id;
        bodyScrollingToggle();
        deleteConfirmationToggle();
      }
    }
  });

  closeBtn.addEventListener("click", () => {
    popUpTogle();
  });

  cancelConfirmation.addEventListener("click", () => {
    deleteConfirmationToggle();
    bodyScrollingToggle();
  });

  function popUpTogle() {
    popup.classList.toggle("open");
    bodyScrollingToggle();
  }

  function deleteConfirmationToggle() {
    deleteConfirmationScreen.classList.toggle("open");
  }

  function popupDetails(storyItem) {
    // get id from story item
    const id = storyItem.querySelector(".story-item-id").getAttribute("id");
    // set id into popup
    popup.querySelector(".pp-id").value = id;
    // get image from story-item
    const img = storyItem.querySelector("img").getAttribute("src");
    // set img into popup
    popup.querySelector(".pp-img img").src = img;
    // set img src into input
    popup.querySelector(".pp-img input").value = img;
    // get story title / intro / content from story-item
    const title = storyItem.querySelector(".story-item-title").innerHTML,
    intro = storyItem.querySelector(".story-item-intro").innerHTML,
    content = storyItem.querySelector(".story-item-content").innerHTML;
    // set story title / intro / content into popup
    popup.querySelector(".pp-title").value = title;
    popup.querySelector(".pp-intro").innerHTML = intro;
    popup.querySelector(".pp-content").innerHTML = content;
  }

  $(document).ready(function() {
    $("form#yourstoryPopupEdit").on('submit', function(e) {
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: "includes/editStory.inc.php",
        data: new FormData(this),
        contentType: false,
        cache: false,
        processData: false,
        success: function(result) {
          document.querySelector(".alert-screen .alert-screen-inner p").innerHTML = result;
          document.querySelector(".alert-screen").classList.add("visible");
          popUpTogle();
          // reload managestories-table
          $(".managestories-table").load(location.href + " .managestories-table");
          // reload yourstory section
          $(".story-items-container").load(location.href + " .story-items");
        },
        complete: function(result) {
          $("form#yourstoryPopupEdit")[0].reset();
        }
      });
    });
  });

  $(document).ready(function() {
    $("form#yourstoryPopupDelete").on('submit', function(e) {
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: "includes/deleteStory.inc.php",
        data: new FormData(this),
        contentType: false,
        cache: false,
        processData: false,
        success: function(result) {
          document.querySelector(".alert-screen .alert-screen-inner p").innerHTML = result;
          document.querySelector(".alert-screen").classList.add("visible");
          deleteConfirmationToggle();
          bodyScrollingToggle();
          // reload managestories-table
          $(".managestories-table").load(location.href + " .managestories-table");
          // reload yourstory section
          $(".story-items-container").load(location.href + " .story-items");
        },
        complete: function(result) {
          $("form#yourstoryPopupDelete")[0].reset();
        }
      });
    });
  });
})();