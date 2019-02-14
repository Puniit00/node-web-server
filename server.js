const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
})

app.use((req,res,next)=>{
    next();
    var now = new Date().toString();
    var log = `${now} : ${req.method},${req.url}`
    console.log(log)
    fs.appendFile('server.log',log+'\n',(err)=>{
        if (err){
            console.log('unable to append file')
        }
    })
})

// app.use((req,res,next)=>{
//     res.render('maintainance.hbs')
// })

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
