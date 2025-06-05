/*
*   Retro Redrawn 
*   -- Implementation Script
*
*   Frontend data container of the Redrawn Viewer. 
*   Contains implementation data specific to a Redrawn project.
*
*   by Tyson Moll (vvvvvvv), 2023.
*
*/

// Background
const CANVAS_BACKGROUND_IMAGE = 'img/website/grid_test.png'; // Tiled background image for the canvas (blank if none)
const WINDOW_BACKGROUND_COLOR = 0x000000;    // Color for the window background
const WINDOW_BACKGROUND_IMAGE = ''; // Tiled background image for the window (blank if none)

// File Naming
const NEW_SLICE_SUFFIX = '' // Optional suffix added to new map file names (e.g. '_new' for 'map_name_new.png')
const OLD_SLICE_SUFFIX = '' // Optional suffix added to old map file names (e.g. '_old' for 'map_name_old.png')

// Audio
var bgmTrack = null;

/** Content layers in the Redrawn */
var activeLayerIndex = 0;           // Currently active layer index (and initial index)
var redrawnLayers = [
    {
        name: "game",
        canvasSize: {width: 10000, height: 2096},
        areas: areas
    }
];

/** Biome Data (Screen icons) */
var biomes = [
    {
        name: "Terrace",
        ident: "terrace",
        iconId: "grass",
        color: 'rgb(74 139 89)',
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
        color: 'rgb(114 79 52)',
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
