/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global initialLocation, google, map, markers, directionsService, directionsDisplay */

//Categories jquery request to get shops by category
$( document ).ready( function() {
    
    $( '.menu-select-shop' ).click( function( evt ){
        evt.preventDefault();
        map.clearOverlays();
        var targetCat = $(this).attr( 'target-category' );
        $.get( 'http://localhost:8084/SAMakis_Project/ShopsByCategoryServlet' + '?category=' + targetCat + "&user=" + location.hash.slice(1,location.hash.length), function( data ) {
            $('#scrolled_container').empty();
            var cl="dislike";
            
            for (var i = 0; i <data.shops.length; i++) {
                if(location.hash.slice(1,location.hash.length)!=='' && location.hash.slice(1,location.hash.length)!=='#'){
                    for(var j=0;j<data.favs.length;j++){
                        if(data.shops[i].id===data.favs[j].id){
                            cl='like';
                            break;
                        }
                        else{
                            cl='dislike';
                        }
                    }
                }
                $( "#scrolled_container" ).append( "<div class=\"result\">\n\
                                                        <div class=\"res_name\">\n\
                                                            <img src=\"icons/rest_icon.png\">\n\
                                                            <h3>"+data.shops[i].name+"</h3></div>"
                                                        +"<div class=\"res_content\">"
                                                            +"<button id=\""+data.shops[i].id+"\" class=\""+cl+"\"></button>"+
                                                            "<button id=\"coms"+data.shops[i].id+"\" class=\"coms\">comments</button>"+
                                                            "<button id=\"btnmarker"+data.shops[i].id+"\" class=\"btnaddmarker\">show on map</button>"+
                                                    "</div><div id=\"comments"+data.shops[i].id+"\" class=\"comments\"></div></div>" );
                                            var pos=new google.maps.LatLng(data.shops[i].lat,data.shops[i].lng);                            
                                            markers[i] = new google.maps.Marker({
                                                position: pos,
                                                draggable: false,
                                                icon:"icons/shop_icon.png",
                                                map: map
                                            });
            };
        } );
    } );
    
});

function route(pos,cur_pos) 
{
    var request = {
      origin:cur_pos,
      destination:pos,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
    });
}

function calc(lat,lng){
    var lat1=35.3383767;
    var lng1=25.1367471;
    var dg=lng-lng1;
    var d = 1.852 * 60 * Math.acos( Math.sin(lat1) * Math.sin(lat) + Math.cos(lat1) * Math.cos(lat) * Math.cos(dg));
    
    return Math.floor(d*1000);
};
