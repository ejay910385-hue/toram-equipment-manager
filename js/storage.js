// 統一的 localStorage 操作函數
window.storage = {
    async get(key) {
        try {
            const value = localStorage.getItem(key);
            return { key, value: value || '[]' };
        } catch (error) {
            console.error('獲取數據失敗:', error);
            return { key, value: '[]' };
        }
    },
    
    async set(key, value) {
        try {
            localStorage.setItem(key, value);
            // 觸發 storage 事件（用於其他標籤頁）
            window.dispatchEvent(new StorageEvent('storage', {
                key,
                newValue: value,
                oldValue: localStorage.getItem(key),
                storageArea: localStorage,
                url: window.location.href
            }));
            return { key, value };
        } catch (error) {
            console.error('保存數據失敗:', error);
            throw error;
        }
    }
};
