require('dotenv').config();         // read environment variables from .env file
const express = require('express');
const cors = require('cors');       // middleware to enable CORS (Cross-Origin Resource Sharing)

const app = express();
const port = process.env.PORT;

app.use(cors()); //enable CORS requests from http://localhost:8081
app.use(express.json()); //enable parsing JSON body data

// root route -- /api/
app.get('/surrealismo', function (req, res) {
    res.status(200).json({ message: 'Welcome Surrealismo-API' });
});

// routing middleware
app.use('/surrealismo/users', require('./routes/users.routes.js'))
app.use('/surrealismo/arts', require('./routes/arts.routes.js'))
app.use('/surrealismo/artists', require('./routes/artists.routes.js'))
app.use('/surrealismo/techniques', require('./routes/techniques.routes.js'))
app.use('/surrealismo/news', require('./routes/news.routes.js'))
app.use('/surrealismo/games', require('./routes/games.routes.js'))
app.use('/surrealismo/shop', require('./routes/shop.routes.js'))

// handle invalid routes
app.get('*', function (req, res) {
    res.status(404).json({ message: 'WHAT???' });
})
app.listen(port, () => console.log(`App listening at :${port}`));