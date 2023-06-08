<template>
    <div class="card rounded-none max-h-[45vh] p-4 bg-slate-600 mt-8">
        <div class="grid grid-cols-3 gap-4">
            <h1 class="card-title text-3xl text-white p-4">Vendor Orders</h1>
            <div class="col-start-3 p-4 grid justify-items-end">
                <div class="form-control">
                    <div class="input-group">
                        <input type="text" placeholder="Search…" class="input input-bordered" v-model="formSearch">
                        <button class="btn btn-square"  @click="searchVendorOrder()">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
<div class="overflow-x-hidden">
    <table class="table w-full">
            <!-- head -->
            <thead>
            <tr>
                <th>ID</th>
                <th>Supply Name</th>
                <th>Quantity</th>
                <th>Order Cost</th>
                <th>Vendor Name</th>
                <th>
                    
                    <select name="Status" id="Status_name" class="select select-warning text-center w-1/2 max-w-xs" v-model="formStatus">
                    <option disabled selected>Status</option>
                        <option value = 1>Not Started</option>
                        <option value = 2>In Progress</option>
                        <option value = 3>Complete</option>
                        <option value = 4>Incomplete</option>
                    </select>
                    <button class="ml-4 btn btn-xs" @click="statusFilter()">Filter</button>
                    <button class="ml-4 btn btn-xs bg-red-500" @click="clearFilter()">X</button>
                </th>
                <th>Completion Date</th>
            </tr>
            </thead>
            <!-- This will be a v-for loop -->
            <tbody>
            <!-- row 1 -->
            <tr class="hover" v-for="item in vendorOrderTableData">
                <th>{{ item.id }}</th>
                <td class="font-bold"><RouterLink :to="`/VendorOrder/edit/${item.id}`">{{ item.supply_id.Supply_name }}</RouterLink></td>
                <td>{{ item.Vendor_Order_Quantity }}</td>
                <td>${{ item.Order_Cost }}</td>
                <td>{{ item.vendor_id.Vendor_Name }}</td>
                <td><div :class="badgeClass(item.vendor_status_id.Status_name)">{{ item.vendor_status_id.Status_name }}</div></td>
                <td>{{ (item.vendor_status_id.Status_name == 'Complete') ? new Date(item.Vendor_Order_CompletionDate).toLocaleString('en-US', {  }) : 'Not Complete' }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>

<section class="card rounded-none min-h-[45vh] p-4 bg-slate-600 mt-8 overflow-x-auto" :key="componentkey">
        <RouterView></RouterView>
</section>
</template>

<script setup>
import { ref, onBeforeMount, watch } from 'vue';
import  axios  from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const data = ref([])
const vendorOrderTableData = ref([])
const formStatus = ref('')
const formSearch = ref('')
const componentkey = ref(0)

onBeforeMount(() => {
    axios.get('http://localhost:8080' + '/api/vendororder/')
    .then((response) => {
        vendorOrderTableData.value = response.data
        console.log(vendorOrderTableData)
    })
    .catch((error) => {
        console.log(error)
    })

})

function statusFilter(){
    const statusQuery = formStatus.value
    axios.get('http://localhost:8080' + `/api/vendorOrderStatus/${statusQuery}`)
    .then((response) => {
      vendorOrderTableData.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

function clearFilter() {
    axios.get('http://localhost:8080' + '/api/vendororder/')
    .then((response) => {
        vendorOrderTableData.value = response.data
        formStatus.value = null
    })
    .catch((error) => {
        console.log(error)
    })
}

function badgeClass(statusName) {
    if (statusName === 'In Progress'){
        return 'badge badge-warning';
    } else if (statusName === 'Complete'){
        return 'badge badge-success';
    } else if (statusName === 'Incomplete'){
        return 'badge badge-warning'
    } else {
        return 'badge badge-error'
    }
}

function searchVendorOrder() {
  const query = formSearch.value
  if (query === '') {
     axios.get('http://localhost:8080' + `/api/vendororder/`)
     .then((response) => {
        vendorOrderTableData.value = response.data;
     })
     .catch((error) => {
        console.log(error);
     });
  } else {
    axios.get('http://localhost:8080' + `/api/vendororder/${query}`)
      .then((response) => {
        console.log(response.data)
        vendorOrderTableData.value = [response.data];
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

watch(() => route.params.id, (newValue, oldValue) => {
  // update the component key
  componentkey.value++
})

</script>