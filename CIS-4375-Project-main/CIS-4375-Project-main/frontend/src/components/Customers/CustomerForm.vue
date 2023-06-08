<template>
    <h1 class="card-title text-2xl">Customer {{ $route.params.id }}</h1>
    <form class="pt-10 grid grid-row-4 gap-3">
        <div class="grid grid-cols-2">
            <div class="grid grid-row-2">
                <label class="mb-2 font-bold">First Name</label> 
                <input type="text" name="CustFirstName" id="CustFirstName" class="w-2/4 h-10 rounded-sm p-4" v-model="formData.Customer_Fname">
            </div>
            <div class="grid grid-row-2">
                <label class="mb-2 font-bold">Last Name</label> 
                <input type="text" name="CustLastName" id="CustLastName" class="w-2/4 h-10 rounded-sm p-4" v-model="formData.Customer_Lname">
            </div>
        </div>
        <div class="grid grid-cols-2">
            <div class="grid grid-row-2">
                <label class="mb-2 font-bold">Phone Number</label> 
                <input type="text" name="PhoneNumber" id="PhoneNumber" class="w-1/4 h-10 rounded-sm p-4" v-model="formData.Customer_Phone">
            </div>
            <div class="grid grid-row-2">
                <label class="mb-2 font-bold">Email</label> 
                <input type="text" name="Email" id="Email" class="w-2/4 h-10 rounded-sm p-4" v-model="formData.Customer_Email">
            </div>
        </div>
    </form>
    <div class="mt-8 flex flex-row justify-left">
        <button class="btn-lg btn-active w-36 rounded-md mr-4 active:scale-75 transition-transform" @click="editCustomer()">Edit Customer</button>
        <button class="btn-lg btn-error w-40 rounded-md active:scale-75 transition-transform" @click="deleteCustomer()">Delete Customer</button>
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
const customer_id = ref(route.params.id)
const emits = defineEmits(['remount']);

const formData = ref([])

onMounted(async () => {
    axios.get('http://localhost:8080' + `/api/customer/${ customer_id.value }`)
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


function editCustomer() {
    axios.put('http://localhost:8080' + `/api/customer/${ customer_id.value }`, formData.value)
    .then((response) => {
        if(confirm('Are you sure you want to update this Customer?')){
            console.log("Customer successfully updated")
            router.go(0)
        } else {
            console.log('User cancelled request.')
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

function deleteCustomer() {
    axios.delete('http://localhost:8080' + `/api/customer/${ customer_id.value }`)
    .then((response) => {
        if(confirm('Are you sure you want to delete this Customer?')){
            console.log("Customer successfully delete")
            router.go(0)
        } else {
            console.log('User cancelled delete')
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

function backtoHome() {
    router.push('/customer')
}

function remountParent() {
  emits('remount', props.count++);
}
</script>