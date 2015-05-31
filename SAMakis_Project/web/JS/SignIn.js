/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$( document ).ready( function() {
//add div for results dynamicallyif(location.hash==='admin'){
    if(location.hash==='#admin'){
        $('#user').css('display','none');
        $('#admin').css('display','block');
        $('footer').css('padding-top','500px');
        $('#login_form').hide();
        $('#login_container').append("<h2 href=\"\">Welcome admin,</h2><a id=\"logout\" href=\"\">(logout)</a>");
        
    }else if(location.hash!=='#admin' && location.hash!=='' && location.hash!=='#'){
        $('#admin').css('display','none');
        $('#login_form').hide();
        $('nav a').css('display','inline');
        $('#login_container').append("<h2 href=\"\">Welcome "+location.hash.slice(1,location.hash.length-1)+",</h2><a id=\"logout\" href=\"\">(logout)</a>");
    }
    else{
        
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
                        console.log(data.admin);
                        if(data.admin==="true"){
                            location.hash='admin';
                            $('#user').css('display','none');
                            $('#admin').css('display','block');
                            $('footer').css('padding-top','500px');
                            $('#login_form').hide();
                            $('#login_container').append("<h2 href=\"\">Welcome admin,</h2><a id=\"logout\" href=\"\">(logout)</a>");
                        }
                        else{
                            location.hash=username;
                            $('#admin').css('display','none');
                            $('#login_form').hide();
                            $('nav a').css('display','inline');
                            $('#login_container').append("<h2 href=\"\">Welcome "+username+",</h2><a id=\"logout\" href=\"\">(logout)</a>");
                        }
                    }
                    else{
                        alert("Incorrect username or password!");
                    }
                });
            }
    });
}
    $('#logout').click(function(evt){
            evt.preventDefault();
            location.hash="";
            window.location.reload();
    });
} );

function adminChecker(data){
    
}

