require('dotenv').config();         // read environment variables from .env file
const express = require('express');

const app = express();
const port = 3000;

const expressSwagger = require('express-swagger-generator')(app);
const options = require('./swagger_conf.js');
expressSwagger(options);

app.use(express.json()); //enable parsing JSON body data

// root route -- /api/
app.get('/', function (req, res) {
    res.status(200).json({ message: 'Welcome Surrealismo-API' });
});

// routing middleware
app.use('/users', require('./routes/users.routes.js'))
app.use('/games', require('./routes/games.routes.js'))
app.use('/arts', require('./routes/arts.routes.js'))
// app.use('/artists', require('./routes/artists.routes.js'))
// app.use('/news', require('./routes/news.routes.js'))
// app.use('/shop', require('./routes/shop.routes.js'))
// app.use('/shop', require('./routes/techniques.routes.js'))

// handle invalid routes
app.get('*', function (req, res) {
    res.status(404).json({ message: 'WHAT???' });
})
app.listen(port, () => console.log(`App listening at localhost:${port}`));