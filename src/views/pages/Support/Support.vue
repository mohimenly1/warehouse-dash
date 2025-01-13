<template>
    <div dir="rtl" class="support-tickets-container">
        <!-- Create Ticket Section -->
        <div class="create-ticket-section">
            <h2 class="section-title">إنشاء تذكرة دعم</h2>
            <form @submit.prevent="createTicket" class="ticket-form">
                <div class="form-group">
                    <label for="title" class="form-label">عنوان التذكرة:</label>
                    <input
                        type="text"
                        v-model="ticket.title"
                        id="title"
                        class="form-input"
                        placeholder="أدخل عنوان التذكرة"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="description" class="form-label">وصف التذكرة:</label>
                    <textarea
                        v-model="ticket.description"
                        id="description"
                        class="form-textarea"
                        placeholder="أدخل وصف التذكرة"
                        required
                    ></textarea>
                </div>
                <button type="submit" class="submit-button">إرسال التذكرة</button>
            </form>
        </div>

        <!-- My Tickets Section -->
        <div class="my-tickets-section">
            <h2 class="section-title">التذاكر الخاصة بي</h2>
            <div v-if="tickets.length === 0" class="no-tickets">
                <p>لا توجد تذاكر لعرضها.</p>
            </div>
            <div v-else>
                <div v-for="ticket in tickets" :key="ticket.id" class="ticket-card">
                    <h3 class="ticket-title">{{ ticket.title }}</h3>
                    <p class="ticket-description">{{ ticket.description }}</p>
                    <p class="ticket-status">
                        الحالة: 
                        <span :class="ticket.status === 'open' ? 'status-open' : 'status-closed'">
                            {{ ticket.status === 'open' ? 'مفتوحة' : 'مغلقة' }}
                        </span>
                    </p>

                    <!-- Ticket Responses -->
                    <div v-if="ticket.responses && ticket.responses.length > 0" class="responses-section">
                        <h4 class="responses-title">الردود:</h4>
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import apiClient from '@/plugins/axios';


export default {
    data() {
        return {
            ticket: {
                title: '',
                description: '',
            },
            tickets: [],
        };
    },
    methods: {
        async createTicket() {
            try {
                // Get user_id from local storage
                const userId = localStorage.getItem('user_id');

                if (!userId) {
                    throw new Error('User ID not found in local storage.');
                }

                // Include user_id in the request payload
                const payload = {
                    ...this.ticket,
                    user_id: userId,
                };

                const response = await apiClient.post('/tickets', payload);

                // Reset the form
                this.ticket = { title: '', description: '' };

                // Fetch the latest tickets to refresh the table
                await this.fetchTickets();

                // Show success toast
                this.$toast.add('تم إرسال التذكرة بنجاح.');
            } catch (error) {
                console.error('Error creating ticket:', error);
                this.$toast.add('حدث خطأ أثناء إرسال التذكرة.');
            }
        },
        async fetchTickets() {
            try {
                const userId = localStorage.getItem('user_id');

                if (!userId) {
                    throw new Error('User ID not found in local storage.');
                }

                const response = await apiClient.get('/tickets', {
                    params: { user_id: userId }, // Pass user_id as a query parameter
                });

                // Ensure each ticket has a responses array
                this.tickets = response.data.map(ticket => ({
                    ...ticket,
                    responses: ticket.responses || [], // Initialize responses as an empty array if undefined
                }));
            } catch (error) {
                console.error('Error fetching tickets:', error);
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
.support-tickets-container {
    max-width: 800px;
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

.ticket-form {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 15px;
}

.form-label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #34495e;
}

.form-input,
.form-textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    color: #333;
    transition: border-color 0.3s;
}

.form-input:focus,
.form-textarea:focus {
    border-color: #3498db;
    outline: none;
}

.form-textarea {
    resize: vertical;
    min-height: 100px;
}

.submit-button {
    background-color: #3498db;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.submit-button:hover {
    background-color: #2980b9;
}

.my-tickets-section {
    margin-top: 40px;
}

.no-tickets {
    text-align: center;
    color: #7f8c8d;
    font-size: 18px;
}

.ticket-card {
    background-color: #ffffff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 15px;
}

.ticket-title {
    font-size: 20px;
    color: #2c3e50;
    margin-bottom: 10px;
}

.ticket-description {
    font-size: 16px;
    color: #34495e;
    margin-bottom: 10px;
}

.ticket-status {
    font-size: 14px;
    color: #7f8c8d;
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
    margin-top: 20px;
}

.responses-title {
    font-size: 18px;
    color: #2c3e50;
    margin-bottom: 10px;
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
</style>