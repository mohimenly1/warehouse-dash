<template>
    <Dialog v-model:visible="visible" header="تخزين المنتجات" :modal="true">
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
  </template>
  
  <script>
  import apiClient from '@/plugins/axios';
  
  export default {
    props: {
      visible: Boolean,
      stockingRequestId: Number,
      warehouseId: Number,
    },
    data() {
      return {
        product: {
          name: '',
          quantity: null,
          price: null,
          expiryDate: null,
        },
      };
    },
    methods: {
      async assignProducts() {
        try {
          const response = await apiClient.post('/assign-products', {
            stocking_request_id: this.stockingRequestId,
            warehouse_id: this.warehouseId,
            product: this.product,
          });
  
          this.$emit('product-assigned');
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