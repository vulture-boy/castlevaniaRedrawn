__RETRO REDRAWN - Castlevania Redrawn__

Repository for the Castlevania Redrawn project.
The base was originally programmed by Jerky (@Hyperjerk) for the Retro Redrawn Kanto and Johto projects.

https://retroredrawn.com/
https://drive.google.com/drive/u/0/folders/1t2VQBpYjfmr0aqg1oNrvkhJEqDeHIeUk

THIS README IS A WORK IN PROGRESS

Adding Areas:
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
- type: type of the entry; visually styles the list entry
- zoom: zoom scale to use when focusing on the entry in the map
- teleporters: list of ______
- url: artist URL
- post_url: URL of the twitter post associated with this entry

Stylization:
___

areatool.css - ???
