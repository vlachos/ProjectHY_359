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
            console.log(data);
            for (var i = 0; i <data.shops.length; i++) {
                console.log(i);    
                $( "#scrolled_container" ).append( "<div class=\"result\"><div class=\"res_name\">"+data.shops[i].name+"</div><div class=\"res_content\">"+data.shops[i].address+"</div></div>" );
            };
        } );
    } );
    
} );
