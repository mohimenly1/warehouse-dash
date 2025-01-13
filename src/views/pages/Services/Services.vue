<template>
        <div class="bg-surface-0 dark:bg-surface-900">
        <div id="home" class="landing-wrapper overflow-hidden">
            <header class="bg-white shadow-lg h-24 hidden md:flex">
                <a href="" class="border flex-shrink-0 flex items-center justify-center px-4 lg:px-6 xl:px-8">
                    <img style="width: 50%" class="" src="/public/demo/images/logo.png" alt="" />
                </a>
                <nav class="header-links contents font-semibold text-base lg:text-lg">
                    <ul class="flex items-center ml-4 xl:ml-8 mr-auto">
                        <li class="p-3 xl:p-6">
                            <a href="">
                                <span>تواصل معنا</span>
                            </a>
                        </li>
                        <li class="p-3 xl:p-6">
                            <a href="">
                                <span>KEEP SPACE عن</span>
                            </a>
                        </li>
                        <li class="p-3 xl:p-6">
                            <a href="">
                                <span>مشاريعنا</span>
                            </a>
                        </li>
                        <li class="p-3 xl:p-6">
                            <a href="/our-services">
                                <span>خدماتنا</span>
                            </a>
                        </li>
                        <li class="p-3 xl:p-6 active">
                            <a href="/landing">
                                <span>الرئيسية</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <nav class="hidden xl:contents">
                    <ul class="flex items-center mr-4 lg:mr-6 xl:mr-8">
                        <li class="p-1">
                            <a href="" class="inline-block rounded-full border p-2 hover:shadow-lg hover:border-opacity-0 duration-200 hover:-translate-y-0.5">
                                <svg class="h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path
                                        fill="currentColor"
                                        d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                                    ></path>
                                </svg>
                            </a>
                        </li>
                        <li class="p-1">
                            <a href="" class="inline-block rounded-full border p-2 hover:shadow-lg hover:border-opacity-0 duration-200 hover:-translate-y-0.5">
                                <svg class="h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                    <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                                </svg>
                            </a>
                        </li>
                        <li class="p-1">
                            <a href="" class="inline-block rounded-full border p-2 hover:shadow-lg hover:border-opacity-0 duration-200 hover:-translate-y-0.5">
                                <svg class="h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin-in" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path
                                        fill="currentColor"
                                        d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                                    ></path>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </nav>
                <div class="border flex items-center px-4 lg:px-6 xl:px-8">
                    <a href="" class="mr-4 lg:mr-6 xl:mr-8">
                        <svg class="h-6 xl:h-8" aria-hidden="true" focusable="false" data-prefix="far" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path
                                fill="currentColor"
                                d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
                            ></path>
                        </svg>
                    </a>
                    <router-link to="/join">
                        <button style="background-color: #73ec8b; color: #091057 !important" class="text-white font-bold px-4 xl:px-6 py-2 xl:py-3 rounded">الإنظمام</button>
                    </router-link>
                    <div style="margin-right: 10px !important"></div>
                    <router-link to="/auth/login">
                        <button style="background-color: #091057" class="text-white font-bold px-4 xl:px-6 py-2 xl:py-3 rounded">تسجيل دخول</button>
                    </router-link>
                </div>
            </header>
        </div>
        </div>
    <div class="enterprise-warehouses">
        
        <!-- Header Section -->
        <div class="header">
            <h1>خدمات التخزين</h1>
            <p>تصفح المخزنات المتاحة للمشتركين في الباقة المؤسسية وتقدم بطلب لتخزين أو تأجير المساحات.</p>
        </div>

        <!-- Services Section -->
        <div class="services">
            <div class="service-card">
                <i class="fas fa-box-open service-icon"></i>
                <h2>اطلب لتخزين</h2>
                <p>احصل على مساحة آمنة لتخزين بضائعك مع أفضل الخدمات اللوجستية.</p>
                <button class="service-button" @click="requestStorage">
                    <i class="fas fa-arrow-left"></i> اطلب الآن
                </button>
            </div>
            <div class="service-card">
                <i class="fas fa-warehouse service-icon"></i>
                <h2>اطلب للايجار</h2>
                <p>استأجر مساحة في مخزناتنا لتلبية احتياجاتك التجارية.</p>
                <button class="service-button" @click="requestRent">
                    <i class="fas fa-arrow-left"></i> اطلب الآن
                </button>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading">
            <i class="fas fa-spinner fa-spin"></i> جاري التحميل...
        </div>

        <!-- Error State -->
        <div v-if="error" class="error">
            <i class="fas fa-exclamation-circle"></i> {{ error }}
        </div>

        <!-- Warehouses List -->
        <div v-if="warehouses.length > 0" class="warehouses-list">
            <div v-for="warehouse in warehouses" :key="warehouse.warehouse_name" class="warehouse-card">
    <div class="warehouse-info">
        <h2>{{ warehouse.warehouse_name }}</h2>
        <p><i class="fas fa-map-marker-alt"></i> الموقع: {{ warehouse.warehouse_location }}</p>
        <p><i class="fas fa-user"></i> المالك: {{ warehouse.user_name }} ({{ warehouse.user_email }})</p>
        <p v-if="warehouse.status === 'busy'" class="status-busy">
            <i class="fas fa-times-circle"></i> مشغول
        </p>
        <p v-if="warehouse.status === 'available'" class="status-available">
            <i class="fas fa-wifi"></i>متاح للحجز
        </p>
    </div>
    <div class="warehouse-actions">
        <button class="action-button" @click="applyToServeStock(warehouse)">
            <i class="fas fa-box"></i> التقديم للتخزين
        </button>
        <button class="action-button" @click="showRentDialog(warehouse)" :disabled="warehouse.status === 'busy'">
            <i class="fas fa-handshake"></i> التقديم للإيجار
        </button>
    </div>
</div>
        </div>

        <!-- No Warehouses Found -->
        <div v-else-if="!loading" class="no-warehouses">
            <i class="fas fa-box-open"></i> لا توجد مخزنات متاحة حاليًا.
        </div>

<!-- Rent Dialog -->
<Dialog v-model:visible="rentDialogVisible" :style="{ width: '600px', borderRadius: '12px' }" header="تفاصيل التأجير" :modal="true">
    <!-- Warehouse Details -->
    <div v-if="selectedWarehouse" class="warehouse-details">
        <div class="detail-item">
            <i class="fas fa-warehouse detail-icon"></i>
            <div class="detail-content">
                <strong>اسم المخزن:</strong>
                <span>{{ selectedWarehouse.warehouse_name }}</span>
            </div>
        </div>
        <div class="detail-item">
            <i class="fas fa-map-marker-alt detail-icon"></i>
            <div class="detail-content">
                <strong>الموقع:</strong>
                <span>{{ selectedWarehouse.warehouse_location }}</span>
            </div>
        </div>
        <div class="detail-item">
            <i class="fas fa-ruler-horizontal detail-icon"></i>
            <div class="detail-content">
                <strong>العرض:</strong>
                <span>{{ selectedWarehouse.width }} متر</span>
            </div>
        </div>
        <div class="detail-item">
            <i class="fas fa-ruler-vertical detail-icon"></i>
            <div class="detail-content">
                <strong>الارتفاع:</strong>
                <span>{{ selectedWarehouse.height }} متر</span>
            </div>
        </div>
        <div class="detail-item">
            <i class="fas fa-money-bill-wave detail-icon"></i>
            <div class="detail-content">
                <strong>السعر لكل متر:</strong>
                <span>{{ formatMoney(selectedWarehouse.price_per_meter) }} ليبي</span>
            </div>
        </div>
        <div class="detail-item total-price">
            <i class="fas fa-calculator detail-icon"></i>
            <div class="detail-content">
                <strong>التكلفة الإجمالية:</strong>
                <span class="money-amount">{{ formatMoney(totalPrice) }} ليبي</span>
            </div>
        </div>
    </div>

    <!-- Loading State -->
    <div v-if="loadingCalculation" class="loading-state">
        <div class="loading-background">
            <i class="fas fa-spinner fa-spin loading-icon"></i>
            <p>انتظر، نحن الآن نقوم بحساب تكلفة الإيجار لهذا المخزن...</p>
        </div>
    </div>

    <!-- Footer -->
    <template #footer>
        <Button 
            label="تأكيد الاستفادة من خدمة التأجير" 
            icon="pi pi-check" 
            class="confirm-button" 
            @click="confirmRent" 
            :disabled="loadingCalculation" 
        />
    </template>
</Dialog>

        <!-- Stocking Request Dialog -->
  <!-- Stocking Request Dialog -->
  <Dialog v-model:visible="stockingDialogVisible" header="طلب خدمة التخزين" :modal="true" :style="{ width: '600px', borderRadius: '12px' }">
    <form @submit.prevent="submitStockingRequest">
      <!-- Warehouse Details -->
      <div class="form-group">
        <label for="warehouse_name">اسم المخزن:</label>
        <InputText id="warehouse_name" v-model="selectedWarehouse.warehouse_name" disabled />
      </div>
      <div class="form-group">
        <label for="warehouse_location">موقع المخزن:</label>
        <InputText id="warehouse_location" v-model="selectedWarehouse.warehouse_location" disabled />
      </div>

      <!-- Registration Form for New Client -->
      <div v-if="!isLoggedIn">
        <h3>تسجيل مستخدم جديد</h3>
        <div class="form-group">
          <label for="name">الاسم:</label>
          <InputText id="name" v-model="registrationStockForm.name" required />
        </div>
        <div class="form-group">
          <label for="username">اسم المستخدم:</label>
          <InputText id="username" v-model="registrationStockForm.username" required />
        </div>
        <div class="form-group">
          <label for="email">البريد الإلكتروني:</label>
          <InputText id="email" v-model="registrationStockForm.email" type="email" required />
        </div>
        <div class="form-group">
          <label for="password">كلمة المرور:</label>
          <InputText id="password" v-model="registrationStockForm.password" type="password" required />
        </div>
      </div>

      <!-- Product Description -->
      <div class="form-group">
        <label for="description">وصف المنتجات:</label>
        <Textarea id="description" v-model="registrationStockForm.description" required rows="5" />
      </div>

      <!-- Submit Button -->
      <Button 
        label="تسجيل وتأكيد الطلب" 
        type="submit" 
        class="submit-button" />
    </form>
  </Dialog>

<Dialog v-model:visible="registrationDialogVisible" :style="{ width: '600px', borderRadius: '12px' }" header="تسجيل مستخدم جديد" :modal="true">
    <form @submit.prevent="registerClient" class="registration-form">
        <!-- Name Field -->

            <!-- Loading State for Payment Processing -->
            <div v-if="loadingPayment" class="loading-state">
            <i class="fas fa-spinner fa-spin loading-icon"></i>
            <p>انتظر، نحن الآن نتحقق من تفاصيل الدفع...</p>
        </div>

        <div class="form-group">
            <label for="name">
                <i class="fas fa-user form-icon"></i> الاسم:
            </label>
            <InputText id="name" v-model="registrationForm.name" required class="form-input" />
        </div>

        <!-- Username Field -->
        <div class="form-group">
            <label for="username">
                <i class="fas fa-user-tag form-icon"></i> اسم المستخدم:
            </label>
            <InputText id="username" v-model="registrationForm.username" required class="form-input" />
        </div>

        <!-- Email Field -->
        <div class="form-group">
            <label for="email">
                <i class="fas fa-envelope form-icon"></i> البريد الإلكتروني:
            </label>
            <InputText id="email" v-model="registrationForm.email" type="email" class="form-input" />
        </div>

        <!-- Password Field -->
        <div class="form-group">
            <label for="password">
                <i class="fas fa-lock form-icon"></i> كلمة المرور:
            </label>
            <InputText id="password" v-model="registrationForm.password" type="password" required class="form-input" />
        </div>

        <!-- Payment Method -->
        <div class="form-group">
            <label for="payment_method">
                <i class="fas fa-credit-card form-icon"></i> طريقة الدفع:
            </label>
            <Dropdown 
                v-model="registrationForm.payment_method" 
                :options="paymentMethods" 
                optionLabel="label" 
                optionValue="value" 
                placeholder="اختر طريقة الدفع" 
                class="form-input" 
                required 
            />
        </div>

        <!-- Voucher Code (if payment method is voucher) -->
        <div v-if="registrationForm.payment_method === 'voucher'" class="form-group">
            <label for="voucher_code">
                <i class="fas fa-ticket-alt form-icon"></i> رمز الكوبون:
            </label>
            <InputText id="voucher_code" v-model="registrationForm.voucher_code" class="form-input" required />
        </div>

        <!-- Credit Card Fields (if payment method is credit_card) -->
        <div v-if="registrationForm.payment_method === 'credit_card'" class="form-group">
            <label for="card_number">
                <i class="fas fa-credit-card form-icon"></i> رقم البطاقة:
            </label>
            <InputText id="card_number" v-model="registrationForm.card_number" class="form-input" required />

            <label for="expiration_date">
                <i class="fas fa-calendar-alt form-icon"></i> تاريخ الانتهاء:
            </label>
            <InputText id="expiration_date" v-model="registrationForm.expiration_date" placeholder="MM/YY" class="form-input" required />

            <label for="cvv">
                <i class="fas fa-lock form-icon"></i> CVV:
            </label>
            <InputText id="cvv" v-model="registrationForm.cvv" class="form-input" required />

            <label for="cardholder_name">
                <i class="fas fa-user form-icon"></i> اسم حامل البطاقة:
            </label>
            <InputText id="cardholder_name" v-model="registrationForm.cardholder_name" class="form-input" required />
        </div>

<!-- Warehouse Name Field -->
<div class="form-group">
    <label for="warehouse_name">
        <i class="fas fa-warehouse form-icon"></i> اسم المخزن:
    </label>
    <InputText 
        id="warehouse_name" 
        v-model="selectedWarehouse.warehouse_name" 
        :disabled="true" 
        required 
        class="form-input" 
    />
</div>

<!-- Warehouse Location Field -->
<div class="form-group">
    <label for="warehouse_location">
        <i class="fas fa-map-marker-alt form-icon"></i> موقع المخزن:
    </label>
    <InputText 
        id="warehouse_location" 
        v-model="selectedWarehouse.warehouse_location" 
        :disabled="true" 
        required 
        class="form-input" 
    />
</div>

        <!-- Submit Button -->
        <Button 
            label="تأكيد الحجز" 
            icon="pi pi-check" 
            type="submit" 
            class="submit-button" 
        />
    </form>
</Dialog>
    </div>
</template>

<script>
import apiClient from '@/plugins/axios';

export default {
    data() {
        return {
            loadingPayment: false, // New state for payment processing
            warehouses: [], // List of warehouses
            loading: true, // Loading state
            error: null, // Error message
            rentDialogVisible: false, // Rent dialog visibility
            stockingDialogVisible: false,
            selectedWarehouse: null, // Selected warehouse for rent
            totalPrice: 0, // Total price for rent
            loadingCalculation: false, // Loading state for price calculation
            registrationDialogVisible: false, // Registration dialog visibility
            registrationStockForm: {
                name: '',
                username: '',
                email: '',
                password: '',
                description: '', // Add description field
            },
            registrationForm: {
                name: '',
                username: '',
                email: '',
                password: '',
                payment_method: '', // Payment method (credit_card, voucher, bank_transfer)
                voucher_code: '', // Voucher code (if payment method is voucher)
                card_number: '', // Credit card number
                expiration_date: '', // Expiration date (MM/YY)
                cvv: '', // CVV
                cardholder_name: '', // Cardholder name
                warehouse_name: '', // Warehouse name
                warehouse_location: '', // Warehouse location
            },
            paymentMethods: [
                { label: 'بطاقة ائتمان', value: 'credit_card' },
                { label: 'كوبون', value: 'voucher' },
                { label: 'تحويل بنكي', value: 'bank_transfer' },
            ],
        };
    },
    created() {
        this.fetchEnterpriseWarehouses();
    },
    methods: {
    async fetchEnterpriseWarehouses() {
        try {
            const response = await apiClient.get('/enterprise-warehouses');
            this.warehouses = response.data;
        } catch (error) {
            this.error = error.response?.data?.message || 'فشل في تحميل بيانات المخزنات.';
        } finally {
            this.loading = false;
        }
    },
    showRentDialog(warehouse) {
        this.selectedWarehouse = warehouse;
        this.rentDialogVisible = true;
        this.calculateTotalPrice();
    },
    calculateTotalPrice() {
        this.loadingCalculation = true;
        setTimeout(() => {
            this.totalPrice = this.selectedWarehouse.width * this.selectedWarehouse.height * this.selectedWarehouse.price_per_meter;
            this.loadingCalculation = false;
        }, 3000); // Simulate a delay for calculation
    },
    confirmRent() {
            // Set warehouse_name and warehouse_location in registrationForm
    this.registrationForm.warehouse_name = this.selectedWarehouse.warehouse_name;
    this.registrationForm.warehouse_location = this.selectedWarehouse.warehouse_location;

        this.rentDialogVisible = false;
        this.registrationDialogVisible = true;
    },
    async registerClient() {
    try {
        // Start payment processing
        this.loadingPayment = true;

        // Check if the user already exists
        let userResponse;
        const checkUserResponse = await apiClient.post('/check-user', {
            username: this.registrationForm.username,
            email: this.registrationForm.email,
        });

        if (checkUserResponse.data.exists) {
            // User exists, use their user_id
            userResponse = { data: { user: checkUserResponse.data.user } };
        } else {
            // User does not exist, register the user
            userResponse = await apiClient.post('/register-client', {
                ...this.registrationForm,
                user_type: 'client',
            });
        }

        // Simulate a delay for payment processing
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Then, make the payment request with the user_id
        const paymentResponse = await apiClient.post('/pay-client', {
            user_id: userResponse.data.user.id, // Use the existing or newly created user_id
            payment_method: this.registrationForm.payment_method,
            voucher_code: this.registrationForm.payment_method === 'voucher' ? this.registrationForm.voucher_code : null,
            card_number: this.registrationForm.payment_method === 'credit_card' ? this.registrationForm.card_number : null,
            expiration_date: this.registrationForm.payment_method === 'credit_card' ? this.registrationForm.expiration_date : null,
            cvv: this.registrationForm.payment_method === 'credit_card' ? this.registrationForm.cvv : null,
            cardholder_name: this.registrationForm.payment_method === 'credit_card' ? this.registrationForm.cardholder_name : null,
            warehouse_name: this.selectedWarehouse.warehouse_name, // Use selected warehouse name
            warehouse_location: this.selectedWarehouse.warehouse_location, // Use selected warehouse location
            amount: this.totalPrice, // Pass the total price
            is_paid: true, // Mark as paid
            paid_at: new Date().toISOString(),
        });

        // Finally, store the rent client details
        await apiClient.post('/rent-clients', {
            user_id: userResponse.data.user.id,
            warehouse_id: this.selectedWarehouse.id,
            width: this.selectedWarehouse.width,
            height: this.selectedWarehouse.height,
            total_price: this.totalPrice,
        });

        // Show success message
        this.$toast.add({
            severity: 'success',
            summary: 'تم التسجيل بنجاح',
            detail: 'تم تأكيد الحجز بنجاح.',
        });

        // Close the registration dialog
        this.registrationDialogVisible = false;
    } catch (error) {
        // Show error message
        this.$toast.add({
            severity: 'error',
            summary: 'خطأ',
            detail: error.response?.data?.message || 'فشل في تسجيل المستخدم.',
        });
    } finally {
        // Stop payment processing
        this.loadingPayment = false;
    }
},
applyToServeStock(warehouse) {
            this.selectedWarehouse = warehouse;
            this.stockingDialogVisible = true;
        
        },
        async submitStockingRequest() {
    try {
        // Combine user registration and stocking request data
        const payload = {
            ...this.registrationStockForm,
            warehouse_id: this.selectedWarehouse.id,
            description: this.registrationStockForm.description, // Add description
        };

        // Call the combined endpoint
        const response = await apiClient.post('/register-client-and-request-stocking', payload);

        // Show success message
        this.$toast.add({
            severity: 'success',
            summary: 'تم إرسال الطلب بنجاح',
            detail: 'سيتم مراجعة طلبك من قبل مالك المخزن.',
        });

        // Close the dialog
        this.stockingDialogVisible = false;
    } catch (error) {
        // Debugging: Log the full error response
        console.error('Error submitting stocking request:', error.response);

        // Show detailed error message
        let errorMessage = 'فشل في إرسال الطلب.';
        if (error.response?.data?.errors) {
            errorMessage = Object.values(error.response.data.errors).join(' ');
        } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
        }

        this.$toast.add({
            severity: 'error',
            summary: 'خطأ',
            detail: errorMessage,
        });
    }
},
     // Format money with commas and make it bold
     formatMoney(amount) {
            return amount.toLocaleString();
        },
},
};
</script>

<style scoped>
.enterprise-warehouses {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    font-family: 'Tajawal', sans-serif;
    text-align: right;
}

.header {
    text-align: center;
    margin-bottom: 40px;
    font-family: TajawalBold;
}

.header h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    font-family: TajawalBold;
}

.header p {
    font-size: 1.2rem;
    color: #7f8c8d;
    font-family: TajawalBold;
}

.services {
    display: flex;
    justify-content: space-around;
    margin-bottom: 40px;
    font-family: TajawalBold;
}

.service-card {
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    width: 45%;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: TajawalBold;
}

.service-icon {
    font-size: 3rem;
    color: #007bff;
    margin-bottom: 15px;
  
}

.service-card h2 {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 10px;
    font-family: TajawalBold;
}

.service-card p {
    font-size: 1rem;
    color: #7f8c8d;
    margin-bottom: 20px;
    font-family: TajawalBold;
}

.service-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    font-family: TajawalBold;
}

.service-button:hover {
    background-color: #0056b3;
}

.warehouses-list {
    display: grid;
    gap: 20px;
    font-family: TajawalBold;
}

.warehouse-card {
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: TajawalBold;
}

.warehouse-info h2 {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 10px;
    font-family: TajawalBold;
}

.warehouse-info p {
    font-size: 1rem;
    color: #7f8c8d;
    margin-bottom: 5px;
    font-family: TajawalBold;
}

.warehouse-actions {
    display: flex;
    gap: 10px;
}

.action-button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
}

.action-button:hover {
    background-color: #218838;
}

.loading, .error, .no-warehouses {
    text-align: center;
    margin-top: 20px;
    font-size: 1.2rem;
    color: #7f8c8d;
}

.loading i, .error i, .no-warehouses i {
    margin-right: 10px;
}










/* Registration Form */
.registration-form {
    padding: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: flex;
    align-items: center;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
}

.form-icon {
    font-size: 1.2rem;
    color: #007bff;
    margin-left: 10px;
}

.form-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.form-input:focus {
    border-color: #007bff;
    outline: none;
}

/* Submit Button */
.submit-button {
    width: 100%;
    background-color: #28a745;
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 1rem;
    transition: background-color 0.3s ease;
}

.submit-button:hover {
    background-color: #218838;
}

.submit-button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
}







/* Warehouse Details */
.warehouse-details {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    margin-bottom: 20px;
}

.detail-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.detail-icon {
    font-size: 1.2rem;
    color: #007bff;
    margin-left: 10px;
}

.detail-content {
    flex: 1;
}

.detail-content strong {
    color: #333;
}

.detail-content span {
    color: #555;
}

.total-price {
    background-color: #e3f2fd;
    padding: 10px;
    border-radius: 8px;
    margin-top: 20px;
}

/* Money Amount */
.money-amount {
    font-weight: bold;
    color: #28a745; /* Green color for money */
}

/* Loading State */
.loading-state {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #f0f4f8;
    border-radius: 8px;
}

.loading-background {
    text-align: center;
}

.loading-icon {
    font-size: 2rem;
    color: #007bff;
    margin-bottom: 10px;
}

.loading-background p {
    color: #555;
    margin: 0;
}

/* Confirm Button */
.confirm-button {
    background-color: #28a745;
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 1rem;
    transition: background-color 0.3s ease;
}

.confirm-button:hover {
    background-color: #218838;
}

.confirm-button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
}
.status-busy {
    background-color: rgb(184, 0, 31) !important;
    color: #ffffff !important;
    text-align: center !important;
    padding: 5px 10px !important;
    border-radius: 5px !important;
    font-size: large    !important;
    font-weight: bold !important;
}
.status-available {
    background-color: rgb(0, 255, 51) !important;
    color: #0056b3 !important;
    text-align: center !important;
    padding: 5px 10px !important;
    border-radius: 5px !important;
    font-size: large    !important;
    font-weight: bold !important;
}
</style>