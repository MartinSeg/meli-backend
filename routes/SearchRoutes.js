const express = require('express');
const axios = require('axios');

const searchRoutes = express.Router();

searchRoutes.get('/items', async (req, res) => {

    const searchedProduct = req.query.q;
    try{
        const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${searchedProduct}`);
        const items = []
        const categories = response.data.available_filters[0].values.map( category => category.name);

        for( let i = 0; i <= 3; i++){
            const { id, title, price: amount, currency_id, thumbnail, condition, shipping, address  } = response.data.results[i];

            let mappedResult = {
                id,
                title,
                price: {
                    currency: currency_id,
                    amount: amount,
                },
                picture: thumbnail,
                condition,
                free_shipping: shipping.free_shipping,
                address:  address.city_name  
            }

            items.push(mappedResult); 
        }

        res.send({
            author: {
                name: "Martin",
                lastname: "Seghezzo"
            },
            categories,
            items
        })

    }catch(err){
        res.status(500).send({ message: "Ha surgido un error en el servidor o no ha ingresado un valor valido, por favor intente nuevamente" })
    }
});

searchRoutes.get('/items/:id', async (req, res) => {

    const itemId = req.params.id;

    try{
        const itemInfo = await axios.get(`https://api.mercadolibre.com/items/${itemId}`);
        const { title , currency_id, price: amount, thumbnail, condition , shipping, sold_quantity, category_id} = itemInfo.data;
        const itemDescription = await axios.get(`https://api.mercadolibre.com/items/${itemId}/description`);
        const { plain_text } = itemDescription.data

        const itemDetails = {
            author: {
                name: "Martin",
                lastname: "seghezzo"
            },
            item:{
                id: itemId,
                title,
                price:{
                    currency: currency_id,
                    amount,
                },
                picture: thumbnail,
                condition,
                free_shipping: shipping.free_shipping ,
                sold_quantity,
                description:plain_text,
                category: category_id
            }
        }

        res.status(200).send(itemDetails)

    }catch(err){
        res.status(500).send({message: 'No se ha encontrado el producto seleccionado'})
    }
})  

module.exports = searchRoutes
