<template>
    <h1 class="card-title text-2xl">Create Product</h1>
    <form class="pt-10 grid grid-row-4">
        <div class="grid grid-row-2">
            <label class="mb-2 font-bold">Product Name</label> 
            <input type="text" name="ProductName" id="ProductName" class="w-1/4 h-10 rounded-sm p-4" v-model="formProduct_name">
        </div>
        <div class="grid grid-cols-2 gap-2">
            <div class="grid grid-row-2 mt-4">
                <label class="mb-2 font-bold">Product Price</label> 
                <input type="text" name="ProductPrice" id="ProductPrice" class="w-1/4 h-10 rounded-sm p-4" v-model="formProduct_price">
            </div>
            <div class="grid grid-row-2 mt-4">
                <label class="mb-2 font-bold">Quanity</label> 
                <input type="number" name="Quantity" id="Quantity" class="w-1/4 h-10 rounded-sm p-4" v-model="formQuantity">
            </div>
        </div>
    </form>
    <div class="mt-8 flex flex-row justify-left">
        <button class="btn-lg bg-green-400 text-slate-600 w-40 rounded-md active:scale-75 transition-transform" @click="addProduct()">Add Product</button>
    </div>
    <button class="font-bold mt-2 flex justify-left" @click="backtoHome()">Back</button>
</template>

<script setup>
import { ref,  onMounted, watch } from 'vue'
import  axios  from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const product_id = ref(route.params.id)

const formData = ref([])
const formProduct_name = ref('')
const formProduct_price = ref('')
const formQuantity = ref('')


//methods


function addProduct() {
    const data = {
          Product_name: formProduct_name.value,
          Product_price: parseInt(formProduct_price.value),
          Quantity: formQuantity.value
        }
    formData.value = data
    axios.post('http://localhost:8080' + `/api/product/`, formData.value)
    .then(() => {
        console.log("Product successfully added")
        router.go(0)
    })
    .catch((error) => {
        console.log(error)
    })
}

function backtoHome() {
    router.push('/product')
}
</script>