<template>
    <div>
      <h1>طلبات التخزين الخاصة بي</h1>
      <DataTable :value="stockingRequests" :loading="loading">
        <Column field="warehouse.name" header="المخزن"></Column>
        <Column field="description" header="وصف المنتجات"></Column>
        <Column field="is_paid" header="تم الدفع ؟"></Column>
        <Column field="status" header="الحالة">
          <template #body="{ data }">
            <Tag :value="data.status" :severity="getStatusSeverity(data.status)" />
          </template>
        </Column>
        <Column field="subscription_amount" header="مبلغ الاشتراك">
          <template #body="{ data }">
            {{ data.subscription_amount ? `${data.subscription_amount} ليبي` : 'لم يتم التعيين بعد' }}
          </template>
        </Column>
        <Column header="الإجراءات">
          <template #body="{ data }">
            <Button
              v-if="data.status === 'accepted' && !data.is_paid"
              label="دفع"
              class="p-button-success"
              @click="openPaymentDialog(data)"
            />
          </template>
        </Column>
      </DataTable>
  
      <!-- Payment Dialog -->
      <Dialog v-model:visible="paymentDialogVisible" header="دفع مبلغ الاشتراك" :modal="true">
        <form @submit.prevent="processPayment">
          <!-- Payment Method Selection -->
          <div class="form-group">
            <label for="paymentMethod">طريقة الدفع:</label>
            <Dropdown
              id="paymentMethod"
              v-model="paymentMethod"
              :options="paymentMethods"
              optionLabel="label"
              optionValue="value"
              placeholder="اختر طريقة الدفع"
              required
            />
          </div>
  
          <!-- Voucher Code Input (Visible if Voucher is Selected) -->
          <div v-if="paymentMethod === 'voucher'" class="form-group">
            <label for="voucherCode">كود الكوبون:</label>
            <InputText id="voucherCode" v-model="voucherCode" required />
          </div>
  
          <!-- Credit Card Inputs (Visible if Credit Card is Selected) -->
          <div v-if="paymentMethod === 'credit_card'" class="form-group">
            <label for="cardNumber">رقم البطاقة:</label>
            <InputText id="cardNumber" v-model="cardNumber" required />
            <label for="expirationDate">تاريخ الانتهاء:</label>
            <InputText id="expirationDate" v-model="expirationDate" placeholder="MM/YY" required />
            <label for="cvv">CVV:</label>
            <InputText id="cvv" v-model="cvv" required />
          </div>
  
          <!-- Submit Button -->
          <Button label="دفع" type="submit" class="submit-button" />
        </form>
      </Dialog>
  
      <!-- Product Assignment Dialog -->
      <Dialog v-model:visible="productAssignmentDialogVisible" header="تخزين المنتجات" :modal="true">
        <form @submit.prevent="assignProducts">
          <!-- Product Details -->
          <div class="form-group">
            <label for="productName">اسم المنتج:</label>
            <InputText id="productName" v-model="product.name" required />
          </div>
          <div class="form-group">
            <label for="quantity">الكمية:</label>
            <InputNumber id="quantity" v-model="product.quantity" required />
          </div>
          <div class="form-group">
            <label for="price">السعر:</label>
            <InputNumber id="price" v-model="product.price" required />
          </div>
          <div class="form-group">
            <label for="expiryDate">تاريخ الانتهاء:</label>
            <Calendar id="expiryDate" v-model="product.expiryDate" dateFormat="yy-mm-dd" required />
          </div>
  
          <!-- Submit Button -->
          <Button label="تخزين المنتج" type="submit" class="submit-button" />
        </form>
      </Dialog>
    </div>
  </template>
  
  <script>
  import apiClient from '@/plugins/axios';
  
  export default {
    data() {
      return {
        stockingRequests: [], // List of stocking requests
        loading: true, // Loading state
        paymentDialogVisible: false, // Payment dialog visibility
        productAssignmentDialogVisible: false, // Product assignment dialog visibility
        selectedRequest: null, // Selected request for payment
        paymentMethod: null, // Selected payment method
        voucherCode: '', // Voucher code
        cardNumber: '', // Credit card number
        expirationDate: '', // Expiration date
        cvv: '', // CVV
        product: {
          name: '',
          quantity: null,
          price: null,
          expiryDate: null,
        },
        paymentMethods: [
          { label: 'كوبون', value: 'voucher' },
          { label: 'بطاقة ائتمان', value: 'credit_card' },
        ],
      };
    },
    async created() {
      await this.fetchClientStockingRequests();
    },
    methods: {
      async fetchClientStockingRequests() {
        try {
          const clientId = localStorage.getItem('user_id'); // Get client ID from local storage
          const response = await apiClient.get(`/client-stocking-requests/${clientId}`);
          this.stockingRequests = response.data.requests;
        } catch (error) {
          console.error('Failed to fetch stocking requests:', error);
          this.$toast.add({
            severity: 'error',
            summary: 'خطأ',
            detail: 'فشل في جلب طلبات التخزين.',
          });
        } finally {
          this.loading = false;
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
      openPaymentDialog(request) {
        this.selectedRequest = request;
        this.paymentDialogVisible = true;
      },
      async processPayment() {
        try {
          if (this.paymentMethod === 'voucher') {
            // Validate voucher code and amount
            const response = await apiClient.post('/validate-voucher', {
              code: this.voucherCode,
              amount: this.selectedRequest.subscription_amount,
            });
  
            if (!response.data.valid) {
              throw new Error('الكوبون غير صالح أو المبلغ غير مطابق.');
            }
          }
  
          // Mark the stocking request as paid
          await apiClient.put(`/stocking-requests/${this.selectedRequest.id}/mark-as-paid`);
  
          // Close the payment dialog and open the product assignment dialog
          this.paymentDialogVisible = false;
          this.productAssignmentDialogVisible = true;
  
          // Show success message
          this.$toast.add({
            severity: 'success',
            summary: 'تم الدفع بنجاح',
            detail: 'تم دفع مبلغ الاشتراك بنجاح.',
          });
        } catch (error) {
          this.$toast.add({
            severity: 'error',
            summary: 'خطأ',
            detail: error.response?.data?.message || error.message,
          });
        }
      },
      async assignProducts() {
    try {
        const user_id = localStorage.getItem('user_id'); // Get user_id from local storage

        // Format the expiry date to YYYY-MM-DD
        const formattedExpiryDate = new Date(this.product.expiryDate).toISOString().split('T')[0];

        const response = await apiClient.post('/assign-products', {
            stocking_request_id: this.selectedRequest.id,
            warehouse_id: this.selectedRequest.warehouse_id,
            user_id: user_id, // Pass the user_id
            product: {
                ...this.product,
                expiryDate: formattedExpiryDate, // Use the formatted expiry date
            },
        });

        // Close the product assignment dialog and refresh the list
        this.productAssignmentDialogVisible = false;
        this.fetchClientStockingRequests();

        // Show success message
        this.$toast.add({
            severity: 'success',
            summary: 'تم التخزين بنجاح',
            detail: 'تم تخزين المنتج بنجاح.',
        });
    } catch (error) {
        this.$toast.add({
            severity: 'error',
            summary: 'خطأ',
            detail: error.response?.data?.message || 'فشل في تخزين المنتج.',
        });
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