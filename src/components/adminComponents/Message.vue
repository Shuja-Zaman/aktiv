<template>
  <div class="messages-container kanit-thin">
    <h2 class="title text-2xl kanit-extrabold">User Messages ({{ messages.length }})</h2>
    
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">Error: {{ error }}</div>

    <div v-if="messages.length === 0" class="no-messages">No messages found</div>

    <div class="messages-list">
      <div v-for="message in messages" :key="message.id" class="message-card w-full bg-white my-3 p-2 rounded-lg shadow-lg">
        <div class="message-header flex flex-col">
          <span class="user-name"> <span class="kanit-medium">Name:</span> {{ message.name }}</span>
          <span class="user-email"> <span class="kanit-medium">Email:</span> {{ message.email }}</span>
        </div>
        <div class="message-content"> <span class="kanit-medium">Message:</span> {{ message.message }}</div>
        <button 
          @click="deleteMessage(message.id)" 
          class="delete-button bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 mt-2"
          :disabled="deletingMessageId === message.id"
        >
          <span v-if="deletingMessageId === message.id">Deleting...</span>
          <span v-else>Delete</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase.js';
import { ref, onMounted } from 'vue';

const messages = ref([]);
const loading = ref(true);
const error = ref('');
const deletingMessageId = ref(null); // To track the ID of the message being deleted

const fetchMessages = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'messages'));
    messages.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const deleteMessage = async (messageId) => {
  deletingMessageId.value = messageId; // Set the deleting state for this message
  try {
    await deleteDoc(doc(db, 'messages', messageId));
    messages.value = messages.value.filter(message => message.id !== messageId);
  } catch (err) {
    error.value = 'Failed to delete message: ' + err.message;
  } finally {
    deletingMessageId.value = null; // Reset the deleting state
  }
};

onMounted(fetchMessages);
</script>

<style scoped>
.messages-container {
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

.loading, .error, .no-messages {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}

.messages-list {
  overflow-y: auto; /* Enable vertical scrolling */
  flex: 1; /* Allow the list to grow and fill the available space */
}

.message-card {
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.message-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.message-content {
  font-size: 1rem;
  color: #333;
}

.delete-button {
  cursor: pointer;
}
</style>
