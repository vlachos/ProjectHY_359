/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$( document ).ready( function() {
//add div for results dynamically
    $('#search_button').click(function(evt){
            evt.preventDefault();
            for (var i = 0; i <5; i++) {
                    $( "#scrolled_container" ).append( "<div class=\"result\"><div class=\"res_name\">"+i+"</div><div class=\"res_content\">"+i+"</div></div>" );
            };
    });
} );


