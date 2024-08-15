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
          <span class="kanit-medium">Total Amount:</span> Rs. {{ order.totalAmount}}
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
.orders-container {
  padding: 20px;
  max-width: 800px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 100vh; /* Make the container full height */
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.loading, .error, .no-orders {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}

.orders-list {
  overflow-y: auto; /* Enable vertical scrolling */
  flex: 1; /* Allow the list to grow and fill the available space */
}

.order-card {
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.order-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.order-details {
  font-size: 1rem;
  color: #333;
}

.order-details span {
  font-weight: bold;
}

/* Delete Button Styling */
.delete-button {
  background-color: #f56565;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #e53e3e;
}
</style>
