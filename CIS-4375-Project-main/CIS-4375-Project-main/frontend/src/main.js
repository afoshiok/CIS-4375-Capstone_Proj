import { createApp } from 'vue'
import './style.css'
import {createRouter, createWebHistory} from 'vue-router'
import VueApexCharts from "vue3-apexcharts";
//Route imports
import Home from './components/Home.vue'
import Vendor from './components/Vendors/Vendor.vue'
import VendorForm from './components/Vendors/VendorForm.vue'
import VendorFormDefault from './components/Vendors/VendorFormDefault.vue'
import CreateVendor from './components/Vendors/CreateVendor.vue'
import Order from './components/Orders/Order.vue'
import Customer from './components/Customers/Customer.vue'
import CustomerForm from './components/Customers/CustomerForm.vue'
import CustomerFormDefault from './components/Customers/CustomerFormDefault.vue'
import CreateCustomer from './components/Customers/CreateCustomer.vue'
import Product from './components/Products/Product.vue'
import ProductForm from './components/Products/ProductForm.vue'
import ProductFormDefault from './components/Products/ProductFormDefault.vue'
import CreateProduct from './components/Products/CreateProduct.vue'
import Supply from './components/Supplies/Supply.vue'
import SupplyFormDefault from './components/Supplies/SupplyFormDefault.vue'
import SupplyForm from './components/Supplies/SupplyForm.vue'
import CreateSupply from './components/Supplies/CreateSupply.vue'
import CreateOrder from './components/Orders/CreateOrder.vue'
import EditOrder from './components/Orders/EditOrder.vue'
import VendorOrder from './components/VendorOrders/VendorOrder.vue'
import VendorOrderDefault from './components/VendorOrders/VendorOrderDefault.vue'
import CreateVendorOrder from './components/VendorOrders/CreateVendorOrder.vue'
import VendorOrderForm from './components/VendorOrders/VendorOrderForm.vue'
//****/
import HelloWorld from './components/HelloWorld.vue'
import App from './App.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: 'Home', component: Home},
        {path: '/VendorOrder', name:'CreateVendorOrder', component: VendorOrder, children: [
            {path: '', name: 'VendorOrderDefault', component: VendorOrderDefault},
            {path: '/VendorOrder/add', component: CreateVendorOrder},
            {path: '/VendorOrder/edit/:id', component: VendorOrderForm}
        ]},
        {path: '/vendor', name:'Vendor', component: Vendor, children: [
            {path: '/vendor/edit/:id', component: VendorForm},
            {path: '', name:'VendorDefault', component: VendorFormDefault},
            {path: '/vendor/add', component:CreateVendor}
        ]},
        {path: '/order', name: 'Order', component: Order},
        {path: '/customer', name: 'Customer', component: Customer, children: [
            {path: '', component: CustomerFormDefault},
            {path: '/customer/edit/:id', component: CustomerForm},
            {path: '/customer/add', component: CreateCustomer}
        ]},
        {path: '/CreateOrder', name:'CreateOrder', component: CreateOrder},
        {path: '/product', component: Product, children:[
            {path: '', component: ProductFormDefault},
            {path:'/product/edit/:id',component: ProductForm},
            {path:'/product/add', component: CreateProduct}
        ]},
        {path: '/EditOrder/:id', name:'EditOrder', component: EditOrder},
        {path: '/supply', name: 'Supply', component: Supply, children: [
            {path:'', component: SupplyFormDefault},
            {path: '/supply/edit/:id', component: SupplyForm},
            {path: '/supply/add', component: CreateSupply}
        ]}
    ]
})

createApp(App)
.use(VueApexCharts)
.use(router)
.mount('#app')
