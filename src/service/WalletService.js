// src/service/WalletService.js
import apiClient from '@/plugins/axios';

const WalletService = {
    getWalletByUserId(userId) {
        return apiClient.get(`/wallets/${userId}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Failed to fetch wallet data:', error);
                throw error;
            });
    }
};

export default WalletService;