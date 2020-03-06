const express = require('express')
const cors = require('cors')
const fs = require('fs')
const app = express()
const port = 8000

app.use(express.json())
app.use(cors())

app.get('/get_cosmonauts', (req, res) => res.json(JSON.parse(fs.readFileSync('kosmonauti.json', 'utf8'))))

app.post('/delete_cosmonaut', (req, res) => {
    let data = JSON.parse(fs.readFileSync('kosmonauti.json', 'utf8'));
    data.splice(req.body.id, 1);
    fs.writeFile('kosmonauti.json', JSON.stringify(data), 'utf8', () => {
        console.log('Cosmonaut deleted successfuly!');
        res.send({ msg: `Cosmonaut with id ${req.body.id} deleted successfuly!`});
    });
});

app.get('/change_cosmonauts', (req, res) => {
    res.send({ msg:'Cosmonauts changed successfully' });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))