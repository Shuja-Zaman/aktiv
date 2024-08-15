<template>
    <button
        :type="props.type"
        @click="handleClick"
        class="kanit-medium w-full rounded-md py-1.5 px-4 border-[1px] hover:bg-zinc-600 hover:text-white transition-all duration-300"
      >
        {{ props.name }}
      </button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  name: String,
  onClick: Function, // Define onClick as a prop for custom click handling
  type: {
    type: String,
    default: 'button' // Default type is 'button'
  },
});

const handleClick = () => {
  if (props.onClick) {
    props.onClick();
  }
}

</script>

<style>

</style>