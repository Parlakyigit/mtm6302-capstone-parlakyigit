// DOM elements
const favContainer = document.querySelector(".container.text-center.bg-light");

// Load favorites on page load
document.addEventListener("DOMContentLoaded", loadFavourites);

function loadFavourites() {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  // Clear the container
  favContainer.innerHTML = "";

  // If no favorites exist, display a message
  if (favourites.length === 0) {
    favContainer.innerHTML =
      "<p class='text-center mt-4'>No favourites added yet.</p>";
    return;
  }

  // Create and display each favorite image
  favourites.forEach((fav, index) => {
    const favouriteHTML = `
      <div class="row mt-5 align-items-center">
        <div class="col-1 mt-5">
          <img src="./images/Trash.png" alt="trash" class="trash-icon" data-index="${index}" />
        </div>
        <div class="col-6 col-md-6">
          <picture>
            <img
              src="${fav.url}"
              class="img-fluid w-100"
              alt="${fav.title}"
            />
          </picture>
        </div>
        <div class="col-12 col-md-4 order-md-last">
          <p class="card-text">${fav.explanation}</p>
        </div>
        <div class="col-1 d-none d-md-block">
          <img src="./images/download.png" alt="download icon" class="download-icon" data-url="${fav.hdurl}" />
        </div>
      </div>
    `;
    favContainer.innerHTML += favouriteHTML;
  });

  // Add event listeners for trash and download buttons
  const trashIcons = document.querySelectorAll(".trash-icon");
  const downloadIcons = document.querySelectorAll(".download-icon");

  trashIcons.forEach((icon) => {
    icon.addEventListener("click", deleteFavourite);
  });

  downloadIcons.forEach((icon) => {
    icon.addEventListener("click", downloadImage);
  });
}

function deleteFavourite(event) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  const index = event.target.dataset.index;

  // Remove the selected item from the array
  favourites.splice(index, 1);

  // Update localStorage
  localStorage.setItem("favourites", JSON.stringify(favourites));

  // Reload the favorites
  loadFavourites();
}

function downloadImage(event) {
  const imageUrl = event.target.dataset.url;

  // Create a temporary anchor element to initiate the download
  const anchor = document.createElement("a");
  anchor.href = imageUrl;
  anchor.download = "nasa_apod_image.jpg"; // Default filename
  anchor.click();
}
