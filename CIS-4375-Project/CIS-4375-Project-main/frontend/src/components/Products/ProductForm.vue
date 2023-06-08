<template>
    <h1 class="card-title text-2xl">Product {{ $route.params.id  }}</h1>
    <form class="pt-10 grid grid-row-4">
        <div class="grid grid-row-2">
            <label class="mb-2 font-bold">Product Name</label> 
            <input type="text" name="ProductName" id="ProductName" class="w-1/4 h-10 rounded-sm" v-model="formData.Product_name">
        </div>
        <div class="grid grid-cols-2 gap-2">
            <div class="grid grid-row-2 mt-4">
                <label class="mb-2 font-bold">Product Price</label> 
                <input type="text" name="ProductPrice" id="ProductPrice" class="w-1/4 h-10 rounded-sm" v-model="formData.Product_price">
            </div>
            <div class="grid grid-row-2 mt-4">
                <!-- Disable for edit bc the Quanity is determinant on  -->
                <label class="mb-2 font-bold">Quanity</label> 
                <input type="number" name="Quantity" id="Quantity" class="w-1/4 h-10 rounded-sm" v-model="formData.Quantity">
            </div>
        </div>
    </form>
    <div class="mt-8 flex flex-row justify-left">
        <button class="btn-lg btn-active w-36 rounded-md mr-4 active:scale-75 transition-transform" @click="editProduct()">Edit Product</button>
        <button class="btn-lg btn-error w-40 rounded-md active:scale-75 transition-transform" @click="deleteProduct()">Delete Product</button>
    </div>
    <button class="font-bold mt-2 flex justify-left" @click="backtoHome()">Back</button>
    <div class="card rounded-none min-h-[25vh] p-4 bg-slate-600 mt-8 overflow-x-auto">
    <h1 class="card-title text-2xl pb-4">Existing Productline</h1>
            <!-- Orderlines already in the order -->
            <div v-for="ol in existingProductline" class="grid grid-cols-3 bg-slate-700 p-4">
                <div class="grid grid-row-3 w-2/4">
                    <label class="mb-2 font-bold">Supply</label> 
                    <select  v-model="ol.Supply_ID" class="h-12 rounded-sm px-4">
                        <!-- GET Request, then loop (value = Product ID / inner tag = product name) -->
                        <option v-for="supply in supplyData" :value="supply.id" :selected="supply.id === ol.Supply_ID">{{ supply.Supply_name }}</option>
                    </select>
                </div>
                <div class="flex items-center">
                    <button class="ml-4 btn-error btn-xs" @click="deleteExistingOl(ol.id)">Delete</button> 
                </div>
            </div>     
            </div>
    <div class="card rounded-none min-h-[25vh] p-4 bg-slate-600 mt-8 overflow-x-auto">
    <h1 class="card-title text-2xl">Product Line {{ index }}</h1>
    <section class="pt-10 grid grid-row-4">
        <div v-for="(form, index) in forms" :key="index" class="grid grid-cols-3 bg-slate-700 p-4">
            <div class="grid grid-row-2 w-2/4">
                <label class="mb-2 font-bold">Product</label>
                <select v-model="form.Supply" class="h-12 rounded-sm px-4">
                    <!-- GET Request, then loop (value = Product ID / inner tag = product name) -->
                    <option v-for="supply in supplyData" :value="supply.id">{{ supply.Supply_name }}</option>
                </select>
            </div>
        </div>
        <button class="px-4 font-bold" @click="addForm()">Add Supply</button>
        <button class="px-4 font-bold" @click="removeItem()">Remove Supply</button>
    </section>
    <button class="btn-lg btn-active bg-green-400 text-slate-600  " @click="createProductline()">Add Product line</button>

</div>


</template>

<script setup>
import { ref,  onMounted } from 'vue'
import  axios  from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { defineEmits,defineProps } from 'vue';

const forms = ref([]);
const route = useRoute()
const router = useRouter()
const product_id = ref(route.params.id)
const emits = defineEmits(['remount']);
const supplyData = ref([])
const existingProductline = ref([])
const supply_id = ref(0)

const formData = ref([])

let index = 0;
onMounted(async () => {
    axios.get('http://localhost:8080' + `/api/product/${ product_id.value }`)
    .then((response) => {
        formData.value =  response.data
    })
    .catch((error) => {
        console.log(error)
    })
    axios.get('http://localhost:8080' + '/api/supply/')
    .then((response) => {
        supplyData.value =  response.data
        console.log(supplyData.value)
    })
    .catch((error) => {
        console.log(error)
    })
    axios.get('http://localhost:8080' + `/api/prod/${ product_id.value }`)
    .then((response) => {
        existingProductline.value =  response.data
        console.log(formData.value)
    })
    .catch((error) => {
        console.log(error)
    })
})

function addForm() {
    index++
    forms.value.push({});
}

function removeItem(index) {
  forms.value.splice(index, 1);
}

const props = defineProps({
  count: {
    type: Number,
    required: false,
  },
});

//methods


function editProduct() {
    axios.put('http://localhost:8080' + `/api/product/${ product_id.value }`, formData.value)
    .then((response) => {
        if(confirm('Are you sure you want to update this Product?')){
            console.log("Product successfully updated")
            router.go(0)
        } else {
            console.log('User cancelled request')
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

function deleteProduct() {
    axios.delete('http://localhost:8080' + `/api/product/${ product_id.value }`)
    .then((response) => {
        if(confirm('Are you sure you want to delete this Product?')){
            console.log("Product successfully delete")
            remountParent()
            router.push('/product')
        } else {
            console.log('User cancelled request')
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

function deleteExistingOl(olID) {
    if(confirm("Are you sure you want to delete this orderline, action cannot be reverted?")) {
        axios.delete('http://localhost:8080' + `/api/productline/${olID}`)
            .then((response) => {
                console.log(response)
                router.go(0)
            })
            .then(() => {
                editOrder()
            })
    } else {
        console.log('User cancelled request.')
    }
}

function backtoHome() {
    router.push('/product')
}

function remountParent() {
  emits('remount', props.count++);
}

// function createProductline() {
//     const productlineform = {
//     Product_ID : product_id.value,
//     Supply_ID : supply_id.value
//     }
//     // console.log(custform)
//     forms.value.forEach((index) => {
//         axios.post('http://localhost:8080' + '/api/productline/', productlineform )
//     })
//     .catch((error) =>{
//         console.log(error)
//     })
// }

async function createProductline() {
    for (let i = 0; i < forms.value.length; i++) {
        const supplyId = forms.value[i].Supply;
        const data = {Product_ID: parseInt(product_id.value), Supply_ID: supplyId};
        console.log(data)
        try {
            const response = await axios.post('http://localhost:8080'+'/api/productline/', data);
            console.log(response);
            router.go(0)
        } catch (error) {
            console.error(error);
        }
    }
}
</script>