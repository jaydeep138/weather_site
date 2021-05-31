
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))


const app = express()


// paths for express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// handlebars for engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

// 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jaydeep Mulani'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jaydeep Mulani'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        email: 'jaydeepmulani123@gmail.com',
        title: 'Help',
        name: 'Jaydeep Mulani'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address term'
        })
    }
    const City = req.query.address
    geocode(City, (error, { address, latitude, longitude } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, {  forecast, weatherIcon } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            return res.send({
                address,
                forecast,
                weatherIcon
            })
        })

    })






})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })

    }
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('pageNotFound', {
        title: 'Error : 404',
        name: 'Jaydeep Mulani',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('pageNotFound', {
        title: 'Error : 404',
        name: 'Jaydeep Mulani',
        errorMessage: 'Page not found'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})