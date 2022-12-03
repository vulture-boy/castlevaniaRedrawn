var areas = [
    {
        title: 'New Bark Town',
        artist: '@Atticus__Finn',
        url: 'https://twitter.com/atticus__finn',
        box: { x: 7991, y: 3894, width: 320, height: 304},
        pan: 'horizontal',
        type: 'town',
        zoom: 2
    },
    {
        title: 'Route 29',
        artist: '@LiamCuthbertArt',
        url: 'https://twitter.com/LiamCuthbertArt',
        box: { x: 7027, y: 3894, width: 964, height: 304},
        pan: 'horizontal',
        type: 'forest',
        zoom: 1
    },
    {
        title: 'Cherrygrove City',
        artist: '@_discocats',
        url: 'https://twitter.com/_discocats',
        box: { x: 6393, y: 3894, width: 634, height: 304},
        pan: 'horizontal',
        type: 'forest',
        zoom: 2
    },
    {
        title: 'Route 30',
        artist: '@Anima_nel',
        url: 'https://twitter.com/anima_nel',
        box: { x: 6535, y: 3046, width: 354, height: 848},
        pan: 'vertical',
        type: 'route',
        zoom: 1
    },
    {
        title: 'Route 31',
        artist: '@ckelsallpxls',
        url: 'https://twitter.com/ckelsallpxls',
        box: { x: 6233, y: 2790, width: 720, height: 256},
        pan: 'horizontal',
        type: 'route',
        zoom: 2
    },
    {
        title: 'Violet City',
        artist: '@huttaburger',
        url: 'https://twitter.com/huttaburger',
        box: { x: 5625, y: 2454, width: 608, height: 688},
        pan: 'horizontal',
        type: 'town',
        zoom: 1
    },
    {
        title: 'Ruins of Alph',
        artist: '@EdelweissPkmn',
        url: 'https://twitter.com/edelweisspkmn',
        box: { x: 5337, y: 2708, width: 352, height: 642},
        pan: 'vertical',
        type: 'architecture',
        zoom: 1
    },
    {
        title: 'Route 32 (North)',
        artist: '@zaebucca',
        url: 'https://twitter.com/zaebucca',
        box: { x: 5593, y: 3142, width: 320, height: 591},
        pan: 'vertical',
        type: 'forest',
        zoom: 1
    },
    {
        title: 'Route 32 (South)',
        artist: '@Dewndeym',
        url: 'https://twitter.com/dewndeym',
        box: { x: 5593, y: 3733, width: 320, height: 769},
        pan: 'vertical',
        type: 'mountain',
        zoom: 1
    },
    {
        title: 'Route 33',
        artist: '@Dewndeym',
        url: 'https://twitter.com/dewndeym',
        box: { x: 5593, y: 4502, width: 320, height: 320},
        pan: 'horizontal',
        type: 'mountain',
        zoom: 2
    },
    {
        title: 'Azalea Town',
        artist: '@Dewndeym',
        url: 'https://twitter.com/dewndeym',
        box: { x: 4953, y: 4502, width: 640, height: 320},
        pan: 'horizontal',
        type: 'town',
        zoom: 2
    },
    {
        title: 'Ilex Forest',
        artist: '@Dewndeym',
        url: 'https://twitter.com/dewndeym',
        box: { x: 4633, y: 4310, width: 320, height: 512},
        pan: 'vertical',
        type: 'forest',
        zoom: 2
    },
    {
        title: 'Route 34',
        artist: '@HyperJerk',
        url: 'https://twitter.com/HyperJerk',
        box: { x: 4633, y: 3926, width: 320, height: 384},
        pan: 'vertical',
        type: 'route',
        zoom: 2
    },
    {
        title: 'Goldenrod City',
        artist: '@Dewndeym',
        url: 'https://twitter.com/dewndeym',
        box: { x: 4193, y: 3350, width: 920, height: 576},
        pan: 'vertical',
        type: 'town',
        zoom: 1
    },
    {
        title: 'Route 35',
        artist: '@kam2D',
        url: 'https://twitter.com/kam2d',
        box: { x: 4634, y: 2910, width: 319, height: 440},
        pan: 'vertical',
        type: 'town',
        zoom: 2
    },
    {
        title: 'National Park',
        artist: '@foofarawr',
        url: 'https://twitter.com/foofarawr',
        box: { x: 4538, y: 2462, width: 448, height: 448},
        pan: 'vertical',
        type: 'forest',
        zoom: 2
    },
    {
        title: 'Route 36',
        artist: '@FoxxDrive',
        url: 'https://twitter.com/foxxdrive',
        box: { x: 4925, y: 2486, width: 699, height: 288},
        pan: 'horizontal',
        type: 'route',
        zoom: 2
    },
    {
        title: 'Route 37',
        artist: '@1800FROGS',
        url: 'https://twitter.com/1800frogs',
        box: { x: 4953, y: 2198, width: 320, height: 288},
        pan: 'vertical',
        type: 'route',
        zoom: 2
    },
    {
        title: 'Ecruteak City',
        artist: '@zaebucca',
        url: 'https://twitter.com/zaebucca',
        box: { x: 4731, y: 1406, width: 781, height: 792},
        pan: 'vertical',
        type: 'town',
        zoom: 1
    },
    {
        title: 'Route 38',
        artist: '@Anima_nel',
        url: 'https://twitter.com/anima_nel',
        box: { x: 4153, y: 1750, width: 641, height: 352},
        pan: 'horizontal',
        type: 'route',
        zoom: 2
    },
    {
        title: 'Route 39',
        artist: '@Warxwell',
        url: 'https://twitter.com/warxwell',
        box: { x: 3834, y: 1782, width: 319, height: 576},
        pan: 'vertical',
        type: 'route',
        zoom: 1
    },
    {
        title: 'Olivine City',
        artist: '@nekofresa',
        url: 'https://twitter.com/nekofresa',
        box: { x: 3673, y: 2358, width: 640, height: 912},
        pan: 'vertical',
        type: 'town',
        zoom: 1
    },
    {
        title: 'Battle Frontier',
        artist: '@ckelsallpxls',
        url: 'https://twitter.com/ckelsallpxls',
        box: { x: 3034, y: 1749, width: 800, height: 864},
        pan: 'vertical',
        type: 'emoji_events',
        zoom: 1
    },
    {
        title: 'Route 40',
        artist: '@ckelsallpxls',
        url: 'https://twitter.com/ckelsallpxls',
        box: { x: 3353, y: 2613, width: 320, height: 609},
        pan: 'vertical',
        type: 'surfing',
        zoom: 1
    },
    {
        title: 'Route 41',
        artist: '@_unsettled_',
        url: 'https://twitter.com/_unsettled_',
        box: { x: 2873, y: 3222, width: 800, height: 864},
        pan: 'vertical',
        type: 'surfing',
        zoom: 1
    },
    {
        title: 'Cianwood City',
        artist: '@ckelsallpxls',
        url: 'https://twitter.com/ckelsallpxls',
        box: { x: 2393, y: 3222, width: 480, height: 864},
        pan: 'vertical',
        type: 'town',
        zoom: 1
    },
    {
        title: 'Route 47',
        artist: '@saltiestbunny',
        url: 'https://twitter.com/saltiestbunny',
        box: { x: 1145, y: 3878, width: 1248, height: 608},
        pan: 'horizontal',
        type: 'mountain',
        zoom: 1
    },
    {
        title: 'Route 48',
        artist: '@Yolklyghostly',
        url: 'https://twitter.com/yolklyghostly',
        box: { x: 1131, y: 3526, width: 576, height: 352},
        pan: 'horizontal',
        type: 'mountain',
        zoom: 2
    },
    {
        title: 'Safari Zone (Entrance)',
        artist: '@Anima_nel',
        url: 'https://twitter.com/anima_nel',
        box: { x: 1055, y: 3195, width: 540, height: 331},
        pan: 'horizontal',
        type: 'select_all',
        zoom: 2
    },
    {
        title: 'Safari Zone (Peak)',
        artist: '@Atticus__Finn',
        url: 'https://twitter.com/atticus__finn',
        box: { x: 901, y: 2747, width: 288, height: 224},
        pan: 'horizontal',
        type: 'select_all',
        zoom: 4
    },
    {
        title: 'Safari Zone (Desert)',
        artist: '@Zushi3DHero',
        url: 'https://twitter.com/zushi3dhero',
        box: { x: 1189, y: 2747, width: 272, height: 224},
        pan: 'horizontal',
        type: 'select_all',
        zoom: 4
    },
    {
        title: 'Safari Zone (Marshland)',
        artist: '@Pixel_Pit',
        url: 'https://twitter.com/Pixel_Pit',
        box: { x: 1461, y: 2747, width: 287, height: 224},
        pan: 'horizontal',
        type: 'select_all',
        zoom: 4
    },
    {
        title: 'Safari Zone (Forest)',
        artist: '@witch_warren',
        url: 'https://twitter.com/witch_warren',
        box: { x: 901, y: 2971, width: 288, height: 224},
        pan: 'horizontal',
        type: 'select_all',
        zoom: 4
    },
    {
        title: 'Safari Zone (Meadow)',
        artist: '@King_Worrell',
        url: 'https://twitter.com/king_worrell',
        box: { x: 1189, y: 2971, width: 272, height: 224},
        pan: 'horizontal',
        type: 'select_all',
        zoom: 4
    },
    {
        title: 'Safari Zone (Plains)',
        artist: '@Woodspixl_',
        url: 'https://twitter.com/woodspixl_',
        box: { x: 1461, y: 2971, width: 287, height: 224},
        pan: 'horizontal',
        type: 'select_all',
        zoom: 4
    },
    {
        title: 'Route 42',
        artist: '@Lord_SForcer',
        url: 'https://twitter.com/lord_sforcer',
        box: { x: 5469, y: 1910, width: 924, height: 288},
        pan: 'horizontal',
        type: 'mountain',
        zoom: 1
    },
    {
        title: 'Mahogany Town',
        artist: '@audreyTBDS',
        url: 'https://twitter.com/audreytbds',
        box: { x: 6393, y: 1910, width: 320, height: 288},
        pan: 'vertical',
        type: 'town',
        zoom: 2
    },
    {
        title: 'Route 43',
        artist: '@SilssP',
        url: 'https://twitter.com/silssp',
        box: { x: 6393, y: 1046, width: 320, height: 864},
        pan: 'vertical',
        type: 'route',
        zoom: 1
    },
    {
        title: 'Lake of Rage',
        artist: '@foofarawr',
        url: 'https://twitter.com/foofarawr',
        box: { x: 6169, y: 438, width: 720, height: 608},
        pan: 'horizontal',
        type: 'water',
        zoom: 1
    },
    {
        title: 'Route 44',
        artist: '@audreyTBDS',
        url: 'https://twitter.com/audreytbds',
        box: { x: 6713, y: 1910, width: 960, height: 288},
        pan: 'horizontal',
        type: 'route',
        zoom: 1
    },
    {
        title: 'Blackthorn City',
        artist: '@shdCharm',
        url: 'https://twitter.com/shdcharm',
        box: { x: 7673, y: 1590, width: 640, height: 576},
        pan: 'vertical',
        type: 'town',
        zoom: 1
    },
    {
        title: 'Route 45',
        artist: 'oouhriu',
        url: 'https://www.reddit.com/user/oouhriu',
        box: { x: 7641, y: 2166, width: 352, height: 1440},
        pan: 'vertical',
        type: 'mountain',
        zoom: 1
    },
    {
        title: 'Route 46',
        artist: '@jdzombi_',
        url: 'https://twitter.com/jdzombi_',
        box: { x: 7353, y: 3318, width: 320, height: 576},
        pan: 'vertical',
        type: 'mountain',
        zoom: 1
    },
    {
        title: 'Route 27',
        artist: '@NdieCity',
        url: 'https://twitter.com/ndiecity',
        box: { x: 8313, y: 3894, width: 1280, height: 304},
        pan: 'horizontal',
        type: 'mountain',
        zoom: 1
    },
    {
        title: 'Route 26',
        artist: '@batfeula',
        url: 'https://twitter.com/batfeula',
        box: { x: 9593, y: 2454, width: 320, height: 1744},
        pan: 'vertical',
        type: 'mountain',
        zoom: 1
    },
    {
        title: 'Indigo Plateau',
        artist: '@PixelsSj',
        url: 'https://twitter.com/pixelssj',
        box: { x: 9593, y: 2166, width: 320, height: 288},
        pan: 'vertical',
        type: 'emoji_events',
        zoom: 2
    },
    {
        title: 'Route 28',
        artist: '@VioletVT_',
        url: 'https://twitter.com/violetvt_',
        box: { x: 8953, y: 2454, width: 640, height: 288},
        pan: 'horizontal',
        type: 'mountain',
        zoom: 2
    },
    {
        title: 'Mount Silver (Entrance)',
        artist: '@PixelSword94',
        url: 'https://twitter.com/pixelsword94',
        box: { x: 8345, y: 2262, width: 608, height: 464},
        pan: 'horizontal',
        type: 'mountain',
        zoom: 2
    },
    {
        title: 'Mount Silver (Peak)',
        artist: '@came2slide',
        url: 'https://twitter.com/came2slide',
        box: { x: 8313, y: 1014, width: 320, height: 576},
        pan: 'vertical',
        type: 'mountain',
        zoom: 1
    }
]


"https://twitter.com/came2slide"