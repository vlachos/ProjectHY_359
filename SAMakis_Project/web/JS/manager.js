/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$( document ).ready( function() {
//add div for results dynamically
    $('.dislike').click(function(evt){
        evt.preventDefault();
        var id = this.id;
        console.log(id);
        $(this).css('background-image', 'icons/dislike.png');
    });
    
} );

