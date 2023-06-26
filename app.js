const express = require("express");
const bodyParser = require('body-parser');
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('./public'));

app.get("/", function(req, res){

    const APIkey = "Use Your Own API KEY";
    const url ="https://api.openweathermap.org/data/2.5/weather?q=Castries&lon=-344.04&"+APIkey;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const WeatherData = JSON.parse(data);
            // console.log(WeatherData);
            const WeatherType = WeatherData.weather[0].main;
            const WeatherLocation = WeatherData.name;
            const WeatherDescription = WeatherData.weather[0].description;
            const icon = WeatherData.weather[0].icon;
            const imgURL =  'https://openweathermap.org/img/wn/10d@2x.png';
            console.log(WeatherType);
            // res.write("<h1>Weather Info</h1><br> <p>Location: "+WeatherLocation+"<br>Type of weather: "+WeatherType+"<br>Description: "+WeatherDescription+"</p>");
            // res.write("<p><img src="+imgURL+" alt='Girl in a jacket' width='500' height='600'></p>");
            // res.send();
            res.sendFile(__dirname + "/public/index.html");
        })
    });

    
});


app.listen(3000, function (){
    console.log("Server is running on port 3000");
});