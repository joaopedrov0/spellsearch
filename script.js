const baseURL = 'https://www.dnd5eapi.co/api/spells/'

setTimeout(loadSpells(), 3000)

let spells

function loadSpells(){
    let request = new XMLHttpRequest()
    request.open('GET', baseURL)
    request.responseType = 'json'
    request.send()

    request.onload = () => {
        spells = request.response.results
        loadOptions()
    }
}


let loadOptions = () => {
    console.log('loadOptions() enter')
    let options = document.querySelector('#spell')
    for(let i = 0; i < spells.length; i++){
        console.log('loop enter')
        options.innerHTML += `<option value="${spells[i].index}">${spells[i].name}</option>`
    }
}

let gerarFicha = () => {
    let spellSelected = document.querySelector('#spell').value

    let request = new XMLHttpRequest()
    request.open('GET', baseURL + spellSelected)
    request.responseType = 'json'
    request.send()

    request.onload = () => {
        let spell = request.response
        console.log(spell)
        let box = document.querySelector('section')
        if(spell.damage){
            box.innerHTML += `
            <div class="ficha">
                <h2 id="spellName">${spell.name}</h2>
                <small id="level">Spell ${spell.level} level of ${spell.school.name}</small>
                <ul>
                    <li id="conjuradores">${gerarClasses(spell)}</li>
                    <li id="tempo">${spell.casting_time}</li>
                    <li id="alcance">${spell.range}</li>
                    <li id="componentes">${spell.components.join(', ')}</li>
                    <dd id="material">${spell.material}</dd>
                    <li id="duracao">${spell.duration}</li>
                </ul>
                <p id="desc">${spell.desc}</p>
                <small id="higher_level">${spell.higher_level}</small>
                <div id="damageArea">
                    <ul>
                        <li id="damage-type">${spell.damage.damage_type.name}</li>
                        <ul>
                            ${gerarDamageAtSlotLevel(spell)}
                        </ul>
                    </ul>
                </div>
            </div>
            `
        } else if(spell.higher_level) {
            box.innerHTML += `
            <div class="ficha">
                <h2 id="spellName">${spell.name}</h2>
                <small id="level">Spell ${spell.level} level of ${spell.school.name}</small>
                <ul>
                    <li id="conjuradores">Classes: ${gerarClasses(spell)}</li>
                    <li id="tempo">Casting time: ${spell.casting_time}</li>
                    <li id="alcance">Range: ${spell.range}</li>
                    <li id="componentes">Components: ${spell.components.join(', ')}</li>
                    <dd id="material">Material: ${spell.material} (if "undefined, this spell don't need material")</dd>
                    <li id="duracao">Duration: ${spell.duration}</li>
                </ul>
                <p id="desc">${spell.desc}</p>
                <small id="higher_level">${spell.higher_level}</small>
            </div>
            `
        } else if(spell.heal_at_slot_level) {
            box.innerHTML += `
            <div class="ficha">
                <h2 id="spellName">${spell.name}</h2>
                <small id="level">Spell ${spell.level} level of ${spell.school.name}</small>
                <ul>
                    <li id="conjuradores">${gerarClasses(spell)}</li>
                    <li id="tempo">${spell.casting_time}</li>
                    <li id="alcance">${spell.range}</li>
                    <li id="componentes">${spell.components.join(', ')}</li>
                    <dd id="material">${spell.material}</dd>
                    <li id="duracao">${spell.duration}</li>
                </ul>
                <p id="desc">${spell.desc}</p>
                <small id="higher_level">${spell.higher_level}</small>
            </div>
            `
        } else {
            box.innerHTML += `
            <div class="ficha">
                <h2 id="spellName">${spell.name}</h2>
                <small id="level">Spell ${spell.level} level of ${spell.school.name}</small>
                <ul>
                    <li id="conjuradores">${gerarClasses(spell)}</li>
                    <li id="tempo">${spell.casting_time}</li>
                    <li id="alcance">${spell.range}</li>
                    <li id="componentes">${spell.components.join(', ')}</li>
                    <dd id="material">${spell.material}</dd>
                    <li id="duracao">${spell.duration}</li>
                </ul>
                <p id="desc">${spell.desc}</p>
            `
        }
        
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