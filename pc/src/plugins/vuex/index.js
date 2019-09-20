import Vue from 'vue'
import Vuex from 'vuex'
var user = localStorage.getItem('user');
let htp = window.location.protocol
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        user: user ? JSON.parse(user) : '',
        routerChange: false,
        loading: '',
        disa:false,
        getSite:{},
        httpsv:htp,
        safe:false
    },
    mutations: {  //"$store.commit('switch_dialog')" html触发
        switch_dialog(state, th) {
            state.loading = th.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.5)'
            });
        },
        hide_dialog(state) {
            state.loading.close();
        },
        getUser(state, data) {
            state.user = data;
        },
        getURL(state, data) {
            state.getSite = data;
        }
    },
    actions: {
        // @click="$store.dispatch('switch_dialog')" 触发
        switch_dialog(context, th) {
            context.commit('switch_dialog', th);
        },
        hide_dialog(context) {
            context.commit('hide_dialog');
        }

    },
    // //$store.getters.not_show
    getter: {
        not_show(state) {
            return !state.show;
        }
    },
    modules: {
        safeMoneyModal: {
            namespaced: true,
            state: {
                state: false,
                checkPass: false,
                index: 1,
            },
            mutations: {
                reset (state) {
                    state.state = false;
                    state.checkPass=false
                }
            }
        }
    }
})
