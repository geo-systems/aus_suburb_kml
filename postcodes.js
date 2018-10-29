const fs = require('fs');
const _ = require("lodash");
const {suburbName} = require('./suburb')

const postcodes = fs.readFileSync(`${__dirname}/postcode, suburb, state concordance.csv`, "utf-8").trim().split(/\r?\n/);
const stateToSuburbsToPostCodes = {
    "ACT": {}, "NSW": {}, "NT": {}, "QLD": {}, "SA": {}, "TAS": {}, "VIC": {}, "WA": {}
};
postcodes.forEach(line => {
    let [state, suburb, postcode] = line.toUpperCase().split(",")
    suburb = suburbName(suburb);
    postcode = _.padStart(postcode, 4, "0")
    if(stateToSuburbsToPostCodes[state]){
        stateToSuburbsToPostCodes[state][suburb] = postcode;
    }
})

const getPostCode = (suburb, state) => stateToSuburbsToPostCodes[state][suburb]

// console.log(getPostCodes("East Melbourne".toUpperCase(), "NSW"))

// https://en.wikipedia.org/wiki/List_of_Melbourne_suburbs
// https://en.wikipedia.org/wiki/List_of_Brisbane_suburbs
// Perth https://www.bobinoz.com/living-in-australia/perth/inner-perth/
// Sydney https://www.bobinoz.com/living-in-australia/sydney/
// Sydney https://en.wikipedia.org/wiki/Regions_of_Sydney
// https://en.wikipedia.org/wiki/Regions_of_South_Australia

module.exports = getPostCode;