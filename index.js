const express = require('express');
const app = express();
console.log("stranka je aktivni, nasloucha na portu 5000");

const bodyParser = require('body-parser');

const fs = require('fs');


app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.render('index.ejs');
})

app.get("/results", (req, res) => {
    fs.readFile('responses.json', 'utf8', (err, data) => {
      const responses = JSON.parse(data);
      res.render('results', { responses });
    });
  });


  
app.post('/saved', function (req, res) {
    let subject = {
        jmeno: req.body.jmeno,
        prijmeni: req.body.prijmeni,
        mesto: req.body.mesto,
        ulice: req.body.ulice,
        stat: req.body.stat,
        barva: req.body.barva,
        time: new Date().toISOString(),
    }

    fs.readFile("responses.json", function (err, data) {
        if (err) throw err;
        let json = JSON.parse(data);
        json.push(subject);

        fs.writeFile('responses.json', JSON.stringify(json, null, 2), function (err) {
        if (err) throw err;
        res.redirect('results');
    });
    })
})

app.listen(5000);