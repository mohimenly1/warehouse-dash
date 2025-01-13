<template>
    <div>
        <h1>Rent Management</h1>
        <div v-if="loading">Loading...</div>
        <div v-else>
            <table class="table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Warehouse</th>
                        <th>Width</th>
                        <th>Height</th>
                        <th>Total Price</th>
                        <th>Rent Status</th>
                        <th>User Status</th>
                        <th>Payment Status</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rent in rentRequests" :key="rent.id">
                        <td>{{ rent.user.name }}</td>
                        <td>{{ rent.user.email }}</td>
                        <td>{{ rent.user.username }}</td>
                        <td>{{ rent.warehouse.name }}</td>
                        <td>{{ rent.width }}</td>
                        <td>{{ rent.height }}</td>
                        <td>{{ rent.total_price }}</td>
                        <td>{{ rent.active ? 'Active' : 'Pending' }}</td>
                        <td>
                            <select
                                :value="rent.user.status"
                                @change="updateUserStatus(rent.user.id, $event)"
                            >
                                <option value="pending">Pending</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </td>
                        <td>
                            <button
                                @click="togglePaymentStatus(rent.user.id, !rent.user.is_paid)"
                                :class="['btn', rent.user.is_paid ? 'btn-success' : 'btn-danger']"
                            >
                                {{ rent.user.is_paid ? 'Paid' : 'Unpaid' }}
                            </button>
                        </td>
                        <td>{{ new Date(rent.created_at).toLocaleString() }}</td>
                        <td>
                            <button
                                :disabled="rent.active"
                                @click="handleRentResponse(rent.id, 'accept')"
                                class="btn btn-success"
                            >
                                Accept
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import apiClient from '@/plugins/axios';

export default {
    data() {
        return {
            rentRequests: [],
            loading: true,
            warehouseId: localStorage.getItem('warehouse_id'), // Get warehouse_id from local storage
        };
    },
    async created() {
        await this.fetchRentRequests();
    },
    methods: {
        async fetchRentRequests() {
            try {
                const response = await apiClient.get(`/rent-requests/${this.warehouseId}`);
                this.rentRequests = response.data.data;
            } catch (error) {
                console.error('Failed to fetch rent requests:', error);
            } finally {
                this.loading = false;
            }
        },
        async handleRentResponse(rentClientId, response) {
            try {
                const payload = {
                    rent_client_id: rentClientId,
                    response: response,
                };
                await apiClient.post('/rent-client/response', payload);
                this.fetchRentRequests(); // Refresh the list after handling the response
            } catch (error) {
                console.error('Failed to handle rent response:', error);
            }
        },
        async updateUserStatus(userId, event) {
            const status = event.target.value;
            try {
                await apiClient.put(`/users/${userId}/status`, { status });
                this.fetchRentRequests(); // Refresh the list after updating the status
            } catch (error) {
                console.error('Failed to update user status:', error);
            }
        },
        async togglePaymentStatus(userId, isPaid) {
            try {
                await apiClient.put(`/users/${userId}/payment-status`, { is_paid: isPaid });
                this.fetchRentRequests(); // Refresh the list after updating the payment status
            } catch (error) {
                console.error('Failed to update payment status:', error);
            }
        },
    },
};
</script>

<style scoped>
.table {
    width: 100%;
    border-collapse: collapse;
}
.table th,
.table td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: left;
}
.table th {
    background-color: #f4f4f4;
}
.btn {
    padding: 5px 10px;
    margin: 2px;
    border: none;
    cursor: pointer;
}
.btn-success {
    background-color: #28a745;
    color: white;
}
.btn-danger {
    background-color: #dc3545;
    color: white;
}
.btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
select {
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ddd;
}
</style>