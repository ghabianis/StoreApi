const express =  require ('express')
const { model } = require('mongoose')

const router =  express.Router()

const {
    getAllProducts,
    getAllProductsStatic
} = require('../controllers/products')


router.route('/').get(getAllProducts)
router.route('/Static').get(getAllProductsStatic)



module.exports = router