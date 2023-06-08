const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient() 

//Json response format
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
            Status_name: true,
            id: true
        }
    },
    Order_total: true
}

//GET all orders
router.get("/", async (req, res) => {
    try{
        const allOrders = await prisma.cust_Order.findMany({
            select: orderSelect
        });
        res.json(allOrders)
    }
    catch (error){
        console.log(error)
        res.status(404).json(error)
    }
    
});

//GET order by ID
// router.get("/:id", async (req,res) => {
//     const order_id = parseInt(req.params.id)
//     try {
//         const Order = await prisma.cust_Order.findUnique({
//             where: {
//                 id: order_id
//             },
//             select: orderSelect
//         })
//         if (Order == null){
//             res.status(404).json("ID queried does not exist")
//         }
//         else {
//             res.json(Order)
//         }
//     } catch(error){
//         res.status(404).json(error)
//     }
// });

// router.get("/:id?", async (req, res) => {
//     try {
//       if (req.params.id === undefined) {
//         const orders = await prisma.cust_Order.findMany({
//           select: orderSelect
//         });
//         res.json(orders);
//       } else {
//         const order_id = parseInt(req.params.id);
//         const Order = await prisma.cust_Order.findUnique({
//           where: {
//             id: order_id
//           },
//           select: orderSelect
//         });
//         if (Order == null) {
//           res.status(404).json("ID queried does not exist");
//         } else {
//           res.json(Order);
//         }
//       }
//     } catch (error) {
//       res.status(404).json(error);
//     }
//   });

  router.get("/:id?", async (req, res) => {
    try {
      if (!req.params.id || req.params.id === "") {
        const orders = await prisma.cust_Order.findMany({
        });
        res.json(orders);
      } else {
        const order_id = parseInt(req.params.id);
        const Order = await prisma.cust_Order.findUnique({
          where: {
            id: order_id
          },
        });
        if (Order == null) {
          res.status(404).json("ID queried does not exist");
        } else {
          res.json(Order);
        }
      }
    } catch (error) {
      res.status(404).json(error);
    }
  });

  router.get("/search/:id?", async (req, res) => {
    try {
      if (!req.params.id || req.params.id === "") {
        const orders = await prisma.cust_Order.findMany({
        });
        res.json(orders);
      } else {
        const order_id = parseInt(req.params.id);
        const Order = await prisma.cust_Order.findUnique({
          where: {
            id: order_id
          },
          select: orderSelect
        });
        if (Order == null) {
          res.status(404).json("ID queried does not exist");
        } else {
          res.json(Order);
        }
      }
    } catch (error) {
      res.status(404).json(error);
    }
  });
  
  

//POST add order
router.post("/", async (req,res) => {
    const orderData = {
        User_ID : req.body.User_ID,
        Customer_ID: req.body.Customer_ID,
        Order_status_ID: 1 //Hard coded default, so I didn't have to change the schema 
    }
    try{
        const newOrder = await prisma.cust_Order.create({
            data: orderData
        })
        res.json(newOrder)
    }
    catch (error){
        res.status(404).json(error)
    }
});

//PUT update order by ID
router.put("/:id", async (req,res) => {
    const order_id = parseInt(req.params.id)
    let changeDate = new Date()
    const changeData = {
        Customer_ID: req.body.Customer_ID,
        User_ID: req.body.User_ID,
        // Order_date: req.body.Order_date,
        Order_date: new Date(req.body.Order_date).toISOString(),
        updatedAt: changeDate.toISOString(),
        Order_total: req.body.Order_total,
        Order_status_ID: req.body.Order_status_ID,
        Order_CompletionDate: req.body.Order_CompletionDate
    }
    try{
        changeOrder = await prisma.cust_Order.update({
            where : { id: order_id },
            data: changeData
        });
        res.json(`Order #${order_id} has been updated.`)
    }
    catch (error){
        console.log(error)
        res.status(404).json('Error has occured check your console for more info.')
    }
});

//DELETE order by ID
router.delete("/:id", async(req,res) => {
    order_id = parseInt(req.params.id)
    try{
        const deleteOrder = await prisma.cust_Order.delete({
            where: {
                id: order_id
            }
        })
        res.json(`Order #${order_id} has been deleted.`)
    }
    catch (error){
        console.log(error)
        res.status(404).json('Error has occured check your console for more info.')
    }
});



// router.post("/createOrder", async(req,res) => {
//     const orderlineData = req.body.Orderline
//     const orderData = {
//         User_ID : req.body.User_ID,
//         Customer_ID: req.body.Customer_ID,
//         Order_status_ID: 1, //Hard coded default, so I didn't have to change the schema
//         Order_total: req.body.Order_total,
//         Orderline: {
//             createMany: {
//                 data : orderlineData
//             }
//         }
//     }


//     try{
//         const newOrder = await prisma.cust_Order.create({
//             data: orderData
//         })
//         res.json(newOrder)
//     }
//     catch (error){
//         console.log(error)
//         res.status(404).json(error)
//     }
// })

module.exports = router