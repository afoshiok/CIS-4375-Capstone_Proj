const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient() //Commented out because I haven't run "prisma generate" yet


// GET all vendor
router.get("/", async (req,res) => {
    const allVendors = await prisma.vendor.findMany()
    res.json(allVendors)
    // .catch((error) => {
    //     console.log(error)
    //     res.status(404).json("An error has occured, check console")
    // })
})

//GET vendor by ID
router.get("/:id", async (req,res) => {
    const vendor_id = parseInt(req.params.id)
    try {
        const vendor = await prisma.vendor.findUnique({
            where: {
                id: vendor_id
            }
        })
        if (vendor == null){
            res.status(404).json("ID queried does not exist")
        }
        else {
            res.json(vendor)
        }
    } catch(error){
        res.status(404).json(error)
    }
})


//Need to work on the error handling for not finding a supply to delete
//DELETE vendor by id
router.delete('/:id', async (req, res, next) => {
    const vendor_id = parseInt(req.params.id);
    try {
      const vendor = await prisma.vendor.delete({
        where: {
          id: vendor_id
        }
      })
      res.json(vendor);
    } catch (error) {
      next(error);
    }
  });

// Need to work on the error handling for when an id does not exist
//PUT to update vendor by id
 router.put('/:id', async (req, res, next) => {
    const vendor_id = parseInt(req.params.id);
    try {
      const { Vendor_Name, Address_1, Address_2,
      City, Country, zipcode, State_ID} = req.body;
      const vendor = await prisma.vendor.update({
        where: {id: vendor_id},
        data: {
          Vendor_Name: Vendor_Name,
          Address_1: Address_1,
          Address_2: Address_2,
          City: City,
          Country: Country,
          zipcode: zipcode,
          State_ID: parseInt(State_ID)
        }
      });
      res.json(vendor);
      
    } catch (error) {
      next(error);
    }
  });

//POST add vendor
router.post('/', async (req,res) => {
    const vendorData = {
        Vendor_Name: req.body.Vendor_Name,
        Address_1: req.body.Address_1,
        Address_2: req.body.Address_2,
        City: req.body.City,
        Country: req.body.Country,
        zipcode: req.body.zipcode,
        State_ID: parseInt(req.body.State_ID)
    }
    try{
        const newVendor = await prisma.vendor.create({
            data: vendorData
        })
        res.json(newVendor)
    }
    catch (error){
        res.status(404).json(error)
        console.log(error)
    }
    
})

module.exports = router