/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$( document ).ready( function() {
//add div for results dynamically
    $('#search_button').click(function(evt){
            evt.preventDefault();
            var q1=$('#search_input').val().match(/\S+/g);
            var q="";
            for(var i =1;i<q1.length;i++){
                if(q1[i]!==" "){
                    q=q+"+"+q1[i]; 
                }
            }
            $.get( 'http://localhost:8084/SAMakis_Project/SearchServlet' + '?q=' + q1[0]+q , function( data ) {
            $('#scrolled_container').empty();
            for (var i = 0; i <data.shops.length; i++) {
                console.log(i);    
                $( "#scrolled_container" ).append( "<div class=\"result\">\n\
                                                        <div class=\"res_name\">\n\
                                                            <img src=\"icons/rest_icon.png\">\n\
                                                            <h3>"+data.shops[i].name+"</h3>"
                                                        +"</div><div class=\"res_content\">"
                                                            +"Address: "+data.shops[i].address+"<br>"
                                                            +"Category: "+data.shops[i].category+"<br>"
                                                            +"Views: "+data.shops[i].views+"<br>"
                                                            +"d: "+calc(data.shops[i].lat,data.shops[i].lng)+
                                                    "</div></div>" );
            };
        } );
    });
    
    $('#search_input').keyup(function(e,evt){
        evt.preventDefault();
        if(e.keyCode === 13){
            var q1=$('#search_input').val().match(/\S+/g);
            var q="";
            for(var i =1;i<q1.length;i++){
                if(q1[i]!==" "){
                    q=q+"+"+q1[i]; 
                }
            }
            $.get( 'http://localhost:8084/SAMakis_Project/SearchServlet' + '?q=' + q1[0]+q , function( data ) {
            $('#scrolled_container').empty();
                for (var i = 0; i <data.shops.length; i++) {
                    console.log(i);    
                    $( "#scrolled_container" ).append( "<div class=\"result\">\n\
                                                            <div class=\"res_name\">\n\
                                                                <img src=\"icons/rest_icon.png\">\n\
                                                                <h3>"+data.shops[i].name+"</h3>"
                                                            +"</div><div class=\"res_content\">"
                                                                +"Address: "+data.shops[i].address+"<br>"
                                                                +"Category: "+data.shops[i].category+"<br>"
                                                                +"Views: "+data.shops[i].views+"<br>"
                                                                +"d: "+calc(data.shops[i].lat,data.shops[i].lng)+
                                                        "</div></div>" );
                };
            } );
        }
    });
    
} );

