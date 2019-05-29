import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'vue-cookies'

Vue.use(Vuex)
//其他组件通过 this.$store.state.username 调用全局的信息
export default new Vuex.Store({
    state: {
        name: Cookie.get('name'),
        token: Cookie.get('token'),
        apiList: {
            course: 'http://101.132.132.181:8000/api/v1/course',
            commit: 'http://101.132.132.181:8000/api/v1/message/',
            login: 'http://101.132.132.181:8000/api/v1/login/',
            list: 'http://101.132.132.181:8000/api/v1/list/',
            person: 'http://101.132.132.181:8000/api/v1/person/',
            alipay: "http://101.132.132.181:8000/api/v1/pay/alipay/",
        }
    },
    mutations: {
        //第一个值是要改变的值 改的值 
        saveToken: function (state, userToken) {
            state.name = userToken.username
            state.token = userToken.token
            //把token信息放入到缓存之中
            Cookie.set("name", userToken.username, '20min')
            Cookie.set("token", userToken.token, '20min')
        },
        clearToken: function (state) {
            state.name = null
            state.token = null
            Cookie.remove('name')
            Cookie.remove('token')
        }
    }
})