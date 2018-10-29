var fs = require('fs');
const _ = require('lodash')
const { suburbFile, suburbName } = require('./suburb')
// https://en.wikipedia.org/wiki/List_of_Melbourne_suburbs
// https://en.wikipedia.org/wiki/List_of_Brisbane_suburbs
// Perth https://www.bobinoz.com/living-in-australia/perth/inner-perth/
// Sydney https://www.bobinoz.com/living-in-australia/sydney/
// Sydney https://en.wikipedia.org/wiki/Regions_of_Sydney
// https://en.wikipedia.org/wiki/Regions_of_South_Australia

const melbourneInnerSuburbs = [
    "Carlton",
    "Carlton North",
    "Docklands",
    "East Melbourne",
    "Jolimont",
    "Flemington",
    "Kensington",
    "Melbourne",
    "Melbourne",
    "North Melbourne",
    "Parkville",
    "Port Melbourne",
    "Southbank",
    "South Wharf",
    "South Yarra",
    "West Melbourne",
    "Coode Island",
    "Albert Park",
    "Balaclava",
    "Elwood",
    "Melbourne",
    "Middle Park",
    "Port Melbourne",
    "Ripponlea",
    "St Kilda",
    "St Kilda East",
    "St Kilda West",
    "Southbank",
    "South Melbourne",
    "South Wharf",
    "Abbotsford",
    "Alphington",
    "Burnley",
    "Carlton North",
    "Clifton Hill",
    "Collingwood",
    "Cremorne",
    "Fairfield",
    "Fitzroy",
    "Fitzroy North",
    "Princes Hill",
    "Richmond"
]
const melbourneNorthernSuburbs = [
    "Bellfield",
    "Briar Hill",
    "Bundoora",
    "Eaglemont",
    "Eltham",
    "Eltham North",
    "Greensborough",
    "Heidelberg",
    "Heidelberg Heights",
    "Heidelberg West",
    "Ivanhoe",
    "Ivanhoe East",
    "Lower Plenty",
    "Macleod",
    "Montmorency",
    "Rosanna",
    "St Helena",
    "Viewbank",
    "Watsonia",
    "Watsonia North",
    "Yallambie",
    "Alphington",
    "Bundoora",
    "Fairfield",
    "Kingsbury",
    "Macleod",
    "Northcote",
    "Westgarth",
    "Preston",
    "Reservoir",
    "Thornbury",
    "Attwood",
    "Broadmeadows",
    "Campbellfield",
    "Coolaroo",
    "Craigieburn",
    "Dallas",
    "Gladstone Park",
    "Greenvale",
    "Jacana",
    "Keilor",
    "Meadow Heights",
    "Melbourne Airport",
    "Roxburgh Park",
    "Somerton",
    "Tullamarine",
    "Westmeadows",
    "Sunbury",
    "Bulla",
    "Clarkefield",
    "Diggers Rest",
    "Kalkallo",
    "Mickleham",
    "Oaklands Junction",
    "Wildwood",
    "Yuroke",
    "Aberfeldie",
    "Airport West",
    "Ascot Vale",
    "Avondale Heights",
    "Essendon",
    "Essendon Fields",
    "Essendon North",
    "Essendon West",
    "Flemington, Victoria",
    "Keilor East",
    "Moonee Ponds",
    "Niddrie",
    "Strathmore",
    "Strathmore Heights",
    "Travancore",
    "Brunswick",
    "Brunswick East",
    "Brunswick West",
    "Coburg",
    "Coburg North",
    "Fawkner",
    "Glenroy",
    "Gowanbrae",
    "Hadfield",
    "Oak Park",
    "Pascoe Vale",
    "Pascoe Vale South",
    "Tullamarine",
    "Diamond Creek",
    "Eltham",
    "Eltham North",
    "Greensborough",
    "Hurstbridge",
    "North Warrandyte",
    "Research",
    "Wattle Glen",
    "Bend of Islands",
    "Christmas Hills",
    "Cottles Bridge",
    "Doreen",
    "Kangaroo Ground",
    "Kinglake",
    "Kinglake West",
    "Nutfield",
    "Panton Hill",
    "Plenty",
    "St Andrews",
    "Smiths Gully",
    "Strathewen",
    "Watsons Creek",
    "Yan Yean",
    "Yarrambat",
    "Bundoora",
    "Doreen",
    "Epping",
    "Lalor",
    "Mernda",
    "Mill Park",
    "South Morang",
    "Thomastown",
    "Beveridge",
    "Donnybrook",
    "Eden Park",
    "Humevale",
    "Kinglake West",
    "Whittlesea",
    "Wollert",
    "Woodstock",
    "Yan Yean"
]
const melbourneEasternSuburbs = [
    "Ashburton",
    "Balwyn",
    "Balwyn North",
    "Camberwell",
    "Canterbury",
    "Deepdene",
    "Glen Iris",
    "Hawthorn",
    "Hawthorn East",
    "Kew",
    "Kew East",
    "Mont Albert",
    "Mont Albert North",
    "Surrey Hills",
    "Bayswater",
    "Boronia",
    "Ferntree Gully",
    "Knoxfield",
    "Lysterfield",
    "Rowville",
    "Scoresby",
    "The Basin",
    "Upper Ferntree Gully",
    "Wantirna",
    "Wantirna South",
    "Bulleen",
    "Doncaster",
    "Doncaster East",
    "Donvale",
    "Park Orchards",
    "Templestowe",
    "Templestowe Lower",
    "Warrandyte",
    "Warrandyte South",
    "Wonga Park",
    "Nunawading",
    "Ringwood North",
    "Bayswater North",
    "Croydon",
    "Croydon Hills",
    "Croydon North",
    "Croydon South",
    "Heathmont",
    "Kilsyth South",
    "Ringwood",
    "Ringwood East",
    "Ringwood North",
    "Warranwood",
    "Blackburn",
    "Laburnum",
    "Blackburn North",
    "Blackburn South",
    "Box Hill",
    "Box Hill North",
    "Kerrimuir",
    "Box Hill South",
    "Burwood",
    "Bennettswood",
    "Burwood East",
    "Tally Ho",
    "Forest Hill",
    "Mitcham",
    "Heatherdale",
    "Mont Albert",
    "Nunawading",
    "Surrey Hills",
    "Vermont",
    "Vermont South",
    "Belgrave",
    "Belgrave Heights",
    "Belgrave South",
    "Chirnside Park",
    "Kilsyth",
    "Lilydale",
    "Montrose",
    "Mooroolbark",
    "Mount Evelyn",
    "Selby",
    "Tecoma",
    "Upper Ferntree Gully",
    "Upwey",
    "Badger Creek",
    "Beenak",
    "Big Pats Creek",
    "Cambarville",
    "Chum Creek",
    "Coldstream",
    "Dixons Creek",
    "Don Valley",
    "Fernshaw",
    "Ferny Creek",
    "Gilderoy",
    "Gladysdale",
    "Gruyere",
    "Healesville",
    "Hoddles Creek",
    "Kallista",
    "Kalorama",
    "Launching Place",
    "Lysterfield",
    "Macclesfield",
    "McMahons Creek",
    "Matlock",
    "Menzies Creek",
    "Millgrove",
    "Monbulk",
    "Mount Dandenong",
    "Mount Toolebewong",
    "Narre Warren East",
    "Olinda",
    "Powelltown",
    "Reefton",
    "Sassafras",
    "Seville",
    "Seville East",
    "Sherbrooke",
    "Silvan",
    "Steels Creek",
    "Tarrawarra",
    "The Patch",
    "Three Bridges",
    "Toorongo",
    "Tremont",
    "Wandin East",
    "Wandin North",
    "Warburton",
    "Warburton East",
    "Wesburn",
    "Woori Yallock",
    "Yarra Glen",
    "Yarra Junction",
    "Yellingbo",
    "Yering"
]
const melbourneSouthEasternSuburbs = [
    "Beaumaris",
    "Black Rock",
    "Brighton",
    "Brighton East",
    "Cheltenham",
    "Gardenvale",
    "Hampton",
    "Hampton East",
    "Highett",
    "Sandringham",
    "Moorabbin",
    "Beaconsfield",
    "Officer",
    "Pakenham",
    "Emerald",
    "Avonsleigh",
    "Bayles",
    "Beaconsfield Upper",
    "Bunyip",
    "Bunyip North",
    "Caldermeade",
    "Cardinia",
    "Catani",
    "Clematis",
    "Cockatoo",
    "Cora Lynn",
    "Dalmore",
    "Dewhurst",
    "Garfield",
    "Garfield North",
    "Gembrook",
    "Guys Hill",
    "Heath Hill",
    "Iona",
    "Koo Wee Rup",
    "Koo Wee Rup North",
    "Lang Lang",
    "Lang Lang East",
    "Longwarry",
    "Maryknoll",
    "Menzies Creek",
    "Modella",
    "Monomeith",
    "Mount Burnett",
    "Nangana",
    "Nar Nar Goon",
    "Nar Nar Goon North",
    "Nyora",
    "Officer South",
    "Pakenham South",
    "Pakenham Upper",
    "Rythdale",
    "Tonimbuk",
    "Tooradin North",
    "Tynong",
    "Tynong North",
    "Vervale",
    "Yannathan",
    "Berwick",
    "Botanic Ridge",
    "Clyde",
    "Clyde North",
    "Cranbourne",
    "Cranbourne East",
    "Cranbourne North",
    "Cranbourne West",
    "Cranbourne South",
    "Doveton",
    "Endeavour Hills",
    "Eumemmerring",
    "Hallam",
    "Hampton Park",
    "Junction Village",
    "Lynbrook",
    "Narre Warren",
    "Narre Warren North",
    "Narre Warren South",
    "Blind Bight",
    "Cannons Creek",
    "Devon Meadows",
    "Harkaway",
    "Lysterfield South",
    "Pearcedale",
    "Tooradin",
    "Warneet",
    "Dandenong",
    "Dandenong North",
    "Dandenong South",
    "Keysborough",
    "Noble Park",
    "Noble Park North",
    "Springvale",
    "Springvale South",
    "Lyndhurst",
    "Bangholme",
    "Carrum Downs",
    "Frankston",
    "Karingal",
    "Olivers Hill",
    "Frankston North",
    "Frankston South",
    "Langwarrin",
    "Sandhurst",
    "Seaford",
    "Skye",
    "Langwarrin South",
    "Bentleigh",
    "Bentleigh East",
    "Caulfield",
    "Caulfield East",
    "Caulfield North",
    "Caulfield South",
    "Carnegie",
    "Elsternwick",
    "Gardenvale",
    "Glen Huntly",
    "McKinnon",
    "Murrumbeena",
    "Ormond",
    "St Kilda East",
    "Aspendale",
    "Aspendale Gardens",
    "Bonbeach",
    "Braeside",
    "Carrum",
    "Chelsea",
    "Chelsea Heights",
    "Cheltenham",
    "Clarinda",
    "Clayton South",
    "Dingley Village",
    "Edithvale",
    "Heatherton",
    "Highett",
    "Mentone",
    "Moorabbin",
    "Moorabbin Airport",
    "Mordialloc",
    "Parkdale",
    "Patterson Lakes",
    "Waterways",
    "Ashwood",
    "Burwood",
    "Chadstone",
    "Clayton",
    "Glen Waverley",
    "Syndal",
    "Hughesdale",
    "Huntingdale",
    "Monash University",
    "Mount Waverley",
    "Mulgrave",
    "Notting Hill",
    "Oakleigh",
    "Oakleigh East",
    "Oakleigh South",
    "Wheelers Hill",
    "Blairgowrie",
    "Capel Sound",
    "Dromana",
    "McCrae",
    "Mornington",
    "Mount Eliza",
    "Mount Martha",
    "Portsea",
    "Rosebud",
    "Rye",
    "Safety Beach",
    "St Andrews Beach",
    "Sorrento",
    "Tootgarook",
    "Bittern",
    "Crib Point",
    "Hastings",
    "Somerville",
    "Tyabb",
    "Arthurs Seat",
    "Balnarring",
    "Balnarring Beach",
    "Baxter",
    "Boneo",
    "Cape Schanck",
    "Fingal",
    "Flinders",
    "HMAS Cerberus",
    "Main Ridge",
    "Merricks",
    "Merricks Beach",
    "Merricks North",
    "Moorooduc",
    "Point Leo",
    "Red Hill",
    "Red Hill South",
    "Shoreham",
    "Somers",
    "Tuerong",
    "Armadale",
    "Glen Iris",
    "Kooyong",
    "Malvern",
    "Malvern East",
    "Prahran",
    "South Yarra",
    "Toorak",
    "Windsor"
]
const melbourneWesternSuburbs = [
    "Albanvale",
    "Albion",
    "Ardeer",
    "Brooklyn",
    "Cairnlea",
    "Calder Park",
    "Deer Park",
    "Delahey",
    "Derrimut",
    "Hillside",
    "Kealba",
    "Keilor",
    "Keilor Downs",
    "Keilor East",
    "Keilor Lodge",
    "Keilor North",
    "Keilor Park",
    "Kings Park",
    "St Albans",
    "Sunshine",
    "Sunshine North",
    "Sunshine West",
    "Sydenham",
    "Taylors Lakes",
    "Altona",
    "Altona Meadows",
    "Altona North",
    "Brooklyn",
    "Laverton",
    "Newport",
    "Spotswood",
    "Seabrook",
    "Seaholme",
    "South Kingsville",
    "Williamstown",
    "Williamstown North",
    "Braybrook",
    "Footscray",
    "Kingsville",
    "Maidstone",
    "Maribyrnong",
    "Seddon",
    "Tottenham",
    "West Footscray",
    "Yarraville",
    "Aintree",
    "Bonnie Brook",
    "Brookfield",
    "Burnside",
    "Burnside Heights",
    "Caroline Springs",
    "Cobblebank",
    "Deanside",
    "Diggers Rest , a township",
    "Exford",
    "Eynesbury",
    "Fieldstone",
    "Fraser Rise",
    "Grangefields",
    "Harkness",
    "Hillside",
    "Kurunjang",
    "Melton",
    "Melton South",
    "Melton West",
    "Mount Cottrell",
    "Parwan",
    "Plumpton",
    "Ravenhall",
    "Rockbank",
    "Strathtulloh",
    "Taylors Hill",
    "Thornhill Park",
    "Toolern Vale",
    "Truganina",
    "Weir Views",
    "Hoppers Crossing",
    "Laverton",
    "Laverton North",
    "Manor Lakes",
    "Point Cook",
    "Tarneit",
    "Truganina",
    "Werribee",
    "Werribee South",
    "Williams Landing",
    "Wyndham Vale",
    "Cocoroc",
    "Eynesbury",
    "Little River",
    "Mambourin",
    "Mount Cottrell",
    "Quandong"
]

const brisbaneInnerSuburbs = [
    "Bowen Hills", "Brisbane", "East Brisbane", "Fortitude Valley", "Herston", "Highgate Hill", "Kangaroo Point", "Kelvin Grove", "New Farm", "Newstead", "Paddington", "Petrie Terrace", "Red Hill", "South Brisbane", "Spring Hill", "Teneriffe", "West End", "Woolloongabba"
]
const brisbaneNorhernSuburbs = [
    "Albion", "Alderley", "Ascot", "Aspley", "Bald Hills", "Banyo", "Boondall", "Bracken Ridge", "Bridgeman Downs", "Brighton", "Brisbane Airport", "Carseldine", "Chermside", "Chermside West", "Clayfield", "Deagon", "Eagle Farm", "Everton Park", "Ferny Grove", "Fitzgibbon", "Gaythorne", "Geebung", "Gordon Park", "Grange", "Hamilton", "Hendra", "Kalinga", "Kedron", "Keperra", "Lutwyche", "McDowall", "Mitchelton", "Myrtletown", "Newmarket", "Northgate", "Nudgee", "Nudgee Beach", "Nundah", "Pinkenba", "Sandgate", "Shorncliffe", "Stafford", "Stafford Heights", "Taigum", "Virginia", "Wavell Heights", "Wilston", "Windsor", "Wooloowin", "Zillmere"
]
const brisbaneSouthernSuburbs = [
    "Acacia Ridge", "Algester", "Annerley", "Archerfield", "Burbank", "Calamvale", "Coopers Plains", "Darra", "Doolandella", "Drewvale", "Durack", "Dutton Park", "Eight Mile Plains", "Ellen Grove", "Fairfield", "Forest Lake", "Greenslopes", "Heathwood", "Holland Park", "Holland Park West", "Inala", "Karawatha", "Kuraby", "Larapinta", "MacGregor", "Mackenzie", "Mansfield", "Moorooka", "Mount Gravatt", "Mount Gravatt East", "Nathan", "Pallara", "Parkinson", "Richlands", "Robertson", "Rochedale", "Rocklea", "Runcorn", "Salisbury", "Seventeen Mile Rocks", "Sinnamon Park", "Stones Corner", "Stretton", "Sumner", "Sunnybank", "Sunnybank Hills", "Tarragindi", "Tennyson", "Upper Mount Gravatt", "Wacol", "Willawong", "Wishart", "Yeerongpilly", "Yeronga"
]
const brisbaneEasternSuburbs = [
    "Balmoral", "Belmont", "Bulimba", "Camp Hill", "Cannon Hill", "Carina", "Carindale", "Chandler", "Coorparoo", "Gumdale", "Hawthorne", "Hemmant", "Lota", "Lytton", "Manly", "Manly West", "Moreton Island", "Morningside", "Murarrie", "Norman Park", "Port of Brisbane", "Ransome", "Seven Hills", "Tingalpa", "Wakerley", "Wynnum", "Wynnum West"
]
const brisbaneWesternSuburbs = [
    "Anstead", "Ashgrove", "Auchenflower", "Bardon", "Bellbowrie", "Brookfield", "Chapel Hill", "Chelmer", "Chuwar", "Corinda", "Enoggera", "Enoggera Reservoir", "Fig Tree Pocket", "Graceville", "Indooroopilly", "Jamboree Heights", "Jindalee", "Karana Downs", "Kenmore", "Kenmore Hills", "Kholo", "Lake Manchester", "Middle Park", "Milton", "Moggill", "Mount Coot-tha", "Mount Crosby", "Mount Ommaney", "Oxley", "Pinjarra Hills", "Pullenvale", "Riverhills", "Sherwood", "Sinnamon Park", "St Lucia", "Taringa", "The Gap", "Toowong", "Upper Brookfield", "Upper Kedron", "Westlake"
]
const sydneyInnerSuburbs = [
    "Alexandria","Annandale","Barangaroo","Beaconsfield","Camperdown","Centennial Park","Chippendale","Darlinghurst","Darlington","Dawes Point","Elizabeth Bay","Erskineville","Eveleigh","Forest Lodge","Glebe","Haymarket","Millers Point","Moore Park","Newtown","Paddington","Potts Point","Pyrmont","Redfern","Rosebery","Rushcutters Bay","Surry Hills","Sydney CBD","The Rocks","Ultimo","Waterloo","Woolloomooloo","Zetland"
]
const northSydneySuburbs = [ "Beecroft", "Carlingford", "Cheltenham", "Cherrybrook", "Denistone", "Denistone East",
    "Denistone West", "Dundas", "Dundas Valley", "East Ryde", "Eastwood", "Epping",
    "Ermington", "Gladesville", "Henley", "Hunters Hill", "Huntleys Cove", "Huntleys Point",
    "Macquarie Park", "Marsfield", "Meadowbank", "Melrose Park", "North Epping", "North Ryde",
    "Normanhurst", "Pennant Hills", "Putney", "Ryde", "Telopea", "Tennyson Point",
    "Thornleigh", "West Pennant Hills", "West Ryde", "Westleigh", "Woolwich"
]
const southSydneySuburbs = [ "Allawah" ,"Arncliffe" ,"Banksia" ,"Bardwell Park" ,"Bardwell Valley" ,"Bexley",
    "Bexley North" ,"Beverley Park" ,"Beverly Hills" ,"Blakehurst" ,"Brighton-Le-Sands" ,"Carlton",
    "Carss Park" ,"Connells Point" ,"Dolls Point" ,"Hurstville" ,"Hurstville Grove" ,"Kingsgrove",
    "Kogarah" ,"Kogarah Bay" ,"Kyeemagh" ,"Kyle Bay" ,"Lugarno" ,"Monterey",
    "Mortdale" ,"Narwee" ,"Oatley" ,"Peakhurst" ,"Penshurst" ,"Ramsgate",
    "Ramsgate Beach" ,"Rockdale" ,"Sandringham" ,"Sans Souci" ,"South Hurstville" ,"Sydney Airport",
    "Turrella" ,"Wolli Creek",
    "Alfords Point" ,"Bangor" ,"Barden Ridge" ,"Bonnet Bay" ,"Bundeena" ,"Burraneer",
    "Caringbah" ,"Como" ,"Cronulla" ,"Dolans Bay" ,"Engadine" ,"Grays Point",
    "Gymea" ,"Gymea Bay" ,"Heathcote" ,"Illawong" ,"Jannali" ,"Kangaroo Point",
    "Kareela" ,"Kirrawee" ,"Kurnell" ,"Lilli Pilli" ,"Loftus" ,"Lucas Heights",
    "Maianbar" ,"Menai" ,"Miranda" ,"Oyster Bay" ,"Port Hacking" ,"Sandy Point",
    "Sutherland" ,"Sylvania" ,"Sylvania Waters" ,"Taren Point" ,"Waterfall" ,"Woolooware",
    "Woronora" ,"Woronora Heights" ,"Yarrawarrah" ,"Yowie Bay",
    "Ambarvale" ,"Appin" ,"Bargo" ,"Bradbury" ,"Camden" ,"Campbelltown",
    "Glen Alpine" ,"Harrington Park" ,"Ingleburn" ,"Leumeah" ,"Menangle" ,"Minto",
    "Mount Annan" ,"Narellan" ,"Picton" ,"Tahmoor",
]
const eastSydneySuburbs = [
    "Banksmeadow", "Bondi", "Bondi Beach", "Bondi Junction", "Botany", 
    "Bronte", "Chifley", "Clovelly", "Coogee", "Coogee Beach", "Darling Point", 
    "Double Bay", "Dover Heights", "Eastgardens", "Eastlakes", "Edgecliff", "Kensington", 
    "Kingsford", "Matraville", "Moore Park", "North Bondi", "Paddington", "Pagewood", 
    "Randwick", "Rose Bay", "Rose Bay North", "Vaucluse", "Waterloo", "Watsons Bay", 
    "Waverley", "Woollahra", "Zetland", 
    "Redfern", "Alexandria", "Rosebery", "Mascot", "La Perouse", "Malabar", 
    "Little Bay", "Phillip Bay", "Port Botany", "Hillsdale", "Maroubra", 
]
const westSydneySuburbs = [
    "Ashbury", "Bass Hill", "Belfield", "Belmore", "Beverly Hills", "Birrong", 
    "Canterbury", "Campsie", "Chester Hill", "Chullora", "Clemton Park", "Condell Park", 
    "Croydon Park", "Earlwood", "Georges Hall", "Greenacre", "Hurlstone Park", "Kingsgrove", 
    "Lakemba", "Lansdowne", "Leightonfield", "Milperra", "Mount Lewis", "Narwee", 
    "Padstow", "Padstow Heights", "Panania", "Picnic Point", "Potts Hill", "Punchbowl", 
    "Regents Park", "Revesby", "Revesby Heights", "Riverwood", "Roselands", "Sefton", 
    "Undercliffe", "Villawood", "Wiley Park", "Yagoona"
]
const adelaideCity = ["Adelaide", "North Adelaide", "University of Adelaide"]
const adelaideInnerNorth = ["Allenby Gardens","Angle Park","Athol Park","Beverley","Blair Athol","Cavan","Clearview","Collinswood","Croydon","Croydon Park","Dudley Park","Ferryden Park","Gepps Cross","Gilberton","Gilles Plains","Hampstead Gardens","Hillcrest","Holden Hill","Kilburn","Kilkenny","Klemzig","Mansfield Park","Northgate","Oakden","Ovingham","Prospect","Regency Park","Sefton Park","Walkerville","Woodville","Woodville Gardens","Woodville North","Woodville South"]
const adelaideInnerSouth = ["Ascot Park","Bedford Park","Camden Park","Clapham","Clarence Gardens","Clarence Park","Clovelly Park","Colonel Light Gardens","Cumberland Park","Daw Park Eastwood","Edwardstown","Everard Park","Forestville","Frewville","Fullarton","Glen Osmond","Glenunga","Goodwood","Hawthorn","Highgate","Hyde Park","Kingswood","Kurralta Park","Malvern","Marion","Millswood","Mitcham","Mitchell Park","Oaklands Park","Parkside","Pasadena","Plympton","South Plympton","Springfield","Torrens Park","Unley","Warradale"]
const adelaideInnerEast = ["Beulah Park","Burnside","Campbelltown","Dernancourt","Dulwich","Erindale","Evandale","Felixstow","Firle","Glenside","Glynde","Hackney","Hazelwood Park","Hectorville","Kensington","Kensington Gardens","Kent Town","Leabrook","Linden Park","Marden","Marryatville","Maylands","Newton","Norwood","Paradise","Rose Park","Rostrevor","Royston Park","St Morris","St Peters","Stepney","Stonyfell","Toorak Gardens","Tranmere","Tusmore","Waterfall Gully"]
const adelaideInnerWest = ["Adelaide Airport","Bowden","Brompton","Brooklyn Park","Findon","Flinders Park","Fulham","Grange","Henley Beach","Henley Beach South","Hilton","Hindmarsh","Kidman Park","Lockleys","Marleston","Mile End","Mile End South","Richmond","Seaton","Thebarton","Torrensville","Welland","West Beach","West Richmond"]

const regions = {
    VIC: {
        melbourneInnerSuburbs,
        melbourneNorthernSuburbs,
        melbourneEasternSuburbs,
        melbourneSouthEasternSuburbs,
        melbourneWesternSuburbs
    },
    QLD: {
        brisbaneInnerSuburbs, brisbaneNorhernSuburbs, brisbaneSouthernSuburbs, brisbaneEasternSuburbs, brisbaneWesternSuburbs
    },
    NSW: {
        sydneyInnerSuburbs,
        northSydneySuburbs,
        southSydneySuburbs,
        eastSydneySuburbs,
        westSydneySuburbs
    },
    SA: {
        adelaideCity,
        adelaideInnerNorth,
        adelaideInnerSouth,
        adelaideInnerEast,
        adelaideInnerWest,
    }
}

Object.keys(regions).forEach(state => {
    Object.keys(regions[state]).forEach(r => {
        suburbs = regions[state][r];
        const regionData = {
            "type": "FeatureCollection", "features": []
        }
        suburbs.forEach(suburb => {
            const f = suburbFile(suburb.toUpperCase(), state);
            if (fs.existsSync(f)) {
                console.log(`${f}`)
                const geo = JSON.parse(fs.readFileSync(f, 'utf8'));
                regionData.features.push(...geo.features)
            }
        })
        const txt = JSON.stringify(regionData, null, 2)
        fs.writeFileSync(`${__dirname}/GeoJSON-Regions/${r}.json`, txt)
    })
})


module.exports = {
    regions
}