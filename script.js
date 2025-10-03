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

buyPackBtn.addEventListener("click", openPack);

function openPack() {
  displayArea.innerHTML = "";
  const packCards = [];

  for (let i = 0; i < 10; i++) {
    const randomCard = cardPool[Math.floor(Math.random() * cardPool.length)];
    packCards.push(randomCard);
  }

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

  // Save to inventory (localStorage)
  let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  inventory = inventory.concat(packCards);
  localStorage.setItem("inventory", JSON.stringify(inventory));
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
