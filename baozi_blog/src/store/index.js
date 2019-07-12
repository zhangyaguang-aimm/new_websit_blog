import Vue from 'vue'
import Vuex from 'vuex';
import { getUserInfo } from '@/utils/index.js'


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userinfo: {},
    },
    mutations: {
        'SET_ROLES':(state,userinfo) => {
            state.userinfo = userinfo
        },
    },
    actions: {
        getUser({commit, state}){
            return new Promise((resolve,reject) => {
                getUserInfo(Vue.prototype.$axios).then(data => {
                    if(!data){
                        reject('验证失败，请重新登录.')
                    }
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
})


export default store