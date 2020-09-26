// Function to populate States from the API
function populateUFs() {
    // Assigning DOM element
    const ufSelect = document.querySelector("select[name=uf]");
    // Fetching States from public API
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json()) // Wait promise to give response and JSONfy it 
        .then( states => {        // JSONfying is a promise, assigning response to States variable
            for ( const state of states ) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` 
            }                     // States are populated in Python like fashion 
        })
}
// Populating States in create-point.html page
populateUFs();
// Function to populate cities from chosen State
function getCities(event) {
    // Assigning DOM elements
    const citySelect = document.querySelector("select[name=city]");
    citySelect.innerHTML = "<option>Selecione a cidade</option>";
    citySelect.disabled = true;   // Kept disabled before State choice
    const stateInput = document.querySelector("input[name=state]");
    const ufValue = event.target.value;
    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;
    // Dynamically generating web address
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    // Fetching Cities using generated URL
    fetch(url)
        .then( res => res.json()) // Wait promise to give response and JSONfy it
        .then( cities => {        // JSONfying is a promise, assigning response to States variable
           for ( const city of cities ) {
              citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
           }                      // States are populated in Python like fashion
           citySelect.disabled = false; // Able it now since State was chosen
      })

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");
let selectedItems = [];

function handleSelectedItem(event) {
    const itemLi = event.target;
    itemLi.classList.toggle("selected");
    const itemId = itemLi.dataset.id;

    const alreadySelected = selectedItems.findIndex( item => item == itemId );
    console.log(alreadySelected)

    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( item => item != itemId );
        selectedItems = filteredItems;
    } else {
        selectedItems.push(itemId);
    }

    console.log(selectedItems);
    collectedItems.value = selectedItems;
}