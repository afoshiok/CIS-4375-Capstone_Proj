<template>
    <h1 class="card-title text-2xl">Supply {{ $route.params.id  }}</h1>
    <form class="pt-10 grid grid-row-2 gap-4">
        <div class="grid grid-row-2">
            <label class="mb-2 font-bold">Supply Name</label> 
            <input type="text" name="SupplyName" id="SupplyName" class="w-1/4 p-4 h-10 rounded-sm" v-model="formData.Supply_name">
        </div>
        <div class="grid grid-row-2">
            <label class="mb-2 font-bold">Supply Quantity</label> 
            <input type="number" name="SupplyQty" id="SupplyQty" class="w-1/12 p-4 h-10 rounded-sm" v-model="formData.Quantity">
        </div>
    </form>
    <div class="mt-8 flex flex-row justify-left">
        <button class="btn-lg btn-active w-36 rounded-md mr-4 active:scale-75 transition-transform" @click="editSupply()">Edit Supply</button>
        <button class="btn-lg btn-error w-40 rounded-md active:scale-75 transition-transform" @click="deleteSupply()">Delete Supply</button>
    </div>
    <button class="font-bold mt-2 flex justify-left" @click="backtoHome()">Back</button>
</template>

<script setup>
import { ref,  onMounted } from 'vue'
import  axios  from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { defineEmits,defineProps } from 'vue';

const route = useRoute()
const router = useRouter()
const supply_id = ref(route.params.id)
const emits = defineEmits(['remount']);

const formData = ref([])

onMounted(async () => {
    axios.get('http://localhost:8080' + `/api/supply/${ supply_id.value }`)
    .then((response) => {
        formData.value =  response.data
        console.log(formData.value)
    })
    .catch((error) => {
        console.log(error)
    })
})

const props = defineProps({
  count: {
    type: Number,
    required: false,
  },
});


//methods


function editSupply() {
    axios.put('http://localhost:8080' + `/api/supply/${ supply_id.value }`, formData.value)
    .then((response) => {
        if(confirm('Are you sure you want to update this Supply?')){
            console.log("Supply successfully updated")
            router.go(0)
        } else {
            console.log('User cancelled request')
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

function deleteSupply() {
    axios.delete('http://localhost:8080' + `/api/supply/${ supply_id.value }`)
    .then((response) => {
        if(confirm('Are you sure you want to delete this Supply?')){
            console.log("Supply successfully delete")
            remountParent()
            router.push('/supply')
        } else {
            console.log('User cancelled request')
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

function backtoHome() {
    router.push('/supply')
}

function remountParent() {
  emits('remount', props.count++);
}
</script>