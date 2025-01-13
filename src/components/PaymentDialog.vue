<template>
    <Dialog :v-model:visible="visible" header="دفع مبلغ الاشتراك" :modal="true">
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
  </template>
  
  <script>
  import apiClient from '@/plugins/axios';
  
  export default {
    props: {
      visible: Boolean,
      subscriptionAmount: Number,
      stockingRequestId: Number,
    },
    data() {
      return {
        paymentMethod: null,
        voucherCode: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        paymentMethods: [
          { label: 'كوبون', value: 'voucher' },
          { label: 'بطاقة ائتمان', value: 'credit_card' },
        ],
      };
    },
    methods: {
      async processPayment() {
        try {
          if (this.paymentMethod === 'voucher') {
            // Validate voucher code and amount
            const response = await apiClient.post('/validate-voucher', {
              code: this.voucherCode,
              amount: this.subscriptionAmount,
            });
  
            if (!response.data.valid) {
              throw new Error('الكوبون غير صالح أو المبلغ غير مطابق.');
            }
          }
  
          // Mark the stocking request as paid
          await apiClient.put(`/stocking-requests/${this.stockingRequestId}/mark-as-paid`);
  
          // Emit success event
          this.$emit('payment-success');
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
    },
  };
  </script>