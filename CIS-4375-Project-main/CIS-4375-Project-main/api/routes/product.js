const express = require("express")
const router = express.Router()
const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

//POST Add a Product
router.post("/", async (req,res) => { 
    const { Product_name, Product_price, Quantity } = req.body;
    try{
        const createProduct = await prisma.product.create(
            {
                data: {
                    Product_name: Product_name,
                    Product_price: Product_price,
                    Quantity: Quantity
                }
            }
        )
        res.json(createProduct)
        console.log("We have a new product: ", (createProduct))
    }
    catch (error){
        console.log(error)
        res.status(404).json("error has occured, check console for more information")
    }

})

//GET Product by ID
router.get('/:id', async (req, res) => {
    const ProdID = parseInt(req.params.id);
    const product = await prisma.product.findUnique({
        where: { id: ProdID},
    });
    if (product) {
        res.json(product);
        } else {
            res.status(404).send('Sorry! This product is not found');
        }
    }
);

//GET ALL Products
router.get('/', async (req,res) => {
    const allProducts = await prisma.product.findMany()
    res.json(allProducts)
})

//PUT Update Product Information
router.put('/:id', async (req, res) => {
    try {
        const ProdID = parseInt(req.params.id);
        const { Product_name, Product_price, Quantity } = req.body;
        const product = await prisma.product.update({
        where: {id: ProdID },
        data: {
            Product_name: Product_name,
            Product_price: Product_price,
            Quantity: Quantity
        }
      });
      res.json(product);
      console.log("An update has been made to a product: ", (product))

    } 
    catch (error){
        console.log(error)
        res.status(404).json("error has occured, check console for more information")
    }
});


//DELETE Delete the product
router.delete('/:id', async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const product = await prisma.product.delete({
        where: {
          id: id
        }
      });
      console.log(product)
      res.json(product);
    } catch (error) {
      next(error);
    }
  });


//NOTE: If Quantity == 0, send alert that product is out of stock!!//

module.exports = router