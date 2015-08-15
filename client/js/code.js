var map;

var map_theme = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#dde6e8"},{"visibility":"on"}]}];

function loadResults (data) {
    var items, markers_data = [];
    if (data.length > 0) {
        items = data;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];

            if (item.lat != undefined && item.long != undefined) {
                var icon = url_website + 'assets/images/marker.png';

                markers_data.push({
                    lat : item.lat,
                    lng : item.long,
                    title : item.name,
                    icon : {
                        size : new google.maps.Size(32, 32),
                        url : icon
                    },
                    infoWindow: {
                        content: '<p><strong>' + item.name + '</strong><br>' + item.address + '<br><br>' + item.comments + '</p>'
                    }
                });
            }
        }
    }

    map.addMarkers(markers_data);
}

$(document).ready(function () {
    //$('#share').sharrre({
    //    share: {
    //        facebook: true,
    //        twitter: true
    //    },
    //    buttons: {
    //        facebook: {
    //            lang: 'es'
    //        },
    //        twitter: {
    //            lang: 'es'
    //        }
    //    },
    //    url: 'http://www.acasedona.com.ar/'
    //});

    map = new GMaps({
        div: '#map',
        lat: -34.6036844,
        lng: -58.381559100000004,
        zoom: 8
    });

    map.addStyle({
        styledMapName:"Styled Map",
        styles: map_theme,
        mapTypeId: "map_style"
    });

    map.setStyle("map_style");

    var xhr = $.getJSON(url_website + 'places');
    xhr.done(loadResults);

    GMaps.geolocate({
        success: function (position) {
            map.setCenter(position.coords.latitude, position.coords.longitude);
        },
        error: function (error) {
            console.log('Geolocation failed: ' + error.message);
        },
        not_supported: function () {
            console.log("Your browser does not support geolocation");
        }
    });

    $('.timepicker').timepicker();
});