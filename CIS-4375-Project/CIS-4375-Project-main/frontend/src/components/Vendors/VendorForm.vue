<template>
    <h1 class="card-title text-2xl">Vendor {{ $route.params.id  }}</h1>
    <form class="pt-10 grid grid-row-4" >
        <div class="grid grid-row-2">
            <label class="mb-2 font-bold">Vendor Name</label> 
            <input type="text" name="VendorName" id="VendorName" class="w-1/4 h-10 rounded-sm p-4" v-model="formData.Vendor_Name">
        </div>
        <div class="grid grid-cols-3 gap-2">
            <div class="grid grid-row-2 mt-4">
                <label class="mb-2 font-bold">Address 1</label> 
                <input type="text" name="Address1" id="Address1" class="w-3/4 h-10 rounded-sm p-4" v-model="formData.Address_1">
            </div>
            <div class="grid grid-row-2 mt-4">
                <label class="mb-2 font-bold">City</label> 
                <input type="text" name="City" id="City" class="w-2/4 h-10 rounded-sm p-4" v-model="formData.City">
            </div>
            <!-- GET Request State table, then loop -->
            <div class="grid grid-row-2 mt-4">
                <label class="mb-2 font-bold">State</label> 
                <select name="State" id="VendorName" class="w-1/4 h-10 p-2 rounded-sm" v-model="formData.State_ID">
                    <option v-for="state in states" :value="state.id">{{ state.State_Name }}</option>
                </select>
            </div>
        </div>
        <div class="grid grid-cols-3 gap-2">
            <div class="grid grid-row-2 mt-4">
                <label class="mb-2 font-bold">Address 2</label> 
                <input type="text" name="Address2" id="Address2" class="w-3/4 h-10 rounded-sm p-4" v-model="formData.Address_2">
            </div>
            <div class="grid grid-row-2 mt-4">
                <label class="mb-2 font-bold">Country</label> 
                <input type="text" name="Country" id="Country" class="w-2/4 h-10 rounded-sm p-4" v-model="formData.Country">
            </div>
            <div class="grid grid-row-2 mt-4">
                <label class="mb-2 font-bold">Zip Code</label> 
                <input type="text" name="ZipCode" id="ZipCode" class="w-2/4 h-10 rounded-sm p-4" v-model="formData.zipcode">
            </div>
        </div>
    </form>
    <div class="mt-8 flex flex-row justify-left">
        <button class="btn-lg btn-active w-36 rounded-md mr-4 active:scale-75 transition-transform" @click="editVendor()">Edit Vendor</button>
        <button class="btn-lg btn-error w-40 rounded-md active:scale-75 transition-transform" @click="deleteVendor()">Delete Vendor</button>
    </div>
    <button class="font-bold mt-2 flex justify-left" @click="backtoHome()">Back</button>
</template>

<script setup>
import { ref,  onMounted, onBeforeMount } from 'vue'
import  axios  from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { defineEmits,defineProps } from 'vue';

const route = useRoute()
const router = useRouter()
const vendor_id = ref(route.params.id)
const emits = defineEmits(['remount']);

const formData = ref([])
const states = ref([])


onBeforeMount(() => {
    axios.get('http://localhost:8080' + '/api/state/')
    .then((response) => {
        states.value = response.data
    })
})  

onMounted(async () => {
    axios.get('http://localhost:8080' + `/api/vendor/${ vendor_id.value }`)
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


function editVendor() {
    axios.put('http://localhost:8080' + `/api/vendor/${ vendor_id.value }`, formData.value)
    .then((response) => {
        if(confirm('Are you sure you want to update this Vendor?')){
            console.log("Vendor successfully updated")
            router.go(0)
            router.push('/vendor')
        } else {
            console.log("User cancelled update.")
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

function deleteVendor() {
    axios.delete('http://localhost:8080' + `/api/vendor/${ vendor_id.value }`)
    .then((response) => {
        if(confirm('Are you sure you want to delete this Vendor?')){
            console.log("Vendor successfully delete")
            remountParent()
            router.go(0)
        } else {
            console.log("User cancelled delete.")
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

function backtoHome() {
    router.push('/vendor')
}

function remountParent() {
  emits('remount', props.count++);
}
</script>