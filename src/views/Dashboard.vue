<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ProductService, WarehouseService } from '@/service/ProductService';
import WalletService from '@/service/WalletService'; // Import the WalletService
import { onMounted, ref, watch } from 'vue';

const { getPrimary, getSurface, isDarkTheme } = useLayout();

const products = ref(null);
const chartData = ref(null);
const chartOptions = ref(null);
const wallet = ref(null); // Add a ref for wallet data

const items = ref([
    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
    { label: 'Remove', icon: 'pi pi-fw pi-trash' }
]);
const statistics = ref({
    max_products: 0,
    total_products: 0,
    max_quantity: 0,
    total_storage_records: 0,
    total_quantity: 0,
    total_categories: 0
});

const fetchStatistics = async () => {
    try {
        const data = await WarehouseService.getWarehouseStatistics();
        statistics.value = data;
    } catch (error) {
        console.error('Failed to fetch warehouse statistics:', error);
    }
};

const fetchWalletData = async () => {
    const userId = localStorage.getItem('user_id');
    const packageId = localStorage.getItem('package_id');

    if (packageId === '3' && userId) {
        try {
            const data = await WalletService.getWalletByUserId(userId);
            wallet.value = data;
        } catch (error) {
            console.error('Failed to fetch wallet data:', error);
        }
    }
};

onMounted(() => {
    ProductService.getProducts().then((data) => (products.value = data));
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
    fetchStatistics();
    fetchWalletData(); // Fetch wallet data on component mount
});

function setChartData() {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
            {
                type: 'bar',
                label: 'Subscriptions',
                backgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                data: [4000, 10000, 15000, 4000],
                barThickness: 32
            },
            {
                type: 'bar',
                label: 'Advertising',
                backgroundColor: documentStyle.getPropertyValue('--p-primary-300'),
                data: [2100, 8400, 2400, 7500],
                barThickness: 32
            },
            {
                type: 'bar',
                label: 'Affiliate',
                backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                data: [4100, 5200, 3400, 7400],
                borderRadius: {
                    topLeft: 8,
                    topRight: 8
                },
                borderSkipped: true,
                barThickness: 32
            }
        ]
    };
}

function setChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const borderColor = documentStyle.getPropertyValue('--surface-border');
    const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: textMutedColor
                },
                grid: {
                    color: 'transparent',
                    borderColor: 'transparent'
                }
            },
            y: {
                stacked: true,
                ticks: {
                    color: textMutedColor
                },
                grid: {
                    color: borderColor,
                    borderColor: 'transparent',
                    drawTicks: false
                }
            }
        }
    };
}

watch([getPrimary, getSurface, isDarkTheme], () => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});
</script>

<template>
    <div class="grid grid-cols-12 gap-8">
        <!-- <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">الطلبات</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">0</div>
                    </div>
                    <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-shopping-cart text-blue-500 !text-xl"></i>
                    </div>
                </div>
                <!-- <span class="text-primary font-medium">24 new </span>
                <span class="text-muted-color">since last visit</span> -->
        <!-- </div>
        </div> -->
    <!-- VIP Wallet Card -->
    <div dir="rtl" v-if="wallet" class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0 bg-gradient-to-r from-green-500 to-green-800 text-white">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-white font-medium mb-4">محفظتي</span>
                        <div class="text-white font-medium text-xl">{{ wallet.balance }} د.ل</div>
                    </div>
                    <div class="flex items-center justify-center bg-white/20 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-wallet text-white !text-xl"></i>
                    </div>
                </div>
                <div class="text-sm">
                    <div>اخر تحديث: {{ new Date(wallet.updated_at).toLocaleString() }}</div>
                    <div>تاريخ الانشاء: {{ new Date(wallet.created_at).toLocaleString() }}</div>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">التصنيفات</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ statistics.total_categories }}
                        </div>
                    </div>
                    <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-bars text-orange-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">لا محدود</span>
                <span class="text-muted-color">الإجمالي</span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">الفئات المخزنة</span>
                        <div style="color: #433878 !important" class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ statistics.max_quantity }} المسموح</div>
                        <!-- <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">20</div> -->
                    </div>
                    <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-box text-cyan-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">{{ statistics.total_quantity }} </span>
                <span class="text-muted-color">إجمالي الكميات</span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">المنتجات</span>
                        <div style="color: #433878 !important" class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ statistics.max_products }} المسموح</div>
                    </div>
                    <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-tags text-purple-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">{{ statistics.total_products }} </span>
                <span class="text-muted-color">العدد الإجمالي</span>
            </div>
        </div>

        <div class="col-span-12 xl:col-span-6">
            <div class="card">
                <div class="font-semibold text-xl mb-4 text-right">أخر المنتجات التي تم إضافتها</div>
                <DataTable :value="products" :rows="5" :paginator="true" responsiveLayout="scroll">
                    <Column style="width: 15%" header="View">
                        <template #body>
                            <Button icon="pi pi-search" type="button" class="p-button-text"></Button>
                        </template>
                    </Column>

                    <Column field="price" header="السعر" :sortable="true" style="width: 35%">
                        <template #body="slotProps">
                            {{ slotProps.data.price }}
                        </template>
                    </Column>
                    <Column field="name" header="الإسم" :sortable="true" style="width: 35%"></Column>
                    <Column style="width: 15%" header="الصورة">
                        <template #body="slotProps">
                            <img :src="`http://127.0.0.1:8000/storage/${slotProps.data.image}`" :alt="slotProps.data.image" width="50" class="shadow" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        
        </div>
        <div class="col-span-12 xl:col-span-6">
            <div class="card">
                <div class="font-semibold text-xl mb-4">الاحصائيات البيانية</div>
                <Chart type="bar" :data="chartData" :options="chartOptions" class="h-80" />
            </div>
            <div class="card">
                <div class="flex items-center justify-between mb-6">
                    <div class="font-semibold text-xl">الاشعارات</div>
                    <div>
                        <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" @click="$refs.menu1.toggle($event)"></Button>
                        <Menu ref="menu1" :popup="true" :model="items" class="!min-w-40"></Menu>
                    </div>
                </div>

               
            </div>
        </div>
    </div>
</template>
