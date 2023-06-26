$( document ).ready(function() {
    console.log( "ready!" );
  
    getLocation();
});

$('.nav-toggle').click(function(e) {
  
    e.preventDefault();
    $("html").toggleClass("openNav");
    $(".nav-toggle").toggleClass("active");
  
  });

  //Submitting change in cards to search city info

$("#WeatherForm").on("submit", function( event ) {
    event.preventDefault();
    
    //show city you searched
    $City = document.getElementById("search").value;
  
    ShowSearch($City);
  });


function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
   
}


const showPosition = (position) => {
        // alert("Locaiton allowed");
        lng = position.coords.longitude;
        lat = position.coords.latitude;

      

        //Do api call from function here. Send lat and lng to function and do api and update sections of card
        locationWeather(lat, lng);
}

const showError = (error) => {
    switch (error.code){
        case error.PERMISSION_DENIED:
            document.getElementById("overlay").style.display = "block";
            alert("Please allow location to check for weather");
            break;

        case error.POSITION_UNAVAILABLE:
            document.getElementById("overlay").style.display = "block";
            alert("Location information unavailable");
            break;

        case error.TIMEOUT:
            document.getElementById("overlay").style.display = "block";
            alert("Request to get user location timed out");
            break;

        case error.UNKNOWN_ERROR:
            document.getElementById("overlay").style.display = "block";
            alert("Unknown error ocurred");
            break;

        default:
            document.getElementById("overlay").style.display = "block";
            alert("Unknown error ocurred");
    }
    
}


function locationWeather(lat, lng){
    console.log(lat, lng);

    //take lat and lng and do api call to get data we need
    const api = "https://api.openweathermap.org/data/2.5/weather?lon="+lng+"&lat="+lat+"&appid=f43963759a640c5d2a812d5860e0c424&units=metric";

    fetch(api)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
           
            //Write in data from json to sections of card
            console.log("City: " +data.name);
            console.log("Weahter type and description: " +data.weather[0].main + " " + data.weather[0].description);

            $("#City").html(data.name);
            $("#TypeDescription").html(data.weather[0].main + ": " + data.weather[0].description);
            $("#TempDeg").html(data.main.temp+"&#176;");

            console.log("First D: " +new Date);
            let Time = formatAMPM(new Date);
            let TimeSp = Time.split(" ");

            $("#Time").html(TimeSp[0] + ' <span class="sm-font">'+TimeSp[1].toLocaleUpperCase()+'</span>');

            let DateSv = new Date($.now());
            let finalDteFormat = dateFormat(DateSv);

            console.log(finalDteFormat);
            $("#Date").html(finalDteFormat);

           

          });
    
}

//Formats raw datetime value to am or pm time
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
  

function dateFormat(d){
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    let month = months[d.getMonth()];
    let day = days[d.getDay()];
    let year = d.getFullYear();
    let dayNum = d.getDate();

    return day +  ", " + dayNum + " " + month + " " + year;  


}

function ShowSearch($City){
    console.log($City);
    

    //Rewrite to show loader in section
    $("#Weather-Card").html('<svg viewBox="0 0 100 100">'+
    '    <g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="6">' +
    '        <!-- left line -->'+
    '        <path d="M 21 40 V 59">'+
    '            <animateTransform'+
    '      attributeName="transform"'+
    '      attributeType="XML"'+
    '      type="rotate"'+
    '      values="0 21 59; 180 21 59"'+
    '      dur="2s"'+
    '      repeatCount="indefinite" />'+
    '        </path>'+
    '        <!-- right line -->'+
    '        <path d="M 79 40 V 59">'+
    '            <animateTransform'+
    '      attributeName="transform"'+
    '      attributeType="XML"'+
    '      type="rotate"'+
    '      values="0 79 59; -180 79 59"'+
    '      dur="2s"'+
    '      repeatCount="indefinite" />'+
    '        </path>'+
    '        <!-- top line -->'+
    '        <path d="M 50 21 V 40">'+
    '            <animate'+
    '      attributeName="d"'+
    '      values="M 50 21 V 40; M 50 59 V 40"'+
    '      dur="2s"'+
    '      repeatCount="indefinite" />'+
    '        </path>'+
    '        <!-- btm line -->'+
    '        <path d="M 50 60 V 79">'+
    '            <animate'+
    '      attributeName="d"'+
    '      values="M 50 60 V 79; M 50 98 V 79"'+
    '      dur="2s"'+
    '      repeatCount="indefinite" />'+
    '        </path>'+
    '        <!-- top box -->'+
    '        <path d="M 50 21 L 79 40 L 50 60 L 21 40 Z">'+
    '        <animate'+
    '      attributeName="stroke"'+
    '      values="rgba(255,255,255,1); rgba(100,100,100,0)"'+
    '      dur="2s"'+
    '      repeatCount="indefinite" />'+
    '        </path>'+
    '        <!-- mid box -->'+
    '        <path d="M 50 40 L 79 59 L 50 79 L 21 59 Z"/>'+
    '        <!-- btm box -->'+
    '        <path d="M 50 59 L 79 78 L 50 98 L 21 78 Z">'+
    '        <animate'+
    '      attributeName="stroke"'+
    '      values="rgba(100,100,100,0); rgba(255,255,255,1)"'+
    '      dur="2s"'+
    '      repeatCount="indefinite" />'+
    '        </path>'+
    '        <animateTransform'+
    '      attributeName="transform"'+
    '      attributeType="XML"'+
    '      type="translate"'+
    '      values="0 0; 0 -19"'+
    '      dur="2s"'+
    '      repeatCount="indefinite" />'+
    '    </g>'+
    '</svg>');

    //Show card with weather data
    setTimeout(function() { 
        
    
            try {
               
                const api = "https://api.openweathermap.org/data/2.5/weather?q="+$City+"&appid=f43963759a640c5d2a812d5860e0c424&units=metric";

                fetch(api)
                      .then((response) => {
                        return response.json();
                      }).catch(function(err) {
                        // some error here
                        console.log("Error caused for processing Data fetched: " + err);
                    })
                    
                    .then((data) => {
                        console.log(data);
                       
                        console.log("City: " +data.name);
                        console.log("Weahter type and description: " +data.weather[0].main + " " + data.weather[0].description);
            
            
                        let Time = formatAMPM(new Date);
                        let TimeSp = Time.split(" ");
        
                        // console.log(TimeSp);
            
                        
            
                        let DateSv = new Date($.now());
                        let finalDteFormat = dateFormat(DateSv);
            
                        // console.log(finalDteFormat);

                        //Get coordinates of city searched and push to another API call for the exact time and date of city searched
                        //Save values below in variables to pass down to be written in next fetch
                        let latT = data.coord.lat;
                        let longT = data.coord.lon;
                        let Name = data.name;
                        let WeatherMain = data.weather[0].main;
                        let WeatherDescription = data.weather[0].description;
                        let Temp = data.main.temp;
                        let CityCountry; Time="";
                        
                        //switch statement to change background of card depending on weather type
                        let imageUrl = bgimageUrl(data.weather[0].id);
                        // console.log(imageUrl);

                        console.log(latT + " " + longT);

                        try{
                            const api = "http://api.timezonedb.com/v2.1/get-time-zone?key=TW70AR1UJ5JL&format=json&by=position&lat="+latT+"&lng="+longT+"";
                            fetch(api)
                                .then((response) => {
                                    return response.json();
                                }).catch(function(err) {
                                    // some error here
                                    console.log("Error caused for processing Data fetched: " + err);
                                })
                                
                                .then((data) => {
                                    console.log(data);
                                    
                                    CityCountry = data.countryName;
                                    Time = data.formatted.split(" ");
                                    $FinalT =formatAMPM(new Date(data.formatted)).split(" ");
                                    
                                   
                                    
                                    $("#Weather-Card").html('<div class="row d-flex justify-content-center px-3">'+
                                    '<div class="card">'+
                                    '    <h2 class="ml-auto mr-4 mt-3 mb-0" id="City">'+Name+', '+CityCountry+'</h2>'+
                                    '    <p class="ml-auto mr-4 mb-0 med-font" id="TypeDescription">'+WeatherMain+': '+WeatherDescription+'</p>'+
                                    '    <h1 class="ml-auto mr-4 large-font" id="TempDeg">'+Temp+'&#176;</h1>'+
                                    '    <p class="time-font mb-0 ml-4 mt-auto" id="Time">'+$FinalT[0]+'<span class="sm-font">'+ $FinalT[1]+'</span></p>'+
                                    '    <p class="ml-4 mb-4" id="Date">'+dateFormat(new Date(data.formatted))+'</p>'+
                                    '</div>'+
                               '</div>');

                               //change background image depending on icon selected 
                              
                                $(".card").css("background-image", "url(" + imageUrl + ")");
                         
                        
                                }).catch(function(err) {
                                    // some error here
                                    console.log("Error caused for processing Data fetched: " + err);
                                    //Write into Weather Card error message
                                    
                                });

                        }catch(err){
                            console.log("Error occurred fetching api for timezone");
                        }

                       
                       
                    }).catch(function(err) {
                        // some error here
                        console.log("Error caused for processing Data fetched: " + err);
                        //Write into Weather Card error message
                        $("#Weather-Card").html('<div class="row d-flex justify-content-center px-3">'+
                        '<div class="card">'+
                        '    <h2 class="ml-auto mr-4 mt-3 mb-0" id="City">Error!</h2>'+
                        '    <p class="ml-auto mr-4 mb-0 med-font" id="TypeDescription">Looks like you made a bad search <br><img id="errorImg" src="img/computer.png" alt="ErrorPic"></p>'+
                        '    <p class="time-font mb-0 ml-4 mt-auto" id="Time">Try again</p>'+ 
                        '    <p class="ml-4 mb-4" id="Date"></p>'+
                        '</div>'+
                   '</div>');
                    });
              }
              catch(err) {
                console.log("Error occurred fetching api");
              }
    }, 2000);



    

   

   

}


function bgimageUrl($id){
    console.log("Id type: " + typeof($id));
    console.log($id);

    $url = "";

    switch (true) {
        case ($id>=200&&$id<300):
            $url = "../img/thunderstorm.jpg";
            break;
        case ($id>=300&&$id<500):
            $url = "../img/drizzle.jpg";
            break;
        case ($id>=500&&$id<600):
            $url = "../img/shower-rain.jpg";
            break;
        case ($id>=600&&$id<701):
            $url = "../img/snow.gif";
            break;
        case ($id>=701&&$id<800):
            $url = "../img/snow.gif";
            break;
        case ($id===800):
            $url = "../img/clearSkies.jpg";
            break;
        case ($id===801):
            $url = "../img/few-clouds.gif";
            break;
        case ($id===802):
            $url = "../img/broken-clouds.jpg";
            break;
        case ($id===803):
            $url = "../img/broken-clouds.jpg";
            break;
        default:
            $url = "../img/overcast-clouds.jpg";
      }

      return $url;
}








 
