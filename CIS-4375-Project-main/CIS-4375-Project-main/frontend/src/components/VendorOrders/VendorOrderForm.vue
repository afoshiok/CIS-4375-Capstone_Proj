<template>
    <h1 class="card-title text-2xl">Vendor Order {{ $route.params.id  }}</h1>
    <form class="pt-10 grid grid-row-auto">
        <div class="grid grid-row-2">
            <label class="mb-2 font-bold">Supply Name</label>
            <select v-model="supply_id" class="h-12 rounded-sm px-4">
            <option v-for="supply in supplyData" :value="supply.id" :selected="supply.id === formData.Supply_ID">{{ supply.Supply_name }}</option>
            </select>
        </div>
        <div class="grid grid-cols-2 mt-4">
            <div class="grid grid-row-2">
                <label class="mb-2 font-bold">Vendor Order Quantity</label>
                <input type="number" name="SupplyQty" id="SupplyQty" class="w-1/2 p-4 h-10 rounded-sm" v-model="vendorOrder_qty">
            </div>
            <div class="grid grid-row-2">
                <label class="mb-2 font-bold">Order Cost</label>
                <input type="number" name="SupplyQty" id="SupplyQty" class="w-1/2 p-4 h-10 rounded-sm" v-model="vendorOrderCost">
            </div>
        </div>
        <div class="grid grid-cols-2 mt-4">
            <div class="grid grid-row-2 ">
                <label class="mb-2 font-bold">Vendor</label>
                <select v-model="vendor_id" class="h-12 rounded-sm px-4 w-2/3">
                <option v-for="vendor in vendorData" :value="vendor.id" :selected="vendor.id === vendorData.id">{{vendor.Vendor_Name }}</option>
                </select>
            </div>

            <div class="grid grid-row-2">
                <label class="mb-2 font-bold">Vendor Status</label>
                <select v-model="vendor_status_id" class="h-12 rounded-sm px-4 w-1/3">
                <option v-for="status in vendor_statusData" :value="status.id" :selected="status.id === vendor_status_id">{{status.Status_name }}</option>
                </select>
            </div>
        </div>
        <div class="grid grid-row-2 w-1/4 mt-4"  >
            <label class="mb-2 font-bold">Order Date</label>
            <input type="datetime-local" step="1"  class="h-12 rounded-sm px-4" v-model="orderDate">
        </div>
        <div class="grid grid-row-2 w-1/4 mt-4" v-if="vendor_status_id == 3">
                <label class="mb-2 font-bold">Completion Date</label>
                <input type="datetime-local" step="1"  class="h-12 rounded-sm px-4" v-model="orderCompletionDate">
        </div>
        
    </form>
    <div class="mt-8 flex flex-row justify-left">
        <button class="btn-lg btn-active w-36 rounded-md mr-4 active:scale-75 transition-transform" @click="editVendorOrder()">Edit Supply</button>
        <button class="btn-lg btn-error w-40 rounded-md active:scale-75 transition-transform" @click="deleteVendorOrder()" >Delete Supply</button>
    </div>
    <button class="font-bold mt-2 flex justify-left" @click="backtoHome()">Back</button>
</template>

<script setup>
import { ref,  onMounted, onBeforeMount } from 'vue'
import  axios  from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const vendorOrder_id = ref(route.params.id)
const supplyData = ref([])
const formData = ref([])
const vendorData = ref([])
const vendor_statusData = ref([])

//formdata
const supply_id = ref(0)
const vendorOrder_qty = ref(0)
const vendorOrderCost = ref(0)
const vendor_id = ref(0)
const vendor_status_id = ref(0)
const orderCompletionDate = ref('')
const orderDate = ref('')

function formattedDate(Orderdate) {  
      const date = new Date(Orderdate);
      if (isNaN(date)) {
        // Handle invalid date string here
        console.error('Invalid date string:', date);
        return '';
  }
      return date.toISOString().slice(0, 16);
}

onBeforeMount(async () => {
    axios.get('http://localhost:8080' + '/api/supply/')
    .then((response) => {
        supplyData.value = response.data
    })

    axios.get('http://localhost:8080' + '/api/vendor/')
    .then((response) => {
        vendorData.value = response.data
        console.log(response.data)
    })

    axios.get('http://localhost:8080' + '/api/vendorStatus/')
    .then((response) => {
        vendor_statusData.value = response.data
        console.log(vendor_statusData.value)
    })


    axios.get('http://localhost:8080' + `/api/vendorOrder/${ vendorOrder_id.value }`)
    .then((response) => {
        formData.value = response.data
        supply_id.value = response.data.Supply_ID
        vendorOrder_qty.value = response.data.Vendor_Order_Quantity
        vendorOrderCost.value = response.data.Order_Cost
        vendor_id.value = response.data.Vendor_ID
        vendor_status_id.value = response.data.vendor_status_id.id
        orderCompletionDate.value = formattedDate(response.data.Vendor_Order_CompletionDate)
        orderDate.value = formattedDate(response.data.Vendor_Order_Date)
        console.log(formData.value)
    })
    .catch((error) => {
        console.log(error)
    })
})

function editVendorOrder(params) {
    const changeForm = {
        Supply_ID: supply_id.value,
        Vendor_Order_Quantity: vendorOrder_qty.value,
        Order_Cost: vendorOrderCost.value,
        Vendor_Order_Date: new Date(orderDate.value).toISOString(),
        Unit_ID: 1,
        Vendor_ID: vendor_id.value,
        Vendor_Order_CompletionDate: new Date(orderCompletionDate.value).toISOString(),
        Vendor_status_ID: vendor_status_id.value
    }
    if(confirm('Are you sure you want to edit this Vendor Order?')){
        axios.put('http://localhost:8080' + `/api/vendorOrder/${vendorOrder_id.value}`, changeForm)
        .then(() => {
            console.log("Vendor Order has been succesfully updated")
            router.go(0)
        })
        .catch((error) => {
            console.log(error)
        })
        
    } else {
        console.log('User cancelled request.')
    }
    
}

function deleteVendorOrder() {
    if(confirm('Are you sure you want to delete this Vendor Order? Actions cannot be reverted.')) {
        axios.delete('http://localhost:8080' + `/api/vendorOrder/${vendorOrder_id.value}`)
        .then(() => {
            console.log("Vendor Order has been successfully deleted.")
            router.go(0)
        }).catch((error) => {
            console.log(error)
        })
    } else {
        console.log('User cancelled request.')
    }
}



function backtoHome() {
    router.push('/VendorOrder')
}
</script>