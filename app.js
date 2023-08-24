const characterList = document.querySelector(".character-list");
const genderButtons = document.querySelectorAll(".gender-button");
const firstPageBtn = document.getElementById("firstPage");
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");
const lastPageBtn = document.getElementById("lastPage");
const currentPageSpan = document.getElementById("currentPage");

let currentPage = 1;
let currentGender = "";

async function fetchCharacters(page, gender) {
  const url = `https://rickandmortyapi.com/api/character/?page=${page}&gender=${gender}`;
  const response = await fetch(url);
  const data = await response.json();

  characterList.innerHTML = "";

  
  data.results.forEach((character) => {
    const characterDiv = document.createElement("div");
    characterDiv.classList.add("col-md-3", "character");
    characterDiv.style.textAlign = "center";

    const characterImg = document.createElement("img");
    characterImg.src = character.image;
    characterDiv.appendChild(characterImg);

    const characterName = document.createElement("h4");
    characterName.textContent = `Nombre: ${character.name}`;
    characterDiv.appendChild(characterName);

    const characterGender = document.createElement("p");
    characterGender.textContent = `Género: ${character.gender}`;
    
    characterDiv.appendChild(characterGender);

    const characterSpecies = document.createElement("p");
    characterSpecies.textContent = `Especie: ${character.species}`;
    
    characterDiv.appendChild(characterSpecies);

    const characterStatus = document.createElement("p");
    characterStatus.textContent = `Estado: ${character.status}`;
    
    characterDiv.appendChild(characterStatus);

    const characterOrigin = document.createElement("p");
    characterOrigin.textContent = `Origen: ${character.origin.name}`;
   
    characterDiv.appendChild(characterOrigin);

    const characterLocation = document.createElement("p");
    characterLocation.textContent = `Locación: ${character.location.name}`;
   
    characterDiv.appendChild(characterLocation);

    characterList.appendChild(characterDiv);
  });
     
  currentPageSpan.textContent = `Página ${page}`;
  currentPage = page;
  currentGender = gender;
 

  firstPageBtn.disabled = page === 1;
  prevPageBtn.disabled = page === 1;
  lastPageBtn.disabled = page  === 42;
  nextPageBtn.disabled = page  === 42;
    
}

genderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedGender = button.getAttribute("data-gender");
    fetchCharacters(1, selectedGender);
  });
});

firstPageBtn.addEventListener("click", () => {
  fetchCharacters(1, currentGender);
});

prevPageBtn.addEventListener("click", () => {
  fetchCharacters(currentPage - 1, currentGender);
});

nextPageBtn.addEventListener("click", () => {
  fetchCharacters(currentPage + 1, currentGender);
});

lastPageBtn.addEventListener("click", async () => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${currentPage}&gender=${currentGender}`
  );
  const data = await response.json();
  const lastPage = data.info.pages; 
  fetchCharacters(lastPage, currentGender);
});


fetchCharacters(currentPage, currentGender);
