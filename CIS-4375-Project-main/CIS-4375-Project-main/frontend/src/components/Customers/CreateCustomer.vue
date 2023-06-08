<template>
    <h1 class="card-title text-2xl">Add Customer</h1>
    <form class="pt-10 grid grid-row-4 gap-3">
        <div class="grid grid-cols-2">
            <div class="grid grid-row-2">
                <label class="mb-2 font-bold">First Name</label> 
                <input type="text" name="CustFirstName" id="CustFirstName" class="w-2/4 h-10 rounded-sm p-4" v-model="formCustomer_Fname">
            </div>
            <div class="grid grid-row-2">
                <label class="mb-2 font-bold">Last Name</label> 
                <input type="text" name="CustLastName" id="CustLastName" class="w-2/4 h-10 rounded-sm p-4" v-model="formCustomer_Lname">
            </div>
        </div>
        <div class="grid grid-cols-2">
            <div class="grid grid-row-2">
                <label class="mb-2 font-bold">Phone Number</label> 
                <input type="text" name="PhoneNumber" id="PhoneNumber" class="w-1/4 h-10 rounded-sm p-4" v-model="formCustomer_Phone">
            </div>
            <div class="grid grid-row-2">
                <label class="mb-2 font-bold">Email</label> 
                <input type="text" name="Email" id="Email" class="w-2/4 h-10 rounded-sm p-4" v-model="formCustomer_Email">
            </div>
        </div>
    </form>
    <div class="mt-8 flex flex-row justify-left">
        <button class="btn-lg btn-active bg-green-400 text-slate-600 w-36 rounded-md mr-4 active:scale-75 transition-transform" @click="addCustomer()">Add Customer</button>
    </div>
    <button class="font-bold mt-2 flex justify-left" @click="backtoHome()">Back</button>
</template>

<script setup>
import { ref,  onMounted, watch } from 'vue'
import  axios  from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const customer_id = ref(route.params.id)

const formData = ref([])
const formCustomer_Fname = ref('')
const formCustomer_Lname = ref('')
const formCustomer_Phone = ref('')
const formCustomer_Email= ref('')


//methods


function addCustomer() {
    const data = {
          Customer_Fname: formCustomer_Fname.value,
          Customer_Lname: formCustomer_Lname.value,
          Customer_Phone: formCustomer_Phone.value,
          Customer_Email: formCustomer_Email.value
        }
    formData.value = data
    axios.post('http://localhost:8080' + `/api/customer/`, formData.value)
    .then((response) => {
        if(confirm('Are you sure you want to add this Customer?')){
            console.log("Customer successfully added")
            router.go(0)
        } else{
            console.log('User cancelled update')
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

function backtoHome() {
    router.push('/customer')
}
</script>