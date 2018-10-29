const fs = require('fs');
const parser = require('xml2json');
const _ = require("lodash")
const getPostCode = require("./postcodes");
const {suburbFile, suburbName} = require('./suburb')

const ensureArr = a => _.isArray(a) ? a : [a]

const states = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"]
states.forEach(state => {
    const stateFolder = `${__dirname}/GeoJSON/${state}`
    if (!fs.existsSync(stateFolder)){
        fs.mkdirSync(stateFolder);
    }
})


const toPolygon = s => {
    const polygon = [];
    const coords = _.compact(s.split(/,|\s/).map(ss => ss.trim()))
    for (i = 0; i < coords.length; i += 2) {
        const lng = parseFloat(coords[i]);
        const lat = parseFloat(coords[i + 1]);
        polygon.push([lng, lat])
    }
    return polygon
}

const generatePostcodes = () => {
    states.forEach(state => {
        const suburbKmlFiles = fs.readdirSync(`${__dirname}/${state}`).filter(f => f.toLowerCase().endsWith(".kml"));
        suburbKmlFiles.forEach(suburbKmlFile => {

            suburb = suburbName(suburbKmlFile.replace(/\.kml/i, ""))
            const rawXml = fs.readFileSync(`${__dirname}/${state}/${suburbKmlFile}`, "utf-8")
            var kmlData = JSON.parse(parser.toJson(rawXml));
            console.log(`${state} => ${suburb} => `)
            const polygons = ensureArr(kmlData.kml.Document.Placemark.MultiGeometry.Polygon).map(p => toPolygon(p.outerBoundaryIs.LinearRing.coordinates));
            console.log(`${state} => ${suburb} => ` + polygons.length)

            postcode = getPostCode(suburb, state);
            const suburbJsonFile = suburbFile(suburb, state)
            let suburbData = {
                "type": "FeatureCollection", "features": [
                    {   
                        "type": "Feature",
                        "id": `${state}-${suburb}-${postcode}`,
                        "properties": {
                            "name": `${suburb} (${state} ${postcode})`,
                            "density": 57.05
                        },
                        "geometry": {
                            "type": polygons.length === 1 ? "Polygon" : "MultiPolygon",
                            "coordinates": polygons.length === 1 ? polygons : [polygons]
                        }
                    }
                ]
            }
            const txt = JSON.stringify(suburbData, null, 2);
            fs.writeFileSync(suburbJsonFile, txt, {})
        })
    })
}

generatePostcodes();



// console.log(getPostCodes("East Melbourne".toUpperCase(), "NSW"))


// const f = `${__dirname}/ACT/BARTON.kml`

// var o = JSON.parse(parser.toJson(fs.readFileSync(f, "utf-8")));
// const coords = ensureArr(o.kml.Document.Placemark.MultiGeometry.Polygon).map(p => p.outerBoundaryIs.LinearRing.coordinates);
// console.log(JSON.stringify(coords, null, 2));