__RETRO REDRAWN - Castlevania Redrawn__

Repository for the Castlevania Redrawn project.
The base was originally programmed by Jerky (@Hyperjerk) for the Retro Redrawn Kanto and Johto projects.

https://retroredrawn.com/
https://drive.google.com/drive/u/0/folders/1t2VQBpYjfmr0aqg1oNrvkhJEqDeHIeUk

_Creating a new Redrawn_

1. Fork the repository to create your own copy.
2. Open areas.js and change the name of the first "area" array (e.g. 'var castleAreas') to something for your project (e.g. 'var myRedrawnAreas'). Remove all but one of the entries inside the square braces ('[]'). Remove all other arrays.
-- This is where individual screens in the project will be defined.
-- If you wish to have additional layers, create a copy of this area array and rename it. Repeat as many times as you'd like.
-- We will add content to the individual areas in the array later.
3.  Open implementation.js and change the contents of redrawnLayers to contain one entry per array you setup in Step 2.
-- These arrays describe details about specific redrawn layers (not old vs redrawn, but rather subjective things like outside vs inside)
-- Set the canvas size to be large enough to contain all the screens you intend to include in the project. You can readjust this later.
-- The 'areas' field shoud match the name of the array exactly as written in Step 2.
-- The name of the area is used when referencing the layer by name later on
4. In implementation.js. update the content of the biomes array with as many entries as you'd like.
-- These are used for the visual display of items in the list of redrawn screens
--- name refers to the name of the biome, formatted for reading (i.e. how you would want to read the text)
--- ident refers to the name of the biome, formatted for code (i.e. lowercase, no spaces)
--- iconId is a reference to an icon in Google Material Symbols and Icons, where icons are currently drawn from
--- color is the color of the menu icon.
-- You can update these later if you prefer 
5. Update the content of index.html to reflect your project.
-- In the Header, change the website page name, description,  OG (OpenGraph) image and favicon fields. (The OG image is the image shown in social media thumbnails)
-- Replace the (FKA) Twitter link with an authorative social media link
-- Update the Menu Logo to match your project
-- Update the About section with a description relative to your project. Please provide appropriate credit to artists and programmers involved in your project (including those you fork from) and remove the 'bug support' section unless you or an associate plan to provide support for your own project (in which case update the field accordingly). 
-- Update the loading bar image.
-- Review the contents of this page to make sure that you are content with it.
6. Update the layer buttons
-- In index.html's "areaList" div, there are list items for each layer in the project.
--- Change the name provided to the changeLayer function to the name of your layer. Set the class to the same name, and the name in the Span section to the display name.
-- In home.css, find "#layers li button.__" and replace the name of the layer with your own. Update the background image as well.
7. Add areas to the areas.js file (see below)
8. Remove any remaining project-specific image assets and replace with your own once you are done setting up the project.
9. Modify home.css and any webfonts in index.html to further customize the look of your redrawn website

_Adding Areas_
You can add an area by adding a new entry to the area.js file and ensuring that the position defined in the area is complimented by a representative location in the map image.

area.js - Defines location regions and provides credit to artists
- (base array): used to identify a major category or layer (e.g. outdoors, interiors(
- order: the position of a redrawn tile description within the list
- title: Display name for an entry
- ident: File identity for an entry; should correspond to the 
- artist: artist name. Avatar file must match.
- box: dimensions of the location. x,y refers to the top-left co-ordinate while width, height refer to the image's resolution
- offset: position offset from _______. Can be null.
- pan: ______ (options: vertical, horizontal )
- type: type of the entry; visually styles the list entry (Terrace, Castle, Underground, Boss)
- zoom: zoom scale to use when focusing on the entry in the map
- teleporters: list of ______
- url: artist URL
- post_url: URL of the twitter post associated with this entry

Stylization:
___

areatool.css - ???
