<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Daftar Buku</h1>
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-else-if="error" class="text-red-500">Error: {{ error }}</div>
        <div v-else>
            <div v-for="book in books" :key="book._id" class="mb-4 p-4 bg-gray-100 rounded">
                <h2 class="text-lg font-semibold">{{ book.title }}</h2>
                <p>Pengarang: {{ book.author }}</p>
                <p>Kategori: {{ book.tags.join(', ') }}</p>
                <p>Status: {{ book.qty > 0 ? 'Tersedia' : 'Tidak Tersedia' }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import type { Book } from '@/types/book';

export default defineComponent({
    name: 'BookList',
    data() {
        return {
            books: [] as Book[], //tentukan tipe data sbagai array dri objek Book
            loading: true,
            error: null as string | null,
        };
    },
    async mounted() {
        try {
            const response = await fetch("http://localhost:5000/book");
            if (!response.ok) {
                throw new Error("Failed to fetch books");
            }
            
            const data: Book[] = await response.json();
            this.books = data;
        }

        catch (err: unknown) {
            this.error = (err as Error).message;
        }

        finally {
            this.loading = false;
        }
    },
});
</script>