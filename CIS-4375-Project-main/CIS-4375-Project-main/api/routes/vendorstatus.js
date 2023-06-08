const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get("/", async (req,res) => {
    const allVendorStatus = await prisma.vendor_Status.findMany()
    res.json(allVendorStatus)
})

module.exports = router
