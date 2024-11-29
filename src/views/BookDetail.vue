<template>
    <div class="container mx-auto p-4">
        <div v-if="loading" class="text-center">
            <p>Loading...</p>
        </div>
        <div v-else-if="error" class="text-center text-red-500">
            <p>Error: {{ error }}</p>
        </div>
        <div v-else class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <h1 class="text-2xl font-bold mb-4">{{ book?.title }}</h1>
            <img 
                :src="book?.coverImage" 
                alt="Book Cover"
                class="w-64 h-96 object-cover mx-auto mb-4"
            />
            <p><strong>Author:</strong> {{ book?.author }}</p>
            <p><strong>Publisher:</strong> {{ book?.publisher }}</p>
            <p><strong>Published Date:</strong> {{ formattedDate }}</p>
            <p><strong>Description:</strong> {{ book?.description }}</p>
            <p><strong>Tags:</strong> {{ book?.tags.join('. ') }}</p>
            <p><strong>Available Quantity:</strong> {{ book?.qty }}</p>
            <p><strong>Rating:</strong> {{ book?.rating.average }} ({{ book?.rating.count }} reviews)</p>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'BookDetail',
    setup() {
        const route = useRoute();
        const book = ref<any | null>(null);
        const loading = ref(true);
        const error = ref<string | null>(null);

        const fetchBookDetail = async (id: string) => {
            try {
                const response = await fetch(`http://localhost:5000/book/${id}`);
                if (!response.ok) {
                    throw new Error('failed to fetch book details');
                }

                const data = await response.json();
                book.value = data.data;
            }

            catch (err: any) {
                error.value = err.message;
            }

            finally {
                loading.value = false;
            }
        };

        onMounted(() => {
            const bookId = route.params.id as string;
            fetchBookDetail(bookId);
        });

        const formattedDate = computed(() =>
            book.value ? new Date(book.value.publishedDate).toLocaleDateString() : ''
        );

        return {
            book,
            loading,
            error,
            formattedDate,
        };
    },
});

</script>