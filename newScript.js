setTimeout(() => {
    let modal = document.querySelector('.modal')
    modal.style.display = 'none'

    renderFilter()
}, 5000)

let renderOptions = () => {

    let options = document.querySelector('#spell')


    for(let i = 0; i < spells.length; i++){
        options.innerHTML += `<option value="${spells[i].index}">${spells[i].name}</option>`
    }
}

//spells
let spells

let urlBase = 'https://www.dnd5eapi.co/api/'

let renderFilter = () => {
    document.querySelector('#spell').innerHTML = ''
    spells = ''

    let complement = ''

    let level = document.querySelector('#levels')
    let classes = document.querySelector('#classes')

    if(classes.value){
        complement += `classes/${classes.value}/spells`
    } else {
        complement += 'spells'
    }

    if(level.value){
        complement += `?level=${level.value}`
    }



    let request = new XMLHttpRequest()
    request.open('GET', urlBase + complement)
    request.responseType = 'json'
    request.send()

    request.onload = () => {
        spells = request.response.results
        console.log(spells)
        renderOptions()
    }
}

function gerarFicha(){
    let spell = document.querySelector('#spell')

    let container = document.querySelector('section')

    let request = new XMLHttpRequest()
    request.open('GET', urlBase + 'spells/' + spell.value)
    request.responseType = 'json'
    request.send()

    request.onload = () => {
        let spell = request.response
        console.log(spell)

        let damageArea

        () => {
            if(spell.damage){
                damageArea = `<div id="damageArea">
                    <ul>
                        <li id="damage-type">${spell.damage.damage_type.name}</li>
                        <ul>
                            ${gerarDamageAtSlotLevel(spell)}
                        </ul>
                    </ul>
                </div>`
            } else {
                damageArea = ''
            }
        }

        container.innerHTML = `
        <div class="ficha">
                <h2 id="spellName">${spell.name}</h2>
                <small id="level">Spell ${spell.level} level of ${spell.school.name}</small>
                <ul>
                    <li id="conjuradores">Classes: ${gerarClasses(spell)}</li>
                    <li id="tempo">Casting time: ${spell.casting_time}</li>
                    <li id="alcance">Range: ${spell.range}</li>
                    <li id="componentes">Components: ${spell.components.join(', ')}</li>
                    <dd id="material">Material: ${spell.material} (if "undefined", this spell don't need material)</dd>
                    <li id="duracao">Duration: ${spell.duration}</li>
                    <li id="concentracao">Concentration: ${String(spell.concentration)}</li>
                    <li id="ritual">Ritual: ${String(spell.ritual)}</li>
                </ul>
                <p id="desc">${spell.desc}</p>
                <small id="higher_level">${spell.higher_level}</small>
                ${damageArea}
            </div>
        ` + container.innerHTML
    }
}

function gerarClasses(spell) {
    let classes = spell.classes
    let res = []
    for(let i = 0; i < classes.length; i++){
        res.push(classes[i].name)
    }
    res.join(', ')
    return String(res)
}
function gerarDamageAtSlotLevel(spell) {
    let dasl = spell.damage.damage_at_slot_level
    let res = ''
    for(let i = spell.level; i <= 9; i++){
        res += `<li>${i}: ${dasl[String(i)]}</li>`
    }
    return res
}
