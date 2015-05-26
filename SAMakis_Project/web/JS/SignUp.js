$(document).ready( function() {
	$( '#popup_submit' ).click( function() {

		var username = $( '#popup_form [name="username"]' ).val();
		var email = $( '#popup_form [name="email"]' ).val();
		var password = $( '#popup_form [name="password"]' ).val();
		var repassword = $( '#popup_form [name="repassword"]' ).val();
		if( !username || !email || !password || !repassword ) {
			alert("Fill All Fields !");
		}

	} );

	$( '#popup_open_new_account' ).click( function( evt ) {
		evt.preventDefault();
		$( '#abc' ).show();
	} );

	//Function to Hide Popup

	$('#close_b').click(function(evt){
		evt.preventDefault();
		$('#abc').hide();
	});
		

} );

