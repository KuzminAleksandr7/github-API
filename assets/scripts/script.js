
// використав по замовчуванням данні цього хлопця(він в якомусь ТОПі за щось та за якийсь рік...)
let git_url = `https://api.github.com/users/KuzminAleksandr7`;
let inputValue;

myAjax(git_url);

function myAjax(git_url){
    $.ajax({
       url: git_url,
       dataType: "json",
    }).done(function (data){
        console.log(data);
        $("#user-photo").html('<img src=' + data.avatar_url + '>');

        // перевірка на наявність ім'я
        if(data.name == null){
            $(".user-name-elem").html("Not found");
        } else {
            $(".user-name-elem").html(data.name);
        }
        $(".user-login-elem").html('<div>' + data.login + '</div>');
        $(".user-url-elem").html('<a target="_blank" href=' + data.html_url + '>' + data.html_url + '</a>');

        // перевірка на наявність блогу
        if(data.blog == ""){
            $(".user-blog-elem").html("Not found");
        } else {
            $(".user-blog-elem").html('<a target="_blank" href=' + data.blog + '>' + data.blog + '</a>');
        }

        // перевірка на наявність міста
        if(data.location == null){
            $(".user-city-elem").html("Not found");
        } else {
            $(".user-city-elem").html(data.location);
        }

        // перевірка на наявність емейлу
        if(data.email == null){
            $(".user-email-elem").html("Not found");
        } else {
            $(".user-email-elem").html(data.email);
        }
        $(".user-followers-elem").html('<div>' + data.followers + '</div>');
        $(".user-following-elem").html('<div>' + data.following + '</div>');
    }).fail(function(){

        // при помилці поверх всього стає моє вікно
        $(".error-window").css("display", "flex");
    });
}

$(document).ready(function() {

    // трохи декору
    setTimeout(function(){
        $("#load-page").css("display", "none");
        $(".header").css("display", "block");
        $(".main").css("display", "block");
    }, 1500);
    $("#search").focusin(function(){
        $("#search").css("width", "300px");
        $(".header-search").css("box-shadow", "0 0 5px #b2b2ff");
    }).focusout(function(){
        $("#search").css("width", "242px");
        $(".header-search").css("box-shadow", "none");
    });
        // клік!!!
    document.getElementById("search-btn").addEventListener("click", function enterCity(){

        // отримуємо введене в вел'ю значення
        inputValue = document.getElementById("search").value;

        // підставляємо значення з вел'ю в адресу
        git_url = `https://api.github.com/users/${inputValue}`;

        // запускаємо функцію
        myAjax(git_url);

        // очищаємо вел'ю
        document.getElementById("search").value = '';
    });
});