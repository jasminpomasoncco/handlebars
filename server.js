const express = require('express');
const { engine } = require('express-handlebars')
const router_products = require('./routes/router')

const app = express();
const PORT = process.env.PORT || 8080;

app.set('views', './public/views')
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use( express.static(__dirname + '/public'))



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})
app.use('/api/products', router_products);

const server = app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
server.on('error', (error) => console.error(error));