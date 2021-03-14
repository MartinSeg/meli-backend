class Item{
    constructor({id, title, price: amount, currency_id, thumbnail, condition, shipping, address, sold_quantity, category_id, plain_text}){
        this.id = id,
        this.title = title,
        this.price = {
            currency: currency_id,
            amount: Number(amount.toFixed(2)),
        },
        this.picture = thumbnail,
        this.condition = condition,
        this.free_shipping = shipping.free_shipping,
        this.address = address?.city_name  
        this.sold_quantity = sold_quantity,
        this.category_id = category_id,
        this.description = plain_text
    }
}

module.exports = Item;