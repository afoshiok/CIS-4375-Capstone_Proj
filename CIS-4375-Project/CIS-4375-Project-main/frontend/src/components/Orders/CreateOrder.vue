<template>
    <div class="card rounded-none min-h-[23vh] p-4 bg-slate-600 mt-8 overflow-x-auto">
        <h1 class="card-title text-2xl">Create Order</h1>
        <form class="pt-10 grid grid-row-4" >
            <div class="grid grid-cols-2">
                <div class="grid grid-row-2 w-2/4">
                    <label class="mb-2 font-bold">Customer</label> 
                    <select type="text" name="CustName" id="CustName" class="max-h-12 overflow-y-auto rounded-sm px-4" v-model="cust_id">
                        <!-- GET Request, then loop (value = customer ID / inner tag = customer f_name + l_name) -->
                        <option value="" selected> Select Customer</option>
                        <option v-for="customer in custData" :value="customer.id">{{ customer.Customer_Fname + ' ' + customer.Customer_Lname }}</option>
                    </select>
                </div>
                <div class="grid grid-row-2 w-1/4 ">
                    <label class="mb-2 font-bold">Employee</label> 
                    <select type="text" name="EmployeeName" id="EmployeeName" class="h-12 rounded-sm px-4" v-model="user_id">
                        <!-- GET Request, then loop (value = user ID / inner tag = user name) -->
                        <option selected> Select Employee</option>
                        <option v-for="employee in userData" :value="employee.id">{{ employee.User_Fname + ' ' + employee.User_Lname }}</option>
                    </select>
                </div>
            </div>
        </form>
    </div>
    <div class="card rounded-none min-h-[25vh] p-4 bg-slate-600 mt-8 overflow-x-auto" >
        <h1 class="card-title text-2xl">Order Line</h1>
        <section class="pt-10 grid grid-row-4" >
            <div v-for="(form, index) in forms" :key="index" class="grid grid-cols-3 bg-slate-700 p-4">
                <div class="grid grid-row-2 w-2/4">
                    <label class="mb-2 font-bold">Product</label> 
                    <select  v-model="form.Product" class="h-12 rounded-sm px-4">
                        <!-- GET Request, then loop (value = Product ID / inner tag = product name) -->
                        <option v-for="product in productData" :value="product.id">{{ product.Product_name }}</option>
                    </select>
                </div>
                <div class="grid grid-row-2 w-1/4 ">
                    <label class="mb-2 font-bold">Quantity</label> 
                    <input v-model="form.quantity" type="number" minimum= 0 class="p-4">
                </div>
                
            </div>
        <button class="px-4 font-bold" @click="addForm()">Add product</button>
        <button class="px-4 font-bold" @click="removeItem()">Remove product</button>
        </section>
        <button class=" bg-emerald-500 text-white btn-lg mt-4 rounded-md" @click="createOrder()">Add Order</button>

    </div>

</template>

<script setup>
import { ref, watch, onBeforeMount, reactive } from 'vue';
import  axios  from 'axios'
import { useRoute, useRouter } from 'vue-router'

const forms = ref([]);
const productData = ref([])
const custData = ref([])
const userData = ref([])

//customer form
const router = useRouter()
const cust_id = ref(0)
const user_id = ref(0)



let index = 0;
onBeforeMount(() => {
    axios.get('http://localhost:8080' + '/api/product/')
    .then((response) => {
        productData.value = response.data
    })

    axios.get('http://localhost:8080' + '/api/customer/')
    .then((response) => {
        custData.value = response.data
    })

    axios.get('http://localhost:8080' + '/api/user/')
    .then((response) => {
        userData.value = response.data
    })
    
})
function addForm() {
    index++
    forms.value.push({});
}

function removeItem(index) {
  forms.value.splice(index, 1);
}

function createOrder() {
    const custform = {
    User_ID : user_id.value,
    Customer_ID : cust_id.value
    }
    // console.log(custform)
    axios.post('http://localhost:8080' + '/api/order/', custform )
    .then((response) => {
        console.log(response.data)
        forms.value.forEach((index) => {
            axios.post('http://localhost:8080' + '/api/orderline/', {
                Order_ID: response.data.id,
                Product_ID: index.Product,
                Product_qty: index.quantity
            })
        })
    })
    .then(() => {
        router.push('/order')
        
    })
    .catch((error) =>{
        console.log(error)
    })
}
watch(forms, () => console.log(`${forms.value}`))
</script>