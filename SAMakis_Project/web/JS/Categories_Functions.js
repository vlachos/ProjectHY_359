/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//Categories jquery request to get shops by category
$( document ).ready( function() {
    
    $( '.menu-select-shop' ).click( function( evt ){
        evt.preventDefault();
        
        var targetCat = $(this).attr( 'target-category' );
        $.get( 'http://localhost:8084/SAMakis_Project/ShopsByCategoryServlet' + '?category=' + targetCat , function( data ) {
            $('#scrolled_container').empty();
            for (var i = 0; i <data.shops.length; i++) {
                console.log(i);    
                $( "#scrolled_container" ).append( "<div class=\"result\">\n\
                                                        <div class=\"res_name\">"
                                                            +data.shops[i].name+
                                                        "</div><div class=\"res_content\">"
                                                            +"Address: "+data.shops[i].address+"<br>"
                                                            +"Category: "+data.shops[i].category+"<br>"
                                                            +"Views: "+data.shops[i].views+
                                                    "</div></div>" );
            };
        } );
    } );
    
} );
