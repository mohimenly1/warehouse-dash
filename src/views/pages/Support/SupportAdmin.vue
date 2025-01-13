<template>
    <div dir="rtl" class="admin-tickets-container">
        <h2 class="section-title">تذاكر الدعم</h2>

        <!-- Tickets Table -->
        <div v-if="tickets.length === 0" class="no-tickets">
            <p>لا توجد تذاكر لعرضها.</p>
        </div>
        <div v-else>
            <table class="tickets-table">
                <thead>
                    <tr>
                        <th>المستخدم</th>
                        <th>العنوان</th>
                        <th>الوصف</th>
                        <th>الحالة</th>
                        <th>الردود</th>
                        <th>إرسال رد</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ticket in tickets" :key="ticket.id">
                        <!-- User who sent the ticket -->
                        <td>
                            <div class="user-info">
                                <i class="fas fa-user"></i> {{ ticket.user.name }}
                            </div>
                        </td>

                        <!-- Ticket Title -->
                        <td>{{ ticket.title }}</td>

                        <!-- Ticket Description -->
                        <td>{{ ticket.description }}</td>

                        <!-- Ticket Status -->
                        <td>
                            <span :class="ticket.status === 'open' ? 'status-open' : 'status-closed'">
                                {{ ticket.status === 'open' ? 'مفتوحة' : 'مغلقة' }}
                            </span>
                        </td>

                        <!-- Ticket Responses -->
                        <td>
                            <div v-if="ticket.responses.length > 0" class="responses-section">
                                <div v-for="response in ticket.responses" :key="response.id" class="response-card">
                                    <p class="response-text">{{ response.response }}</p>
                                    <p class="response-meta">
                                        <i class="fas fa-user"></i> بواسطة: {{ response.admin.name }}
                                        <i class="fas fa-clock"></i> {{ formatDate(response.created_at) }}
                                    </p>
                                </div>
                            </div>
                            <div v-else>
                                <p>لا توجد ردود.</p>
                            </div>
                        </td>

                        <!-- Response Form -->
                        <td>
                            <form @submit.prevent="respondToTicket(ticket)" class="response-form">
                                <textarea
                                    v-model="ticket.response"
                                    class="response-textarea"
                                    placeholder="أدخل ردك هنا..."
                                    :disabled="ticket.status === 'closed'" 
                                    required
                                ></textarea>
                                <button
                                    type="submit"
                                    class="submit-button"
                                    :disabled="ticket.status === 'closed'"
                                >
                                    <i class="fas fa-paper-plane"></i> إرسال الرد
                                </button>
                            </form>
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
            tickets: [],
        };
    },
    methods: {
        async fetchTickets() {
            try {
                const response = await apiClient.get('/admin/tickets');
                this.tickets = response.data;
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        },
        async respondToTicket(ticket) {
            try {
                // Get admin_id from local storage
                const adminId = localStorage.getItem('user_id');

                if (!adminId) {
                    throw new Error('Admin ID not found in local storage.');
                }

                const response = await apiClient.post(`/admin/tickets/${ticket.id}/respond`, {
                    response: ticket.response,
                    admin_id: adminId, // Pass admin_id from local storage
                });

                // Update the ticket status to "closed"
                ticket.status = 'closed';

                // Reset the response textarea
                ticket.response = '';

                // Fetch the latest tickets to refresh the table
                await this.fetchTickets();

                // Show success toast
                this.$toast.success('تم إرسال الرد بنجاح.');
            } catch (error) {
                console.error('Error responding to ticket:', error);
                this.$toast.error('حدث خطأ أثناء إرسال الرد.');
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleString('ar-EG'); // Format date in Arabic
        },
    },
    created() {
        this.fetchTickets();
    },
};
</script>

<style scoped>
.admin-tickets-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.section-title {
    font-size: 24px;
    color: #2c3e50;
    margin-bottom: 20px;
    text-align: center;
}

.no-tickets {
    text-align: center;
    color: #7f8c8d;
    font-size: 18px;
}

.tickets-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.tickets-table th,
.tickets-table td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: center;
}

.tickets-table th {
    background-color: #f8f9fa;
    font-weight: bold;
    color: #2c3e50;
}

.tickets-table tbody tr:hover {
    background-color: #f1f1f1;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 8px;
}

.user-info i {
    color: #3498db;
}

.status-open {
    color: #27ae60;
    font-weight: bold;
}

.status-closed {
    color: #e74c3c;
    font-weight: bold;
}

.responses-section {
    max-height: 150px;
    overflow-y: auto;
}

.response-card {
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
}

.response-text {
    font-size: 14px;
    color: #34495e;
    margin: 0;
}

.response-meta {
    font-size: 12px;
    color: #7f8c8d;
    margin: 5px 0 0;
}

.response-meta i {
    margin-left: 5px;
}

.response-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.response-textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
    resize: vertical;
    min-height: 100px;
}

.submit-button {
    background-color: #3498db;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.submit-button:hover {
    background-color: #2980b9;
}

.submit-button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
}

.submit-button i {
    margin-left: 5px;
}
</style>