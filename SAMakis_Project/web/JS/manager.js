/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


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

//    $('.dislike').click(function(evt){
//        evt.preventDefault();
//        var id = this.id;
//        console.log(id);
//        $(this).css('background-image', 'icons/dislike.png');
//    });
    
} );

