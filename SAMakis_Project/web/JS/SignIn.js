/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$( document ).ready( function() {
//add div for results dynamically
    $('#signin_btn').click(function(evt){
            evt.preventDefault();
            var username = $('[name=signin_username]').val();
            var password = $('[name=psw]').val();
            console.log(username,password);
            if(!username||!password){
                alert("Empty sign in fields!");
            }
            else{
                
                $.get( 'http://localhost:8084/SAMakis_Project/LoginServlet' + '?username=' + username + '&password=' + password,function(data){ 
                    console.log(data.message);
                    if(data.message==="true"){
                        $('#login_form').hide();
                        $('nav a').css('display','inline');
                        $('#login_container').append("<h2 href=\"\">Welcome "+username+",</h2><a id=\"logout\" href=\"\">(logout)</a>");
                    }
                    else{
                        alert("Incorrect username or password!");
                    }
                });
            }
    });
    
    $('#logout').click(function(evt){
            evt.preventDefault();
            $('#login_container').empty();
            $('#login_form').show();
            $('nav a').css('display','none');
    });
} );

