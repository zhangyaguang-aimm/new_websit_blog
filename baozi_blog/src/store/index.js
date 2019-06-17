import Vue from 'vue'
import Vuex from 'vuex';
import { getUserInfo } from '@/utils/index.js'


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        roles: []
    },
    mutations: {
        'SET_ROLES':(state,roles) => {
            state.roles = roles
        }
    },
    actions: {
        getUser({commit, state}){
            return new Promise((resolve,reject) => {
                getUserInfo().then(data => {
                    if(!data){
                        reject('验证失败，请重新登录.')
                    }
                    const {roles} = data
                    commit('SET_ROLES', roles)
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
})


export default store