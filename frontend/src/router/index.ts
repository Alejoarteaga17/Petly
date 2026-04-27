// Authors: Alejandro Arteaga & Alejandra Suarez

// External imports
import { createRouter, createWebHistory } from 'vue-router';

// Internal imports
import { useAuthStore } from '@/stores/auth';
import AdminDashboardView from '@/views/admin/AdminDashboardView.vue';
import DomesticAnimalCreateView from '@/views/admin/DomesticAnimalCreateView.vue';
import DomesticAnimalEditView from '@/views/admin/DomesticAnimalEditView.vue';
import DomesticAnimalIndexView from '@/views/DomesticAnimalIndexView.vue';
import DomesticAniamlShowView from '@/views/DomesticAnimalShowView.vue';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import ProfileView from '@/views/ProfileView.vue';
import RegisterView from '@/views/RegisterView.vue';
import ManageDomesticAnimalsView from '@/views/admin/ManageDomesticAnimals.vue';
import ManageUsersView from '@/views/admin/ManageUsers.vue';
import UserCreateView from '@/views/admin/UserCreateView.vue';
import UserEditView from '@/views/admin/UserEditView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Home' } },
    { path: '/login', name: 'login', component: LoginView, meta: { title: 'Login' } },
    { path: '/register', name: 'register', component: RegisterView, meta: { title: 'Register' } },
    { path: '/profile', name: 'profile', component: ProfileView, meta: { title: 'Profile' } },
    { path: '/admin/dashboard', name: 'admin.dashboard', component: AdminDashboardView, meta: { title: 'Admin Dashboard', requiresAdmin: true } },
    { path: '/admin/manageDomesticAnimals', name: 'admin.manageDomesticAnimals', component: ManageDomesticAnimalsView, meta: { title: 'Manage Domestic Animals', requiresAdmin: true } },
    { path: '/admin/manageUsers', name: 'admin.manageUsers', component: ManageUsersView, meta: { title: 'Manage Users', requiresAdmin: true } },
    { path: '/domesticAnimals', name: 'domesticAnimals', component: DomesticAnimalIndexView, meta: { title: 'Domestic Animals' } },
    { path: '/admin/domesticAnimals/create', name: 'admin.domesticAnimals.create', component: DomesticAnimalCreateView, meta: { title: 'Create Domestic Animal', requiresAdmin: true } },
    { path: '/admin/domesticAnimals/:id/edit', name: 'admin.domesticAnimals.edit', component: DomesticAnimalEditView, meta: { title: 'Edit Domestic Animal', requiresAdmin: true } },
    { path: '/admin/users/create', name: 'admin.users.create', component: UserCreateView, meta: { title: 'Create User', requiresAdmin: true } },
    { path: '/admin/users/:id/edit', name: 'admin.users.edit', component: UserEditView, meta: { title: 'Edit User', requiresAdmin: true } },
    { path: '/domesticAnimals/:id', name: 'domesticAnimal', component: DomesticAniamlShowView, meta: { title: 'Domestic Animal Details' } },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  const needsAdmin = Boolean(to.meta.requiresAdmin);
  if (needsAdmin && !authStore.isAdmin) {
    return { name: 'login' };
  }

  return true;
});

export default router;
