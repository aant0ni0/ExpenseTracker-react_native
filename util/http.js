import { View, Text } from 'react-native'
import React from 'react'
import axios from 'axios'

const BACKEND_URL = 'https://react-native-course-ceee5-default-rtdb.firebaseio.com';

export const storeExpense = async (expenseData) => {
    try {
        const response = await axios.post(BACKEND_URL + '/expenses.json', expenseData);
        const id = response.data.name;
        return id;
    } catch (error) {
        console.error('Error storing expense:', error);
        throw error;
    }
}



export async function fetchExpenses() {
    try {
        const response = await axios.get(BACKEND_URL + '/expenses.json');

        const expenses = [];

        console.log(response.data)
        for (const key in response.data) {
            const expenseObj = {
                id: key,
                amount: response.data[key].amount,
                date: new Date(response.data[key].date),
                description: response.data[key].description
            };
            expenses.push(expenseObj);
        }
        return expenses;

    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw error;

    }

}

export function updateExpenses(id, expenseData) {
    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export async function deleteExpenses(id) {
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}