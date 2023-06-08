const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { json } = require("express");
const prisma = new PrismaClient()

router.get('/', async (req,res) => {
    try{
        const getStates = await prisma.state.findMany()
        res.json(getStates)
    } catch (error) {
        res.status(404).json('An error has occured check console for more information')
    }
    
})

module.exports = router