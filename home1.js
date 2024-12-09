const apiKey = "mBKSZLjuDde7hBSUxyuNKa41ZrVbxnNkG5ibtZ9q";
const apiUrl = "https://api.nasa.gov/planetary/apod";

// DOM elements
const dateInput = document.querySelector("#date-input"); // Input field for the date
const fetchButton = document.querySelector("#fetch-btn"); // Button to trigger API call
const apodContainer = document.querySelector("#apod-container"); // Container to display the APOD
const favContainer = document.querySelector("#favorites-container"); // Container to display saved favorites
const staticFavouriteButton = document.querySelector("#static-favourite-btn"); // Static Add to Favourites button

// Event listener for form submission
fetchButton.addEventListener("click", fetchAPOD);

// Static "Add to Favourites" button functionality
staticFavouriteButton.addEventListener("click", () => {
  const apodData = JSON.parse(staticFavouriteButton.dataset.apod || "{}");

  // Check if data exists
  if (!apodData.title) {
    alert("Please fetch an APOD image first!");
    return;
  }

  addToFavourites(apodData);
});

// Function to fetch Astronomy Picture of the Day from API
function fetchAPOD() {
  const date = dateInput.value;
  if (!date) {
    alert("Please enter a valid date");
    return;
  }

  // API call to get APOD data
  fetch(`${apiUrl}?api_key=${apiKey}&date=${date}`)
    .then((response) => response.json())
    .then((data) => displayAPOD(data))
    .catch((error) => console.error("Error fetching data:", error));
}

// Function to display APOD
function displayAPOD(data) {
  // Check if the data contains the required fields
  if (data.media_type !== "image") {
    alert("The selected date does not contain an image.");
    return;
  }

  // Create HTML elements for APOD display
  const { title, date, explanation, url, hdurl } = data;
  apodContainer.innerHTML = `
        <div class="card mb-4">
            <img src="${url}" class="card-img-top" alt="${title}" onclick="openHDImage('${hdurl}')">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${explanation}</p>
                <p class="card-text"><small class="text-muted">${date}</small></p>
            </div>
        </div>
    `;

  // Update static button dataset with APOD data
  staticFavouriteButton.dataset.apod = JSON.stringify(data);
}

// Open HD image when clicked
function openHDImage(hdurl) {
  window.open(hdurl, "_blank");
}

// Function to add the current APOD to local storage
function addToFavourites(data) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  // Check if the item is already in favourites to avoid duplicates
  const alreadyExists = favourites.some((fav) => fav.title === data.title);
  if (alreadyExists) {
    alert("This picture is already in your favourites.");
    return;
  }

  favourites.push(data); // Add the data to favourites
  localStorage.setItem("favourites", JSON.stringify(favourites)); // Save updated favourites to localStorage
  alert("Added to Favourites!");
}
