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
		$('#delete_shops_form').css('display','block');
		$('#add_shops_form').css('display','none');
		$('#add_users_form').css('display','none');
                $('#delete_users_form').css('display','none');
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
    

	/*
	function div_hide() {
		document.getElementById('abc').style.display = "none";
	}
`*/
	//$("#section2").append("<div id='result'><h2>RESULTS</h2></div>");	

} );


