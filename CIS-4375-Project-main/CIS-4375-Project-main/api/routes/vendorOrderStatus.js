const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient() 


const vendorOrderSelect = {
  id: true,
  Vendor_ID: true,
  vendor_id: {
     select: {
       Vendor_Name: true
     }
  },
  Supply_ID: true,
  supply_id: {
     select: {
       Supply_name: true
     }
  },
  Vendor_Order_Quantity: true,
  Vendor_Order_CompletionDate: true,
  Order_Cost: true,
  vendor_status_id: {
     select: {
       id: true,
       Status_name: true
     }
  }
  }

//Gets vendorOrders by status
router.get('/:id', async (req,res) => {
    const status_id = parseInt(req.params.id)
    try {
        const Order = await prisma.vendor_Order.findMany({
            where: {
                Vendor_status_ID: status_id
            },
            select: vendorOrderSelect
            
        })
        res.json(Order);
    } catch(error){
        res.status(404).json(error)
    }
  });

  //GET vendor order by ID
router.get("/:id", async (req,res) => {
    const vendorOrder_id = parseInt(req.params.id)
    try {
        const vendorOrder = await prisma.vendor_Order.findUnique({
            where: {
                id: vendorOrder_id
            },
            select: vendorOrderSelect
        })
        if (vendorOrder == null){
            res.status(404).json("ID queried does not exist")
        }
        else {
            res.json(vendorOrder)
        }
    } catch(error){
        res.status(404).json(error)
    }
})

  module.exports = router