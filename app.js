$(document).ready(function (){

    $('.submit').on('click', function(e){
        e.preventDefault();
        let animation = $('.weather-info');

        animation.show(300);

        let items = $(".weather-ajax")

        const date = new Date();
        let time = $('#time');

        time.html(date.toDateString());

        items.animate({opacity: "0.25"}, 350, function(){
            items.css('opacity', '1');
        }); 

        time.animate({opacity: "0.25"}, 350, function(){
            time.css('opacity', '1');
        });
        
        var currentInfo = $('.form-text').val()
        $('.weather-info').css("display", "flex")
        $('.weather-info .city').html(currentInfo);


        if(currentInfo === ''){
            alert('No text entered. Please enter a valid location name!');
            animation.css("display", "none")
        }

        $.ajax({
            type: 'GET',
            url: "https://api.openweathermap.org/data/2.5/weather?q="+$('.form-text').val()+"&units=metric&appid=b02565a3c4e16b488da2cf35a3e45acb",
            dataType: 'json',
            success: function (result, status, xhr){
                let description = $('#desciption')  // weather - description  
                let temprature = $('#temp')   // main - temprature
                let cloudAnimation = $('#wicon'); // weather - icon
                // let feelsliketemp = $('#feels-like-temp'); // main - feels like temprature

                let iconCode = result["weather"][0]["icon"]
                let iconAnimation = 'https://openweathermap.org/img/wn/' + iconCode +'.png'; 

                description.html( result["weather"][0]["description"]);
                temprature.html( result["main"]["temp"] + "°C");
                cloudAnimation.attr('src', iconAnimation) // not showing icon

                // feelsliketemp.html( result ["main"]["feels_like"] + "°C");
            }
          });

        //   $.ajax({   //place photo api
        //       type: "GET",
        //       url: ,
        //       dataType: "json",
        //       success:  function (result, status, xhr){
        //       }
        //   })
                
    })

    $('.hamburger-menu').on('click', function(){
        let hamburgerMenu = $('.burger-navigation');

        if(hamburgerMenu.css('display') == 'none'){
            hamburgerMenu.css('display', 'block');
            $('#credits').css('top', '50%');
        } else{
            hamburgerMenu.css('display', 'none');
            $('#credits').css('top', '35%');
        }
    })

    

    $('.delete').on('click', function(){
        let remove = $('.weather-info');
        var currentInfo = $('.form-text').val()

        if(remove.css('display') == 'flex'){
            remove.hide(300);
        }
        if(remove.css('display') == 'none' && currentInfo == ''){
            
            alert("You can't hide what you can't see ;)");
        }
        
    })

})