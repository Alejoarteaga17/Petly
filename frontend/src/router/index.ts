import { createRouter, createWebHistory } from 'vue-router';
import AboutView from '@/views/AboutView.vue';
import BooksIndexView from '@/views/DomesticAnimalIndexView.vue';
import BooksShowView from '@/views/DomesticAnimalShowView.vue';
import BooksCreateView from '@/views/DomesticAnimalCreateView.vue';
import ContactView from '@/views/ContactView.vue';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Home' } },
    { path: '/about', name: 'about', component: AboutView, meta: { title: 'About' } },
    { path: '/domesticAnimals', name: 'domesticAnimals', component: BooksIndexView, meta: { title: 'Domestic Animals' } },
    {
      path: '/domesticAnimals/create',
      name: 'domesticAnimals.create',
      component: BooksCreateView,
      meta: { title: 'Create Domestic Animal' },
    },
    { path: '/domesticAnimals/:id', name: 'domesticAnimal', component: BooksShowView, meta: { title: 'Domestic Animal Details' } },
  ],
});

export default router;
