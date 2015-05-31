/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global google, map, markers */

$( document ).ready( function() {
//add div for results dynamically
    $('#search_button').click(function(evt){
            evt.preventDefault();
            map.clearOverlays();
            var q1=$('#search_input').val().match(/\S+/g);
            document.getElementById('search_input').value=null;
            var q="";
            for(var i =1;i<q1.length;i++){
                if(q1[i]!==" "){
                    q=q+"+"+q1[i]; 
                }
            }
            $.get( 'http://localhost:8084/SAMakis_Project/SearchServlet' + '?q=' + q1[0]+q + "&user=" + location.hash.slice(1,location.hash.length) , function( data ) {
            $('#scrolled_container').empty();
            cl='dislike';
            for (var i = 0; i <data.shops.length; i++) {
                console.log(i);  
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
                                                            <h3>"+data.shops[i].name+"</h3>"
                                                        +"</div><div class=\"res_content\">"
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
    });
    
//    $('#search_input').keyup(function(e,evt){
//        evt.preventDefault();
//        if(e.keyCode === 13){
//            var q1=$('#search_input').val().match(/\S+/g);
//            var q="";
//            for(var i =1;i<q1.length;i++){
//                if(q1[i]!==" "){
//                    q=q+"+"+q1[i]; 
//                }
//            }
//            $.get( 'http://localhost:8084/SAMakis_Project/SearchServlet' + '?q=' + q1[0]+q , function( data ) {
//            $('#scrolled_container').empty();
//                for (var i = 0; i <data.shops.length; i++) {
//                    console.log(i);    
//                    $( "#scrolled_container" ).append( "<div class=\"result\">\n\
//                                                            <div class=\"res_name\">\n\
//                                                                <img src=\"icons/rest_icon.png\">\n\
//                                                                <h3>"+data.shops[i].name+"</h3>"
//                                                            +"</div><div class=\"res_content\">"
//                                                                +"Address: "+data.shops[i].address+"<br>"
//                                                                +"Category: "+data.shops[i].category+"<br>"
//                                                                +"Views: "+data.shops[i].views+"<br>"
//                                                                +"d: "+calc(data.shops[i].lat,data.shops[i].lng)+
//                                                        "</div></div>" );
//                };
//            } );
//        }
//    });
    
} );

