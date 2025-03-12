const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

const pName = document.getElementById('pokemon-name');
const sd = document.getElementById('special-defense');
const pId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const attack = document.getElementById('attack');
const def = document.getElementById('defense');
const sa = document.getElementById('special-attack');
const hp = document.getElementById('hp');
const speed = document.getElementById('speed');
const cont = document.getElementById("cont");
const div = document.querySelectorAll("div");

let nameOrId;
let inputed;

let pData;

async function poke(url) {
  try {
    const res = await fetch(url);
    pData = await res.json();
  }catch(e) {
    cont.style.backgroundColor = "black";
    cont.style.height = "0";
    alert("Pokémon not found");
    location.reload();
  }
  pName.textContent = "pokemon-name: "+pData.name.toUpperCase();
  pId.textContent = "pokemon-id: #"+pData.id
  height.textContent = "height: "+pData.height
  weight.textContent = "weight: "+pData.weight
  const sprite = pData.sprites
  let mysrc = sprite.front_default;

  let t1;
  let t2;
  let t3;
  let t4;
  let id = setInterval (()=> {
    t1 = setTimeout(function() {
      cont.innerHTML = `<p>loading img.</p>`
    }, 200);
    t2 = setTimeout(function() {
      cont.innerHTML = `<p>loading img..</p>`
    }, 400);
    t3 = setTimeout(function() {
      cont.innerHTML = `<p>loading img...</p>`
    }, 600);
    t4 = setTimeout(function() {
      cont.innerHTML = `<p>loading img....</p>`
    }, 800);
  }, 1000);
  cont.innerHTML = `<img hidden src="${mysrc}" id="sprite">`
  const sprite2 = document.getElementById("sprite");
  sprite2.addEventListener("load", () => {
    setTimeout(() => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearInterval(id);
      div.forEach(d => d.style.minWidth = "40vw");
      setTimeout(()=> {
        myTypes(pData.types)
        stats(pData.stats);
        cont.innerHTML = `<img src="${mysrc}" id="sprite2">`;
      }, 0);
    }, 4000);
  });
}

const stats = stats => {
  let arr = [];
  stats.forEach(st => {
    let data = `${st.base_stat}`;
    arr.push(data);
  })
  hp.textContent = "hp: "+arr[0]+"hp";
  attack.textContent = "attack: "+arr[1];
  def.textContent = "defense: "+arr[2];
  sa.textContent = "special-attack: "+arr[3];
  sd.textContent = "special-defense: "+arr[4];
  speed.textContent = "speed: "+arr[5]+"km/h";
}

const myTypes = data => {
  types.innerHTML = "";
  let ty = [];
  for (let dat in data) {
    ty.push(`<span class="type">${data[dat].type.name.toUpperCase()}</span>`);
  }
  ty.forEach(el => types.innerHTML += el);
}

searchBtn.addEventListener("click", e => {
  e.target.classList.remove("anim");
  void e.target.offsetWidth;
  e.target.classList.add("anim")
  inputed = searchInput.value;
  nameOrId = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inputed}`;
  if (searchInput.value === "") {
    div.forEach(d => d.style.minWidth = "0vw");
    alert("please enter a name or id");
    cont.style.height = 0;
    cont.style.backgroundColor = "black";
  } else {
    div.forEach(d => d.style.minWidth = "0vw");
    cont.style.height = "45vw";
    cont.style.backgroundColor = "transparent";
    let toSearch = nameOrId.toLowerCase();
    poke(toSearch);
  }
})
