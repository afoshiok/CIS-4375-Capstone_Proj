var dotenv = require('dotenv')
const { PrismaClient } = require('@prisma/client')
var express = require('express')
var cors = require('cors')




dotenv.config()

const app = express()
const port = process.env.PORT

const prisma = new PrismaClient() //Commented out because I haven't run "prisma generate" yet
app.use(cors(({
    origin: '*'
})))
app.use(express.json())

//Importing routes...
const customer = require('./routes/customer')
const invoice = require('./routes/invoice')
const login = require('./routes/login')
const order = require('./routes/order')
const orderline = require('./routes/orderline')
const product = require('./routes/product')
const productline = require('./routes/productline')
const supply = require('./routes/supply')
const user = require('./routes/user')
const vendor = require('./routes/vendor')
const graph = require('./routes/graph')
const vendorOrder = require('./routes/vendorOrder')
const order_status = require('./routes/orderstatus')
const prod = require('./routes/prod')
const vendorOrderStatus = require('./routes/vendorOrderStatus')
const vendorStatus = require('./routes/vendorstatus')
const states = require('./routes/state')

//Using routes in app...
app.use("/api/customer", customer) //David
app.use("/api/invoice", invoice) //Mustafa
app.use("/api/login", login)
app.use("/api/order", order) //Favour
app.use("/api/orderline", orderline) //Shafin*
app.use("/api/product", product) //Dray
app.use("/api/productline", productline)
app.use("/api/supply", supply) //Zach
app.use("/api/user", user) //Julio
app.use("/api/vendor", vendor) //Zach
app.use("/api/vendorOrder", vendorOrder) //Zach
app.use("/api/graph", graph) //Whole Team
app.use("/api/orderstatus", order_status) //Favour
app.use("/api/prod", prod)
app.use("/api/vendorOrderStatus", vendorOrderStatus)
app.use("/api/vendorStatus", vendorStatus)
app.use("/api/state", states)

//ENDPOINTS GO HERE
/

app.listen(port, () => {
    console.log(`Your API with Prisma + Express is running on port: ${port}`)
})