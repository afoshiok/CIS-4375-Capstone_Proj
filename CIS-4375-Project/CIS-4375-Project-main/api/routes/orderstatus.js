const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient() 
orderSelect = {
    id: true,
    updatedAt: true,
    User_ID: true,
    Customer_ID: true,
    customer: {
        select: {
            Customer_Fname: true,
            Customer_Lname: true
        }
    },
    Order_date: true,
    Order_CompletionDate: true,
    order_status_id: {
        select : {
            Status_name: true
        }
    },
    Order_total: true
}

router.get("/", async(req,res) => {
    try{
        const statuses = await prisma.order_status.findMany()
        res.json(statuses)
    }
    catch (error){
        console.log(error)
        res.status(404).json('Error has occured check your console for more info.')
    }
})

//Gets orders by status
router.get('/status/:id', async (req,res) => {
    const status_id = parseInt(req.params.id)
    try {
        const Order = await prisma.cust_Order.findMany({
            where: {
                Order_status_ID: status_id
            },
            select: orderSelect
            
        })
        res.json(Order);
    } catch(error){
        res.status(404).json(error)
    }
});

module.exports = router