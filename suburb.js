const suburbName = (suburb) => suburb.replace(/\s*\(.+?\)$/g, "").trim().toUpperCase()
const suburbFile = (suburb, state, ext="json", baseDir="GeoJSON") => `${__dirname}/${baseDir}/${state}/${suburb}.${ext}`
const suburbKmlFile = (suburb, state) => suburbFile(suburb, state, ext="kml", baseDir="kml")

module.exports = 
{ 
    suburbName,
    suburbFile,
    suburbKmlFile
};