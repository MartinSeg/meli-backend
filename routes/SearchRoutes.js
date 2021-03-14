const express = require('express');
const axios = require('axios');
const Item = require('../models/item');

const searchRoutes = express.Router();

const author = {
    name: "Martin",
    lastname: "Seghezzo"
}

searchRoutes.get('/items', async (req, res) => {

    const searchedProduct = req.query.q;
    try{
        const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${searchedProduct}`);
        const breadCrumb = response.data.filters[0].values[0].path_from_root.map( c => c.name)
        const categoryNames = response.data.available_filters[0].values.map( c => c.name);

        const items = []

        if(response.data.results.length === 0){
            return res.status(404).send({message: 'No se han encontrado resultados relacionados a su búsqueda....'})
        }

        for( let i = 0; i <= 3; i++){
            let item = new Item(response.data.results[i])
            items.push(item); 
        }

        res.send({
            author,
            categories: categoryNames,
            items,
            breadCrumb
        })
    }catch(err){
        res.status(500).send({ message: 'error del Servidor'})
    }
});

searchRoutes.get('/items/:id', async (req, res) => {

    const id = req.params.id;

    try{
        const itemInfo = await axios.get(`https://api.mercadolibre.com/items/${id}`);
        const itemDescription = await axios.get(`https://api.mercadolibre.com/items/${id}/description`);    
        const categorieDetails = await axios.get(`https://api.mercadolibre.com/categories/${itemInfo.data.category_id}`);
        const breadCrumb = categorieDetails.data.path_from_root.map( x => x.name)

        const { plain_text } = itemDescription.data;
        const item = new Item({id, ...itemInfo.data , plain_text});

        res.status(200).send({
            author,
            item, 
            breadCrumb
        })

    }catch(e){
        if(e.response.data.status === 404) return res.status(404).send({ message: 'Ha ingresado un codigo no registrado'})
        res.status(500).send({ message: 'Error del servidor'})
    }

});

module.exports = searchRoutes
