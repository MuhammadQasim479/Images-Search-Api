const accessKey = "PKhM0xht9Wl6qqox5H1fO3DV-ef4DmGYwN5Cm5CSNu8";
const searchForm = document.querySelector("form");
const imagesContainer = document.querySelector(".images-container");
const searchInput = document.querySelector(".search-input");
const loadMorebtn = document.querySelector(".loadMorebtn");

const results = " ";
let page = 1;
// Function to fetch images to Unsplash API

const fetchImages = async (query, pageNo) => {
    if (pageNo === 1) {
        imagesContainer.innerHTML = " ";
    }

    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    data.results.forEach(photo => {
        //creating image div
        const imageElement = document.createElement('div');
        imageElement.classList.add('imageDiv');
        imageElement.innerHTML = `<img src = "${photo.urls.regular}"/>`;

        // creating overlay element:)
        const overlayElement = document.createElement('div');
        overlayElement.classList.add('overlay');

        //Creating overlay text
        const overlayText = document.createElement('h3');
        overlayText.innerText = `${photo.alt_description}`;

        overlayElement.appendChild(overlayText);

        imageElement.appendChild(overlayElement);

        imagesContainer.appendChild(imageElement);
    });

    if (data.total_pages === pageNo) {
        loadMorebtn.style.display = "none";
    }
    else {
        loadMorebtn.style.display = " block";
    }
}


// Adding Event Listener to search Form:)
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if (inputText !== ' ') {
        page = 1;
        fetchImages(inputText, page);
    }
    else {
        imagesContainer.innerHTML = `<h2> Please enter a search query.</2>`
    }

})

// Adding event listener to load more button to  fetch more images

loadMorebtn.addEventListener("click", () => {
    fetchImages(searchInput.value.trim(), ++page);
});