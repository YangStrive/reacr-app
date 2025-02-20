// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice'; // 导入切片

const store = configureStore({
    reducer: {
        counter: counterReducer, // 注册切片
    },
});

export default store;