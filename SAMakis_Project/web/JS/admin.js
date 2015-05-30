/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready( function() {

	
	$('#a').click(function(evt){
		evt.preventDefault();
                $('#delete_comments_form').css('display','block');
                $('#delete_users_form').css('display','none');
		$('#add_shops_form').css('display','none');
		$('#delete_shops_form').css('display','none');
		$('#add_users_form').css('display','none');
	});

	$('#b').click(function(evt){
		evt.preventDefault();
		$('#add_shops_form').css('display','block');
                $('#delete_comments_form').css('display','none');
		$('#delete_shops_form').css('display','none');
		$('#add_users_form').css('display','none');
                $('#delete_users_form').css('display','none');
	});

	$('#c').click(function(evt){
		evt.preventDefault();
                $('#delete_comments_form').css('display','none');
		$('#add_shops_form').css('display','none');
		$('#add_users_form').css('display','none');
                $('#delete_users_form').css('display','none');
                $('#delete_shops').append('<table></table>');
                var table = $('#delete_shops').children();                
                $.get( 'http://localhost:8084/SAMakis_Project/AllShopsServlet', function( data ) {
                    for (var i = 0; i < data.length; i++) {   
			table.append("<tr><td><a id=\""+data.shops[i].id+"\" class=\"del_link\" href=\"\">delete</a></td><td>"+data.shops[i].id+"</td><td>"+data.shops[i].name+"</td><td>"+data.shops[i].address+"</td></tr>");
                    };
                } );
	});

	$('#d').click(function(evt){
		evt.preventDefault();
                $('#delete_comments_form').css('display','none');
		$('#add_users_form').css('display','block');
		$('#delete_shops_form').css('display','none');
		$('#add_shops_form').css('display','none');
                $('#delete_users_form').css('display','none');
 	});

 	$('#e').click(function(evt){
     	evt.preventDefault();
                $('#delete_users_form').css('display','block');
                $('#delete_comments_form').css('display','none');
                $('#add_shops_form').css('display','none');
                $('#delete_shops_form').css('display','none');
                $('#add_users_form').css('display','none');
        });
        
        $('#add_shops_submit').click(function(evt){
            evt.preventDefault();
            var name = $( '#add_shops_form [name="shop_name"]' ).val();
            var address = $( '#add_shops_form [name="shop_addresss"]' ).val();
            var lat = $( '#add_shops_form [name="shop_lat"]' ).val();
            var lng = $( '#add_shops_form [name="shop_lng"]' ).val();
            var category = $( '#add_shops_form [name="shop_category"]' ).val();
            if(!name || !address || !lat || !lng || !category){
                alert("Fill All Fields !");
            }
            else{
                $.get( 'http://localhost:8084/SAMakis_Project/AddShopServlet' + '?name=' + name + '&address=' + address + '&lat=' + lat + '&lng=' + lng + '&category=' + category);
            }
        });
        
        $('#delete_shops_submit').click(function(evt){
            evt.preventDefault();
            var name = $( '#add_shops_form [name="shop_name"]' ).val();
            if(!name){
                alert("Fill All Fields !");
            }
            else{
                $.get( 'http://localhost:8084/SAMakis_Project/DeleteShopServlet' + '?name=' + name);
            }
        });
        
        $('#add_users_submit').click(function(evt){
            evt.preventDefault();
            var username = $( '#add_users_form [name="user_name"]' ).val();
            var email = $( '#add_users_form [name="user_email"]' ).val();
            var password = $( '#add_users_form [name="user_pass"]' ).val();
            if(!name || !email || !password){
                alert("Fill All Fields !");
            }
            else{
                $.get( 'http://localhost:8084/SAMakis_Project/SignUpServlet' + '?username=' + username + '&email=' + email + '&password=' + password);
            }
        });
        
        $('#delete_users_submit').click(function(evt){
            evt.preventDefault();
            var name = $( '#add_users_form [name="user_name"]' ).val();
            if(!name){
                alert("Fill All Fields !");
            }
            else{
                $.get( 'http://localhost:8084/SAMakis_Project/DeleteUserServlet' + '?name=' + name);
            }
        });
    
        $('.del_link').click(function(evt){
            evt.preventDefault();
            var id=$(this).attr('id');
            $.get( 'http://localhost:8084/SAMakis_Project/DeleteShopServlet' + '?id=' + id);
        });

	/*
	function div_hide() {
		document.getElementById('abc').style.display = "none";
	}
`*/
	//$("#section2").append("<div id='result'><h2>RESULTS</h2></div>");	

} );


