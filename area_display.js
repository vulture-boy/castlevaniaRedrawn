var selectedArea = null

var elems = null

var blankArea = {
    title: "New",
    ident: "",
    artist: "",
    url: "",
    post_url: "",
    box: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    },
    offset: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    },
    pan: "vertical",
    type: "town",
    zoom: 2,
    teleporters: []
}

document.addEventListener('DOMContentLoaded', init)

function init () {
    registerElems()
    setEventOnStaticInputs()
    updateAreaLists()
    selectArea(kantoAreas[0])
}

function formSubmit (e) {
    e.preventDefault()
}

function setEventOnStaticInputs () {
    var elems = document.querySelectorAll('input, select')
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i]
        elem.addEventListener('change', saveData)
    }
}

function registerElems () {
    elems = {
        order: document.querySelector('#areaForm [name="order"]'),
        title: document.querySelector('#areaForm [name="title"]'),
        ident: document.querySelector('#areaForm [name="ident"]'),
        type: document.querySelector('#areaForm [name="type"]'),
        artist: document.querySelector('#areaForm [name="artist"]'),
        url: document.querySelector('#areaForm [name="url"]'),
        post_url: document.querySelector('#areaForm [name="post_url"]'),
        box_x: document.querySelector('#areaForm [name="box_x"]'),
        box_y: document.querySelector('#areaForm [name="box_y"]'),
        box_width: document.querySelector('#areaForm [name="box_width"]'),
        box_height: document.querySelector('#areaForm [name="box_height"]'),
        offset_box_x: document.querySelector('#areaForm [name="offset_box_x"]'),
        offset_box_y: document.querySelector('#areaForm [name="offset_box_y"]'),
        offset_box_width: document.querySelector('#areaForm [name="offset_box_width"]'),
        offset_box_height: document.querySelector('#areaForm [name="offset_box_height"]'),
        pan: document.querySelector('#areaForm [name="pan"]'),
        zoom: document.querySelector('#areaForm [name="zoom"]')
    }
}

function updateAreaLists () {
    generateKantoList()
    generateInteriorList()
    generateSeviiList()
}

function generateKantoList () {
    kantoAreas.sort((a, b) => a.order - b.order)
    var kantoListHTML = []
    for (var i = 0; i < kantoAreas.length; i++) {
        area = kantoAreas[i]
        var className =  selectedArea && selectedArea.ident === area.ident ? 'selected' : !area.artist ? 'warning' : ''
        kantoListHTML.push(`
            <li>
                <button onclick="clickArea('${area.ident}')" data-ident="${area.ident}" class="${className}">
                    <span>${area.title}</span>
                </button>
            </li>
        `)
    }
    var kantoListElem = document.querySelector('#AreaListKanto')
    kantoListElem.innerHTML = kantoListHTML.join('')
}
function generateInteriorList () {
    interiorAreas.sort((a, b) => a.order - b.order)
    var interiorListHTML = []
    for (var i = 0; i < interiorAreas.length; i++) {
        area = interiorAreas[i]
        var className = selectedArea && selectedArea.ident === area.ident ? 'selected' : !area.artist ? 'warning' : ''
        interiorListHTML.push(`
            <li>
                <button onclick="clickArea('${area.ident}')" data-ident="${area.ident}" class="${className}">
                    <span>${area.title}</span>
                </button>
            </li>
        `)
    }
    var interiorListElem = document.querySelector('#AreaListInterior')
    interiorListElem.innerHTML = interiorListHTML.join('')
}
function generateSeviiList () {
    seviiAreas.sort((a, b) => a.order - b.order)
    var seviiListHTML = []
    for (var i = 0; i < seviiAreas.length; i++) {
        area = seviiAreas[i]
        var className =  selectedArea && selectedArea.ident === area.ident ? 'selected' : !area.artist ? 'warning' : ''
        seviiListHTML.push(`
            <li>
                <button onclick="clickArea('${area.ident}')" data-ident="${area.ident}" class="${className}">
                    <span>${area.title}</span>
                </button>
            </li>
        `)
    }
    var seviiListElem = document.querySelector('#AreaListSevii')
    seviiListElem.innerHTML = seviiListHTML.join('')
}

function clickArea (ident) {
    selectArea(getAreaByIdent(ident))
}

function selectArea (area) {
    selectedArea = area
    loadSelectedAreaDataIntoElements()
    generateTeleporterList()
    generateKantoList()
    generateInteriorList()
    generateSeviiList()
}

function getAreaByIdent (ident) {
    var area = null
    area = kantoAreas.find(x => x.ident === ident)
    if (area) { return area }
    area = interiorAreas.find(x => x.ident === ident)
    if (area) { return area }
    area = seviiAreas.find(x => x.ident === ident)
    if (area) { return area }
}

function updateSelectedArea () {
    if (selectedArea) {
        generateTeleporterList()
    }
}

function updateSelectedAreaIdent () {
    if (selectedArea) {
        if (!selectedArea.ident) {
            selectedArea.ident = toSnakeCase(elems.title.value)
            elems.ident.value = selectedArea.ident
        }
    }
}

function loadSelectedAreaDataIntoElements () {
    if (selectedArea) {
        elems.order.value = selectedArea.order || null
        elems.title.value = selectedArea.title || null
        elems.ident.value = selectedArea.ident || null
        elems.type.value = selectedArea.type || null
        elems.artist.value = selectedArea.artist || null
        elems.url.value = selectedArea.url || null
        elems.post_url.value = selectedArea.post_url || null
        elems.box_x.value = selectedArea.box.x || null
        elems.box_y.value = selectedArea.box.y || null
        elems.box_width.value = selectedArea.box.width || null
        elems.box_height.value = selectedArea.box.height || null
        elems.offset_box_x.value = selectedArea.offset.x || null
        elems.offset_box_y.value = selectedArea.offset.y || null
        elems.offset_box_width.value = selectedArea.offset.width || null
        elems.offset_box_height.value = selectedArea.offset.height || null
        elems.pan.value = selectedArea.pan || null
        elems.zoom.value = selectedArea.zoom || null
    }
}
function saveData () {
    if (selectedArea) {
        selectedArea.order = parseInt(elems.order.value)
        selectedArea.title = elems.title.value
        selectedArea.ident = elems.ident.value
        selectedArea.type = elems.type.value
        selectedArea.artist = elems.artist.value
        selectedArea.url = elems.url.value
        selectedArea.post_url = elems.post_url.value
        selectedArea.box.x = parseInt(elems.box_x.value)
        selectedArea.box.y = parseInt(elems.box_y.value)
        selectedArea.box.width = parseInt(elems.box_width.value)
        selectedArea.box.height = parseInt(elems.box_height.value)
        selectedArea.offset.x = parseInt(elems.offset_box_x.value)
        selectedArea.offset.y = parseInt(elems.offset_box_y.value)
        selectedArea.offset.width = parseInt(elems.offset_box_width.value)
        selectedArea.offset.height = parseInt(elems.offset_box_height.value)
        selectedArea.pan = elems.pan.value
        selectedArea.zoom = parseInt(elems.zoom.value)

        var teleporters = []
        var teleporterElems = document.querySelectorAll('#teleporters li')
        for (var i = 0; i < teleporterElems.length; i++) {
            var elem = teleporterElems[i]
            teleporters.push({
                ident: elem.querySelector(`[name="tele_${i}_ident"]`).value,
                x: elem.querySelector(`[name="tele_${i}_box_x"]`).value,
                y: elem.querySelector(`[name="tele_${i}_box_y"]`).value,
                width: elem.querySelector(`[name="tele_${i}_box_width"]`).value,
                height: elem.querySelector(`[name="tele_${i}_box_height"]`).value
            })
        }
        selectedArea.teleporters = teleporters

        updateAreaLists()
    }
}

function updateTeleporterTranslateTool () {
    var xElem = document.querySelector('#TeleporterXTranslate')
    var xOutputElem = document.querySelector('#TeleporterXTranslateOutput')
    var x = parseInt(xElem.value)
    var yElem = document.querySelector('#TeleporterYTranslate')
    var yOutputElem = document.querySelector('#TeleporterYTranslateOutput')
    var y = parseInt(yElem.value)

    if (selectedArea) {
        xOutputElem.value = (selectedArea.box.x + selectedArea.offset.x) - x
        yOutputElem.value = (selectedArea.box.y + selectedArea.offset.y) - y
    }

}

function generateTeleporterList () {
    if (selectedArea) {
        var list = document.querySelector('#teleporters')
        if (list) {
            var towrite = ''
            for (var i = 0; i < selectedArea.teleporters.length; i++) {
                var teleporter = selectedArea.teleporters[i]
                towrite += `<li data-index="${i}">
                    <button onclick="removeTeleporter(${i})">Remove</button>
                    <label><span></span>Target Ident
                        <input name="tele_${i}_ident" placeholder="e.g. viridian_gym" value="${teleporter.ident}" onchange="saveData()" />
                    </label>
                    <div>
                        <label><span>x</span><input name="tele_${i}_box_x" type="number" value="${teleporter.x}" onchange="saveData()"></label>
                        <label><span>y</span><input name="tele_${i}_box_y" type="number" value="${teleporter.y}" onchange="saveData()"></label>
                        <label><span>width</span><input name="tele_${i}_box_width" type="number" value="${teleporter.width}" onchange="saveData()"></label>
                        <label><span>height</span><input name="tele_${i}_box_height" type="number" value="${teleporter.height}" onchange="saveData()"></label>
                    </div>
                </li>`
            }
            list.innerHTML = towrite
        }
    }
}

function addTeleporter () {
    if (selectedArea) {
        selectedArea.teleporters.push({
            ident: '',
            x: 0,
            y: 0,
            width: 0,
            height: 0
        })
        generateTeleporterList()
    }
    
}

function removeTeleporter (index) {
    if (selectedArea) {
        selectedArea.teleporters.splice(index, 1)
        generateTeleporterList()
    }
}

function removeArea () {
    if (selectedArea) {
        var index = kantoAreas.findIndex(x => x.ident === selectedArea.ident)
        if (index > -1) { kantoAreas.splice(index, 1); generateKantoList() }
        index = seviiAreas.findIndex(x => x.ident === selectedArea.ident)
        if (index > -1) { seviiAreas.splice(index, 1); generateSeviiList() }
        index = interiorAreas.findIndex(x => x.ident === selectedArea.ident)
        if (index > -1) { interiorAreas.splice(index, 1); generateInteriorList() }
        selectArea(kantoAreas[0])
    }
}

function addKantoArea () {
    selectedArea = null
    kantoAreas.push(JSON.parse(JSON.stringify({...blankArea, order: kantoAreas.length})))
    // clearElems()
    generateKantoList()
    selectArea(kantoAreas[kantoAreas.length - 1])
}
function addInteriorArea () {
    selectedArea = null
    interiorAreas.push(JSON.parse(JSON.stringify({...blankArea, order: interiorAreas.length})))
    // clearElems()
    generateInteriorList()
    selectArea(interiorAreas[interiorAreas.length - 1])
}
function addSeviiArea () {
    selectedArea = null
    seviiAreas.push(JSON.parse(JSON.stringify({...blankArea, order: seviiAreas.length})))
    // clearElems()
    generateSeviiList()
    selectArea(seviiAreas[seviiAreas.length - 1])
    
}

function doOutput () {
    var elem = document.querySelector('#output')
    if (elem) {
        var areas = ''
        areas += `var kantoAreas = ${JSON.stringify(kantoAreas, null, 2)} \n`
        areas += `var interiorAreas = ${JSON.stringify(interiorAreas, null, 2)} \n`
        areas += `var seviiAreas = ${JSON.stringify(seviiAreas, null, 2)} \n`
        elem.value = areas.replace(/^[\t ]*"[^:\n\r]+(?<!\\)":/gm, function (match) {
            return match.replace(/"/g, "").replace("'", '’');
        });
    }
}

function toSnakeCase (string) {
    var str = string || ''
    var strArr = str.split(' ');
    var snakeArr = strArr.reduce((acc, val) => {
        return acc.concat(val.toLowerCase());
    }, []);
    return snakeArr.join('_');
}
    