<template>
    <div class="container mx-auto px-4 py-6">
        <BookList />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BookList from '@/components/BookList.vue';

export default defineComponent({
    name: 'BookPage',
    components: { BookList },
});
</script>