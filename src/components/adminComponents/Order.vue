<template>
  <div class="orders-container kanit-thin">
    <h2 class="title text-2xl kanit-extrabold">Orders ({{ orders.length }})</h2>
    
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">Error: {{ error }}</div>

    <div v-if="orders.length === 0" class="no-orders">No orders found</div>

    <div class="orders-list">
      <div v-for="order in orders" :key="order.id" class="order-card w-full bg-white my-3 p-2 rounded-lg shadow-lg">
        <div class="order-header flex flex-col">
          <span class="order-id"><span class="kanit-medium">Order ID:</span> {{ order.id }}</span>
          <span class="order-date"><span class="kanit-medium">Date:</span> {{ formatDate(order.timestamp) }}</span>
        </div>
        <div class="order-details">
          <span class="kanit-medium">Customer:</span> {{ order.firstName }} {{ order.lastName }}<br>
          <span class="kanit-medium">Email:</span> {{ order.email }}<br>
          <span class="kanit-medium">Phone:</span> {{ order.phoneNumber }}<br>
          <span class="kanit-medium">Address:</span> {{ order.address }}<br>
          <span class="kanit-medium">City:</span> {{ order.city }}<br>
          <span class="kanit-medium">Postal Code:</span> {{ order.postalCode }}<br>
          <span class="kanit-medium">Payment Method:</span> {{ order.paymentMethod }}<br>
          <span class="kanit-medium">Total Amount:</span> Rs. {{ order.totalAmount }}
        </div>
        <!-- Items List -->
        <div class="items-list">
          <h3 class="items-title kanit-medium">Items Ordered:</h3>
          <ul>
            <li v-for="(item, index) in order.items" :key="index" class="item">
              {{ item.name }} ({{ item.quantity }} x Rs. {{ item.price }}) , {{ item.size }}
            </li>
          </ul>
        </div>
        <!-- Delete Button -->
        <button @click="deleteOrder(order.id)" class="delete-button bg-red-500 text-white py-2 px-4 rounded mt-3">Delete Order</button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase.js';
import { ref, onMounted } from 'vue';

const orders = ref([]);
const loading = ref(true);
const error = ref('');

const fetchOrders = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'orders'));
    orders.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const deleteOrder = async (orderId) => {
  try {
    await deleteDoc(doc(db, 'orders', orderId));
    orders.value = orders.value.filter(order => order.id !== orderId);
  } catch (err) {
    error.value = 'Failed to delete the order: ' + err.message;
  }
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp.toDate()); // Convert Firestore timestamp to JavaScript Date object
  return date.toLocaleString(); // Format date and time
};

onMounted(fetchOrders);
</script>


<style scoped>
.items-list {
  margin-top: 10px;
}

.items-title {
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.item {
  font-size: 1rem;
  color: #555;
  margin-bottom: 5px;
}
</style>
