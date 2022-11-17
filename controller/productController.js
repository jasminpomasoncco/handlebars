const Product =  require('../contenedores/contenedor');
const product = new Product('data/productos.txt');

const getAllProducts = async(req, res) => {
    try {
        const products= await product.getAll();
        res.render('products.handlebars',{products,  existproducts: products.length > 0});
    } catch (error) {
        res.status(500).json({
            error: 'Something went wrong'
        })
    }
}

const getProductById = async(req, res) => {
    try {
        const productFound = await product.getById(+req.params.id);

        if(!productFound){
            return res.json({
                error: 'Product not found'
            })
        }

        return res.json({
            producto: productFound
        })
    } catch (error) {
        res.status(500).json({
            error: 'Something went wrong'
        })
    }
}

const createProduct = async(req, res) => {
    try {
        const productCreated = await product.save(req.body);
        res.json({
            'product':productCreated
        })
    } catch (error) {
        res.status(500).json({
            error: 'Something went wrong'
        })
    }
}

const updateProduct = async(req, res) => {
    try {
        const message = await product.updateById(+req.params.id, req.body);
        if(!message){
            return res.json({
                error: `Product with ID: ${+req.params.id} not found`
            })
        }
        return res.json({
            message
        });
    } catch (error) {
        res.status(500).json({
            error: 'Something went wrong'
        })
    }
}

const deletePoduct = (req, res) => {
    try {
        product.deleteById(+req.params.id)
        return res.json({
            message: 'Product deleted'
        })
    } catch (error) {
        res.status(500).json({
            error: 'Something went wrong'
        })
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deletePoduct
}