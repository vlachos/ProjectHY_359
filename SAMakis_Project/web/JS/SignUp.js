$(document).ready( function() {
	$( '#popup_submit' ).click( function() {

		var username = $( '#popup_form [name="username"]' ).val();
		var email = $( '#popup_form [name="email"]' ).val();
		var password = $( '#popup_form [name="password"]' ).val();
		var repassword = $( '#popup_form [name="repassword"]' ).val();
		if( !username || !email || !password || !repassword ) {
                    alert("Fill All Fields !");
		}
                else if(password!==repassword){
                    alert("Passwords are different !");
                }
                else{
                    $.get( 'http://localhost:8084/SAMakis_Project/SignUpServlet' + '?username=' + username + '&email=' + email + '&password=' + password,function( data ){
                        if(data.message==="true"){
                            alert("Sign up was successful!!!!!");
                        }
                        else{
                            alert("username already exists!");
                        }
                    });
                }
/*
 * na sumplhrwthei gia periptwsh pou petyxe h oxi to sign up
 * 
 */
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

