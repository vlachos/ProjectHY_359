/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$( document ).ready( function() {
//add div for results dynamically

        $(document).on('click', '.dislike', function(){
            var id=$(this).attr('id');
            $("#"+id).addClass('like').removeClass('dislike');
            $(this).css('background-image', 'url(icons/like.png)');
            console.log(id);
            console.log("like!");
        });
        
        $(document).on('click', '.like', function(){
            var id=$(this).attr('id');
            $("#"+id).addClass('dislike').removeClass('like');
            $(this).css('background-image', 'url(icons/dislike.png)');
            console.log(id);
            console.log("dislike!");
        });

//    $('.dislike').click(function(evt){
//        evt.preventDefault();
//        var id = this.id;
//        console.log(id);
//        $(this).css('background-image', 'icons/dislike.png');
//    });
    
} );

