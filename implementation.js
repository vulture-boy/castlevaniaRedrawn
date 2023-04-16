/*
*   Retro Redrawn 
*   -- Implementation Script
*
*   Frontend data container of the Redrawn Viewer. 
*   Contains implementation data specific to a Redrawn project.
*
*   Originally written by Jerky.
*   Refactored for reuse by Tyson Moll (vvvvvvv), 2023.
*
*/

// TODO: probably should use structs to contain this information
var layerNames = ['kanto', 'interior', 'sevii', 'castlevania'];
var activeLayerIndex = 0;           // Currently active layer index (and initial index)
var activeAreas = kantoAreas          // Active array of areas (and initial area)
var areaLayers = [kantoAreas, interiorAreas, seviiAreas, castleAreas];

// Canvases
var kantoCanvas = {width: 5472, height: 5904}
var interiorCanvas = {width: 5504, height: 5744}
var seviiCanvas = {width: 4448, height: 6784}
var castleCanvas = {width: 10000, height: 2096}
var layerCanvases = [kantoCanvas, interiorCanvas, seviiCanvas, castleCanvas];

/** Dictionary pairing zone types to icon filenames. */
let iconTypeDictionary = {
    'town' : 'location_city',
    'forest' : 'park',
    'surfing' : 'surfing',
    'mountain' : 'landscape',
    'route' : 'pedal_bike',

    'Terrace' : 'landscape',
    'Underground' : 'surfing',
    'Castle' : 'park',
    'Boss' : 'location_city',
}

/** Dictionary pairing zone types to rgb color definitions. */
let iconColorDictionary = {
    'town' : 'rgb(130 94 108)',
    'forest' : 'rgb(94 130 105)',
    'surfing' : 'rgb(108 127 171)',
    'mountain' : 'rgb(130 115 88)',
    'route' : 'rgb(110 130 88)',

    'Terrace' : 'rgb(210 212 141)',
    'Underground' : 'rgb(113 104 127)',
    'Castle' : 'rgb(204 156 73)',
    'Boss' : 'rgb(129 28 56)'
}
