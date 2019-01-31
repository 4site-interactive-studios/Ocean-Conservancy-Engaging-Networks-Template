(function() {  
window.addEventListener('load', function() {

    var html = document.getElementsByTagName( 'html' )[0]; // '0' to assign the first (and only `HTML` tag)
    var body = document.getElementsByTagName( 'body' )[0]; // '0' to assign the first (and only `HTML` tag)

    var layoutSettings = document.querySelector('.layout-settings');
    var backgroundSettings = document.querySelector('.background-settings');

    if (layoutSettings){

        if (layoutSettings.classList.contains('form-right')){
            body.classList.add("form-right");
        } else if (layoutSettings.classList.contains('form-left')){
            body.classList.add("form-left");
        } else {
            body.classList.add("form-center");
        }

        if (layoutSettings.classList.contains('form-side-by-side')){
            body.classList.add("form-side-by-side");
        }        

        if (layoutSettings.classList.contains('form-one-column')){
        	body.classList.remove("side-by-side");
        	body.classList.remove("form-side-by-side");
        }    

    }
    

    if (backgroundSettings){
        if (backgroundSettings.classList.contains('background-settings')){
            html.classList.add("background-settings-applied");
        }

        var backgroundImageURL = document.querySelector('.background-settings p');

        if (backgroundImageURL){
            
            backgroundImageURL = backgroundImageURL.innerHTML;

            html.classList.add("has-image");    
            body.style.backgroundImage = 'url("' + backgroundImageURL + '")';
        }    

    }



});
})();