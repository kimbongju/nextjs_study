import { createSlice, createSelector } from "@reduxjs/toolkit";
import { Fruit } from '../pages/fruit-store/list';

interface initialStateType {
    fruits: Fruit[],
    cart: cartType[],
}

interface cartType {
    id: number;
    count: number;
}

const initialState: initialStateType = {
    fruits: [],
    cart: [],
}

const fruitStore = createSlice({
    name: 'fruit',
    initialState,
    reducers: {
        setList(state, { payload }) {
            state.fruits = payload;
        },
        addCart(state, { payload }) {
            const findIndex = state.cart.findIndex(fruit => fruit.id === payload);
            if (findIndex > -1) {
                state.cart[findIndex].count += 1;
            } else {
                state.cart.push({
                    id: payload,
                    count: 1
                });
            }
        },
        minusCart(state, { payload }) {
            const findIndex = state.cart.findIndex(fruit => fruit.id === payload);
            if (findIndex > -1) {
                if (state.cart[findIndex].count > 1) {
                    state.cart[findIndex].count -= 1;
                } else {
                    state.cart.splice(findIndex, 1);
                }
            }
        },
        cancelCart(state, { payload }) {
            const findIndex = state.cart.findIndex(fruit => fruit.id === payload);
            if (findIndex > -1) {
                state.cart.splice(findIndex, 1);
            }
        },
        resetCart(state) {
            state.cart = [];
        }
    }
})

export const fruitActions = fruitStore.actions;
export default fruitStore.reducer;