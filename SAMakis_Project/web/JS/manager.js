/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global google, map, initialLocation, markers */

$( document ).ready( function() {
//add div for results dynamically
        
        $(document).on('click', '.dislike', function(){
            var id=$(this).attr('id');
            console.log(id);
            console.log("like!");
            if(location.hash!=="" && location.hash!=="#"){
                $.get( 'http://localhost:8084/SAMakis_Project/AddFavoriteServlet' + '?id=' + id + "&username=" + location.hash.slice(1,location.hash.length ),function(data){
                    if(data.message==='true'){
                        $("#"+id).addClass('like').removeClass('dislike');
                        $(this).css('background-image', 'url(icons/like.png)');
                    }
                });
            }
        });
        
        $(document).on('click', '.like', function(){
            var id=$(this).attr('id');
            console.log(id);
            console.log("dislike!");
            if(location.hash!=="" && location.hash!=="#"){
                $.get( 'http://localhost:8084/SAMakis_Project/DeleteFavoriteServlet' + '?id=' + id + "&username=" + location.hash.slice(1,location.hash.length ),function(data){
                    if(data.message==='true'){
                        $("#"+id).addClass('dislike').removeClass('like');
                        $(this).css('background-image', 'url(icons/dislike.png)');
                    }
                });
            }
        });
        
        $(document).on('click', '.coms', function(){
            var id=$(this).attr('id');
            $('#comments'+id.slice(4,id.length)).empty();
            $("#comments"+id.slice(4,id.length)).animate({
                height: 'toggle'
            });
            console.log(id);
            var s_id=id.slice(4,id.length);
            $.get('http://localhost:8084/SAMakis_Project/GetCommentsByShop' + '?id=' + s_id,function(data){
                for(var i=0;i<data.comments.length;i++){
                    console.log(data);
                    $("#comments"+id.slice(4,id.length)).append("<div>"+data.comments[i].id_in_user+": "+data.comments[i].comment+"</div><br>");
                }
            });
        });

        $(document).on('click', '.btnaddmarker', function(){
            var id=$(this).attr('id');
            console.log(id);
            var s_id=id.slice(9,id.length);
            console.log(s_id);
            $.get( 'http://localhost:8084/SAMakis_Project/GetCoordsServlet' + '?id=' + s_id,function(data){
                var l=new google.maps.LatLng(data.shops[0].lat,data.shops[0].lng);
                route(l,initialLocation);
            });
            
        });


        function addmarker(latilongi) {
            var marker = new google.maps.Marker({
                position: latilongi,
                draggable: true,
                map: map
            });
            map.setCenter(marker.getPosition());
        };
        
        $('#fav_shops').click(function(evt){
            evt.preventDefault();
            map.clearOverlays();
            $.get( 'http://localhost:8084/SAMakis_Project/ShowUserFavorites' + '?username=' + location.hash.slice(1,location.hash.length) , function( data ) {
            $('#scrolled_container').empty();
            for (var i = 0; i <data.favorites.length; i++) {
                $( "#scrolled_container" ).append( "<div class=\"result\">\n\
                                                        <div class=\"res_name\">\n\
                                                            <img src=\"icons/rest_icon.png\">\n\
                                                            <h3>"+data.favorites[i].name+"</h3></div>"
                                                        +"<div class=\"res_content\">"
                                                            +"<button id=\""+data.favorites[i].id+"\" class=\"like\"></button>"+
                                                            "<button id=\"coms"+data.favorites[i].id+"\" class=\"coms\">comments</button>"+
                                                            "<button id=\"btnmarker"+data.favorites[i].id+"\" class=\"btnaddmarker\">show on map</button>"+
                                                    "</div><div id=\"comments"+data.favorites[i].id+"\" class=\"comments\"></div></div>" );
                                            var pos=new google.maps.LatLng(data.favorites[i].lat,data.favorites[i].lng);                            
                                            markers[i] = new google.maps.Marker({
                                                position: pos,
                                                draggable: false,
                                                icon:"icons/shop_icon.png",
                                                map: map
                                            });
            };
        } );
        });
    
} );



