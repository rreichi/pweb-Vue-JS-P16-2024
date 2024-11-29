<template>
    <div>
        <h1 class="text-2xl font-bold mb-4">Daftar Buku</h1>
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-if="error" class="text-red-500">{{ error }}</div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
                v-for="book in books"
                :key="book._id"
                class="border p-4 rounded shadow hover:shadow-lg transition"
            >
                <router-link :to="{ name: 'BookDetail', params: { id: book._id } }">
                    <h2 class="text-xl font-semibold">{{ book.title }}</h2> 
                </router-link>
                <p class="text-gray-600">Author: {{ book.author }}</p>
                <p>Status: 
                    <span :class="book.qty > 0 ? 'text-green-500' : 'text-red-500'">
                        {{ book.qty > 0 ? 'Available' : 'Unavailable' }}
                    </span>
                </p>
                <p class="text-gray-600">Jumlah: {{ book.qty }}</p>
                <!-- tombol untuk menambah jumlah buku -->
                <button
                    @click="increaseQty(book._id)"
                    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
                >
                    Tambah Stok
                </button>
            </div>
            <router-link 
                to="/add-book"
                class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4 inline-block"
            >
                Tambah Buku Baru
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import type { Book } from '@/types/Book';

export default defineComponent({
    name: 'BookList',
    setup() {
        const books = ref<Book[]>([]); //tipe Book[] utk daftar buku
        const loading = ref(true);
        const error = ref<string | null>(null);

        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/book');
                books.value = response.data.data;
            }

            catch (err) {
                error.value = 'Gagal memuat data buku.';
            }

            finally {
                loading.value = false;
            }
        };

        const increaseQty = async (id: string) => {
            try {
                //cari buku dgn ID yg sesuai
                const bookToUpdate = books.value.find((book) => book._id === id);
                if (!bookToUpdate) {
                    throw new Error('Buku tidak ditemukan');
                }

                //perbarui nilai qty dgn menambah 1
                const updatedQty = bookToUpdate.qty + 1;

                //kirim PATCH request utk memperbarui data di server
                await axios.patch(`http://localhost:5000/book/${id}`, { qty: updatedQty });

                //perbarui data buku lokal stelah berhasil
                bookToUpdate.qty = updatedQty;
            }

            catch (err) {
                console.error('Gagal menambah jumlah buku:', err);
                alert('Terjadi kesalahan saat menambah stok buku.');
            }
        };

        onMounted(fetchBooks);

        return { books, loading, error, increaseQty };
    },
});
</script>