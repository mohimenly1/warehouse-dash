<template>
    <div class="form-container" dir="rtl">
        <h2>نموذج الاشتراك</h2>

        <form @submit.prevent="submitSubscription" class="subscription-form">
            <!-- Package Selection -->
            <div class="form-group">
                <label for="package_id">
                    <i class="fas fa-box"></i> الباقة:
                </label>
                <div class="input-with-icon">
                    <select 
                        v-model="form.package_id" 
                        id="package_id" 
                        class="form-control" 
                        required
                        @change="handlePackageChange"
                    >
                        <option v-for="pkg in packages" :key="pkg.id" :value="pkg.id">
                            {{ pkg.name }} - {{ pkg.amount }} ليبي
                        </option>
                    </select>
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>

            <!-- Subscription Type -->
            <div class="form-group">
                <label for="subscription_type">
                    <i class="fas fa-user-tag"></i> نوع الاشتراك:
                </label>
                <div class="input-with-icon">
                    <select 
                        v-model="form.subscription_type" 
                        id="subscription_type" 
                        class="form-control" 
                        required
                        :disabled="form.subscription_type !== ''"
                    >
                        <option value="normal">اشتراك الافراد</option>
                        <option value="trader">اشتراك التجار</option>
                    </select>
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>

            <!-- Payment Method -->
            <div class="form-group">
                <label for="payment_method">
                    <i class="fas fa-credit-card"></i> طريقة الدفع:
                </label>
                <div class="input-with-icon">
                    <select v-model="form.payment_method" id="payment_method" class="form-control" required>
                        <option value="credit_card">بطاقة ائتمان</option>
                        <option value="voucher">Keep space card</option>
                        <option value="bank_transfer">تحويل بنكي</option>
                    </select>
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>

            <!-- Credit Card Fields (only if payment method is credit_card) -->
            <div v-if="form.payment_method === 'credit_card'" class="form-group">
                <!-- Amount Field -->
                <label for="amount">
                    <i class="fas fa-money-bill-wave"></i> المبلغ:
                </label>
                <input 
                    type="number" 
                    v-model="form.amount" 
                    id="amount" 
                    class="form-control" 
                    placeholder="أدخل المبلغ" 
                    required 
                    min="0"
                />

                <!-- Card Number -->
                <label for="card_number">
                    <i class="fas fa-credit-card"></i> رقم البطاقة:
                </label>
                <input type="text" v-model="form.card_number" id="card_number" class="form-control" placeholder="أدخل رقم البطاقة" required />

                <!-- Expiration Date -->
                <label for="expiration_date">
                    <i class="fas fa-calendar-alt"></i> تاريخ الانتهاء:
                </label>
                <input type="text" v-model="form.expiration_date" id="expiration_date" class="form-control" placeholder="MM/YY" required />

                <!-- CVV -->
                <label for="cvv">
                    <i class="fas fa-lock"></i> CVV:
                </label>
                <input type="text" v-model="form.cvv" id="cvv" class="form-control" placeholder="أدخل CVV" required />

                <!-- Cardholder Name -->
                <label for="cardholder_name">
                    <i class="fas fa-user"></i> اسم حامل البطاقة:
                </label>
                <input type="text" v-model="form.cardholder_name" id="cardholder_name" class="form-control" placeholder="أدخل اسم حامل البطاقة" required />
            </div>

            <!-- Voucher Code (only if payment method is voucher) -->
            <div v-if="form.payment_method === 'voucher'" class="form-group">
                <label for="voucher_code">
                    <i class="fas fa-ticket-alt"></i> رمز keep space card:
                </label>
                <div class="input-with-icon">
                    <input type="text" v-model="form.voucher_code" id="voucher_code" class="form-control" placeholder="أدخل رمز card" />
                    <i class="fas fa-ticket-alt"></i>
                </div>
            </div>

            <!-- Warehouse Info -->
            <div class="warehouse-info">
                <h3><i class="fas fa-warehouse"></i> معلومات المخزن</h3>
                <div class="form-group">
                    <label for="warehouse_name">
                        <i class="fas fa-signature"></i> اسم المخزن:
                    </label>
                    <div class="input-with-icon">
                        <input type="text" v-model="form.warehouse_name" id="warehouse_name" class="form-control" placeholder="أدخل اسم المخزن" required />
                        <i class="fas fa-building"></i>
                    </div>
                </div>
                <div class="form-group">
                    <label for="warehouse_location">
                        <i class="fas fa-map-marker-alt"></i> موقع المخزن:
                    </label>
                    <div class="input-with-icon">
                        <input type="text" v-model="form.warehouse_location" id="warehouse_location" class="form-control" placeholder="أدخل موقع المخزن" required />
                        <i class="fas fa-location-arrow"></i>
                    </div>
                </div>
            </div>

            <!-- Rent Service Fields (only for enterprise package) -->
            <div v-if="form.package_id == 3" class="rent-service-fields">
                <h3><i class="fas fa-warehouse"></i> معلومات خدمة التأجير</h3>
                <div class="form-group">
                    <label for="width">
                        <i class="fas fa-ruler-horizontal"></i> العرض (متر):
                    </label>
                    <input type="number" v-model="form.width" id="width" class="form-control" placeholder="أدخل العرض بالمتر" required min="0" />
                </div>
                <div class="form-group">
                    <label for="height">
                        <i class="fas fa-ruler-vertical"></i> الارتفاع (متر):
                    </label>
                    <input type="number" v-model="form.height" id="height" class="form-control" placeholder="أدخل الارتفاع بالمتر" required min="0" />
                </div>
                <div class="form-group">
                    <label for="price_per_meter">
                        <i class="fas fa-money-bill-wave"></i> السعر لكل متر (ليبي):
                    </label>
                    <input type="number" v-model="form.price_per_meter" id="price_per_meter" class="form-control" placeholder="أدخل السعر لكل متر" required min="0" />
                </div>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn-submit">
                <i class="fas fa-paper-plane"></i> إرسال الدفع
            </button>
        </form>
    </div>
</template>

<script>
import apiClient from '@/plugins/axios';

export default {
    data() {
        return {
            form: {
                subscription_type: '',
                payment_method: 'credit_card',
                voucher_code: '',
                warehouse_name: '',
                warehouse_location: '',
                amount: 0,
                card_number: '',
                expiration_date: '',
                cvv: '',
                cardholder_name: '',
                package_id: null,
                width: null, // New field for width
                height: null, // New field for height
                price_per_meter: null, // New field for price per meter
            },
            packages: [],
        };
    },
    methods: {
        async fetchPackages() {
            try {
                const response = await apiClient.get('/packages');
                this.packages = response.data;
            } catch (error) {
                console.error('Failed to fetch packages', error);
            }
        },
        handlePackageChange() {
            // Reset rent service fields if package is not enterprise
            if (this.form.package_id != 3) {
                this.form.width = null;
                this.form.height = null;
                this.form.price_per_meter = null;
            }
        },
        async submitSubscription() {
            try {
                const userId = this.$store.state.auth.user?.id || localStorage.getItem('user_id');

                if (!userId) {
                    throw new Error('User is not logged in.');
                }

                // Fetch the selected package
                const selectedPackage = this.packages.find(pkg => pkg.id === this.form.package_id);

                if (!selectedPackage) {
                    throw new Error('Invalid package selected.');
                }

                // Validate the amount for credit card payments
                if (this.form.payment_method === 'credit_card') {
                    if (!this.form.amount) {
                        throw new Error('The amount field is required for credit card payments.');
                    }

                    if (this.form.amount != selectedPackage.amount) {
                        throw new Error('The entered amount does not match the package amount.');
                    }
                }

                const requestData = {
                    user_id: userId,
                    subscription_type: this.form.subscription_type,
                    payment_method: this.form.payment_method,
                    voucher_code: this.form.payment_method === 'voucher' ? this.form.voucher_code : '',
                    warehouse_name: this.form.warehouse_name,
                    warehouse_location: this.form.warehouse_location,
                    amount: this.form.payment_method === 'credit_card' ? this.form.amount : 0,
                    card_number: this.form.payment_method === 'credit_card' ? this.form.card_number : null,
                    expiration_date: this.form.payment_method === 'credit_card' ? this.form.expiration_date : null,
                    cvv: this.form.payment_method === 'credit_card' ? this.form.cvv : null,
                    cardholder_name: this.form.payment_method === 'credit_card' ? this.form.cardholder_name : null,
                    package_id: this.form.package_id,
                    width: this.form.package_id == 3 ? this.form.width : null,
                    height: this.form.package_id == 3 ? this.form.height : null,
                    price_per_meter: this.form.package_id == 3 ? this.form.price_per_meter : null,
                };

                const response = await apiClient.post('/pay', requestData);

                if (response.data) {
                    const subscription = {
                        subscription_type: this.form.subscription_type,
                        payment_method: this.form.payment_method,
                        amount: response.data.amount,
                        is_paid: response.data.is_paid,
                        voucher_amount: response.data.voucher_amount || null
                    };

                    const warehouse = {
                        name: this.form.warehouse_name,
                        location: this.form.warehouse_location
                    };

                    this.$router
                        .push({
                            name: 'SuccessSubscription',
                            query: {
                                subscription: JSON.stringify(subscription),
                                warehouse: JSON.stringify(warehouse)
                            }
                        })
                        .then(() => {
                            console.log('Redirected successfully');
                        })
                        .catch((err) => {
                            console.error('Redirection failed:', err);
                        });
                }
            } catch (error) {
                console.error('Subscription failed', error);

                // Display error message to the user
                this.$toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: error.message || 'An unexpected error occurred. Please try again later.'
                });
            }
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.user;
        }
    },
    created() {
        this.fetchPackages();
        // Extract user data and user_type from the query parameters
        const userData = this.$route.query.user;
        const userType = this.$route.query.user_type;

        if (userData) {
            this.user = JSON.parse(userData);
        }

        // Set the subscription_type based on the user_type passed from the registration
        if (userType) {
            this.form.subscription_type = userType;
        }
    }
};
</script>

<style scoped>
.form-container {
    max-width: 500px;
    margin: 20px auto;
    padding: 30px;
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    text-align: right;
}

h2 {
    font-size: 1.8em;
    color: #2c3e50;
    margin-bottom: 25px;
    text-align: center;
}

.subscription-form {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #34495e;
}

.input-with-icon {
    position: relative;
    display: flex;
    align-items: center;
}

.input-with-icon i {
    position: absolute;
    left: 10px;
    color: #7f8c8d;
    font-size: 1.2em;
}

.form-control {
    width: 100%;
    padding: 12px 12px 12px 40px;
    font-size: 1em;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    box-sizing: border-box;
    transition: border-color 0.3s, box-shadow 0.3s;
    background-color: #f8f9fa;
    color: #2c3e50;
}

.form-control:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 8px rgba(52, 152, 219, 0.3);
    background-color: #ffffff;
}

.warehouse-info h3 {
    font-size: 1.4em;
    color: #3498db;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.btn-submit {
    padding: 12px 20px;
    font-size: 1.2em;
    color: white;
    background-color: #3498db;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.btn-submit:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
}

.btn-submit:active {
    transform: translateY(0);
}
</style>