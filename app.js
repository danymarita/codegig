const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database');
const bp = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bp.urlencoded({extended: false}));
app.use(bp.json());

// Test DB
db.authenticate().then(() => console.log('Database connected.'))
.catch((error) => console.log('Error: ' + error));

// Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home');
})

// Gig routes
app.use('/gigs', require('./routes/gigs'));

app.listen(PORT, console.log(`Codegig run on port: ${PORT}`));