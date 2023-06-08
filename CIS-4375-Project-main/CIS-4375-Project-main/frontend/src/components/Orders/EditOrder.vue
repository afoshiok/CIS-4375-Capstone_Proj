<template>
    <!-- Order Edit Form -->
    <div class="card rounded-none min-h-[23vh] p-4 bg-slate-600 mt-8 overflow-x-auto">
        <h1 class="card-title text-2xl">Edit Order # {{ route.params.id }}</h1>
        <form class="pt-10 grid grid-row-4" >
            <div class="grid grid-cols-2">
                <div class="grid grid-row-2 w-2/4">
                    <label class="mb-2 font-bold">Customer</label> 
                    <select type="text" name="CustName" id="CustName" class="h-12 rounded-sm px-4" v-model="cust_id">
                        <!-- GET Request, then loop (value = customer ID / inner tag = customer f_name + l_name) -->
                        <option v-for="customer in custData" :value="customer.id">{{ customer.Customer_Fname + ' ' + customer.Customer_Lname }}</option>
                    </select>
                </div>
                <div class="grid grid-row-2 w-1/4 ">
                    <label class="mb-2 font-bold">Employee</label> 
                    <select type="text" name="EmployeeName" id="EmployeeName" class="h-12 rounded-sm px-4" v-model="user_id">
                        <!-- GET Request, then loop (value = user ID / inner tag = user name) -->
                        <option v-for="employee in userData" :value="employee.id">{{ employee.User_Fname + ' ' + employee.User_Lname }}</option>
                    </select>
                </div>
            </div>

            <div class="grid grid-cols-2 mt-6" >
                <div class="grid grid-row-2 w-1/4">
                    <label class="mb-2 font-bold">Status</label>
                    <select type="text" name="EmployeeName" id="EmployeeName" class="h-12 rounded-sm px-4" v-model="status_id">
                            <option v-for="status in orderStatusData" :value="status.id">{{ status.Status_name}}</option>
                    </select>
                </div>
                <div class="grid grid-row-2 w-1/4">
                    <label class="font-bold">Order Total</label>
                    <label class="mb-2 text-xs ">Excluding new products</label>
                    <input type="number" disabled class="h-12 rounded-sm px-4" :value="total">
                </div>
            </div>

            <div class="grid grid-row-2 w-1/4 mt-4">
                <label class="mb-2 font-bold">Order Date</label>
                <input type="datetime-local" step="1"  class="h-12 rounded-sm px-4" v-model="orderDate">
            </div>

            <div class="grid grid-row-2 w-1/4 mt-4" v-if="status_id == 3">
                <label class="mb-2 font-bold">Completion Date</label>
                <input type="datetime-local" step="1"  class="h-12 rounded-sm px-4" v-model="completionDate">
            </div>


  


        </form>
        <button class="btn bg-emerald-500 text-white btn-lg mt-4 rounded-md" @click="editOrder()">Edit Order</button>
    </div>


    <div class="card rounded-none min-h-[25vh] p-4 bg-slate-600 mt-8 overflow-x-auto" >
        <section class="pt-10 grid grid-row-4" >
            <div class="grid grid-cols-2 align-baseline">
                <h1 class="card-title text-2xl pb-4">Existing Products</h1>
                <div class="flex justify-center pb-2">
                    <button class="btn bg-emerald-500 text-white btn-sm mt-4 rounded-md w-1/4" @click="editCurrOrderline()">Edit Items</button>
                </div>
            </div>
            
            <!-- Orderlines already in the order -->
            <div v-for="ol in order_orderlinesData" class="grid grid-cols-3 bg-slate-700 p-4">
                <div class="grid grid-row-3 w-2/4">
                    <label class="mb-2 font-bold">Product</label> 
                    <select  v-model="ol.Product_ID" class="h-12 rounded-sm px-4">
                        <!-- GET Request, then loop (value = Product ID / inner tag = product name) -->
                        <option v-for="product in productData" :value="product.id" :selected="product.id === ol.Product_ID">{{ product.Product_name }}</option>
                    </select>
                </div>
                <div class="grid grid-row-2 w-2/4 ">
                    <label class="mb-2 font-bold">Quantity</label> 
                    <input v-model="ol.Product_qty" type="number" min=0 class="p-4">
                </div>
                <div class="flex items-center">
                    <button class="ml-4 btn-error btn-xs" @click="deleteExistingOl(ol.id, ol.Product_ID, ol.Product_qty)">Delete</button> 
                </div>
                    
            </div>

            <!-- New orderlines -->
            <section class="pt-8 grid grid-row-4">
                <div class="grid grid-cols-2 align-baseline">
                    <h1 class="card-title text-2xl pb-4">New Products</h1>
                    <div class="flex justify-center pb-4">
                        <button class="btn bg-emerald-500 text-white btn-sm mt-4 rounded-md w-1/2" @click="newOrderline()">Add Products to Order</button>
                    </div>
                </div>
                
                <div v-for="(form, index) in forms" :key="index" class="grid grid-cols-3 bg-slate-700 p-4">
                    <div class="grid grid-row-2 w-2/4">
                        <label class="mb-2 font-bold">Product</label> 
                        <select  v-model="form.Product" class="h-12 rounded-sm px-4">
                            <!-- GET Request, then loop (value = Product ID / inner tag = product name) -->
                            <option v-for="product in productData" :value="product.id">{{ product.Product_name }}</option>
                        </select>
                    </div>
                    <div class="grid grid-row-2 w-1/4 ">
                        <label class="mb-2 font-bold">Quantity</label> 
                        <input v-model="form.quantity" type="number" min= 0 class="p-4">
                    </div> 
                    <div class="grid grid-row-2 w-2/4">
                        <label class="mb-2 font-bold">Price</label> 
                        <h1> {{  form.Price = findPrice(productData,'id',form.Product, 'Product_price')  }}</h1>
                    </div>
                </div>
            </section>
            <h1>New Product(s) Total: {{ newProdTotal }}</h1>
            <div class="grid grid-rows-2 items-center justify-center mb-4">
                <button class="px-4 bg-emerald-500 text-white btn-xs" @click="addForm()">Add product</button>
                <button class="mt-2 px-4  btn-error btn-xs" @click="removeItem()">Remove product</button>
            </div>
            

        </section>
        <button class="btn-error btn-lg mt-4 rounded-md" @click="deleteOrder()">Delete Order</button>
    </div>

</template>

<script setup>
import { ref, watch, onBeforeMount, computed} from 'vue';
import { useRoute, useRouter } from 'vue-router'
import  axios  from 'axios'

const route = useRoute()
const router = useRouter()

const forms = ref([{
    Price: null
}]);
const productData = ref([])
const custData = ref([])
const userData = ref([])
const orderStatusData = ref([])
const current_orderData = ref([])
const order_orderlinesData = ref([])

const order_id = ref(route.params.id)

//customer form
const cust_id = ref(0)
const user_id = ref(0)
const status_id = ref(0)
const orderDate = ref('')
const formTotal = ref(0)
const completionDate = ref('')




const total = computed(() => {
    let total = 0
    for (const ol of order_orderlinesData.value) {
        total += ol.Product_qty * ol.product_id.Product_price
    }
    return total
})



const newProdTotal = computed(() => {
  if (!isNaN(forms.value.reduce((acc, cur) => acc + (cur.Price * cur.quantity), 0))) {
    return forms.value.reduce((acc, cur) => acc + (cur.Price * cur.quantity), 0);
  } else {
    return 0;
  }
});




let index = 0;
onBeforeMount(() => {
    axios.get('http://localhost:8080' + '/api/product/')
    .then((response) => {
        productData.value = response.data
    })
    .catch((error) => {
        console.log(error)
    })

    axios.get('http://localhost:8080' + '/api/customer/')
    .then((response) => {
        custData.value = response.data
    })
    .catch((error) => {
        console.log(error)
    })

    axios.get('http://localhost:8080' + '/api/user/')
    .then((response) => {
        userData.value = response.data
    })
    .catch((error) => {
        console.log(error)
    })

    axios.get('http://localhost:8080' + `/api/order/${order_id.value}`)
    .then((response) => {
        current_orderData.value = response.data
        cust_id.value = response.data.Customer_ID
        user_id.value = response.data.User_ID
        status_id.value = response.data.Order_status_ID
        orderDate.value = formattedDate(response.data.Order_date)
        if (response.data.Order_status_ID == 3){
            completionDate.value = formattedDate(response.data.Order_CompletionDate)
        } else {
            completionDate.value = ''
        }
    })
    .catch((error) => {
        console.log(error)
    })

    axios.get('http://localhost:8080' + '/api/orderstatus/')
    .then((response) => {
        orderStatusData.value = response.data
    })
    .catch((error) => {
        console.log(error)
    })

    axios.get('http://localhost:8080' + `/api/orderline/orders/${order_id.value}`)
    .then((response) => {
        order_orderlinesData.value = response.data
    })
    .catch((error) => {
        console.log(error)
    })  
})


//Methods
function formattedDate(Orderdate) {  
      const date = new Date(Orderdate);
      if (isNaN(date)) {
        // Handle invalid date string here
        console.error('Invalid date string:', date);
        return '';
  }
      return date.toISOString().slice(0, 16);
}

function findPrice(data, key, value, targetKey) {
  const item = data.find((item) => item[key] === value);
  return item ? item[targetKey] : null;
}

//Buttons
function addForm() {
    index++
    forms.value.push({});
}

function removeItem(index) {
  forms.value.splice(index, 1);
}

function deleteExistingOl(olID, prodID, prodQty) { //NOT UPDATING ORDERTOTAL
    if(confirm("Are you sure you want to delete this orderline, action cannot be reverted?")) {
        axios.delete('http://localhost:8080' + `/api/orderline/${olID}`)
            .then((response) => {
                console.log("Orderline has successfully been deleted.")
                
            })
            .then(() => {
                axios.put('http://localhost:8080' + `/api/product/${prodID}`, {
                    Quantity: {increment: prodQty}
                })
                .then(() => {
                    alert('Press "Edit Order to update the Order Total"')
                    router.go(0)
                })
            })
            .catch((error) => {
                console.log(error)
            })

    } else {
        console.log('User cancelled request.')
    }
}

//Queries
function editOrder() {
    const order_dateVal = orderDate.value
    const completionDateVal = completionDate.value
    const curr_completionDate = formattedDate(current_orderData.value.Order_CompletionDate)
    
    const custform = {
        Customer_ID: cust_id.value,
        User_ID: user_id.value,
        Order_date: new Date(order_dateVal).toISOString(),
        Order_total: total.value + newProdTotal.value, 
        Order_status_ID: status_id.value,
        Order_CompletionDate: (completionDate.value == '') ?  new Date().toISOString : new Date(completionDateVal).toISOString() //FIX CONDITION
    }
    axios.put('http://localhost:8080' + `/api/order/${order_id.value}`, custform)
        .then((response) => {
            alert(`Order with ID ${order_id.value} has been edited!`)
            console.log('Order has been succesfully updated')
            console.log(curr_completionDate)
            console.log(completionDateVal)
            router.go(0)
            
        })
        .catch((error) => {
            console.log(error)
        })
}

function editCurrOrderline() {
    order_orderlinesData.value.forEach((item) => {
        const orderlineForm = {
            Order_ID: item.Order_ID, //FK not able to update
            Product_ID: item.Product_ID, //FK not able to update
            Product_qty: item.Product_qty,
        }
        axios.put('http://localhost:8080' + `/api/orderline/${item.id}`, orderlineForm)
        .then(() => {
            alert(`${item.id} has been updated`)
        })
        .catch((error) => {
            console.log(error)
        })
    });
}

function newOrderline() {
    forms.value.forEach((item) => {
        const newOrderlineForm = {
            Order_ID: current_orderData.value.id, //must exist in DB
            Product_ID: item.Product, // must exist in DB
            Product_qty: item.quantity
        }
        axios.post('http://localhost:8080' + `/api/orderline/`, newOrderlineForm)
        .then(() => {
            alert('New orderline added to Order')
            router.go(0)
        })
        .catch((error) => {
            console.log(error)
        })
    });
}

function deleteOrder() {
    if(confirm('Are you user you want to delete this order and corresponding orderlines, this action cannot be reverted?')){
        axios.delete('http://localhost:8080' + `/api/order/${order_id.value}`)
        .then((response) => {
                console.log("Orderline has successfully been deleted.")
                router.push('/order')
            })
    } else{
        console.log('User cancelled request.')
    }
}


</script>