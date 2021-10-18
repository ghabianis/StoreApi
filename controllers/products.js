const { modelName } = require('../models/product')
const Products =require('../models/product')
var RegexParser = require("regex-parser");
const getAllProductsStatic = async (req,res) =>{
    const search = 'ab'
    const products= await Products.find({
        name: { $RegexParser: search, $options: 'i' },
    })
    res.status(200).json({ products, nbHits: products.length})
}

 
const getAllProducts = async (req,res) =>{
    const {featured , company, name} = req.query
    const queryObject = {}
        if (featured){
            queryObject.featured = featured ==='true'? true : false
       
    }
    if(company){
        queryObject.company = company
    }
    if (name){
        queryObject.name = { $RegexParser: name, $options: 'i' }
    }
    console.log(queryObject)
    const products = await Products.find(req.query)
    res.status(200).json({products, nbHits: products.length})
}



module.exports = {
    getAllProductsStatic,
    getAllProducts,
}