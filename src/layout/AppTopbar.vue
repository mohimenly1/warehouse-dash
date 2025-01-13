<script setup>
import { useLayout } from '@/layout/composables/layout';
import apiClient from '@/plugins/axios';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

// Retrieve the user's name and type from the Vuex store
const userName = computed(() => store.getters['auth/userName']);
const userType = computed(() => store.getters['auth/userType']);
const userId = computed(() => store.getters['auth/userId']); // Get user ID from Vuex store
const warehouseId = computed(() => store.getters['auth/warehouseId']); // Get warehouse ID from Vuex store

// State for notifications
const notifications = ref([]);
const unreadCount = ref(0);
const showNotificationDialog = ref(false); // Control visibility of the notification dialog

// Fetch notifications for the warehouse owner
async function fetchNotifications() {
    try {
        const response = await apiClient.get(`/notifications?user_id=${userId.value}`);
        notifications.value = response.data;
        unreadCount.value = notifications.value.filter(notification => !notification.is_read).length;
    } catch (error) {
        console.error('Failed to fetch notifications:', error);
    }
}

// Mark a notification as read
async function markAsRead(notificationId) {
    try {
        await apiClient.patch(`/notifications/${notificationId}/read`);
        fetchNotifications(); // Refresh the notifications list
    } catch (error) {
        console.error('Failed to mark notification as read:', error);
    }
}

// Format money with commas and currency symbol
function formatMoney(amount) {
    return amount.toLocaleString('ar-LY', {
        style: 'currency',
        currency: 'LYD',
    });
}
// Handle rent request response (accept or decline)
async function handleRentResponse(rentClientId, response) {
    try {
        const responseData = await apiClient.post('/rent-client/response', {
            rent_client_id: rentClientId,
            response: response, // 'accept' or 'decline'
        });

        // Refresh notifications after handling the response
        fetchNotifications();

        // Show success message
        console.log(responseData.data.message);
    } catch (error) {
        console.error('Failed to handle rent response:', error);
    }
}

// Logout function
function logout() {
    console.log('Logging out...');
    store.commit('auth/CLEAR_AUTH_DATA');
    router.push({ name: 'login' });
}

// Fetch notifications when the component is mounted
onMounted(() => {
    fetchNotifications();
});

const nestedMenuitems = ref([
    {
        label: userName.value || 'إسم المستخدم هنا',
        icon: 'pi pi-fw pi-user',
        items: [
            {
                label: 'الإعدادات',
                icon: 'pi pi-fw pi-cog'
            },
            {
                label: 'معلومات مخزني',
                icon: 'pi pi-fw pi-file'
            }
        ]
    },
    {
        label: 'تسجيل الخروج',
        icon: 'pi pi-fw pi-sign-out',
        command: logout
    }
]);

const nestedMenuitemsAdmin = ref([
    {
        label: userName.value || 'إسم المستخدم هنا',
        icon: 'pi pi-fw pi-user',
        items: [
            {
                label: 'الإعدادات',
                icon: 'pi pi-fw pi-cog'
            }
        ]
    },
    {
        label: 'تسجيل الخروج',
        icon: 'pi pi-fw pi-sign-out',
        command: logout
    }
]);

const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();
</script>

<template>
    <div style="justify-content: space-around" class="layout-topbar">
        <Menubar v-if="userType === 'admin'" :model="nestedMenuitemsAdmin">
            <template #end>
                <p style="color: #00ff9c">KEEP SPACE</p>
            </template>
        </Menubar>
        <Menubar v-else :model="nestedMenuitems">
            <template #end>
                <!-- Bell Icon for Notifications -->
                <div class="notification-bell" @click="showNotificationDialog = true">
                    <i class="pi pi-bell p-overlay-badge">
                        <Badge v-if="unreadCount > 0" :value="unreadCount" severity="danger"></Badge>
                    </i>
                </div>
                <p style="color: #00ff9c">KEEP SPACE</p>
            </template>
        </Menubar>

        <!-- Notification Dialog -->
        <Dialog v-model:visible="showNotificationDialog" modal :style="{ width: '500px' }" header="Notifications">
            <div v-if="notifications.length > 0" class="notification-list">
                <div v-for="notification in notifications" :key="notification.id" class="notification-item">
                    <p>{{ notification.message }}</p>
                    <div class="notification-details">
                        <div class="detail-item">
                            <i class="pi pi-user detail-icon"></i>
                            <span>{{ notification.rent_client.name }}</span>
                        </div>
                        <div class="detail-item">
                            <i class="pi pi-envelope detail-icon"></i>
                            <span>{{ notification.rent_client.email }}</span>
                        </div>
                        <div class="detail-item">
                            <i class="pi pi-money-bill detail-icon"></i>
                            <span>{{ formatMoney(notification.rent_client.total_price) }} ليبي</span>
                        </div>
                    </div>
                    <div v-if="!notification.is_read" class="notification-actions">
                        <Button 
                            label="Accept" 
                            icon="pi pi-check" 
                            class="p-button-success" 
                            @click="handleRentResponse(notification.rent_client_id, 'accept')" 
                            :disabled="notification.is_read" 
                        />
                        <Button 
                            label="Decline" 
                            icon="pi pi-times" 
                            class="p-button-danger" 
                            @click="handleRentResponse(notification.rent_client_id, 'decline')" 
                            :disabled="notification.is_read" 
                        />
                    </div>
                </div>
            </div>
            <div v-else>
                <p>No notifications available.</p>
            </div>
        </Dialog>
    </div>
</template>

<style scoped>
.notification-bell {
    position: relative;
    cursor: pointer;
    margin-right: 20px;
}

.notification-list {
    max-height: 400px;
    overflow-y: auto;
}

.notification-item {
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

.notification-item:last-child {
    border-bottom: none;
}

.notification-details {
    margin-top: 10px;
}

.detail-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 5px;
}

.detail-icon {
    color: #6366f1; /* Icon color */
}

.notification-actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}
</style>