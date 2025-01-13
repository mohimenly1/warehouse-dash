<template>
    <div>
      <h1>طلبات التخزين</h1>
      <DataTable :value="stockingRequests" :loading="loading">
        <Column field="client.name" header="العميل"></Column>
        <Column field="warehouse.name" header="المخزن"></Column>
        <Column field="description" header="وصف المنتجات"></Column>
        <Column field="subscription_amount" header="مبلغ الاشتراك"></Column>
        <Column field="status" header="الحالة">
          <template #body="{ data }">
            <Tag :value="data.status" :severity="getStatusSeverity(data.status)" />
          </template>
        </Column>
        <Column header="الإجراءات">
          <template #body="{ data }">
            <Button 
              label="قبول" 
              class="p-button-success" 
              :disabled="data.status !== 'pending'" 
              @click="openAcceptDialog(data)" 
            />
            <Button 
              label="رفض" 
              class="p-button-danger" 
              :disabled="data.status !== 'pending'" 
              @click="declineRequest(data.id)" 
            />
          </template>
        </Column>
      </DataTable>
  
      <!-- Dialog to Accept Request and Set Subscription Amount -->
      <Dialog v-model:visible="acceptDialogVisible" header="قبول طلب التخزين">
        <p>وصف المنتجات: {{ selectedRequest?.description }}</p>
        <label for="subscriptionAmount">مبلغ الاشتراك:</label>
        <InputNumber id="subscriptionAmount" v-model="subscriptionAmount" required />
        <Button label="إرسال" @click="acceptRequest" />
      </Dialog>
    </div>
  </template>
  
  <script>
  import apiClient from '@/plugins/axios';
  
  export default {
    data() {
      return {
        stockingRequests: [],
        loading: true,
        acceptDialogVisible: false,
        selectedRequest: null,
        subscriptionAmount: null,
      };
    },
    async created() {
      await this.fetchStockingRequests();
    },
    methods: {
      async fetchStockingRequests() {
        try {
          const warehouseId = localStorage.getItem('warehouse_id');
          const response = await apiClient.get(`/stocking-requests/${warehouseId}`);
          this.stockingRequests = response.data.requests;
        } catch (error) {
          console.error('Failed to fetch stocking requests:', error);
        } finally {
          this.loading = false;
        }
      },
      openAcceptDialog(request) {
        this.selectedRequest = request;
        this.acceptDialogVisible = true;
      },
      async acceptRequest() {
        try {
          await apiClient.put(`/stocking-requests/${this.selectedRequest.id}/accept`, {
            subscription_amount: this.subscriptionAmount,
          });
          this.$toast.add({
            severity: 'success',
            summary: 'تم القبول بنجاح',
            detail: 'تم قبول طلب التخزين بنجاح.',
          });
          this.acceptDialogVisible = false;
          this.fetchStockingRequests(); // Refresh the list
        } catch (error) {
          this.$toast.add({
            severity: 'error',
            summary: 'خطأ',
            detail: error.response?.data?.message || 'فشل في قبول الطلب.',
          });
        }
      },
      async declineRequest(id) {
        try {
          await apiClient.put(`/stocking-requests/${id}/decline`);
          this.$toast.add({
            severity: 'success',
            summary: 'تم الرفض بنجاح',
            detail: 'تم رفض طلب التخزين بنجاح.',
          });
          this.fetchStockingRequests(); // Refresh the list
        } catch (error) {
          this.$toast.add({
            severity: 'error',
            summary: 'خطأ',
            detail: error.response?.data?.message || 'فشل في رفض الطلب.',
          });
        }
      },
      getStatusSeverity(status) {
        switch (status) {
          case 'pending':
            return 'warning';
          case 'accepted':
            return 'success';
          case 'declined':
            return 'danger';
          default:
            return 'info';
        }
      },
    },
  };
  </script>

<style scoped>
h1 {
    margin-bottom: 1rem;
}
.p-button-success {
    margin-right: 0.5rem;
}
</style>