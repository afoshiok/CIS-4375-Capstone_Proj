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
  Vendor_Order_Date: true,
  Vendor_Order_CompletionDate: true,
  Order_Cost: true,
  vendor_status_id: {
     select: {
       id: true,
       Status_name: true
     }
  }
  }

// GET all vednor orders
router.get("/", async (req,res) => {
    const allVendorOrders = await prisma.vendor_Order.findMany({
      select: vendorOrderSelect
    })
    res.json(allVendorOrders)
})

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


  //PUT to update supply by id
  router.put('/:id', async (req, res, next) => {
    const vendorOrder_id = parseInt(req.params.id);
    try {
      const { Supply_ID, Vendor_Order_Quantity, Order_Cost,
      Vendor_Order_Date, Unit_ID, Vendor_ID, Vendor_Order_CompletionDate, Vendor_status_ID  } = req.body;
      const vendorOrder = await prisma.vendor_Order.update({
        where: {id: vendorOrder_id},
        data: {
          Supply_ID: Supply_ID,
          Vendor_Order_Quantity: Vendor_Order_Quantity,
          Order_Cost: Order_Cost,
          Vendor_Order_Date: new Date(Vendor_Order_Date).toISOString(),
          Unit_ID: Unit_ID,
          Vendor_ID: Vendor_ID,
          Vendor_Order_CompletionDate: new Date(Vendor_Order_CompletionDate).toISOString(),
          Vendor_status_ID: Vendor_status_ID 
        }
      });
      res.json(vendorOrder);
      //if req.body.VendorOrderStatus == (vendor_id for complete) 
      //then increment the supply_id quantity
    } catch (error) {
      next(error);
    }
  });


  // Update the completion date to current time and adds the quantity to supply 
  router.put('/:id/complete', async (req, res, next) => {
    const vendorOrder_id = parseInt(req.params.id);
    try {
      const { Supply_ID, Vendor_Order_Quantity, Order_Cost,
      Vendor_Order_Date, Unit_ID, Vendor_ID, Vendor_Order_CompletionDate, Vendor_status_ID } = req.body;
      const current_time = new Date()
      const vendorOrder = await prisma.vendor_Order.update({
        where: {id: vendorOrder_id},
        data: {
          Supply_ID: Supply_ID,
          Vendor_Order_Quantity: Vendor_Order_Quantity,
          Order_Cost: Order_Cost,
          Vendor_Order_Date: new Date(Vendor_Order_Date).toISOString(),
          Unit_ID: Unit_ID,
          Vendor_ID: Vendor_ID,
          Vendor_Order_CompletionDate: current_time.toISOString(),
          Vendor_status_ID: Vendor_status_ID
        }
      })
      .then( async () => {
        const vendorComplete = await prisma.supply.update({
          where: {id: req.body.Supply_ID},
          data: {
            Quantity: {
              //This is addding the quantity to supply
              increment: Vendor_Order_Quantity
            }
          }
        })
        res.json(vendorComplete);
      })
      .then( async () => {
        const vendorStatus = await prisma.vendor_Order.update({
          where: {id: vendorOrder_id},
          data: {
            Vendor_status_ID: 3
          }
         })
      })
    } catch (error) {
      next(error);
    }
  });

  //Attempt at adding If status is one logic
  // router.put('/:id/complete', async (req, res, next) => {
  //   const vendorOrder_id = parseInt(req.params.id);
  //   try {
  //     const { Supply_ID, Vendor_Order_Quantity, Order_Cost,
  //     Vendor_Order_Date, Unit_ID, Vendor_ID, Vendor_Order_CompletionDate, Vendor_status_ID } = req.body;
  //     const current_time = new Date()
  //     if (Vendor_status_ID == 1){
  //     const vendorOrder = await prisma.vendor_Order.update({
  //       where: {id: vendorOrder_id},
  //       data: {
  //         Supply_ID: Supply_ID,
  //         Vendor_Order_Quantity: Vendor_Order_Quantity,
  //         Order_Cost: Order_Cost,
  //         Vendor_Order_Date: new Date(Vendor_Order_Date).toISOString(),
  //         Unit_ID: Unit_ID,
  //         Vendor_ID: Vendor_ID,
  //         Vendor_Order_CompletionDate: current_time.toISOString(),
  //         Vendor_status_ID: Vendor_status_ID
  //       }
  //     })
  //     .then( async () => {
  //       // const vendorComplete = "hello"
  //       // res.json(vendorComplete)
  //       const vendorComplete = await prisma.supply.update({
  //         where: {id: req.body.Supply_ID},
  //         data: {
  //           Quantity: {
  //             //This is addding the quantity to supply
  //             increment: Vendor_Order_Quantity
  //           }
  //         }
  //       })
  //       res.json(vendorComplete);
  //      const vendorStatus = await prisma.vendor_Order.update({
  //       where: {id: vendorOrder_id},
  //       data: {
  //         Vendor_status_ID: 2
  //       }
  //      })
  //     })
  //   }
  //     //if req.body.VendorOrderStatus == (vendor_id for complete) 
  //     //then increment the supply_id quantity
  //   } catch (error) {
  //     next(error);
  //   }
  
  // });


// // POST add vendor order
// router.post('/', async (req,res) => {
//   const vendorOrderData = {
//       Supply_ID: req.body.Supply_ID,
//       Vendor_Order_Quantity: req.body.Vendor_Order_Quantity,
//       Order_Cost: req.body.Order_Cost,
//       Vendor_Order_Date: new Date(req.body.Vendor_Order_Date).toISOString(),
//       Unit_ID: req.body.Unit_ID,
//       Vendor_ID: req.body.Vendor_ID,
//       //Is able to be null
//       Vendor_Order_CompletionDate: new Date(req.body.Vendor_Order_CompletionDate),
//       Vendor_status_ID: req.body.Vendor_status_ID
//   }
//   try{
//       const newVendorOrder = await prisma.vendor_Order.create({
//           data: vendorOrderData
//       })
//       res.json(newVendorOrder)
//       .then( async () => {
//         const vendorComplete = await prisma.supply.update({
//           where: {id: req.body.Supply_ID},
//           data: {
//             Quantity: {
//               //This is addding the quantity to supply
//               increment: Vendor_Order_Quantity
//             }
//           }
//         })
//         res.json(vendorComplete);
//       })
//   }
//   catch (error){
//       res.status(404).json(error)
//   }
  
// })

router.post('/', async (req,res) => {
  const vendorOrderData = {
      Supply_ID: req.body.Supply_ID,
      Vendor_Order_Quantity: req.body.Vendor_Order_Quantity,
      Order_Cost: req.body.Order_Cost,
      Vendor_Order_Date: new Date(req.body.Vendor_Order_Date).toISOString(),
      Unit_ID: req.body.Unit_ID,
      Vendor_ID: req.body.Vendor_ID,
      //Is able to be null
      Vendor_Order_CompletionDate: new Date(req.body.Vendor_Order_CompletionDate),
      Vendor_status_ID: req.body.Vendor_status_ID
  }
  try{
      const newVendorOrder = await prisma.vendor_Order.create({
          data: vendorOrderData
      })
      res.json(newVendorOrder)
  }
  catch (error){
      res.status(404).json(error)
  }
  
})


//DELETE supply by id
router.delete('/:id', async (req, res, next) => {
    const vendorOrder_id = parseInt(req.params.id);
    try {
      const vendorOrder = await prisma.vendor_Order.delete({
        where: {
          id: vendorOrder_id
        }
      })
      res.json(vendorOrder);
    } catch (error) {
      next(error);
    }
  });



module.exports = router