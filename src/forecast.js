// node libraries
const path = require('path');

// npm libraries
const request = require('request');
const chalk = require('chalk');
const hbs = require('hbs')
const express = require('express');
const app = express();

// constants 
const apiId = 'dad5daa2ad0eba4797f040d91ab4a8e8';
const units = 'metric';
const publicDirPath = path.join(__dirname,'../public')


app.use(express.static(publicDirPath));

app.set('view engine', 'hbs');
// console.log('view engine set');

app.get('', (req, res) => {
    res.render('index');
})

app.get('/weather', (req, res) => {
    if (req.query.location) {
        console.log("location found");
        const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + req.query.location + '&appid=' + apiId + '&units=' + units;
        request({url,json:true}, (error, {body}) => {
            
            if (error) {
                res.send({
                    error: "unable to connect to api",
                })
                
            } else if (body.cod === '404') {
                res.send({
                    error: body.message,
                })
                
            } else {  
                res.send({
                    coordinates: body.coord,
                    description: body.weather[0].description,
                    temperature: body.main.temp,
                    pressure: body.main.pressure,
                    humidity: body.main.humidity,
                    
                })}
        })

    } else {
        console.log("location field found empty or absent");
    }
})

app.listen(3000)