

function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {

        for (const state of states){
            ufSelect.innerHTML += ` <option value="${state.id}">${state.nome}</option> ` 
        }

    })
}

populateUFs()


function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML ="<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then(cities => {

        for (const city of cities){
            citySelect.innerHTML += ` <option value="${city.nome}">${city.nome}</option> ` 
        }
        citySelect.disabled = false
    })

}


document
    .querySelector("select[name=uf]")
    .addEventListener("change",getCities)


// itens de coleta
//pegar tods os li

const itensToCollect = document.querySelectorAll(".items-grid li")

for (const item of itensToCollect){
    item.addEventListener("click",HandleSelectedItem)
}
    
const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function HandleSelectedItem(event){
    const itemLi = event.target
    //adicionar ou remover um classe javascript
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id
    



    //verificar se existem itens selecionados
    // se sim pegar os itens selecionados

    const alredySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })

    //se ja tiver selecionado tirar seleção
    if (alredySelected >= 0 ) {
 
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

       
    
        selectedItems = filteredItems

    } else{
        // se não tiver, adicionar
        selectedItems.push(itemId)

    }

    console.log(selectedItems)
    //atualizar o campo escondido com os itens selecionados

    collectedItems.value = selectedItems
}
