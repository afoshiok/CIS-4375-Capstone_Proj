const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient() 

router.get("/example", (req,res) => {
    res.send("This is router link: localhost:8080/invoice/example")
})

//POST add invoice
router.post("/", async (req,res) => {
    try{
        const createInvoice = await prisma.invoice.create({
            data: {
                Order_ID: req.body.Order_ID,
                Customer_ID: req.body.Customer_ID
            }
        })
        res.json(createInvoice)

    }
    catch (error){
        console.log (error)
        res.status(404).json('The invoice failed.')
    }
});

// GET All Invoice 
router.get("/", async (req,res) => {
    const allInvoice = await prisma.invoice.findMany()
    res.json(allInvoice)
})

// GET Invoice by ID
router.get ("/:id", async (req,res)=> {
    id = parseInt(req.params.id)    
    try{
        const invoice = await prisma.invoice.findUnique({
            where: {
                id: id
            }
        })
        res.json(invoice)
    }
    catch(error){
        console.log (error)
        res.status(404).json("Can't find the invoice")
    }
})
// GET Invoice by Customer ID
router.get ("/customer/:id", async (req,res)=> {
    customerid = parseInt(req.params.id)    
    try{
        const invoice = await prisma.invoice.findMany({
            where: {
                Customer_ID: customerid
            }
        })
        res.json(invoice)
    }
    catch(error){
        console.log (error)
        res.status(404).json("Cannot find the invoice")
    }
})

//PUT update invoice by id
router.put("/:id", async (req, res) => {
    try {
        const {Order_ID, Customer_ID} = req.body;
        const updateinvoice = await prisma.invoice.update({
            where: {id:parseInt(req.params.id)},
            data: {
                Order_ID: Order_ID,
                Customer_ID: Customer_ID
            }
        });
        res.json("Invoice has been successfully updated")
    }
    catch (error) {
        console.error(error);
        res.status(404).json("Cannot update the invoice")
    }
     
})


// DELETE invoice by id
router.delete("/:id",async (req,res,next)=> {
    const id = parseInt(req.params.id);
    try{
        const deleteinvoice = await prisma.invoice.delete({
            where: {
                id: id
            }
        });
        res.json("Invoice has been deleted successfully")
    }
    catch(error){
        console.error(error);
        res.status(404).json("Deletion was unsuccessful")
    }
})



module.exports = router

