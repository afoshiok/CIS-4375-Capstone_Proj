const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient() //Commented out because I haven't run "prisma generate" yet

// GET all supply
router.get("/", async (req,res) => {
    const allSupply = await prisma.supply.findMany()
    res.json(allSupply)
    // .catch((error) => {
    //     console.log(error)
    //     res.status(404).json("An error has occured, check console")
    // })
})

//GET supply by ID
router.get("/:id", async (req,res) => {
    const supply_id = parseInt(req.params.id)
    try {
        const supply = await prisma.supply.findUnique({
            where: {
                id: supply_id
            }
        })
        if (supply == null){
            res.status(404).json("ID queried does not exist")
        }
        else {
            res.json(supply)
        }
    } catch(error){
        res.status(404).json(error)
    }
})


//Need to work on the error handling for not finding a supply to delete
//DELETE supply by id
router.delete('/:id', async (req, res, next) => {
    const supply_id = parseInt(req.params.id);
    try {
      const supply = await prisma.supply.delete({
        where: {
          id: supply_id
        }
      })
      res.json(supply);
    } catch (error) {
      next(error);
    }
  });

// Need to work on the error handling for when an id does not exist
//PUT to update supply by id
 router.put('/:id', async (req, res, next) => {
    const supply_id = parseInt(req.params.id);
    try {
      const { Supply_name, Quantity } = req.body;
      const supply = await prisma.supply.update({
        where: {id: supply_id},
        data: {
          Supply_name: Supply_name,
          Quantity: Quantity
        }
      });
      res.json(supply);
      
    } catch (error) {
      next(error);
    }
  });

//POST add supply
router.post('/', async (req,res) => {
    const supplyData = {
        Supply_name: req.body.Supply_name,
        Quantity: req.body.Quantity 
    }
    try{
        const newSupply = await prisma.supply.create({
            data: supplyData
        })
        res.json(newSupply)
    }
    catch (error){
        res.status(404).json(error)
    }
    
})



module.exports = router