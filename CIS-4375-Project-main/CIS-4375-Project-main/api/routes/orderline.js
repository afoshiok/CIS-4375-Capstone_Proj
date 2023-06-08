const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client');
const { json } = require("express");
const prisma = new PrismaClient()


orderlineSelect = {
  id: true,
  Order_ID: true,
  Product_ID: true,
  Product_qty: true,
  product_id: {
    select: {
      Product_price: true
    }
  }
}
 
//GET Enpoint all Orderline
router.get("/", async (req,res) => {
    const Orderline = await prisma.Orderline.findMany({
      select: orderlineSelect
    });
    if (Orderline) {
    res.json(Orderline)
    } else {
    res.status(404).send('Orderline not found');
    }
});
 
//GET endpoint orderline by id
router.get('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id);
    const Orderline = await prisma.Orderline.findUnique({
        where: { id: id },
        select: orderlineSelect
    });
    if (Orderline) {
        res.json(Orderline);
    } else {
        res.status(404).send('ID for Orderline not found');
    }
});
 
//Put Request
router.put('/:id', async (req, res) => {
  try {
    const { Order_ID, Product_ID, Product_qty } = req.body;
    if (!Order_ID || !Product_ID || !Product_qty) {
      return res.status(400).json({ error: 'Missing required data' });
    }
    const orderline = await prisma.orderline.update({
      where: { id: parseInt(req.params.id) },
      data: {
        Order_ID: Order_ID, //FK not able to update
        Product_ID: Product_ID, //FK not able to update
        Product_qty: Product_qty,
      }
    });
    res.json(orderline);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update orderline' });
  }
});
 
  //POST orderline and subtract the quantity from product table
  router.post('/', async (req,res) => {
    const orderlineData = {
        Order_ID: req.body.Order_ID, //must exist in DB
        Product_ID: req.body.Product_ID, // must exist in DB
        Product_qty: req.body.Product_qty
    }
    try{
        const newOrderLine = await prisma.orderline.create({
            data: orderlineData
        })
        .then( async () => {
          const productQtyupdate = await prisma.product.update({
            where: {id: req.body.Product_ID},
            data: {
              Quantity: {
                //This is subtracting the quantity from product
                decrement: req.body.Product_qty
              }
            }
          })
          res.json(productQtyupdate);
        })
        .catch((error) => {
          console.log(error)
        })
    }
    catch (error){
        res.status(404).json(error)
    }
  });
 
  //Delete endpoint Delete orderline by id
  router.delete('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
      const orderline = await prisma.orderline.delete({
        where: {
          id: id
        }
      });
      res.json(orderline);
    } catch (error) {
      next(error);
    }
  });

  router.get('/orders/:id', async (req,res) => {
    order_id = parseInt(req.params.id)
    try{
      const orders = await prisma.orderline.findMany({
        where : {
          Order_ID: order_id
        },
        select: orderlineSelect
      });
      res.json(orders)
    }
    catch (error){
      console.log(error)
      res.status(404).json('Error has occured, check console for more info.')

    }
    
    
  });
 
module.exports = router