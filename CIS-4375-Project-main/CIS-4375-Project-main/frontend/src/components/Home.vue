<template>
  <h1 class="text-3xl text-white">Home</h1>
    <section class="container mx-auto">
        <div class="card rounded-none m-12 bg-slate-600 max-h-[75vh]">
          <h1 class="card-title text-3xl text-white p-8">Revenue vs. Expenses</h1>
          <div class="card-body text-black">
            <VueApexCharts :height="500" :options="chartOptions" :series="chartData" ></VueApexCharts>
          </div>
        </div>
        <section class="grid grid-cols-4 gap-4">
            <div class="col-start-1 card-body card rounded-none bg-slate-600">
              <h1 class="font-bold text-white">Orders</h1>
              <div class="px-2 container">
          <div v-for="(status, index) in statusCounts" :key="index">
            <p class="text-white">{{ status.name }}: {{ status.count }} ({{ status.percentage.toFixed(2) }}%)</p>
            <progress
              class="progress"
              :class="{
                'progress-error': status.name === 'Not Started',
                'progress-accent': status.name === 'In-Progress',
                'progress-success': status.name === 'Complete',
              }"
              :value="status.count"
              :max="totalStatusCount"
            ></progress>
          </div>
        </div>
            </div>
            <div class="col-start-2 card rounded-none bg-slate-600  max-h-64">
              <h1 class="card-body font-bold text-white">Products Left</h1>
              <div class="flex flex-col rounded-md overflow-y-scroll">
                <div class="flex flex-row py-0 px-4 border-b border-gray-300">
                </div>
                <div v-for="item in tableData" class="flex flex-row py-4 px-4 border-b border-gray-300 ">
                  <div class="flex-grow">{{ item.Product_name }}</div>
                  <div class="w-1/4 text-right font-bold text-xl">{{ item.Quantity }}</div>
                </div>
              </div>
            </div>





            <div class="col-start-3 card rounded-none bg-slate-600">
              <h1 class="card-body font-bold text-white">Monthly Revenue</h1>
              <div class="px-2 container">
               <h1 class="card-title text-5xl text-white p-8">$ {{currentRevenue}}</h1>
              </div>
            </div>

            <div class="col-start-4 card rounded-none bg-slate-600">
              <h1 class="card-body font-bold text-white">Monthly Expenses</h1>
              <div class="px-2 container">
               <h1 class="card-title text-5xl text-white p-8">$ {{currentExpenses}}</h1>
              </div>
            </div>
          </section>
    </section>
</template>
<script setup>
import { onBeforeMount, ref, computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts';
import  axios  from 'axios'

//Async get_graph_api_data():
//return json with {month: value} --> pass to a const variable
const revenueMonths = ref([])
const revenueData = ref([])
const expensesMonths = ref([])
const expensesData = ref([])
const currentExpenses = ref([])
const currentRevenue = ref([])
const statusName = ref([])
const statusData = ref([])
const totalStatusCount = ref(0) 
const tableData = ref([])

function toMonthName(monthNumber) { //Converts Month Number to Month Name
  const date = new Date();
  date.setMonth(monthNumber);

  return date.toLocaleString('en-US', {
    month: 'short',
  });
}

onBeforeMount(async () => {
  axios.get('http://localhost:8080' + '/api/graph/revenue')
  .then((response) => {
     const months = response.data.map((item) => toMonthName(item.month))
     const data = response.data.map((item) => item.total)
     revenueMonths.value = months
     console.log(revenueMonths)
     revenueData.value = data
  })

  axios.get('http://localhost:8080' + '/api/graph/expensesMonth')  
  .then((response) => {
     const expenses = response.data
     currentExpenses.value = expenses
  })
  axios.get('http://localhost:8080' + '/api/graph/revenueMonth')  
  .then((response) => {
     const revenue = response.data
     currentRevenue.value = revenue
  })
  axios.get('http://localhost:8080' + '/api/graph/expenses')
  .then((response) => {
     const months = response.data.map((item) => toMonthName(item.month))
     const data = response.data.map((item) => item.expenses)
     expensesMonths.value = months
     console.log(expensesMonths)
     expensesData.value = data
     console.log(expensesData)
  })
  axios.get('http://localhost:8080' + '/api/graph/orders/status')
  .then((response) => {
     const status = response.data.map((item) => item.status);
     const data = response.data.map((item) => item.count);
     statusName.value = status;
     statusData.value = data;

     // Calculate total status count
     totalStatusCount.value = statusData.value.reduce((total, count) => total + count, 0);
  })
  axios.get('http://localhost:8080' + '/api/product/')
    .then((response) => {
        tableData.value =  response.data
        console.log(tableData.value)
    })
    .catch((error) => {
        console.log(error)
    })
})

// Compute an array of objects with the percentage and count of each status
const statusCounts = computed(() => {
  return statusData.value.map((count, i) => ({
    name: statusName.value[i],
    count,
    percentage: count / totalStatusCount.value * 100,
  }));
});


const chartData = computed (() => [
  {
    name: 'Expenses',
    type: 'line',
    data: expensesData.value, //map values to this
  },
  {
    name: 'Revenue',
    type: 'bar',
    data: revenueData.value,
  },
]);

const chartOptions = computed(() => ({
  chart: {
    height: 400,
    redrawOnWindowResize: true,
    foreColor: '#FFFFFF'
  },
  xaxis: {
    categories: revenueMonths.value,
  },
  colors: ['#FFFFFF', '#fccb58'],
  markers: {
  size: [3, 3]
  },
}))

// const chartOptions = {
//   chart: {
//     height: 350,
//     redrawOnWindowResize: true,
//     foreColor: '#FFFFFF'
//   },
//   xaxis: {
//     categories: revenueMonths.value,
//   },
//   colors: ['#FFFFFF', '#fccb58'],
//   markers: {
//   size: [3, 3]
//   },
// };


</script>
