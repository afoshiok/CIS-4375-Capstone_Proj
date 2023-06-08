const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient() 

//example use case **REMOVE WHEN YOU START WORKING**
router.get("/example", (req,res) => {
    res.send("This is router link: localhost:8080/graph/example")
})


  //GET the sum of totals for the past 6 months
  router.get("/revenue", async (req, res) => {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
    const data = await prisma.cust_Order.findMany({
      where: {
        Order_CompletionDate: {
          gte: sixMonthsAgo,
          lt: today
        },
      },
      select: {
        Order_total: true,
        Order_CompletionDate: true,
      },
    });
  
    const groupedData = data.reduce((acc, curr) => {
      const month = curr.Order_CompletionDate.getMonth();
      const year = curr.Order_CompletionDate.getFullYear();
      if (!acc[`${year}-${month}`]) {
        acc[`${year}-${month}`] = { month: month, year: year, total: 0 };
      }
      acc[`${year}-${month}`].total += curr.Order_total;
      return acc;
    }, {});
  
    const result = Object.values(groupedData).sort((a, b) => {
      const yearComparison = a.year - b.year;
      if (yearComparison !== 0) {
        return yearComparison;
      }
      return a.month - b.month;
    });
  
    res.json(result);
  });
  

  //Get expenses for the past 6 months
  router.get("/expenses", async (req, res) => {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
    const data = await prisma.vendor_Order.findMany({
      where: {
        Vendor_Order_Date: {
          gte: sixMonthsAgo,
          lt: today
        },
      },
      select: {
        Order_Cost: true,
        Vendor_Order_Date: true,
      },
    });
  
    const groupedData = data.reduce((acc, curr) => {
      const month = curr.Vendor_Order_Date.getMonth();
      const year = curr.Vendor_Order_Date.getFullYear();
      if (!acc[year]) {
        acc[year] = {};
      }
      if (!acc[year][month]) {
        acc[year][month] = { month: month, year: year, expenses: 0 };
      }
      acc[year][month].expenses += curr.Order_Cost;
      return acc;
    }, {});
  
    const result = Object.values(groupedData)
      .flatMap((yearObj) =>
        Object.values(yearObj).sort((a, b) => {
          if (a.year === b.year) {
            return a.month - b.month;
          } else {
            return a.year - b.year;
          }
        })
      );
  
    res.json(result);
  });
  
  

  //Expenses for current month
  router.get("/expensesMonth", async (req, res) => {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
    
    const data = await prisma.vendor_Order.findMany({
      where: {
        AND: [
          { Vendor_Order_Date: { gte: firstDayOfMonth } },
          { Vendor_Order_Date: { lte: lastDayOfMonth } },
        ]
      },
      select: {
        Order_Cost: true,
      },
    });
  
    const totalExpenses = data.reduce((acc, curr) => acc + curr.Order_Cost, 0);
  
    res.json(totalExpenses);
  });

  //Revenue for current month
  router.get("/revenueMonth", async (req, res) => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    const data = await prisma.cust_Order.findMany({
      where: {
        Order_CompletionDate: {
          gte: firstDayOfMonth,
          lt: today
        },
      },
      select: {
        Order_total: true,
        Order_CompletionDate: true,
      },
    });
  
    const totalRevenue = data.reduce((acc, curr) => {
      acc += curr.Order_total;
      return acc;
    }, 0);
    
    res.json(totalRevenue);
  });
  
  


  //Get number of orders for each month last 6 months
  router.get("/orders", async (req, res) => {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
    const data = await prisma.cust_Order.findMany({
      where: {
        Order_CompletionDate: {
          gte: sixMonthsAgo,
          lt: today,
        },
      },
      select: {
        id: true,
        Order_CompletionDate: true,
      },
    });
  
    const groupedData = data.reduce((acc, curr) => {
      const month = curr.Order_CompletionDate.getMonth();
      const year = curr.Order_CompletionDate.getFullYear();
      if (!acc[year]) {
        acc[year] = {};
      }
      if (!acc[year][month]) {
        acc[year][month] = { month: month, year: year, count: 0 };
      }
      acc[year][month].count += 1;
      return acc;
    }, {});
  
    const result = Object.entries(groupedData)
      .sort((a, b) => a[0] - b[0]) // sort by year
      .flatMap(([year, yearObj]) =>
        Object.values(yearObj).sort((a, b) => a.month - b.month)
      );
  
    res.json(result);
  });
  

//SEARCH for product by name 
router.get('/:name', async (req, res) => {
  const productName = req.params.name;
  const product = await prisma.product.findFirst({
      where: { Product_name: productName },
  });
  if (product) {
      res.json(product);
  } else {
      res.status(404).send('Sorry! This product is not found');
  }
});

//SEARCH for supply by name
//NEED TO CHANGE THE URL 
router.get('/supply/:name', async (req, res) => {
  const supplyName = req.params.name;
  const supply = await prisma.supply.findFirst({
      where: { Supply_name: supplyName },
  });
  if (supply) {
      res.json(supply);
  } else {
      res.status(404).send('Sorry! This product is not found');
  }
});



//Searches for customer using 2 variables firstname and lastname
router.get('/customer/search', async (req, res) => {
  const { Customer_Fname, Customer_Lname } = req.query;
  const customers = await prisma.customer.findMany({
    where: {
      AND: [
        { Customer_Fname: { contains: Customer_Fname } },
        Customer_Lname ? { Customer_Lname: { contains: Customer_Lname } } : {}
      ]
    }
  });
  if (customers.length > 0) {
    res.json(customers);
  } else {
    res.status(404).send('Customers not found');
  }
});

//Gets a count of each status for cust_Orders
// router.get('/orders/status', async (req, res) => {
//   const count1 = await prisma.cust_Order.count({
//     where: {
//       Order_status_ID: 1,
//     },
//   });

//   const count2 = await prisma.cust_Order.count({
//     where: {
//       Order_status_ID: 2,
//     },
//   });

//   const count3 = await prisma.cust_Order.count({
//     where: {
//       Order_status_ID: 3,
//     },
//   });

//   res.json({
//     status1: count1,
//     status2: count2,
//     status3: count3,
//   });
// });

// Gets a count of each status for cust_Orders
router.get('/orders/status', async (req, res) => {
  const count1 = await prisma.cust_Order.count({
    where: {
      Order_status_ID: 1,
    },
  });

  const count2 = await prisma.cust_Order.count({
    where: {
      Order_status_ID: 2,
    },
  });

  const count3 = await prisma.cust_Order.count({
    where: {
      Order_status_ID: 3,
    },
  });

  const result = [
    { status: 'Not Started', count: count1 },
    { status: 'In-Progress', count: count2 },
    { status: 'Complete', count: count3 },
  ];

  res.json(result);
});


//Get Monthly expenses





module.exports = router