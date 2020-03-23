const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Anuj Agrawal'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title:'About Me',
        name:'Anuj Agrawal'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title:'help page',
        name:'Anuj Agrawal'
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must give an address"
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location} = {})=> {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send(error)
            }

            res.send({location,
                      forecastData
            })
      })
    }) 

})

app.get('/products',(req,res) =>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
   res.render('404',{
       title:'404',
       name:'Anuj Agrawal',
       message:'Help article not found'
   })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Anuj Agrawal',
        message:'This page does not exist'

    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})

