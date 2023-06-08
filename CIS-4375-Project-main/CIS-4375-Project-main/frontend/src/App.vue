<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
// import { Amplify } from 'aws-amplify'
// import { Auth } from 'aws-amplify';
import axios from 'axios';
const vendorCondition = ref(false)
const orderCondition = ref(false)

function vendortoggle() {
    vendorCondition.value = !vendorCondition.value
}

function ordertoggle() {
  orderCondition.value = !orderCondition.value
}
function logout(){
  axios.get('https://pradohoney.auth.us-east-1.amazoncognito.com/logout')
}




</script>

<template>
  
  <main class="flex row-auto bg-slate-800">
    <nav class="flex flex-col min-h-screen max-h-screen">
      <ul class="bg-slate-700 w-56 min-h-full max-h-full p-2 text-white">
        <!-- Company logo -->
        <img class="pt-4 py-4" src="./assets/prado-honey-low-resolution-logo-color-on-transparent-background.svg" alt="">

        <div class="divider py-4 before:bg-slate-200 after:bg-slate-200"></div>
        <li class=" p-4 grid grid-cols-3 gap-3 hover:bg-slate-500 rounded-md">
          <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="1.5em" width="1.5em" class=""><path fill="none" d="M0 0h24v24H0z"></path><path d="M20 20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9zM9 10v6h6v-6H9zm2 2h2v2h-2v-2z"></path></svg>        
          <RouterLink to="/"><a class="col-start-2">Home</a></RouterLink>
        </li>
        <!-- Vendor Dropdown -->
        <ul class="p-4 grid grid-cols-3 gap-3 hover:bg-slate-500 rounded-md">
          <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="1.5em" width="1.5em" class=""><path d="M1.63.47a.393.393 0 0 0-.39.39v2.417c0 .212.177.39.39.39h20.74c.213 0 .39-.178.39-.39V.859a.393.393 0 0 0-.39-.39zm-.045 4.126a.41.41 0 0 0-.407.337l-1.17 6.314C0 11.274 0 11.3 0 11.327v2.117c0 .23.186.416.416.416h23.168c.23 0 .416-.186.416-.416v-2.126c0-.027 0-.053-.009-.08l-1.169-6.305a.41.41 0 0 0-.407-.337zM1.7 14.781a.457.457 0 0 0-.46.46v7.829c0 .257.203.46.46.46h14.108c.257 0 .46-.203.46-.46v-6.589c0-.257.204-.46.461-.46h4.02c.258 0 .461.203.461.46v6.589c0 .257.204.46.46.46h.62a.456.456 0 0 0 .461-.46v-7.829a.458.458 0 0 0-.46-.46zm1.842 1.55h7.847c.212 0 .39.177.39.39V21.6c0 .212-.178.39-.39.39H3.542a.393.393 0 0 1-.39-.39v-4.88c0-.221.178-.39.39-.39Z"></path></svg>        
          <RouterLink to="/vendor"><a class="col-start-2">Vendors</a></RouterLink>
          <button class="pt-1 flex justify-center items-center" v-on:click="vendortoggle()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
              <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" />
            </svg>
          </button>
        </ul>
        <!-- Vendor Dropdown Options -->
          <li v-if="vendorCondition == true" class="p-4 hover:bg-slate-500 rounded-md">        
            <RouterLink to="/VendorOrder" class="grid grid-cols-3 gap-3"><a class="text-md col-start-2 col-span-2">Vendor Orders</a></RouterLink>
          </li>
        <!-- Vendor Dropdown Option/ -->
        <!-- Vendor Dropdown/ -->

        <!-- Order Dropdown -->
        <ul class="p-4 grid grid-cols-3 gap-3 hover:bg-slate-500 rounded-md">
          <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" height="1.5em" width="1.5em" style="overflow: visible;"><path d="M112 0C85.49 0 64 21.49 64 48v48H16c-8.837 0-16 7.2-16 16s7.163 16 16 16h256c8.8 0 16 7.2 16 16s-7.2 16-16 16H48c-8.84 0-16 7.2-16 16s7.16 16 16 16h192c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.837 0-16 7.2-16 16s7.163 16 16 16h192c8.8 0 16 7.2 16 16s-7.2 16-16 16H64v128c0 53 42.1 96 96 96 53 0 96-43 96-96h128c0 53 42.1 96 96 96 53 0 96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12.9-12-28.3-18.7-45.3-18.7H416V48c0-26.51-21.5-48-48-48H112zm432 237.3V256H416v-96h50.7l77.3 77.3zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm368-48c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48z"></path></svg>       
          <RouterLink to="/order"><a class="col-start-2">Orders</a></RouterLink>
           <button class="pt-1 flex justify-center items-center" v-on:click="ordertoggle()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
              <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" />
            </svg>
          </button>
        </ul>
        <li v-if="orderCondition == true" class="p-4  hover:bg-slate-500 rounded-md">        
          <RouterLink to="/CreateOrder" class="grid grid-cols-3 gap-3"><a class="text-md col-start-2 col-span-2">Create Order</a></RouterLink>
        </li>
        <!-- Order Dropdown -->


        <li class="p-4 grid grid-cols-3 gap-3 hover:bg-slate-500 rounded-md">
          <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="1.5em" width="1.5em" style="overflow: visible;"><path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"></path><path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"></path></svg>
          <RouterLink to="/customer"><a class="col-start-2">Customers</a></RouterLink>
        </li>
        <li class="p-4 grid grid-cols-3 gap-3 hover:bg-slate-500 rounded-md">
          <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="1.5em" width="1.5em" style="overflow: visible;"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path></svg>
          <RouterLink to="/product"><a class="col-start-2">Products</a></RouterLink>
        </li>
        <li class="p-4 grid grid-cols-3 gap-3 hover:bg-slate-500 rounded-md">
          <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="1.5em" width="1.5em" style="overflow: visible;"><path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4h-8.5ZM15 4.667V5H1v-.333L1.5 4h6V1h1v3h6l.5.667Z"></path></svg>
          <RouterLink to="/supply"><a class="col-start-2">Supplies</a></RouterLink>
        </li>  

        <div class="divider mt-80 before:bg-slate-200 after:bg-slate-200"></div>
        <li class="p-4 grid grid-cols-3 gap-3 hover:bg-slate-500 rounded-md">
          <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="2em" width="2em" style="overflow: visible;"><path d="M12 10V8H7V6h5V4l3 3zm-1-1v4H6v3l-6-3V0h11v5h-1V1H2l4 2v9h4V9z"></path></svg>          
          <a class="text-md col-start-2 " href="https://pradohoney.auth.us-east-1.amazoncognito.com/logout?client_id=2qve4mdououqq81rse357ls54u">Log Out</a>
        </li> 
      </ul>
    </nav>
    <!-- Router View -->
    <section class="p-5 w-screen overflow-y-scroll max-h-screen">
      <RouterView/>
    </section>
    <!--  -->
  </main>
</template>

<style>


</style>


  


