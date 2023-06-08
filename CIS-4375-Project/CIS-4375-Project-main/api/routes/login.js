const express = require("express")
const router = express.Router()

//example use case **REMOVE WHEN YOU START WORKING**
router.get("/example", (req,res) => {
    res.send("This is router link: localhost:8080/login/example")
})

module.exports = router