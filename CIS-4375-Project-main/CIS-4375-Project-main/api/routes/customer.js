const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient() 

//POST Create a new customer
router.post("/", async (req,res) => {
    const {  Customer_Fname, Customer_Lname, Customer_Phone,Customer_Email } = req.body;
    const createCustomer = await prisma.customer.create(
        {
            data: {
                Customer_Fname: Customer_Fname,
                Customer_Lname: Customer_Lname,
                Customer_Phone: Customer_Phone, 
                Customer_Email: Customer_Email
            }
        }
    )
    res.json(createCustomer)
})

//GET customer by their id
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const customer = await prisma.customer.findUnique({
        where: { id: id },
    });
    if (customer) {
        res.json(customer);
    } else {
        res.status(404).send('Customer not found');
    }
});

//GET ALL customers 
router.get("/", async (req,res) => {
    const allCustomers = await prisma.customer.findMany()
    res.json(allCustomers)
})

 //Delete customer by their id
 router.delete('/:id', async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const customer = await prisma.customer.delete({
        where: {
          id: id
        }
      });
      res.json(customer);
    } catch (error) {
      next(error);
    }
  });

 //PUT to edit customer information
 router.put('/:id', async (req, res, next) => {
    try {
      const { Customer_Fname, Customer_Lname, Customer_Phone, Customer_Email } = req.body;
      const customer = await prisma.customer.update({
        where: {id: parseInt(req.params.id) },
        data: {
          Customer_Fname:Customer_Fname,
          Customer_Lname: Customer_Lname,
          Customer_Phone: Customer_Phone,
          Customer_Email: Customer_Email
        }
      });
      res.json(customer);

    } catch (error) {
      next(error);
    }
  });




module.exports = router