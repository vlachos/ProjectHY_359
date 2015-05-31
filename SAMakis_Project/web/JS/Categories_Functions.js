/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global initialLocation */

//Categories jquery request to get shops by category
$( document ).ready( function() {
    
    $( '.menu-select-shop' ).click( function( evt ){
        evt.preventDefault();
        
        var targetCat = $(this).attr( 'target-category' );
        $.get( 'http://localhost:8084/SAMakis_Project/ShopsByCategoryServlet' + '?category=' + targetCat , function( data ) {
            $('#scrolled_container').empty();
            for (var i = 0; i <data.shops.length; i++) {
                $( "#scrolled_container" ).append( "<div class=\"result\">\n\
                                                        <div class=\"res_name\">\n\
                                                            <img src=\"icons/rest_icon.png\">\n\
                                                            <h3>"+data.shops[i].name+"</h3></div>"
                                                        +"<div class=\"res_content\">"
                                                            +"<button id=\""+data.shops[i].id+"\" class=\"dislike\"></button>"+
                                                            "<button id=\"coms"+data.shops[i].id+"\" class=\"coms\">comments</button>"+
                                                    "</div><div id=\"comments"+data.shops[i].id+"\" class=\"comments\"></div></div>" );
            };
        } );
    } );
    
});

function calc(lat,lng){
    var lat1=35.3383767;
    var lng1=25.1367471;
    var dg=lng-lng1;
    var d = 1.852 * 60 * Math.acos( Math.sin(lat1) * Math.sin(lat) + Math.cos(lat1) * Math.cos(lat) * Math.cos(dg));
    
    return Math.floor(d*1000);
};
