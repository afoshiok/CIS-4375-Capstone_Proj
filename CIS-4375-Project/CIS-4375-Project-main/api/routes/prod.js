const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient() 

// GET all productlines by Product ID
router.get("/:id", async (req,res) => {
    const product_id = parseInt(req.params.id)
    try {
        const productlines = await prisma.productline.findMany({
            where: {
                Product_ID: product_id
            }
        })
        res.json(productlines)
    } catch(error){
        console.log(error)
        res.status(404).json(error)
    }
  })

  module.exports = router