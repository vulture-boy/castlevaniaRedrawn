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

// Directories
var artistImgDir = "img/profiles/";
var artistImgExtension = '.png';  // Image extension for artist images.
// (having JavaScript self-determine if an image exists with a particular extension is difficult)

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

/** Biome Data (Screen icons) */
var biomes = [
    {
        name: "Town",
        ident: "town",
        iconId: "location_city",
        color: 'rgb(130 94 108)',
    },
    {
        name: "Forest",
        ident: "forest",
        iconId: "park",
        color: 'rgb(94 130 105)',
    },
    {
        name: "Surfing",
        ident: "surfing",
        iconId: "surfing",
        color: 'rgb(108 127 171)',
    },
    {
        name: "Mountain",
        ident: "mountain",
        iconId: "landscape",
        color: 'rgb(130 115 88)',
    },
    {
        name: "Route",
        ident: "route",
        iconId: "pedal_bike",
        color: 'rgb(110 130 88)',
    },
    {
        name: "Terrace",
        ident: "terrace",
        iconId: "grass",
        color: 'rgb(210 212 141)',
    },
    {
        name: "Underground",
        ident: "underground",
        iconId: "fireplace",
        color: 'rgb(113 104 127)',
    },
    {
        name: "Castle",
        ident: "castle",
        iconId: "fort",
        color: 'rgb(204 156 73)',
    },
    {
        name: "Boss",
        ident: "boss",
        iconId: "dark_mode",
        color: 'rgb(129 28 56)',
    },
    {
        name: "Other",
        ident: "other",
        iconId: "dataset",
        color: 'rgb(94 94 94)',
    },
];
