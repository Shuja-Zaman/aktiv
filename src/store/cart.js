import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore('cart', () => {
    // State: an array to hold multiple products in the cart
    const products = ref([]);

    // Action: to add a product to the cart
    function addProduct(product) {
        // Check if the product already exists in the cart
        const existingProduct = products.value.find(p => p.id === product.id && p.size === product.size);
        if (existingProduct) {
            // If it exists, increase the quantity
            existingProduct.quantity += product.quantity;
        } else {
            // If not, add the new product to the cart
            products.value.push(product);
        }
        saveToLocalStorage();
    }

    // Action: to remove a product from the cart
    function removeProduct(productId, productSize) {
        products.value = products.value.filter(p => p.id !== productId || p.size !== productSize);
        saveToLocalStorage();
    }

    // Action: to clear the entire cart
    function clearCart() {
        products.value = [];
        saveToLocalStorage();
    }

    // Action: to save the cart to localStorage
    function saveToLocalStorage() {
        localStorage.setItem('cartItems', JSON.stringify(products.value));
    }

    // Load the cart from localStorage when the store is initialized
    function loadFromLocalStorage() {
        const storedProducts = localStorage.getItem('cartItems');
        if (storedProducts) {
            products.value = JSON.parse(storedProducts);
        }
    }

    // Getter: to return the cart items
    function getCartItems() {
        return products.value;
    }

    // Load cart from localStorage on store initialization
    loadFromLocalStorage();

    // Expose the state and actions
    return {
        products,
        getCartItems,
        addProduct,
        removeProduct,
        clearCart,
    };
});
