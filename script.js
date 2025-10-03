const cardPool = [
  "images/cards/bulbasaur.png",
  "images/cards/charmander.png",
  "images/cards/squirtle.png",
  "images/cards/pikachu.png",
  "images/cards/mewtwo.png",
  "images/cards/eevee.png",
  "images/cards/snorlax.png",
  "images/cards/gengar.png",
  "images/cards/jigglypuff.png",
  "images/cards/dragonite.png"
];

const buyPackBtn = document.getElementById("buyPack");
const displayArea = document.getElementById("displayArea");
const inventoryDiv = document.getElementById("inventory");

// Load saved inventory
let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
renderInventory();

buyPackBtn.addEventListener("click", openPack);

function openPack() {
  displayArea.innerHTML = ""; // clear display
  const packCards = [];

  // pick 10 random cards
  for (let i = 0; i < 10; i++) {
    const randomCard = cardPool[Math.floor(Math.random() * cardPool.length)];
    packCards.push(randomCard);
  }

  // Show 1 by 1, then grid
  let index = 0;
  const interval = setInterval(() => {
    displayArea.innerHTML = "";
    const img = document.createElement("img");
    img.src = packCards[index];
    img.className = "card-big";
    displayArea.appendChild(img);
    index++;

    if (index === packCards.length) {
      clearInterval(interval);
      setTimeout(() => showGrid(packCards), 1000);
    }
  }, 1200);

  // Save to inventory
  inventory = inventory.concat(packCards);
  localStorage.setItem("inventory", JSON.stringify(inventory));
  renderInventory();
}

function showGrid(cards) {
  displayArea.innerHTML = "";
  const grid = document.createElement("div");
  grid.className = "cards-grid";

  cards.forEach(card => {
    const img = document.createElement("img");
    img.src = card;
    grid.appendChild(img);
  });

  displayArea.appendChild(grid);
}

function renderInventory() {
  inventoryDiv.innerHTML = "";
  inventory.forEach(card => {
    const img = document.createElement("img");
    img.src = card;
    inventoryDiv.appendChild(img);
  });
}
