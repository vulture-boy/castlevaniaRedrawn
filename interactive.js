/*
*   Retro Redrawn Interactive
*
*   Originally written by Jerky.
*   Refactored for reuse by Tyson Moll (vvvvvvv), 2023.
*
*/

// Core
var app = null
var loading = true; // Whether data is being loaded (e.g. images)
var layersLoaded = 0;
var layersCount = 0;

// Navigation
var zoomLevel = 1 // must be whole number
var currentZoom = 1 //lerp
var zoomCenter = {x: 0, y: 0} // must be whole numbers
var currentPos = {x: 0, y: 0} //lerp

// Map
const NEW_STYLE_NAME = 'new';
const OLD_STYLE_NAME = 'old';
var map = null;
var mapImages = null;
var currentMapStyle = NEW_STYLE_NAME;
var viewport = null;

// Filters
var blurFilter = null
var bulgeFilter = null
var colorFilter = null

// Interaction
var mouseDown = false
var dragging = false
var dragVelocity = { x: 0, y: 0 }
var zoomMousePos = { x: 0, y: 0 }
var previousTouch = null
var previousPinchDistance = 0
var pinchForTick = null

// Tour
var tourMode = false
var tourTransition = false
var areasToTour = []
var tourFadeTimer = 100

// Camera movement
var _defaultCameraSpeed = 0.008
var _defaultTourCameraSpeed = 0.002
var cameraSpeed = _defaultCameraSpeed
var tourCameraSpeed = _defaultTourCameraSpeed

var cameraAnimation = {
    speed: cameraSpeed,
    playing: false,
    progress: 0,
    startPos: {x: 0, y:0 },
    endPos: {x: 0, y: 0},
    startZoom: 1,
    endZoom: 1,
    easing: true
}

// Region-specific properties
// TODO: move region-specific data to separate JS file (integration specific)
// TODO: these are probably better as a struct
var activeLayerIndex = 0;           // Currently active layer index (and initial index)
var layerNames = ['kanto', 'interior', 'sevii'];
var activeAreas = kantoAreas          // Active array of areas
var areaLayers = [kantoAreas, interiorAreas, seviiAreas];
var kantoAreaImages = [];
var kantoAreaOldImages = [];
var interiorAreaImages = [];
var interiorAreaOldImages = [];
var seviiAreaImages = [];
var seviiAreaOldImages = [];
var layerImages = [kantoAreaImages, interiorAreaImages, seviiAreaImages] ;
var layerOldImages = [kantoAreaOldImages, interiorAreaOldImages, seviiAreaOldImages];

// Canvases
// TODO: Add Castlevania canvas
var kantoCanvas = {width: 5472, height: 5904}
var interiorCanvas = {width: 5504, height: 5744}
var seviiCanvas = {width: 4448, height: 6784}
var canvasDimensions = kantoCanvas
var layerCanvases = [kantoCanvas, interiorCanvas, seviiCanvas];

// Start up
layersCount = layerImages.length + layerOldImages.length;
loadImages()
window.addEventListener('wheel', onMouseWheel)
window.addEventListener('resize', onResize)
//

/** Loads new & old images pertaining to a single layer 
 * 
 * @param {Array} areaArray Array of areas particular to a layer.
 * @param {Array} areaImageArray Array of images tied to areas in a layer.
 * @param {Array} areaOldImageArray Array of old versions of images tied to a layer.
 * @param {string} layerSubfolder Subfolder directory name of the layer's new & old images.
*/
function loadLayer (areaArray, areaImageArray, areaOldImageArray, layerSubfolder) {
    for (var i = 0; i < areaArray.length; i++) 
    {
        var area = areaArray[i];

        // Load new images
        var img = new Image();
        img.src = `img/${layerSubfolder}/${NEW_STYLE_NAME}/${area.ident}.png`;
        img.onload = function () { onAreaImageLoaded(areaImageArray); };
        areaImageArray.push(img);

        // Load old images
        var oldimg = new Image();
        oldimg.src = `img/${layerSubfolder}/${OLD_STYLE_NAME}/${area.ident}.png`;
        oldimg.onload = function () { onAreaImageLoaded(areaOldImageArray); };
        areaOldImageArray.push(oldimg);
    }
}

/** Loads all new & old images pertaining to each layer */
function loadImages () {

    for (var i = 0; i < areaLayers.length; i++) {

        // Need areas in the layer to load images
        if (areaLayers[i].length != 0) {
            loadLayer(areaLayers[i], layerImages[i], layerOldImages[i], layerNames[i]);
        }
        else {
            layersCount -= 2;   // Ignore & subtract from this var, otherwise will never finish loading.
        }
    }
}

/** Callback triggered when an image is loaded; checks if images in the layer are done loading. */
function onAreaImageLoaded (areaImageArray) {
    var loadedImages = areaImageArray.filter(x => x.complete).length
    document.querySelector('.loading-bar__inner').style.width = `${(loadedImages / areaImageArray.length) * 100}%`
    if (loadedImages === areaImageArray.length && loading) {  // TODO: need an alternate way to track how many images need loading (counter?)
        layersLoaded += 1;
        if (layersLoaded >= layersCount) {
            completeLoading();
        }
    }
}

/** Completes the loading process. */
function completeLoading () {
    loading = false;

    // Deactivate loading element
    document.querySelector('#loading').classList.remove('active');
    if (window.innerWidth < 768) {  // Hide the menu if screen is not wide enough
        toggleMenu();
    }

    init();
}

/** Initializes the canvas and its content. */
function init () {

    // Construct the PIXI canvas with pixel perfect settings
    try {
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST     // Nearest neighbour scaling
        app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight, antialias: false, view: document.querySelector('#canvas'), autoResize: true })
    } catch (error) {
        // alert('Application cannot start - Please ensure Hardware Acceleration is enabled on your web browser.')
        // document.querySelector('#error').innerHTML =  '<p>Application cannot start - Please ensure Hardware Acceleration is enabled on your web browser.</p><a>View full image</a>'
        document.querySelector('#error').innerHTML =  '<p>Application cannot start - Please ensure Hardware Acceleration is enabled on your web browser.</p>'
        document.querySelector('#error').classList.add('active')
    }

    // Prepare the canvas display
    setupCanvas();

    // Select & focus on a random area & open it in DOM
    var startingArea = activeAreas[Math.floor(Math.random() * activeAreas.length)]
    focusOnArea(startingArea)
    openAreaInDOM(startingArea)

    // Advance an animation frame
    requestAnimationFrame(tick)
}

/** Prepares the canvas display */ 
function setupCanvas () {
    app.stage.removeChildren()

    // Establish PIXI containers
    map = new PIXI.Container()
    mapImages = new PIXI.Container()
    viewport = new PIXI.Container({width: window.innerWidth, height: window.innerHeight})

    buildMap()
    var mapbg = new PIXI.TilingSprite(new PIXI.Texture.from('grid_test.png'), canvasDimensions.width, canvasDimensions.height)
    mapbg.zIndex = -1
    map.addChild(mapbg)
    map.addChild(mapImages)
    var background = new PIXI.Graphics()
    // background.beginFill(0x333333)
    background.beginFill(0x00000)
    background.drawRect(0,0,window.innerWidth, window.innerHeight)
    background.endFill()
    // var background = new PIXI.TilingSprite(new PIXI.Texture.from('grid_test.png'), window.innerWidth, window.innerHeight)
    viewport.addChild(background)
    viewport.addChild(map)
    app.stage.addChild(viewport)

    map.interactive = true
    viewport.interactive = true

    // Establish navigation listeners
    viewport.on('pointerdown', onDragStart)
    viewport.on('pointerup', onDragEnd)
    viewport.on('click', onClick)
    viewport.on('pointerupoutside', onDragEnd)
    viewport.on('pointermove', onDragMove)

    setUpAreas()

    // Prepare filters
    blurFilter = new PIXI.filters.ZoomBlurFilter()
    bulgeFilter = new PIXI.filters.BulgePinchFilter()
    colorFilter = new PIXI.filters.AlphaFilter()

    // Set default position/zoom
    map.scale.set(0.25)
    map.x = -((map.width) - (window.innerWidth / 2)) * map.scale.x
    map.y = -((map.height) - (window.innerHeight / 2)) * map.scale.x

    zoomCenter.x = map.x
    currentPos.x = map.x
    currentPos.y = map.y
    zoomCenter.y = map.y
}

function buildMap () {
    while(mapImages.children[0]) { 
        mapImages.removeChild(mapImages.children[0]);
    }
    for (var i = 0; i < activeAreas.length; i++) {
        var area = activeAreas[i]
        var src = `img/${layerNames[activeLayerIndex]}/${currentMapStyle}/${area.ident}.png`
        var sprite = new PIXI.Sprite.from(src)
        if (currentMapStyle === NEW_STYLE_NAME) {
            sprite.position.set(area.box.x + area.offset.x, area.box.y + area.offset.y)
        } else {
            sprite.position.set(area.box.x, area.box.y)
        }
        mapImages.addChild(sprite)
    }
}

function toggleMapStyle () {
    if (currentMapStyle === NEW_STYLE_NAME) {
        currentMapStyle = OLD_STYLE_NAME;
        buildMap();
    } else {
        currentMapStyle = NEW_STYLE_NAME;
        buildMap();
    }
    updateActiveAreaZone()
}

//** Fetches the current active layer's area images based on the current style */
function getActiveLayerAreaImages() {
    if (currentMapStyle === NEW_STYLE_NAME) {
        return layerImages[activeLayerIndex];
    }
    if (currentMapStyle == OLD_STYLE_NAME) {
        return layerOldImages[activeLayerIndex];
    }
    log.error("current map style not defined as new or old");
    return null 
}

function setUpAreas () {
    if (activeAreas) {
        var areaList = document.querySelector('#areas')
        areaList.innerHTML = ''
        for (var i = 0; i < activeAreas.length; i++) {

            var area = activeAreas[i];
            var activeImages = getActiveLayerAreaImages();
            var areaImage = activeImages[i];
            generateAreaZone(area, areaImage)
            
            // Prepare the HTML block corresponding to an area and its associated credts
            var html = `<li class="area" title="${area.title}" style="background-color:${getColor(area.type)}" onclick="focusOnArea('${area.title}')">
                <div class="area__header" >
                    <span class="material-icons">
                        ${getIcon(area.type)}
                    </span>
                    <span>
                        ${area.title}
                    </span>
                </div>
                <div class="area__info">
                    <div class="area__info__inner">
                        <div class="area__info__img">
                            <a href="${area.url}" target="_blank" title="${area.artist}"><img src="img/profiles/${area.artist.replace('@', '')}.png" alt="${area.artist}" /></a>
                            
                        </div>
                        <div class="area__info__name">
                            <a href="${area.url}" target="_blank" title="${area.artist}">${area.artist}</a>
                            ${area.post_url ? `<a href="${area.post_url}" target="_blank" title="View Post">[View Post]</a>` : ''}
                        </div>
                    </div>
                </div>
            </li>`
            areaList.innerHTML += html
        }
    }
}

/** Creates PIXI Graphics corresponding to new and old versions of an area. */
function generateAreaZone (area, areaImage) {
    if (!area) { console.error('oopsie, no area'); return }
    if (!areaImage) { console.error('oopsie, no area image'); return }
    var oldZone = new PIXI.Graphics()
    oldZone.beginFill(0xffffff, 0)
    oldZone.lineStyle(4, 0xffffff, 0.5, 1)
    oldZone.drawRect(getAreaBox(area, areaImage, OLD_STYLE_NAME));
    oldZone.endFill()
    oldZone.alpha = 0
    area.old_zone = oldZone
    map.addChild(oldZone)

    var newZone = new PIXI.Graphics()
    newZone.beginFill(0xffffff, 0)
    newZone.lineStyle(4, 0xffffff, 0.5, 1)
    newZone.drawRect(getAreaBox(area, areaImage, NEW_STYLE_NAME));
    newZone.endFill()
    newZone.alpha = 0
    area.new_zone = newZone
    map.addChild(newZone)
}

function hideAreaZone (area) {
    if (!area) { console.error('oopsie, no area'); return }
    area.old_zone.alpha = 0
    area.new_zone.alpha = 0
}

function showAreaZone (area) {
    if (!area) { console.error('oopsie, no area'); return }
    if (currentMapStyle === NEW_STYLE_NAME) {
        area.old_zone.alpha = 0
        area.new_zone.alpha = 1
    } else {
        area.old_zone.alpha = 1
        area.new_zone.alpha = 0
    }
}

function updateActiveAreaZone () {
    var activeArea = getActiveArea()
    if (activeArea) {
        showAreaZone(activeArea.obj)
    }
}

/** Gets the position of an area's box, 
 * with an optional offset applied to 'redrawn' maps to accomodate bleeds. 
 * Uses source image for width/height.
 * 
 * */
function getAreaBox (area, areaImage, styleOverride = "") {
    if (!area) { console.error('oopsie, no area'); return }

    // Use current style or override?
    var style = styleOverride === "" ? currentMapStyle : styleOverride;
    
    if (style === NEW_STYLE_NAME) {
        return {x: area.box.x + area.offset.x, y: area.box.y + area.offset.y, width: areaImage.naturalWidth + area.offset.width, height: areaImage.naturalHeight + area.offset.height}
    } else {
        return {x: area.box.x, y: area.box.y, width: areaImage.naturalWidth, height: areaImage.naturalHeight}
    }
}

// TODO: Make more generic & move references to a separate file. We want this script to be entirely generic, if possible.
/** Fetches icon names corresponding to area type. */
function getIcon (type) {
    switch (type) {
        case 'town':
            return 'location_city'
        case 'forest': 
            return 'park'
        case 'surfing': 
            return 'surfing'
        case 'mountain': 
            return 'landscape'
        case 'route': 
            return 'pedal_bike'
        default:
            return type
    }
}

// TODO: As above.
/** Fetches colors corresponding to area type. */
function getColor (type) {
    switch (type) {
        case 'town':
            return 'rgb(130 94 108)'
        case 'forest': 
            return 'rgb(94 130 105)'
        case 'surfing': 
            return 'rgb(108 127 171)'
        case 'mountain': 
            return 'rgb(130 115 88)'
        case 'route': 
            return 'rgb(110 130 88)'
    }
}

/** Actions peformed on update (each frame). */
function tick () {
    viewport.filters = []
    if (cameraAnimation.progress >= 1) {
        cameraAnimation.playing = false
    }
    if (!cameraAnimation.playing) {
        if (zoomLevel !== currentZoom) {
            if (!blurIsDisabled()) {
                viewport.filters = [blurFilter]
            }
            currentZoom = lerp(currentZoom, zoomLevel, 0.2)
            if (Math.abs(zoomLevel - currentZoom) < 0.005) { 
                currentZoom = zoomLevel
                map.x = currentPos.x = zoomCenter.x; map.y = currentPos.y = zoomCenter.y;
                
            }
            map.scale.set(currentZoom)

            blurFilter.strength = .2 * (Math.abs((currentZoom - zoomLevel)) / zoomLevel)
            blurFilter.center = [ zoomMousePos.x, zoomMousePos.y ]
        }
        if (!mouseDown && (dragVelocity.x !== 0 || dragVelocity.y !== 0)) {
            if (dragVelocity.x !== 0) {
                map.x += Math.round(dragVelocity.x)
                dragVelocity.x = dragVelocity.x * .9
                if (Math.abs(dragVelocity.x) < 1) { dragVelocity.x = 0 }
            }
            if (dragVelocity.y !== 0) {
                map.y += Math.round(dragVelocity.y)
                dragVelocity.y = dragVelocity.y * .9
                if (Math.abs(dragVelocity.y) < 1) { dragVelocity.y = 0 }
            }
            currentZoom.x = zoomCenter.x = map.x
            currentZoom.y = zoomCenter.y = map.y
        } else if (!mouseDown && (currentPos.x !== zoomCenter.x || currentPos.y !== zoomCenter.y)) {
            var newx = lerp(currentPos.x, zoomCenter.x, 0.2)
            var newy = lerp(currentPos.y, zoomCenter.y, 0.2)
            currentPos = { x: newx, y: newy }
            map.x = currentPos.x
            map.y = currentPos.y
        }
        if (pinchForTick) {
            instantZoom(pinchForTick.factor, pinchForTick.x, pinchForTick.y)
            if (map.scale.x < 4 && map.scale.x > 0.25) {
                if (!blurIsDisabled()) {
                    viewport.filters = [blurFilter]
                }
                blurFilter.strength = .1
                blurFilter.center = [ pinchForTick.x, pinchForTick.y ]
            }
            pinchForTick = null
        }
        checkMapBoundaries()
    } else {
        // console.log(cameraAnimation.progress)
        cameraAnimation.progress += cameraAnimation.speed
        // cameraAnimation.progress = ((cameraAnimation.progress * 100) + (cameraAnimation.speed * 100)) / 100
        var newScale = cameraAnimation.startZoom + ((cameraAnimation.endZoom - cameraAnimation.startZoom) * (cameraAnimation.easing ? easeInOutCubic(cameraAnimation.progress) : cameraAnimation.progress) )
        var newPosX = cameraAnimation.startPos.x + ((cameraAnimation.endPos.x - cameraAnimation.startPos.x) * (cameraAnimation.easing ? easeInOutCubic(cameraAnimation.progress) : cameraAnimation.progress) )
        var newPosY = cameraAnimation.startPos.y + ((cameraAnimation.endPos.y - cameraAnimation.startPos.y) * (cameraAnimation.easing ? easeInOutCubic(cameraAnimation.progress) : cameraAnimation.progress) )
        map.scale.set(newScale)
        map.x = newPosX
        map.y = newPosY
    }
    if (tourMode) {
        if ((!cameraAnimation.playing || cameraAnimation.progress > (1 - (cameraAnimation.speed * 100))) && !tourTransition) {
            tourTransition = true
            tourFadeTimer = 100
        }
        if (tourTransition) {
            tourFadeTimer--
            colorFilter.alpha = tourFadeTimer / 100
            // map.alpha = tourFadeTimer / 100
        }
        if (tourTransition && tourFadeTimer <= 0) {
            tourFadeTimer = 0
            colorFilter.alpha = 0
            // map.alpha = 0
            newTourArea()
            tourTransition = false
        }
        if (!tourTransition && colorFilter.alpha < 1) {
            tourFadeTimer++
            colorFilter.alpha += .01
            // map.alpha += .01
        }
    }
    
    requestAnimationFrame(tick)
}

/** Toggles active state of the menu, focusing on the active area. */
function toggleMenu () {
    var elem = document.querySelector('.menu')
    elem.classList.toggle('active')
    var activeArea = getActiveArea()
    if (activeArea) {
        if (elem.classList.contains('active')) {
            showAreaZone(activeArea.obj)

        } else {
            hideAreaZone(activeArea.obj)
        }
    }
    
}

/** Opens the menu. */
function openMenu () {
    var elem = document.querySelector('.menu')
    elem.classList.add('active')
    var activeArea = getActiveArea()
    showAreaZone(activeArea.obj)
}

function blurIsDisabled () {
    return document.querySelector('#disableBlur').checked
}

/** Callback occurring when a drag action starts. */
function onDragStart () {
    previousTouch = null
    previousPinchDistance = 0
    mouseDown = true
    dragVelocity = { x: 0, y: 0 }
}

/** Callback occurring when a drag action ends. */
function onDragEnd () {
    previousTouch = null
    previousPinchDistance = 0
    mouseDown = false
    dragging = false
}

function changeTab (n) {
    var tabs = document.querySelectorAll('.menu__tab')
    var elems = document.querySelectorAll('.menu__content >*')
    for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[i]
        tab.classList.remove('active')
        elems[i].classList.remove('active')
    }
    tabs[n].classList.add('active')
    elems[n].classList.add('active')
    elems.children
}

function onClick (e) {
    if (!dragging && !cameraAnimation.playing) {
        zoomCenter = { x: Math.round(-(e.data.global.x - map.x) + window.innerWidth / 2), y: Math.round(-(e.data.global.y - map.y) + window.innerHeight / 2) }
        currentPos = { x: map.x, y: map.y }
        dragVelocity = { x: 0, y: 0 }
    }
}

function onDragMove (e) {
    if (mouseDown && !cameraAnimation.playing) {
        if (e.data.originalEvent.type === 'touchmove' && e.data.originalEvent.touches && e.data.originalEvent.touches.length === 2) {
            var touches = e.data.originalEvent.touches
            var pinchX = touches[0].pageX - touches[1].pageX
            var pinchY = touches[0].pageY - touches[1].pageY
            var currentPinchDistance = Math.sqrt((pinchX * pinchX) + (pinchY * pinchY))
            // console.log(currentPinchDistance, currentPinchDistance > previousPinchDistance ? 'Zoom In' : 'Zoom Out')
            
            if (previousPinchDistance) {
                var diff = Math.abs(currentPinchDistance - previousPinchDistance)
                if (diff > 1) {
                    if (currentPinchDistance > previousPinchDistance) {
                        pinchForTick = {
                            factor: 1.06,
                            x: touches[0].pageX - (pinchX / 2),
                            y: touches[0].pageY - (pinchY / 2),
                        }
                    }
                    if (currentPinchDistance < previousPinchDistance) {
                        // instantZoom(,touches[0].pageX, touches[0].pageY)
                        pinchForTick = {
                            factor: .94,
                            x: touches[0].pageX - (pinchX / 2),
                            y: touches[0].pageY - (pinchY / 2),
                        }
                    }
                }
                
            }
            previousPinchDistance = currentPinchDistance
        } 
        dragging = true
        var velocityX = 0
        var velocityY = 0
        if (e.data.originalEvent.type === 'touchmove') {
            var touch = e.data.originalEvent.touches[0]
            if (previousTouch && touch) {
                velocityX = touch.pageX - previousTouch.pageX
                velocityY = touch.pageY - previousTouch.pageY
            }
            previousTouch = touch || null
        } else {
            velocityX = e.data.originalEvent.movementX
            velocityY = e.data.originalEvent.movementY
        }
        dragVelocity = { x: velocityX, y: velocityY }
        map.x += dragVelocity.x
        map.y += dragVelocity.y
        zoomCenter = { x:map.x, y: map.y }
        currentPos = zoomCenter
        
        checkMapBoundaries()
    }
}


function onMouseWheel (e) {
    // TO DO
    // FIGURE OUT HOW TO DO THIS FOR TRACKPAD USERS
    if (e.target.id === 'canvas') {
        zoomMousePos = { x: e.x, y: e.y }
        if (!mouseDown && !cameraAnimation.playing) {
            var zoomAmount = e.deltaY < 0 ? 2 : .5
            if ((zoomLevel > 0.25 && e.deltaY > 0) || (zoomLevel < 4 && e.deltaY < 0)) {
                
                currentPos = {...zoomCenter}
                dragVelocity = { x: 0, y: 0 }

                zoom(zoomAmount, e.x, e.y)
            }
        }
    }
}

function zoom(s,x,y){

    if (currentZoom !== zoomLevel) { 
        map.scale.set(zoomLevel) ; currentZoom = zoomLevel 
        if (zoomCenter.x || zoomCenter.y) {
            map.x = zoomCenter.x; map.y = zoomCenter.y; 
        }
        
    }

    var worldPos = {x: (x - zoomCenter.x) / zoomLevel, y: (y - zoomCenter.y)/zoomLevel};
    var newScale = {x: zoomLevel * s, y: zoomLevel * s};
    zoomLevel = newScale.x
    
    var newScreenPos = {x: (worldPos.x ) * newScale.x + zoomCenter.x, y: (worldPos.y) * newScale.y + zoomCenter.y};

    zoomCenter.x = zoomCenter.x - (newScreenPos.x-x)
    zoomCenter.y = zoomCenter.y - (newScreenPos.y-y)
}

function instantZoom(s,x,y){

    if (currentZoom !== zoomLevel) { 
        map.scale.set(zoomLevel)
        currentZoom = zoomLevel 
        if (zoomCenter.x || zoomCenter.y) {
            map.x = zoomCenter.x; map.y = zoomCenter.y; 
        }
        
    }

    var worldPos = {x: (x - zoomCenter.x) / zoomLevel, y: (y - zoomCenter.y)/zoomLevel};
    var newScale = {x: zoomLevel * s, y: zoomLevel * s};
    zoomLevel = newScale.x
    checkZoomLimit()
    
    var newScreenPos = {x: (worldPos.x ) * zoomLevel + zoomCenter.x, y: (worldPos.y) * zoomLevel + zoomCenter.y};
    // console.log(worldPos.x, x, zoomCenter.x, worldPos.y, y, zoomCenter.y)

    zoomCenter.x = zoomCenter.x - (newScreenPos.x-x)
    zoomCenter.y = zoomCenter.y - (newScreenPos.y-y)

    map.scale.set(zoomLevel)
    currentZoom = zoomLevel
    currentPos = {... zoomCenter}

    // console.log(zoomCenter)

    map.x = zoomCenter.x
    map.y = zoomCenter.y

    checkMapBoundaries()

}

function moveCameraTo (x, y, zoom) {
    dragVelocity.x = dragVelocity.y = 0
    cameraAnimation.speed = cameraSpeed
    cameraAnimation.easing = true
    cameraAnimation.startPos = { x: map.x, y: map.y }
    cameraAnimation.startZoom = map.scale.x
    cameraAnimation.endZoom = zoom || cameraAnimation.startZoom

    var position = screenToMap(x,y,zoom)

    cameraAnimation.endPos = { x: position.x, y: position.y }
    cameraAnimation.playing = true
    cameraAnimation.progress = 0
    currentZoom = cameraAnimation.endZoom 
    zoomLevel = cameraAnimation.endZoom 
    currentPos.x = cameraAnimation.endPos.x
    zoomCenter.x = cameraAnimation.endPos.x
    currentPos.y = cameraAnimation.endPos.y
    zoomCenter.y = cameraAnimation.endPos.y
}

function slowPanCameraTo (x, y, zoom) {
    dragVelocity.x = dragVelocity.y = 0
    cameraAnimation.speed = tourCameraSpeed
    cameraAnimation.easing = false
    cameraAnimation.startPos = { x: map.x, y: map.y }
    cameraAnimation.startZoom = map.scale.x
    cameraAnimation.endZoom = zoom || cameraAnimation.startZoom

    var position = screenToMap(x,y,zoom)

    cameraAnimation.endPos = { x: position.x, y: position.y }
    cameraAnimation.playing = true
    cameraAnimation.progress = 0
    currentZoom = cameraAnimation.endZoom 
    zoomLevel = cameraAnimation.endZoom 
    currentPos.x = cameraAnimation.endPos.x
    zoomCenter.x = cameraAnimation.endPos.x
    currentPos.y = cameraAnimation.endPos.y
    zoomCenter.y = cameraAnimation.endPos.y
}

function snapCameraTo (x, y, zoom) {
    dragVelocity.x = dragVelocity.y = 0

    var position = screenToMap(x,y,zoom)

    currentZoom = zoom 
    zoomLevel = zoom
    map.scale.set(zoom)
    currentPos.x = position.x
    zoomCenter.x = position.x
    currentPos.y = position.y
    zoomCenter.y = position.y
    map.x = position.x
    map.y = position.y
}

/**
 * accepts name string and object
 */
function focusOnArea (a) {
    if (tourMode) {
        endTour()
    }
    var area = a
    if (typeof a === 'string') {
        area = activeAreas.find(x => x.title === a)
    }
    for (var i = 0; i < activeAreas.length; i++) {
        hideAreaZone(activeAreas[i])
    }
    var isGoodToFocus = true
    showAreaZone(area)
    var elems = document.querySelectorAll(`#areas li`)
    if (elems.length > 0) {
        for (var i = 0; i < elems.length; i++) {
            var elem = elems[i]
            if (area.title === elem.title) {
                if (elem.classList.contains('active')) {
                    elem.classList.remove('active')
                    hideAreaZone(area)
                    isGoodToFocus = false
                } else {
                    elem.classList.add('active')
                }
                
            } else {
                elem.classList.remove('active')
            }       
        }
    }
    
    if (isGoodToFocus) {
        var box = area.box;
        moveCameraTo(box.x + Math.floor(box.width / 2), box.y + Math.floor(box.height / 2), area.zoom)
    }
    
}

function openAreaInDOM (a) {
    var area = a
    if (typeof a === 'string') {
        area = activeAreas.find(x => x.title === a)
    }
    var elems = document.querySelectorAll(`#areas`)
    if (elems.length > 0) {
        for (var i = 0; i < elems.length; i++) {
            var elem = elems[i]
            if (area.title === elem.title) {
                elem.classList.add('active')
                elem.scrollIntoView()
            } else {
                elem.classList.remove('active')
            }       
        }
    }
}

function toggleTour () {
    if (tourMode) {
        endTour()
    } else {
        initTour()
    }
}

function initTour () {
    const button = document.querySelector('#tourButton')
    button.innerHTML = '<span class="material-icons">stop</span> <span>End Tour</span>'
    button.classList.add('active')
    areasToTour = [...activeAreas]
    tourMode = true
    map.filters = [colorFilter]
    var activeArea = getActiveArea()
    if (activeArea) {
        hideAreaZone(activeArea.obj)
    }
}

function endTour () {
    const button = document.querySelector('#tourButton')
    button.innerHTML = '<span class="material-icons">play_arrow</span> <span>Begin Tour</span>'
    button.classList.remove('active')
    tourMode = false
    tourTransition = false
    tourFadeTimer = 100
    // map.alpha = 1
    colorFilter.alpha = 1
    map.filters = []
    cameraAnimation.playing = false
    var activeArea = getActiveArea()
    if (activeArea) {
        showAreaZone(activeArea.obj)
    }
}

function newTourArea () {
    var rnd = Math.floor(Math.random() * areasToTour.length)
    var area = areasToTour[rnd]
    var box = area.box;
    if (!area) { area = activeAreas[0] }
    if (areasToTour.length > 1) {
        areasToTour.splice(rnd, 1)
    } else {
        areasToTour = [...activeAreas]
    }
    openAreaInDOM(area)

    var centerX = (box.x + (box.width / 2))
    var centerY = (box.y + (box.height / 2))

    var startX = centerX
    var startY = centerY
    var endX = centerX
    var endY = centerY

    if (area.pan === 'horizontal') {
        if (box.height * 4 > window.innerHeight) {
            var range =  ((box.height * 4) - window.innerHeight) / 4
            startY = centerY + Math.round((Math.random() * range) - range / 2)
        }
        var range = ((box.width * 4) - window.innerWidth) / 4
        if (range <= 20) { range = 100 }
        startX = centerX + Math.round((Math.random() * range) - range / 2)
        var loop = 0
        while ((Math.abs(startX - endX) < 20 || Math.abs(startX - endX) > 230) && loop < 50) {
            endX = centerX + Math.round((Math.random() * range) - range / 2)
            loop++
        }
        
    }
    if (area.pan === 'vertical') {
        if (box.width * 4 > window.innerWidth) {
            var range = ((box.width * 4) - window.innerWidth) / 4
            startX = centerX + Math.round((Math.random() * range) - range / 2)
        }
        var range = ((box.height * 4) - window.innerHeight) / 4
        if (range <= 20) { range = 100 }
        startY = centerY + Math.round((Math.random() * range) - range / 2)
        var loop = 0
        while ((Math.abs(startY - endY) < 20 || Math.abs(startY - endY) > 230) && loop < 50) {
            endY = centerY + Math.round((Math.random() * range) - range / 2)
            loop++
        }
        
    }


    if (area.pan === 'horizontal') { endY = startY }
    if (area.pan === 'vertical') { endX = startX }

    snapCameraTo(Math.round(startX), Math.round(startY), 4)
    slowPanCameraTo(endX, endY, 4)
}

function checkZoom () {
    if (zoomLevel <= 0.25) { zoomLevel = 0.25 }
    if (zoomLevel > 0.5 && zoomLevel < 1) { zoomLevel = 1 }
    if (zoomLevel < 0.5 && zoomLevel > 0.25) { zoomLevel = 0.5 }
    if (zoomLevel >= 4) { zoomLevel = 4 }
}

function checkZoomLimit () {
    if (zoomLevel <= 0.25) { zoomLevel = 0.25 }
    if (zoomLevel >= 4) { zoomLevel = 4 }
}

function checkMapBoundaries () {
    if (map.x > Math.floor(window.innerWidth / 2)) { map.x = Math.floor(window.innerWidth / 2) }
    if (map.y > Math.floor(window.innerHeight / 2)) { map.y = Math.floor(window.innerHeight / 2) }
    if (map.x < Math.floor(window.innerWidth / 2) - map.width) { map.x = Math.floor(window.innerWidth / 2) - map.width }
    if (map.y < Math.floor(window.innerHeight / 2) - map.height) { map.y = Math.floor(window.innerHeight / 2) - map.height }
}

function lerp (start, end, amt){
    return (1-amt)*start+amt*end
}

function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function screenToMap(x, y, zoom) {
    var width = isMenuOpen() ? window.innerWidth + 300 : window.innerWidth 
    var newX = -((x * zoom) - (width / 2))
    var newY = -((y * zoom) - (window.innerHeight / 2))
    return { x: newX, y: newY }
}

function isMenuOpen () {
    var elem = document.querySelector('.menu') 
    return elem.classList.contains('active')
}

function getActiveArea () {
    if (document.querySelector('#areas .area.active')) {
        var elem = document.querySelector('#areas .area.active')
        return { elem , obj: activeAreas.find(x => x.title === elem.title ) }
    }
}

function onResize () {
    app.renderer.resize(window.innerWidth, window.innerHeight);
}

function changeCameraSpeed (e) {
    cameraSpeed = _defaultCameraSpeed * parseFloat(e)
    document.querySelector('#cameraSpeed + small').textContent = `${e}x`
}

function changeTourCameraSpeed (e) {
    tourCameraSpeed = _defaultTourCameraSpeed * parseFloat(e)
    document.querySelector('#tourCameraSpeed + small').textContent = `${e}x`
}

/** Changes the currently active layer.
 * 
 * @param {string} layer String name of the layer to change to.
 */
function changeLayer (layer) {

    // Find and switch layer
    var layerCount = this.areaLayers.length;
    for (var i=0; i< layerCount; i++) {
        if (layer === this.layerNames[i]) {
            this.activeLayerIndex = i;
            this.areas = this.areaLayers[i]
            this.canvasDimensions = layerCanvases[i]
            break;
        }
    }

    // Adjust tab visibility
    const tabs = document.querySelectorAll('#layers li button')
    tabs.forEach((x) => { if (!x.classList.contains(this.layerNames[this.activeLayerIndex])) {x.classList.remove('active')} else {x.classList.add('active')} })
    this.setupCanvas()
    
    // Adjust canvas focus
    this.focusOnArea(activeAreas[Math.floor(Math.random() * activeAreas.length)])
}