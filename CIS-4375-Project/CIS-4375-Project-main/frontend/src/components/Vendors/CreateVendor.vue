<template>
    <h1 class="card-title text-2xl">Add Vendor</h1>
    <form class="pt-10 grid grid-row-4" >
        <div class="grid grid-row-2">
            <label class="mb-2 font-bold">Vendor Name</label> 
            <input type="text" name="VendorName" id="VendorName" class="w-1/4 h-10 rounded-sm p-4" v-model="formVendor_Name">
        </div>
        <div class="grid grid-cols-3 gap-2">
            <div class="grid grid-row-2 mt-4">
                <label class="mb-2 font-bold">Address 1</label> 
                <input type="text" name="Address1" id="Address1" class="w-3/4 h-10 rounded-sm p-4" v-model="formAddress_1">
            </div>
            <div class="grid grid-row-2 mt-4">
                <label class="mb-2 font-bold">City</label> 
                <input type="text" name="City" id="City" class="w-2/4 h-10 rounded-sm p-4" v-model="formCity">
            </div>
            <!-- GET Request State table, then loop -->
            <div class="grid grid-row-2 mt-4">
                <label class="mb-2 font-bold">State</label> 
                <select name="State" id="VendorName" class="w-1/4 h-10 p-2 rounded-sm" v-model="formState_ID">
                    <option v-for="state in states" :value="state.id">{{ state.State_Name }}</option>
                </select>
            </div>
        </div>
        <div class="grid grid-cols-3 gap-2">
            <div class="grid grid-row-2 mt-4">
                <label class="mb-2 font-bold">Address 2</label> 
                <input type="text" name="Address2" id="Address2" class="w-3/4 h-10 rounded-sm p-4" v-model="formAddress_2">
            </div>
            <div class="grid grid-row-2 mt-4">
                <label class="mb-2 font-bold">Country</label> 
                <input type="text" name="Country" id="Country" class="w-2/4 h-10 rounded-sm p-4" v-model="formCountry">
            </div>
            <div class="grid grid-row-2 mt-4">
                <label class="mb-2 font-bold">Zip Code</label> 
                <input type="text" name="ZipCode" id="ZipCode" class="w-2/4 h-10 rounded-sm p-4" v-model="formzipcode">
            </div>
        </div>
    </form>
    <div class="mt-8 flex flex-row justify-left">
        <button class="btn-lg bg-green-400 text-slate-600 w-40 rounded-md active:scale-75 transition-transform" @click="addVendor()">Add Vendor</button>
    </div>
    <button class="font-bold mt-2 flex justify-left" @click="backtoHome()">Back</button>
</template>

<script setup>
import { ref,  onBeforeMount, watch } from 'vue'
import  axios  from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const vendor_id = ref(route.params.id)

const formData = ref([])
const states = ref([])
const formVendor_Name = ref('')
const formAddress_1 = ref('')
const formAddress_2 = ref('')
const formCity = ref('')
const formCountry = ref('')
const formzipcode = ref('')
const formState_ID = ref(0)


onBeforeMount(() => {
    axios.get('http://localhost:8080' + '/api/state/')
    .then((response) => {
        states.value = response.data
    })
})    


watch(formState_ID, () => console.log(`${formState_ID.value}, ${typeof formState_ID.value}`))

//methods

function backtoHome() {
    router.push('/vendor')
}

function addVendor() {
    const data = {
          Vendor_Name: formVendor_Name.value,
          Address_1: formAddress_1.value,
          Address_2: formAddress_2.value,
          City: formCity.value,
          Country: formCountry.value,
          zipcode: parseInt(formzipcode.value),
          State_ID: formState_ID.value
        }
    formData.value = data
    axios.post('http://localhost:8080' + `/api/vendor/`, formData.value)
    .then((response) => {
        confirm('Are you sure you want to add this Vendor?') 
    })
    .then(() => {
        console.log("Vendor successfully added")
        router.go(0)
    })
    .catch((error) => {
        console.log(error)
    })
}
</script>