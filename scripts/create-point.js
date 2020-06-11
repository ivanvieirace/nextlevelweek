//Dados de Entidade - Início

function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  const UrlApiEstados =
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

  fetch(UrlApiEstados)
    .then((res) => res.json())
    .then((states) => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const ufValue = event.target.value;
  const indexOfSelectedState = event.target.selectedIndex;
  const urlApiMunicipios = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  stateInput.value = event.target.options[indexOfSelectedState].text;
  citySelect.innerHTML = "<option>Selecione a Cidade</option>";
  citySelect.disabled = true;

  fetch(urlApiMunicipios)
    .then((res) => res.json())
    .then((cities) => {
      for (let city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }

      citySelect.disabled = false;
    });
}

populateUFs();

document.querySelector("select[name=uf]").addEventListener("change", getCities);

//Dados de Entidade - Fim

// Itens de Coleta - Início

const itensToCollect = document.querySelectorAll(".itens-grid li");

for (const item of itensToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

const colectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;

  itemLi.classList.toggle("selected");

  const itemId = event.target.dataset.id;

  const alreadySelected = selectedItems.findIndex((item) => {
    const itemFound = item == itemId;
    return itemFound;
  });

  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter((item) => {
      const itemIsDiferent = item != itemId;
      return itemIsDiferent;
    });
    selectedItems = filteredItems;
  } else {
    selectedItems.push(itemId);
  }

  colectedItems.value = selectedItems;
}

// Itens de Coleta - Fim
