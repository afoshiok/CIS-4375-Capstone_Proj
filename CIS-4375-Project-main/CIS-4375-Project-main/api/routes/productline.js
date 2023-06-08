const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient() 

// GET all productline
router.get("/", async (req,res) => {
    const allProduct = await prisma.productline.findMany()
    res.json(allProduct)
})

//GET productline by ID
router.get("/:id", async (req,res) => {
    const productline_id = parseInt(req.params.id)
    try {
        const productline = await prisma.productline.findUnique({
            where: {
                id: productline_id
            }
        })
        if (productline == null){
            res.status(404).json("ID queried does not exist")
        }
        else {
            res.json(productline)
        }
    } catch(error){
        res.status(404).json(error)
    }
})


// GET all productlines by Product ID
router.get("/prod/:id", async (req,res) => {
  const product_id = parseInt(req.params.id)
  try {
      const productlines = await prisma.productline.findMany({
          where: {
              Product_ID: product_id
          },
          include: {
              supply: true
          }
      })
      res.json(productlines)
  } catch(error){
      res.status(404).json(error)
  }
})




//PUT to update supply by id
router.put('/:id', async (req, res, next) => {
    const productline_id = parseInt(req.params.id);
    try {
      const { Product_ID, Supply_ID } = req.body;
      const productline = await prisma.productline.update({
        where: {id: productline_id},
        data: {
          Product_ID: Product_ID,
          Supply_ID: Supply_ID
        }
      });
      res.json(productline);
      
    } catch (error) {
      next(error);
    }
  });

// need to create POST for Productline
router.post('/', async (req,res) => {
  const productlineData = {
      Product_ID: req.body.Product_ID,
      Supply_ID: req.body.Supply_ID
  }
  try{
      const newProductline = await prisma.productline.create({
          data: productlineData
      })
      res.json(newProductline)
  }
  catch (error){
      res.status(404).json(error)
  }
  
})

//DELETE productline by id
router.delete('/:id', async (req, res, next) => {
    const productline_id = parseInt(req.params.id);
    try {
      const productline = await prisma.productline.delete({
        where: {
          id: productline_id
        }
      })
      res.json(productline);
    } catch (error) {
      next(error);
    }
  });


module.exports = router