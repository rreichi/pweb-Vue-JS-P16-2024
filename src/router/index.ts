import { createRouter, createWebHistory } from "vue-router";
import BookPage from "@/views/BookPage.vue";
import BookDetail from "@/views/BookDetail.vue";
import AddBook from "@/views/AddBook.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: BookPage,
  },
  {
    path: '/book/:id', //dynamic route
    name: 'BookDetail',
    component: BookDetail,
    props: true,
  },
  {
    path: '/add-book',
    name: 'AddBook',
    component: AddBook,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;