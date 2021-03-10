const express  = require('express');
const axios = require('axios');
const cors = require('cors')

const app = express();

app.use(cors());

app.listen(5000, console.log('Server running Ok'));

app.get('/', async (req, res) => {
    const response = await axios.get('https://api.mercadolibre.com/sites/MLA/search?q=ipod');
    res.send(response.data.results)
})
