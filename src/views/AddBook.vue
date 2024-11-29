<template>
    <div class="container mx-auto p-4 max-w-md">
        <h1 class="text-2xl font-bold mb-4">Tambah Buku Baru</h1>
        <form @submit.prevent="handleSubmit">
            <div class="mb-4">
                <label for="title" class="block text-gray-700">Judul Buku:</label>
                <input
                    v-model="form.title"
                    id="title"
                    type="text"
                    class="w-full px-3 py-2 border rounded"
                    required
                />
            </div>
            <div class="mb-4">
                <label for="author" class="block text-gray-700">Penulis:</label>
                <input
                    v-model="form.author"
                    id="author"
                    type="text"
                    class="w-full px-3 py-2 borded rounded"
                    required
                />
            </div>
            <div class="mb-4">
                <label for="publisher" class="block text-gray-700">Penerbit:</label>
                <input 
                    v-model="form.publisher"
                    id="publisher"
                    type="text"
                    class="w-full px-3 py-2 border rounded"
                    required
                />
            </div>
            <div class="mb-4">
                <label for="publishedDate" class="block text-gray-700">Tanggal Terbit:</label>
                <input 
                    v-model="form.publishedDate"
                    id="publishedDate"
                    type="Date"
                    class="w-full px-3 py-2 border rounded"
                    required
                />
            </div>
            <div class="mb-4">
                <label for="qty" class="block text-gray-700">Jumlah:</label>
                <input 
                    v-model.number="form.qty"
                    id="qty"
                    type="number"
                    min="1"
                    class="w-full px-3 py-2 border rounded"
                    required
                />
            </div>
            <!-- <div class="mb-4">
                <label for="initialQty" class="block text-gray-700">Jumlah Awal:</label>
                <input 
                    v-model.number="form.initialQty"
                    id="initialQty"
                    type="number"
                    min="1"
                    class="w-full px-3 py-2 border rounded"
                    required
                />
            </div> -->
            <div class="mb-4">
                <label for="description" class="block text-gray-700">Deskripsi:</label>
                <textarea
                    v-model="form.description"
                    id="description"
                    class="w-full px-3 py-2 border rounded"
                    rows="4"
                ></textarea>
            </div>
            <div class="mb-4">
                <label for="tags" class="block text-gray-700">Tags (pisahkan dengan koma):</label>
                <input
                    v-model="tagsInput"
                    id="tags"
                    type="text"
                    class="w-full px-3 py-2 border rounded"
                />
            </div>
            <div class="mb-4">
                <label for="coverImage" class="block text-gray-700">URL Gambar Sampul:</label>
                <input
                    v-model="form.coverImage"
                    id="coverImage"
                    type="url"
                    class="w-full px-3 py-2 border rounded"
                />
            </div>
            <button
                type="submit"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Tambahkan Buku
            </button>
        </form>
        <p v-if="successMessage" class="text-green-500 mt-4">{{ successMessage }}</p>
        <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'AddBook',
    setup() {
        const form = ref({
            title: '',
            author: '',
            publisher: '',
            publishedDate: '',
            qty: 1,
            initialQty: 1,
            description: '',
            tags: [] as string[],
            coverImage: '',
        });

        const tagsInput = ref('');
        const successMessage = ref('');
        const errorMessage = ref('');

        const handleSubmit = async () => {
            form.value.tags = tagsInput.value
                .split('.')
                .map((tag) => tag.trim())
                .filter((tag) => tag != '');
            
            console.log('Data yang dikirim:', form.value);
            
            try {
                const response = await fetch('http://localhost:5000/book', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form.value),
                });
                
                if (!response.ok) {
                    throw new Error('Gagal menambahkan buku');
                }
                successMessage.value = 'Buku berhasil ditambahkan!';
                errorMessage.value = '';
                form.value = {
                    title: '',
                    author: '',
                    publisher: '',
                    publishedDate: '',
                    qty: 1,
                    initialQty: 1,
                    description: '',
                    tags: [],
                    coverImage: '',
                };
                tagsInput.value = '';
            }

            catch (error: any) {
                console.error('Error:', error.message);
                successMessage.value = '',
                errorMessage.value = error.message;
            }
        };

        return {
            form,
            tagsInput,
            successMessage,
            errorMessage,
            handleSubmit,
        };
    },
});
</script>

<style scoped>
.container {
    max-width: 400px;
    margin: auto;
}
</style>