const state = {
    paymentData: [],
    currentList: [],
    totalPages: null,
    limit: 3,
    currentPage: 1,
    isVisibleForm: false,
    maxVisibleButtons: 3,
    pages: [],
    startPage: 1,
}

const mutations = {
    setPaymentData(state, paymentData) {
        let flag = false;
        for (let i = 0; i < paymentData.length; i++) {
            for (let j = 0; j < state.paymentData.length; j++) {
                if (state.paymentData[j].id == paymentData[i].id) {
                    flag = true;
                }
            }
            if (flag == false) {
                state.paymentData.push(paymentData[i]);
            }
            flag = false;
        }
    },
    setFormVisible(state, flag) {
        if (flag != undefined) {
            state.isVisibleForm = flag;
        }
        else {
            state.isVisibleForm = !state.isVisibleForm;
        }
    },
    setCurrentPage(state, page) {
        state.currentPage = page;
    },
    setStartPage(state) {
        if (state.currentPage === 1) {
            state.startPage = 1;
        }
        else if (state.currentPage === state.totalPages) {
            if (state.maxVisibleButtons < state.totalPages) {
                state.startPage = state.totalPages - state.maxVisibleButtons + 1;
            }
            else state.startPage = 1;
        }
        else {
            state.startPage = state.currentPage - 1;
        }
    }
}

const actions = {
    fetchData({ commit }, page) {
        let from = (page - 1) * state.limit;
        let to = from + state.limit;
        // fetch('https://github.com/Shapiro911/vuedb/paymentData.json')
        // .then(response => response.json())
        // .then(res => {
        if (state.paymentData.length == 0) { commit('setPaymentData') }
        state.totalPages = Math.ceil(state.paymentData.length / state.limit);
        state.currentList = state.paymentData.slice(from, to)
        commit('setStartPage');
        state.currentPage = page;
        let pages = [];
        for (let i = state.startPage; i <= Math.min(state.startPage + state.maxVisibleButtons - 1, state.totalPages); i++) {
            pages.push({
                name: i,
                isDisabled: i === state.currentPage
            });
        }
        state.pages = pages;
        // })
    },
    addNewPayment({ dispatch }, data) {
        state.paymentData.push(data);
        dispatch('fetchData', state.currentPage)
    },
    deletePayment({ dispatch }, id) {
        for (let i = 0; i < state.paymentData.length; i++) {
            if (state.paymentData[i].id == id) {
                state.paymentData.splice(i, 1);
            }
            dispatch('fetchData', state.currentPage)
        }
    },
    redactPayment({ dispatch }, data) {
        for (let i = 0; i < state.paymentData.length; i++) {
            if (state.paymentData[i].id == data.id) {
                state.paymentData.splice(i, 1, data);
            }
        }
        dispatch('fetchData', state.currentPage)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}