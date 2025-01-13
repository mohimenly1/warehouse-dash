import { createStore } from 'vuex';

const authModule = {
    namespaced: true,
    state: {
        authToken: localStorage.getItem('auth_token') || null,
        user_type: localStorage.getItem('user_type') || null,
        user_id: localStorage.getItem('user_id') || null,
        name: localStorage.getItem('user_name') || null,
        username: localStorage.getItem('username') || null,
        warehouse_id: localStorage.getItem('warehouse_id') || null,
        subscription_type: localStorage.getItem('subscription_type') || null, // Add subscription_type
        package_id: localStorage.getItem('package_id') || null, // Add package_id
    },
    mutations: {
        SET_AUTH_TOKEN(state, token) {
            state.authToken = token;
            localStorage.setItem('auth_token', token);
        },
        SET_USER_TYPE(state, userType) {
            state.user_type = userType;
            localStorage.setItem('user_type', userType);
        },
        SET_USER_DATA(state, user) {
            state.user_id = user.id;
            state.name = user.name;
            state.username = user.username;
            state.warehouse_id = user.warehouse_id;
            state.warehouse_name = user.warehouse_name;
            state.subscription_type = user.subscription_type; // Store subscription_type
            state.package_id = user.package_id; // Store package_id

            localStorage.setItem('user_id', user.id);
            localStorage.setItem('user_name', user.name);
            localStorage.setItem('username', user.username);
            localStorage.setItem('warehouse_name', user.warehouse_name);
            localStorage.setItem('warehouse_id', user.warehouse_id);
            localStorage.setItem('subscription_type', user.subscription_type); // Store subscription_type
            localStorage.setItem('package_id', user.package_id); // Store package_id
        },
        CLEAR_AUTH_DATA(state) {
            state.authToken = null;
            state.user_id = null;
            state.name = null;
            state.username = null;
            state.warehouse_id = null;
            state.subscription_type = null; // Clear subscription_type
            state.package_id = null; // Clear package_id

            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_type');
            localStorage.removeItem('user_id');
            localStorage.removeItem('user_name');
            localStorage.removeItem('username');
            localStorage.removeItem('warehouse_id');
            localStorage.removeItem('warehouse_name');
            localStorage.removeItem('subscription_type'); // Remove subscription_type
            localStorage.removeItem('package_id'); // Remove package_id
        },
        SET_WAREHOUSE_DATA(state, { warehouse_id, warehouse_name }) {
            state.warehouse_id = warehouse_id;
            state.warehouse_name = warehouse_name;

            localStorage.setItem('warehouse_id', warehouse_id);
            localStorage.setItem('warehouse_name', warehouse_name);
        },
        CLEAR_WAREHOUSE_DATA(state) {
            state.warehouse_id = null;
            state.warehouse_name = null;

            localStorage.removeItem('warehouse_id');
            localStorage.removeItem('warehouse_name');
        }
    },
    getters: {
        isAuthenticated: (state) => !!state.authToken,
        userId: (state) => state.user_id,
        userType: (state) => state.user_type,
        userName: (state) => state.name,
        userUsername: (state) => state.username,
        warehouseId: (state) => state.warehouse_id || localStorage.getItem('warehouse_id'),
        warehouseName: (state) => state.warehouse_name || localStorage.getItem('warehouse_name'),
        subscriptionType: (state) => state.subscription_type || localStorage.getItem('subscription_type'), // Add subscription_type getter
        packageId: (state) => state.package_id || localStorage.getItem('package_id'), // Add package_id getter
    }
};

const store = createStore({
    modules: {
        auth: authModule
    }
});

export default store;