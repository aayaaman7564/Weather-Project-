const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const app = express();
app.use(bodyparser.urlencoded({extended:true}));



app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
    
});

app.post("/", function(req,res){
    const CityName = req.body.cityName
    const query = CityName;
    const ApiKey = "8e18e28645370cacc735a77ccd27227f";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+ApiKey+"&units=metric"
    https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
        const weatherData = JSON.parse(data);
        console.log(weatherData);
        const temp = weatherData.main.temp;
        console.log(temp);
        const weatherDescription = weatherData.weather[0].description;
        console.log(weatherDescription);
        const humidity = weatherData.main.humidity;
        const icon = weatherData.weather[0].icon
        const imageUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
        res.write("<h1>The current Temperature in "+query+" is "+ temp +" degree celcius and the weather is "+ weatherDescription+".</h1>")
        res.write("<h3> The humidity of "+query+" is somethig around: "+humidity+".</h3>");
        res.write("<img src="+imageUrl+">");
        res.send();

    })
});
});

app.listen(3000,function(){
    console.log("The app is running on the port 3000");
});