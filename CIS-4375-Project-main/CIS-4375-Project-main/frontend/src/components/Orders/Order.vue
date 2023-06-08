<template>
    <div class="card rounded-none max-h-[45vh] p-4 bg-slate-600 mt-8">
        <div class="grid grid-cols-3 gap-4">
            <h1 class="card-title text-3xl text-white p-4">Orders</h1>
            <div class="col-start-3 p-4 grid justify-items-end">
                <div class="form-control">
                    <div class="input-group">
                        <input type="text" placeholder="Search…" class="input input-bordered" v-model="formSearch">
                        <button class="btn btn-square" @click="searchOrder()">
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
                <th>Customer Name</th>
                <th>Order Date</th>
                <th>Order Total</th>
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
                <th>Last Updated</th>
            </tr>
            </thead>
            <!-- This will be a v-for loop -->
            <tbody>
            <!-- row 1 -->
            <tr class="hover" v-for="item in orderTableData">
                <th>{{ item.id }}</th>
                <td class="font-bold"><RouterLink :to="`/EditOrder/${item.id}`">{{ item.customer.Customer_Fname + ' ' + item.customer.Customer_Lname }}</RouterLink></td>
                <td>{{ new Date(item.Order_date).toLocaleString('en-US', {  }) }}</td>
                <td>${{ item.Order_total }}</td>
                <td><div :class="badgeClass(item.order_status_id.Status_name)">{{ item.order_status_id.Status_name }}</div></td>
                <td>{{ new Date(item.updatedAt).toLocaleString('en-US', {  }) }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>

    <section class="card rounded-none overflow-y-scroll max-h-[45vh] mt-8 overscroll-x-contain bg-slate-600">
        <h1 class="card-title text-3xl text-white p-8">Orders (Past 6 Months)</h1>
        <div class="card-body text-black">
            <VueApexCharts :height="chartOptions.chart.chartHeight" :options="chartOptions" :series="chartData"></VueApexCharts>
        </div>
    </section>
</template>

<script setup>
import VueApexCharts from 'vue3-apexcharts';
import { ref, onBeforeMount, computed } from 'vue';
import  axios  from 'axios'

//Async get_graph_api_data():
//return json with {month: value} --> pass to a const variable
const chartLabels = ref([])
const data = ref([])
const orderTableData = ref([])
const formStatus = ref('')
const formSearch = ref('')

onBeforeMount(() => {
    axios.get('http://localhost:8080' + '/api/order/')
    .then((response) => {
        orderTableData.value = response.data
    })
    .catch((error) => {
        console.log(error)
    })

    axios.get('http://localhost:8080' + '/api/graph/orders')
    .then((response) => {
        console.log(response)
        chartLabels.value = response.data.map((item) => toMonthName(item.month))
        console.log(chartLabels)
        data.value = response.data.map((item) => item.count)
        console.log(data)
    })
    .catch((error) => {
        console.log(error)
    })


})

//Methods

const chartOptions = computed(() => ({
  chart: {
    type: 'area',
    redrawOnWindowResize: true,
    foreColor: '#FFFFFF',
    chartHeight: '400'
  },
  xaxis: {
    categories: chartLabels.value
  },
  yaxis: {
    min: 0
  },
  colors: ['#fccb58']
}));

const chartData = computed(() => [
    {
        name: 'Orders',
        type: 'bar',
        data: data.value
    }
] )

// const chartData = [
//     {
//         name: 'Orders',
//         type: 'bar',
//         data: data.value
//     }
// ]

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

function statusFilter(){
    const statusQuery = formStatus.value
    axios.get('http://localhost:8080' + `/api/orderstatus/status/${statusQuery}`)
    .then((response) => {
      orderTableData.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

function clearFilter() {
    axios.get('http://localhost:8080' + '/api/order/')
    .then((response) => {
        orderTableData.value = response.data
        formStatus.value = null
    })
    .catch((error) => {
        console.log(error)
    })
}

function toMonthName(monthNumber) { //Converts Month Number to Month Name
  const date = new Date();
  date.setMonth(monthNumber);

  return date.toLocaleString('en-US', {
    month: 'short',
  });
}


function searchOrder() {
  const query = formSearch.value
  if (query === '') {
     axios.get('http://localhost:8080' + `/api/order/`)
     .then((response) => {
        orderTableData.value = response.data;
     })
     .catch((error) => {
        console.log(error);
     });
  } else {
    axios.get('http://localhost:8080' + `/api/order/search/${query}`)
      .then((response) => {
        orderTableData.value = [response.data];
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

</script>