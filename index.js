$(document).ready(function() { 
    $('#mapid').height(window.innerHeight);

    var map = L.map('mapid')
    .setView([40.55972134684838,-110.56640625], 3);

    //Function and event to give LatLng
    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }
    
    map.on('click', onMapClick);

	L.tileLayer('https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
		// maxZoom: 18,
        attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
        bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
        minZoom: 1,
        maxZoom: 8,
        format: 'jpg',
        time: '',
        tilematrixset: 'GoogleMapsCompatible_Level'
    }).addTo(map);
    
    //Configure a popup

    //Load wilderness areas and add them with style
    // fetch('data/USA_Wilderness_Areas.json',{
    //     method:'GET'
    // })
    // .then(response => response.json())
    // .then(json => {
    //     var countriesGeoJSON = L.geoJSON(json, {
    //         style: function(feature) {
    //             return {
    //                 fillOpacity:0, 
    //                 color: '#b0229c',
    //                 opacity: 0.5,
    //                 weight: 0.5
    //             };
    //         },
    //         onEachFeature: function(feature,layer){
    //             layer.on('mouseover',function(e) {
    //                 e.target.setStyle({fillOpacity:0.3})
    //             })
    //             layer.on('mouseout',function(e) {
    //                 e.target.setStyle({fillOpacity:0})
    //             })  
    //         }
    //     }).addTo(map).bindPopup("I am a wilderness area");
    //     if(earthquakesGeoJSON){
    //         earthquakesGeoJSON.bringToFront();
    //     }
    //     map.fitBounds(countriesGeoJSON.getBounds());
    // })
    // .catch(error => console.log(error.message));


    L.geoJSON(STATES, {
        style:function(feature){
            return {
                color:"#99cc00",
                fillOpacity:0, 
                opacity: 0.5,
                weight: 0.5
            }
        }
    }).addTo(map);

    L.geoJSON(Wilderness, {
        style:function(feature){
            return {
                color:"#cc0099",
                fillOpacity:0, 
                opacity: 0.8,
                weight: 0.5
            }
        },
        onEachFeature: function(feature,layer){
            layer.on('mouseover',function(e) {
                e.target.setStyle({fillOpacity:0.3})
            })
            layer.on('mouseout',function(e) {
                e.target.setStyle({fillOpacity:0})
            })  
        }
    }).bindPopup(function(layer){
        return `<h3>Designated Wilderness</h3><br><strong>Name</strong>: ${layer.feature.properties.WILDERNESSNAME}<br/><strong>Acres</strong>: ${Math.round(layer.feature.properties.GIS_ACRES)}`
    }).addTo(map);

});