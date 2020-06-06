function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  const UrlApiEstados =
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

  fetch(UrlApiEstados)
    .then((res) => res.json())
    .then((states) => {
      for (let state of states) {
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

  fetch(urlApiMunicipios)
    .then((res) => res.json())
    .then((cities) => {
      for (let city of cities) {
        citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
      }

      citySelect.disabled = false;
    });
}

populateUFs();

document.querySelector("select[name=uf]").addEventListener("change", getCities);
