const express = require('express');
const axios = require('axios');

const searchRoutes = express.Router();

searchRoutes.get('/items', async (req, res) => {

    const searchedProduct = req.query.q;
    try{
        const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${searchedProduct}`);
        const items = []

        for( let i = 0; i <= 3; i++){
            const { id, title, price: amount, currency_id, thumbnail, condition, shipping  } = response.data.results[i];

            let mappedResult = {
                id,
                title,
                price: {
                    currency: currency_id,
                    amount: amount,
                    decimals: 00
                },
                picture: thumbnail,
                condition,
                free_shipping: shipping.free_shipping,   
            }

            items.push(mappedResult); 
        }

        res.send({
            author: {
                name: "Martin",
                lastname: "Seghezzo"
            },
            categories: [],
            items
        })

    }catch(err){
        res.status(500).send({ message: "No se han encontrado resultados relacionados a su búsqueda" })
    }
})

module.exports = searchRoutes
