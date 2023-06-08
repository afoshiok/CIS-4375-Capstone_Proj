<template>
    <h1 class="card-title text-2xl">Add Supply</h1>
    <form class="pt-10 grid grid-row-2 gap-4">
        <div class="grid grid-row-2">
            <label class="mb-2 font-bold">Supply Name</label> 
            <input type="text" name="SupplyName" id="SupplyName" class="w-1/4 p-4 h-10 rounded-sm" v-model="formSupply_name">
        </div>
        <div class="grid grid-row-2">
            <label class="mb-2 font-bold">Supply Quantity</label> 
            <input type="number" name="SupplyQty" id="SupplyQty" class="w-1/12 p-4 h-10 rounded-sm" v-model="formQuantity">
        </div>
    </form>
    <div class="mt-8 flex flex-row justify-left">
        <button class="btn-lg bg-green-400 text-slate-600 w-40 rounded-md active:scale-75 transition-transform" @click="addSupply()">Add Supply</button>
    </div>
    <button class="font-bold mt-2 flex justify-left" @click="backtoHome()">Back</button>
</template>

<script setup>
import { ref,  onMounted, watch } from 'vue'
import  axios  from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const supply_id = ref(route.params.id)

const formData = ref([])
const formSupply_name = ref('')
const formQuantity = ref('')


//methods


function addSupply() {
    const data = {
          Supply_name: formSupply_name.value,
          Quantity: formQuantity.value
        }
    formData.value = data
    axios.post('http://localhost:8080' + `/api/supply/`, formData.value)
    .then(() => {
        console.log("Supply successfully added")
        router.go(0)
    })
    .catch((error) => {
        console.log(error)
    })
}

function backtoHome() {
    router.push('/supply')
}
</script>