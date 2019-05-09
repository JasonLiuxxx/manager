import axios from 'axios'
import Vue from 'vue'
import router from '../router'

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log(config);
    config.headers.Authorization = sessionStorage.getItem('token')
    return config
  })

  // 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.data.meta.status == 200){
       Vue.prototype.$message.success(response.data.meta.msg); 
    }else if(response.data.meta.status == 400&&response.data.meta.msg == '无效token'){
        router.push('/login')
        sessionStorage.removeItem('token')
    }
     
     return response
  });


const request = {
   login(params){
       return axios.post('login',params)
   },

   getUsers(params){
       return axios.get('users',{
           params,
        //    headers:{
        //     Authorization:sessionStorage.getItem('token')
        //    }
       })
   },

   updateUserStatus(params){
       return axios.put(`users/${params.id}/state/${params.mg_state}`)
   },

   deleteUser(id){
       return axios.delete(`users/${id}`)
   },

   addUser(params){
       return axios.post('users',params)
   },

   getUserById(id){
    return axios.get(`users/${id}`)
   },

   updateUser(params){
       return axios.put(`users/${params.id}`,{
        email:params.email,
        mobile:params.mobile
       })
   },

   getRoles(){
       return axios.get('roles')
   },

   updateUserRole(params){
       return axios.put(`users/${params.id}/role`,{rid:params.rid})
   },

   addRole(params){
    return axios.post('roles',params)
   },

   deleteRole(id){
       return axios.delete(`roles/${id}`)
   },

   getRoleById(id){
    return axios.get(`roles/${id}`)
   },

   editRole(params){
    return axios.put(`roles/${params.id}`,{
        roleName:params.roleName,
        roleDesc:params.roleDesc
    })
   },

   getListRights(){
    return axios.get(`rights/list`)
   },

}

export default {
    install(Vue){
        Vue.prototype.$request = request
    }
}
