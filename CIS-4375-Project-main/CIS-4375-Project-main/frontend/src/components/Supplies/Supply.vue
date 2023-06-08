<template>
    <div class="card rounded-none max-h-[50vh] p-4 bg-slate-600 mt-8 overflow-x-auto">
        <div class="grid grid-cols-3 gap-4">
            <h1 class="card-title text-3xl text-white p-4">Supplies</h1>
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
                        <th>Supply Name</th>
                        <th>Quantity</th>
                    </tr>
                    </thead>
                    <!-- This will be a v-for loop -->
                    <tbody v-for="item in tableData">
                    <!-- row 1 -->
                    <tr class="hover">
                        <td>{{ item.id }}</td>
                        <td><RouterLink :to="`/supply/edit/${item.id}`">{{ item.Supply_name }}</RouterLink></td>
                        <td>{{ item.Quantity }}</td>

                    </tr>
                    </tbody>
                </table>
        </div>
    </div>
    <div class="card rounded-none min-h-[45vh] p-4 bg-slate-600 mt-8 overflow-x-auto"> 
        <RouterView/>
    </div>
</template>

<script setup>
import {ref,  onBeforeMount, watch} from 'vue'
import  axios  from 'axios'
import { routerKey, useRoute } from 'vue-router'

const route = useRoute()


const tableData = ref([])
const componentkey = ref(0)
const tablekey = ref(0)
const formSearch = ref('')

onBeforeMount(() => {
    axios.get('http://localhost:8080' + '/api/supply/')
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

// function searchSupply() {
//     axios.put('http://localhost:8080' + `/api/supply/${ vendor_id.value }`, formData.value)
//     .then((response) => {
//         confirm('Are you sure you want to update this Vendor?') 
//     })
//     .then((response) => {
//         console.log("Vendor successfully updated")
//         router.go(0)
//         router.push('/vendor')
//     })
//     .catch((error) => {
//         console.log(error)
//     })
// }

function searchSupply() {
  const query = formSearch.value
  if (query === '') {
     axios.get('http://localhost:8080' + `/api/supply/`)
     .then((response) => {
        tableData.value = response.data;
     })
     .catch((error) => {
        console.log(error);
     });
  } else {
    axios.get('http://localhost:8080' + `/api/supply/${query}`)
      .then((response) => {
        tableData.value = [response.data];
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

// watch(tableData, () => console.table(`${tableData.value}`) )

</script>