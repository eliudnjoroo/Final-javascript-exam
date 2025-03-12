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

let nameOrId;
let inputed;

let pData;

async function poke(url){
  try{
  const res = await fetch(url);
  pData = await res.json();
  }catch(e){
    alert("Pokémon not found");
  }
  pName.textContent = pData.name.toUpperCase();
  pId.textContent = "#"+pData.id
  height.textContent = "height: "+pData.height
  weight.textContent = "weight: "+pData.weight
  const sprite = pData.sprites
  let mysrc= sprite.front_default;
  const cont = document.getElementById("cont");
  cont.innerHTML =`<img src="${mysrc}" id="sprite">`
  myTypes(pData.types)
  stats(pData.stats);
}

const stats = stats => {
  let arr = [];
  stats.forEach( st =>{
  let data = `${st.base_stat}`;
    arr.push(data);
  })
  hp.textContent = arr[0];
  attack.textContent = arr[1];
  def.textContent = arr[2];
  sa.textContent = arr[3];
  sd.textContent = arr[4];
  speed.textContent = arr[5];
}

const myTypes = data => {
  types.innerHTML = "";
  let ty = [];
  for(let dat in data){
    ty.push(`<span class="type">${data[dat].type.name.toUpperCase()}</span>`);
  }
  ty.forEach(el => types.innerHTML += el);
}

searchBtn.addEventListener("click",e => {
  e.target.classList.remove("anim");
  void e.target.offsetWidth;
  e.target.classList.add("anim")
  inputed = searchInput.value;
  nameOrId = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inputed}`;
  if(searchInput.value === ""){
    alert("please enter a name or id");
  }else{
     let toSearch = nameOrId.toLowerCase();
     poke(toSearch);
  }
})