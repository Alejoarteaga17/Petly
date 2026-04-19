import { createRouter, createWebHistory } from 'vue-router';
import AboutView from '@/views/AboutView.vue';
import DomesticAnimalIndexView from '@/views/DomesticAnimalIndexView.vue';
import DomesticAniamlShowView from '@/views/DomesticAnimalShowView.vue';
import DomesticAnimalCreateView from '@/views/DomesticAnimalCreateView.vue';
import ContactView from '@/views/ContactView.vue';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Home' } },
    { path: '/about', name: 'about', component: AboutView, meta: { title: 'About' } },
    { path: '/login', name: 'login', component: LoginView, meta: { title: 'Login' } },
    { path: '/register', name: 'register', component: RegisterView, meta: { title: 'Register' } },
    { path: '/domesticAnimals', name: 'domesticAnimals', component: DomesticAnimalIndexView, meta: { title: 'Domestic Animals' } },
    { path: '/domesticAnimals/create', name: 'domesticAnimals.create', component: DomesticAnimalCreateView, meta: { title: 'Create Domestic Animal' } },
    { path: '/domesticAnimals/:id', name: 'domesticAnimal', component: DomesticAniamlShowView, meta: { title: 'Domestic Animal Details' } },
  ],
});

export default router;
