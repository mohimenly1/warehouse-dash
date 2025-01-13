<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import AppMenuItem from './AppMenuItem.vue';

const store = useStore();
const userType = computed(() => store.getters['auth/userType']);
const packageId = localStorage.getItem('package_id');

const model = ref([
    {
        label: 'الرئيسية',
        items: [{ label: 'لوحة التحكم', icon: 'pi pi-fw pi-home', to: '/dashboard' }]
    },
    {
        label: 'KEEP SPACE خدمات',
        items: [
            { label: 'إدارة المنتجات', icon: 'pi pi-tags pi-id-tags', to: '/pages/products' },
            { label: 'إدارة التصنيفات', icon: 'pi pi-bars pi-id-bars', to: '/category-manager' },
            { label: 'إدارة المخزون', icon: 'pi pi-box pi-id-bars', to: '/inventory-manager' },
            { label: 'إدارة الفواتير', icon: 'pi pi-heart-fill pi-id-clipboard', to: '/disbursement-order' },
            { label: 'إدارة إستلام البضائع', icon: 'pi pi-heart-fill pi-id-clipboard', to: '/receipt-order' },
            { label: 'إدارة الموظفين', icon: 'pi pi-box pi-id-bars', to: '/employee-manager' },
            { label: 'الدعم الفني', icon: 'pi pi-box pi-id-bars', to: '/support' },
        ]
    }
]);

const modelEnterPrise = ref([
    {
        label: 'الرئيسية',
        items: [{ label: 'لوحة التحكم', icon: 'pi pi-fw pi-home', to: '/dashboard' }]
    },
    {
        label: 'KEEP SPACE خدمات',
        items: [
            { label: 'إدارة المنتجات', icon: 'pi pi-tags pi-id-tags', to: '/pages/products' },
            { label: 'إدارة التصنيفات', icon: 'pi pi-bars pi-id-bars', to: '/category-manager' },
            { label: 'إدارة المخزون', icon: 'pi pi-box pi-id-bars', to: '/inventory-manager' },
            { label: 'إدارة الفواتير', icon: 'pi pi-heart-fill pi-id-clipboard', to: '/disbursement-order' },
            { label: 'إدارة إستلام البضائع', icon: 'pi pi-heart-fill pi-id-clipboard', to: '/receipt-order' },
            { label: 'إدارة الموظفين', icon: 'pi pi-box pi-id-bars', to: '/employee-manager' },
            { label: 'الدعم الفني', icon: 'pi pi-box pi-id-bars', to: '/support' },
            { label: 'إدارة الاجار', icon: 'pi pi-box pi-id-bars', to: '/rent-management' },
            { label: 'إدارة التخزين', icon: 'pi pi-box pi-id-bars', to: '/stock-management' },
        ]
    }
]);

const modelNormal = ref([
    {
        label: 'الرئيسية',
        items: [{ label: 'لوحة التحكم', icon: 'pi pi-fw pi-home', to: '/dashboard' }]
    },
    {
        label: 'KEEP SPACE خدمات',
        items: [
            { label: 'إدارة المنتجات', icon: 'pi pi-tags pi-id-tags', to: '/pages/products' },
            { label: 'إدارة التصنيفات', icon: 'pi pi-bars pi-id-bars', to: '/category-manager' },
            { label: 'إدارة المخزون', icon: 'pi pi-box pi-id-bars', to: '/inventory-manager' },
            { label: 'الدعم الفني', icon: 'pi pi-box pi-id-bars', to: '/support' },
        ]
    }
]);
const modelClient = ref([
{
        label: 'الرئيسية',
        items: [{ label: 'لوحة التحكم', icon: 'pi pi-fw pi-home', to: '/dashboard' }]
    },
    {
        label: 'KEEP SPACE خدمات',
        items: [
            { label: 'إدارة المنتجات', icon: 'pi pi-tags pi-id-tags', to: '/pages/products' },
            { label: 'إدارة التصنيفات', icon: 'pi pi-bars pi-id-bars', to: '/category-manager' },
            { label: 'إدارة المخزون', icon: 'pi pi-box pi-id-bars', to: '/inventory-manager' },
            { label: 'إدارة الفواتير', icon: 'pi pi-heart-fill pi-id-clipboard', to: '/disbursement-order' },
            { label: 'إدارة إستلام البضائع', icon: 'pi pi-heart-fill pi-id-clipboard', to: '/receipt-order' },
            // { label: 'إدارة الموظفين', icon: 'pi pi-box pi-id-bars', to: '/employee-manager' },
            { label: 'الدعم الفني', icon: 'pi pi-box pi-id-bars', to: '/support' },
            { label: 'طلبات التخزين', icon: 'pi pi-box pi-id-bars', to: '/stock-req' },
        ]
    }
]);

const modelAdmin = ref([
    {
        label: 'الرئيسية',
        items: [{ label: 'لوحة التحكم', icon: 'pi pi-fw pi-home', to: '/admin' }]
    },
    {
        label: 'KEEP SPACE خدمات',
        items: [
            { label: 'المخازن', icon: 'pi pi-box pi-id-box', to: '/stocks' },
            { label: 'إدارة المستخدمين', icon: 'pi pi-users pi-id-users', to: '/all-users' },
            { label: 'الاشتراكات', icon: 'pi pi-users pi-id-users', to: '/all-subscription' },
            { label: 'اصدار كروت الاشتراك', icon: 'pi pi-users pi-id-users', to: '/generate-voucher' },
            { label: 'احصائية ارباح الاشتراكات', icon: 'pi pi-users pi-id-users', to: '/profits' },
            { label: 'إدارة الدعم الفني', icon: 'pi pi-box pi-id-bars', to: '/support-admin' },
        ]
    }
]);

// Determine which model to use based on packageId and userType
const getSidebarModel = () => {
    if (packageId === '3' && userType.value === 'trader') {
        return modelEnterPrise.value; // Prioritize package_id === '3'
    } else if (userType.value === 'trader' || userType.value === 'staff') {
        return model.value;
    } else if (userType.value === 'normal') {
        return modelNormal.value;
    } else if (userType.value === 'admin') {
        return modelAdmin.value;
    } else if (userType.value === 'client') {
        return modelClient.value;
    } 
    return [];
};

const sidebarModel = computed(getSidebarModel);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in sidebarModel" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>