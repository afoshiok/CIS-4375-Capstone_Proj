<template>
    <div class="card rounded-none max-h-[50vh] p-4 bg-slate-600 mt-8">
        <div class="grid grid-cols-3 gap-4">
            <h1 class="card-title text-3xl text-white p-4">Customers</h1>
            <div class="col-start-3 p-4 grid justify-items-end">
                <div class="form-control">
                    <div class="input-group">
                        <input type="text" placeholder="Search…" class="input input-bordered" v-model="formSearch">
                        <button class="btn btn-square" @click="searchSupply()">
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
                    <th></th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                </tr>
                </thead>
                <!-- This will be a v-for loop -->
                <tbody v-for="item in tableData">
                <!-- row 1 -->
                <tr class="hover">
                    <td>{{ item.id }}</td>
                    <td><RouterLink :to="`/customer/edit/${item.id}`">{{ item.Customer_Fname }}</RouterLink></td>
                    <td>{{ item.Customer_Lname }}</td>
                    <td>{{ item.Customer_Phone }}</td>
                    <td>{{ item.Customer_Email }}</td>
                </tr>
                </tbody>
            </table>
        </div>
        
    </div>
    <div class="card rounded-none min-h-[45vh] p-4 bg-slate-600 mt-8 overflow-x-auto" :key="componentkey"> 
        <RouterView/>
    </div>
</template>

<script setup>
import {ref,  onBeforeMount, watch} from 'vue'
import  axios  from 'axios'
import { routerKey, useRoute } from 'vue-router'

const route = useRoute()


const tableData = ref([])
const formSearch = ref('')
const componentkey = ref(0)
const tablekey = ref(0)

onBeforeMount(() => {
    axios.get('http://localhost:8080' + '/api/customer/')
    .then((response) => {
        tableData.value =  response.data
        console.log(tableData.value)
    })
    .catch((error) => {
        console.log(error)
    })
})

watch(() => route.params.id, (newValue, oldValue) => {
  // update the component key
  componentkey.value++
})

//methods


function searchSupply() {
  const query = {
    Customer_Fname: '',
    Customer_Lname: ''
  };
  // split the search query into first and last name
  const queryParts = formSearch.value.trim().split(' ');
  if (queryParts.length > 0) {
    query.Customer_Fname = queryParts[0];
  }
  if (queryParts.length > 1) {
    query.Customer_Lname = queryParts[1];
  }
  console.log(query)
  axios.get('http://localhost:8080' + '/api/graph/customer/search', { params: query })
    .then((response) => {
      console.log(response.data);
      tableData.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}


// watch(tableData, () => console.table(`${tableData.value}`) )

</script>