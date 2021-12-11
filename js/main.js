var map;
var dataStats = {};
var attrArray = ["Any", "Iron", "Chondrite", "Achondrite", "Stony-Iron", "Stony", "Unclassified"];
var expressed;
var expressed2;
var mappy;

function createMap(){

    //create the map
    map = L.map('mapId', {
        center: [0, 0],
        zoom: 2.5,
        maxBoundsViscosity: 1.0,
        noWrap: true,
    });
    map.setMaxBounds([[-90,-180],[90,180]]);
    //add OSM base tilelayer
    L.tileLayer('https://api.mapbox.com/styles/v1/alch2627/ckvspn2by193d15qstl0e9tml/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxjaDI2MjciLCJhIjoiY2t0YW4zMTlmMW5zMTJvcW55bTRuMjVkcyJ9.GsqehXFywlQEsXmvbwlZvg', {
        minZoom: 2.5,
        noWrap: true,
        attribution: 'Map data: &copy; <a href=”https://www.mapbox.com/about/maps/”>Mapbox</a> &copy; <a href=”http://www.openstreetmap.org/copyright”>OpenStreetMap</a>)'
    }).addTo(map);

    //call getData function
    getData(map);
};

//This function sets our symbol radii.
function calcPropRadius(attValue) {
    //constant factor adjusts symbol sizes evenly
    var minRadius = 4;
    var radius;
    //Flannery Apperance Compensation formula
    if (attValue <= 2000)
    {
        radius = 4;
    }
    if (attValue > 2000 && attValue <= 50000)
    {
        radius = 8;
    }
    if (attValue > 50000  && attValue <= 2000000)
    {
        radius = 15;
    }
    if (attValue > 2000000 && attValue <= 4000000)
    {
        radius = 22;
    }
    if (attValue > 4000000)
    {
        radius = 30;
    }

    return radius;
};

//This function creates our symbols. It sets the color as well as the popup format.
function createPropSymbols(data){

    var attribute = "Mass (g)";
    //create marker options
    var geojsonMarkerOptions = {
        color: "white",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
        radius: 8
    };

    mappy = L.geoJson(data, {
        filter: filterData,
        pointToLayer: function (feature, latlng) {
            //Step 5: For each feature, determine its value for the selected attribute
            var attValue = parseFloat(feature.properties[attribute]);

            //Step 6: Give each feature's circle marker a radius based on its attribute value
            geojsonMarkerOptions.radius = calcPropRadius(attValue);
            //console.log(attValue)

            //geojsonMarkerOptions.color = setColor(attValue)
            if (feature.properties.Composition =="Chondrite")
            {
                geojsonMarkerOptions.fillColor = "#F50076";
            } else if  (feature.properties.Composition =="Iron")
            {
                geojsonMarkerOptions.fillColor = "#00A5F5";
            } else if  (feature.properties.Composition =="Achondrite")
            {
                geojsonMarkerOptions.fillColor = "#FFE800";
            } else if (feature.properties.Composition == "Stony")
            {
                geojsonMarkerOptions.fillColor = "#FF7700";
            } else if (feature.properties.Composition == "Stony-Iron")
            {
                geojsonMarkerOptions.fillColor = "#00FF9C";
            } else {
                geojsonMarkerOptions.fillColor = "Gray";
            }
            //create circle markers
            layer = L.circleMarker(latlng, geojsonMarkerOptions);

            var popupContent = "<p><b>Meteor:</b> " + feature.properties.Name + "</p>";

            //add formatted attribute to popup content string
            popupContent += "<p><b>Mass: </b> " + " " + feature.properties["Mass (g)"] + " grams</p>";

            popupContent += "<p><b>Composition: </b> " + " " + feature.properties.Composition + "</p>";

            popupContent += "<p><b>Date: </b> " + " " + feature.properties.Date + "</p>";

            //bind the popup to the circle marker
            layer.bindPopup(popupContent, {
                //offset: new L.Point(0,-options.radius)
            })
            return layer;

        }
    }).addTo(map);
};

//Here we filter the data so that both of our dropdown menus work simulataneously.
function filterData(data)
{
    if (expressed2 == "Any" || expressed2 == "Select Time Period")
    {
        if (expressed == "Any" || expressed == "Select Classification")
        {
            return true;
        }
        else if (data.properties.Composition == "Iron" && expressed == "Iron")
        {
            return true;
        }
        else if (data.properties.Composition == "Chondrite" && expressed == "Chondrite")
        {
            return true;
        }
        else if (data.properties.Composition == "Achondrite" && expressed == "Achondrite")
        {
            return true;
        }
        else if (data.properties.Composition == "Stony-Iron" && expressed == "Stony-Iron")
        {
            return true;
        }
        else if (data.properties.Composition == "Stony" && expressed == "Stony")
        {
            return true;
        }
        else if (data.properties.Composition == "Unclassified" && expressed == "Unclassified")
        {
            return true;
        }
        else{
            return false;
        }
    }
    else if (expressed2 == "Before 1800" && parseInt(data.properties.Year) < 1800)
    {
        if (expressed == "Any" || expressed == "Select Classification")
        {
            return true;
        }
        else if (data.properties.Composition == "Iron" && expressed == "Iron")
        {
            return true;
        }
        else if (data.properties.Composition == "Chondrite" && expressed == "Chondrite")
        {
            return true;
        }
        else if (data.properties.Composition == "Achondrite" && expressed == "Achondrite")
        {
            return true;
        }
        else if (data.properties.Composition == "Stony-Iron" && expressed == "Stony-Iron")
        {
            return true;
        }
        else if (data.properties.Composition == "Stony" && expressed == "Stony")
        {
            return true;
        }
        else if (data.properties.Composition == "Unclassified" && expressed == "Unclassified")
        {
            return true;
        }
        else{
            return false;
        }
    }
    else if (expressed2 == "1800-1900" && parseInt(data.properties.Year) >= 1800 &&  parseInt(data.properties.Year) <= 1900)
    {
        if (expressed == "Any" || expressed == "Select Classification")
        {
            return true;
        }
        else if (data.properties.Composition == "Iron" && expressed == "Iron")
        {
            return true;
        }
        else if (data.properties.Composition == "Chondrite" && expressed == "Chondrite")
        {
            return true;
        }
        else if (data.properties.Composition == "Achondrite" && expressed == "Achondrite")
        {
            return true;
        }
        else if (data.properties.Composition == "Stony-Iron" && expressed == "Stony-Iron")
        {
            return true;
        }
        else if (data.properties.Composition == "Stony" && expressed == "Stony")
        {
            return true;
        }
        else if (data.properties.Composition == "Unclassified" && expressed == "Unclassified")
        {
            return true;
        }
        else{
            return false;
        }
    }
    else if (expressed2 == "1901-1950" && parseInt(data.properties.Year) > 1900 &&  parseInt(data.properties.Year) <= 1950)
    {
        if (expressed == "Any" || expressed == "Select Classification")
        {
            return true;
        }
        else if (data.properties.Composition == "Iron" && expressed == "Iron")
        {
            return true;
        }
        else if (data.properties.Composition == "Chondrite" && expressed == "Chondrite")
        {
            return true;
        }
        else if (data.properties.Composition == "Achondrite" && expressed == "Achondrite")
        {
            return true;
        }
        else if (data.properties.Composition == "Stony-Iron" && expressed == "Stony-Iron")
        {
            return true;
        }
        else if (data.properties.Composition == "Stony" && expressed == "Stony")
        {
            return true;
        }
        else if (data.properties.Composition == "Unclassified" && expressed == "Unclassified")
        {
            return true;
        }
        else{
            return false;
        }
    }
    else if (expressed2 == "1951-1975" && parseInt(data.properties.Year) > 1950 &&  parseInt(data.properties.Year) <= 1975)
    {
        if (expressed == "Any" || expressed == "Select Classification")
        {
            return true;
        }
        else if (data.properties.Composition == "Iron" && expressed == "Iron")
        {
            return true;
        }
        else if (data.properties.Composition == "Chondrite" && expressed == "Chondrite")
        {
            return true;
        }
        else if (data.properties.Composition == "Achondrite" && expressed == "Achondrite")
        {
            return true;
        }
        else if (data.properties.Composition == "Stony-Iron" && expressed == "Stony-Iron")
        {
            return true;
        }
        else if (data.properties.Composition == "Stony" && expressed == "Stony")
        {
            return true;
        }
        else if (data.properties.Composition == "Unclassified" && expressed == "Unclassified")
        {
            return true;
        }
        else{
            return false;
        }
    }
    else if (expressed2 == "1976-2000" && parseInt(data.properties.Year) > 1975 &&  parseInt(data.properties.Year) < 2001)
    {
        if (expressed == "Any" || expressed == "Select Classification")
        {
            return true;
        }
        else if (data.properties.Composition == "Iron" && expressed == "Iron")
        {
            return true;
        }
        else if (data.properties.Composition == "Chondrite" && expressed == "Chondrite")
        {
            return true;
        }
        else if (data.properties.Composition == "Achondrite" && expressed == "Achondrite")
        {
            return true;
        }
        else if (data.properties.Composition == "Stony-Iron" && expressed == "Stony-Iron")
        {
            return true;
        }
        else if (data.properties.Composition == "Stony" && expressed == "Stony")
        {
            return true;
        }
        else if (data.properties.Composition == "Unclassified" && expressed == "Unclassified")
        {
            return true;
        }
        else{
            return false;
        }
    }
    else if (expressed2 == "2001-Present" && parseInt(data.properties.Year) > 2000)
    {
        if (expressed == "Any" || expressed == "Select Classification")
        {
            return true;
        }
        else if (data.properties.Composition == "Iron" && expressed == "Iron")
        {
            return true;
        }
        else if (data.properties.Composition == "Chondrite" && expressed == "Chondrite")
        {
            return true;
        }
        else if (data.properties.Composition == "Achondrite" && expressed == "Achondrite")
        {
            return true;
        }
        else if (data.properties.Composition == "Stony-Iron" && expressed == "Stony-Iron")
        {
            return true;
        }
        else if (data.properties.Composition == "Stony" && expressed == "Stony")
        {
            return true;
        }
        else if (data.properties.Composition == "Unclassified" && expressed == "Unclassified")
        {
            return true;
        }
        else{
            return false;
        }
    }
    else {
        return false;
    }
};

//Here we create the classification dropbox
function createDropdown(data) {
    //add select element
    expressed = "Select Classification";
    var dropdown = d3
        .select("body")
        .append("select")
        .style("z-index", "999")
        .attr("class", "dropdown")
        .on("change", function () {
            changeAttribute(this.value, data);
        });
    //add initial option
    var titleOption = dropdown
        .append("option")
        .attr("class", "titleOption")
        .attr("disabled", "true")
        .text("Select Classification");

    //add attribute name options
    var attrOptions = dropdown
        .selectAll("attrOptions")
        .data(attrArray)
        .enter()
        .append("option")
        .attr("value", function (d) {
            return d;
        })
        .text(function (d) {
            return d;
        });
}

//dropdown change listener handler
function changeAttribute(attribute, data) {
    //change the expressed attribute
    expressed = attribute;
    console.log(expressed);
    mappy.clearLayers();
    createPropSymbols(data);
};

//Here we make the time dropbox
attrArrray2 = ["Any", "Before 1800", "1800-1900", "1901-1950", "1951-1975", "1976-2000", "2001-Present"];
function createTimeDropdown(data) {
    //add select element
    expressed2 = "Select Time Period";
    var dropdown2 = d3
        .select("body")
        .append("select")
        .style("z-index", "999")
        .attr("class", "dropdown2")
        .on("change", function () {
            changeAttributeTime(this.value, data);
        });
    //add initial option
    var titleOption = dropdown2
        .append("option")
        .attr("class", "titleOption")
        .attr("disabled", "true")
        .text("Select Time Period");

    //add attribute name options
    var attrOptions = dropdown2
        .selectAll("attrOptions")
        .data(attrArrray2)
        .enter()
        .append("option")
        .attr("value", function (d) {
            return d;
        })
        .text(function (d) {
            return d;
        });
}

function changeAttributeTime(attribute, data) {
    //change the expressed attribute
    expressed2 = attribute;
    console.log(expressed2);
    mappy.clearLayers();
    createPropSymbols(data);
};

//This makes the credits box on the bottom left as well as the legend on the bottom right
function createCredits(){
    var credits = L.Control.extend({
        options: {
            position: 'bottomleft'
        },

        onAdd: function () {
            // create the control container with a particular class name
            var creditcontents = L.DomUtil.create('div', 'credits-contents');

            $(creditcontents).append('<div class="creditsbox">Credits</div>');

            //Step 1: start attribute legend svg string
            var svg2 = '<svg id="credits-box" width="600px" height="150px">';

            svg2 += '<text id="' + "5" + '-text" x="2" y="' + 20 + '">' + "This map was created by Alex Chang" + '</text>'
            svg2 += '<text id="' + "6" + '-text" x="2" y="' + 35 + '">' + "Asher Eskind, Adam Straussburger," + '</text>'
            svg2 += '<text id="' + "7" + '-text" x="2" y="' + 50 + '">' + "and Marcus Tamburro." + '</text>'
            svg2 += '<text id="' + "7" + '-text" x="2" y="' + 65 + '">' + "The visualization shows meteorites" + '</text>'
            svg2 += '<text id="' + "7" + '-text" x="2" y="' + 80 + '">' + "which were seen falling and found" + '</text>'
            svg2 += '<text id="' + "85" + '-text" x="2" y="' + 95 + '">' + "after making impact with the ground." + '</text>'
            svg2 += '<a xlink:href=https://www.britannica.com/science/meteorite><text id="' + "7" + '-text" x="2" y="' + 110 + '" fill="blue">' + "Additional Information" + '</text></a>'
            svg2 += '<a xlink:href=https://github.com/freeCodeCamp/ProjectReferenceData/blob/master/meteorite-strike-data.json><text id="' + "7" + '-text" x="2" y="' + 125 + '" fill="blue">' + "Github Link" + '</text></a>'            

            //close svg string
            svg2 += "</svg>";

            //add attribute legend svg to container
            $(creditcontents).append(svg2);

            return creditcontents;
        }
    });

    map.addControl(new credits());

    var legend = L.Control.extend({
        options: {
            position: 'bottomright'
        },

        onAdd: function () {
            // create the control container with a particular class name
            var legendContents = L.DomUtil.create('div', 'legend-contents');
            $(legendContents).append('<img src="img/meteoriteLegend-cropped.svg">');

            return legendContents;
        }
    });

    map.addControl(new legend());
};

//This calls all of our functions and gets the data
function getData(map){
    //load the data
    $.getJSON("data/meteorites.geojson", function(response){

            createDropdown(response);
            createTimeDropdown(response);
            //call function to create proportional symbols
            createPropSymbols(response);
            createCredits();
            
    });
};

$(document).ready(createMap);