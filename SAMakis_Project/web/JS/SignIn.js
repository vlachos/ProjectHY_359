/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global google, map, markers */

$( document ).ready( function() {
//add div for results dynamicallyif(location.hash==='admin'){
    if(location.hash==='#admin'){
        $('#user').css('display','none');
        $('#admin').css('display','block');
        $('footer').css('padding-top','500px');
        $('#login_form').hide();
        $('#login_container').append("<h2 href=\"\">Welcome admin,</h2><a id=\"logout\" href=\"\">(logout)</a>");
        
    }else if(location.hash!=='#admin' && location.hash!=='' && location.hash!=='#'){
        $('#admin').css('display','none');
        $('#login_form').hide();
        $('nav a').css('display','inline');
        $('#login_container').append("<h2 href=\"\">Welcome "+location.hash.slice(1,location.hash.length)+",</h2><a id=\"logout\" href=\"\">(logout)</a>");
    }
    else{
        
    $('#signin_btn').click(function(evt){
            
            evt.preventDefault();
            map.clearOverlays();
            var username = $('[name=signin_username]').val();
            var password = $('[name=psw]').val();
            console.log(username,password);
            if(!username||!password){
                alert("Empty sign in fields!");
            }
            else{
                $.get( 'http://localhost:8084/SAMakis_Project/LoginServlet' + '?username=' + username + '&password=' + password,function(data){ 
                    console.log(data.message);
                    if(data.message==="true"){
                        console.log(data.admin);
                        if(data.admin==="true"){
                            location.hash='admin';
                            $('#user').css('display','none');
                            $('#admin').css('display','block');
                            $('footer').css('padding-top','500px');
                            $('#login_form').hide();
                            $('#login_container').append("<h2 href=\"\">Welcome admin,</h2><a id=\"logout\" href=\"\">(logout)</a>");
                        }
                        else{
                            location.hash=username;
                            $('#admin').css('display','none');
                            $('#login_form').hide();
                            $('nav a').css('display','inline');
                            $('#login_container').append("<h2 href=\"\">Welcome "+username+",</h2><a id=\"logout\" href=\"\">(logout)</a>");
                            $.get( 'http://localhost:8084/SAMakis_Project/ShowUserFavorites' + '?username=' + location.hash.slice(1,location.hash.length) , function( data ) {
                                $('#scrolled_container').empty();
                                console.log(data);
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
                        }
                    }
                    else{
                        alert("Incorrect username or password!");
                    }
                });
            }
    });
}
    $('#logout').click(function(evt){
            evt.preventDefault();
            location.hash="";
            window.location.reload();
            $(".dislike").remove();
            $(".like").remove();
    });
} );


