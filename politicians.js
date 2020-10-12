
// Constants
const body = document.body;
const toggle = document.querySelector('.toggle');
const toggleBall = toggle.querySelector('.toggle-ball');
const overview = document.querySelector('.overview');
const searchBar = document.querySelector('.search-wrapper input');
const sortButton = document.querySelector('button');
let hpCharacters = [];
let filteredCharacters = [];

// Harry Potter API call
const loadCharacters = async() => {
  try {
    const res = await fetch('http://hp-api.herokuapp.com/api/characters');
    hpCharacters = await res.json();
    sortByName(hpCharacters);

    // hpCharacters.forEach(item => {
    //   console.log(item.house);
    // });
    displayCharacters(hpCharacters);
  }
  catch(err) {
    console.error(err);
  }
};

// Sorts items by name
const sortByName = (characters) => {
  characters.sort((a, b) => {
    let firstVar = a.actor.toLowerCase();
    let secondVar = b.actor.toLowerCase();

    if (firstVar < secondVar) {
      return -1;
    }
    else if (firstVar > secondVar) {
      return 1;
    }
    else {
      return 0;
    }
  });
};

// sort by house
sortButton.onclick = () => {
  let sorting = filteredCharacters.sort((a, b) => {
    let firstVar = a.house.toLowerCase();
    let secondVar = b.house.toLowerCase();

    if (firstVar < secondVar) {
      return -1;
    }
    else if (firstVar > secondVar) {
      return 1;
    }
    else {
      return 0;
    }
  });
  // hpCharacters.forEach(item => {
    //   console.log(item.house);
    // });
    displayCharacters(sorting);
};

// Displays characters
const displayCharacters = characters => {
  const htmlString = characters.map(character => {
    return `<div class="overview-box">
    <div class="image-div frame">
    <img src="${character.image}" alt="myImage">
    </div>
    <article class="person-text">
    <p class="name">${character.actor}</p>
    <p class="tele">${character.yearOfBirth}</p>
    <p class="state">${character.house}</p>
    </article>
    </div>`;
  }).join('');
  overview.innerHTML = htmlString;
};

// searchbar
searchBar.onkeyup = e => {
  const searchString = e.target.value.toLowerCase().trim();
  filteredCharacters = hpCharacters.filter(character => {
    return character.actor.toLowerCase().includes(searchString) || character.house.toLowerCase().includes(searchString);
  });
  displayCharacters(filteredCharacters);
};


// Toggles dark/light mode
toggle.onclick = () => {
  if (body.classList.contains('dark')) {
    body.classList.replace('dark', 'light');
    toggleBall.style.transform = `translateX(24px)`;
  }
  else {
    body.classList.replace('light', 'dark');
    toggleBall.style.transform = `translateX(0px)`;
  }
};

// loads characters
window.addEventListener('DOMContentLoaded', () => {
loadCharacters();
});

