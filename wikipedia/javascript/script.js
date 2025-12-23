const search = document.querySelector(".search-input");
const form = document.querySelector(".search-container");
const searchResult = document.querySelector(".results");
const errorMsg = document.querySelector(".alert-error");

const apiURL =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchValue = search.value.trim();
  
  if (searchValue === "") {
    errorMessage("Search cannot be empty. Please enter a search term.");
  } else {
    // Clear previous error if any
    errorMsg.style.display = "none";
    getResult(searchValue);
  }
});

async function getResult(searchVal) {
  try {
    const response = await fetch(apiURL + searchVal);
    const results = await response.json();

    if (results.query.search.length === 0) {
      errorMessage("No results found. Please try another search term.");
      searchResult.innerHTML = "";
    } else {
      displayData(results);
    }
  } catch (err) {
    console.error(err);
    errorMessage("An error occurred while fetching data.");
  }
}

function errorMessage(msg) {
  errorMsg.style.display = "block";
  errorMsg.textContent = msg;
  // Clear results on error
  searchResult.innerHTML = ""; 
}

function displayData(results) {
  let output = "";
  results.query.search.forEach((result) => {
    let resultURL = `https://en.wikipedia.org/?curid=${result.pageid}`;
    output += `
      <div class="result-card">
        <a href="${resultURL}" target="_blank" class="result-title">${result.title}</a>
        <a href="${resultURL}" target="_blank" class="result-link">${resultURL}</a>
        <p class="result-snippet">${result.snippet}...</p>
      </div>
    `;
  });
  searchResult.innerHTML = output;
}
