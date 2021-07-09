const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

//for parsing POST requests:

app.use(bodyParser.urlencoded({ extended: true }));
// to send the whole HTML file:
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html")
});

//to console.log the text that went in the input:
app.post("/", function (req, res) {

  // console.log(req.body.cityName);


  /*
  //the URL for getting the weather of Torecchiva. 
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Torrechiva&appid=f0e7549702a644849c6461dcd1865c28&units=metric";
  */


  //but we want user to input the city and then get its weather. For doing that:
  const query = "req.body.cityName";
  const url = "https://api.openweathermap.org/data/2.5/find?q=" + query + "&appid=f0e7549702a644849c6461dcd1865c28&units=metric";


  https.get(url, function (response) {

    //we can write console.log(response) to get full data(a lot of unnecessary stuff).
    console.log(response.statusCode)
    //This gives us the status code which if you didn't mess up shoud come out to be 200.
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      // console.log(weatherData);
      //  this will give us the actual weather data we are looking for.
      //  now to look for specific data such as only temperature, description, icon etc;
      const temp = weatherData.main.temp;
      //  console.log(tempetature)
      const dres = weatherData.weather[0].description
      //  console.log(dres)
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

      //to send this data to the actual website,
      //  res.send("<h1>the temperature in Terechhiva is "+temp+" degree celcius.</h1>")

      //but to send multiple pieces of data we can use res.write()
      res.write("<h1>the temperature in " + query + " is " + temp + " degree celcius.</h1>")
      res.write("<h2>The weather conditions are: " + dres + "</h2>")
      res.write("<img src= " + imageURL + ">")
      res.send()



    });


  });
  //there can only be one send method.
  // res.send("It is working.");

});


app.listen(3000, function () {
  console.log("the server is running on port localhost:3000");
});
