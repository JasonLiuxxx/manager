import axios from 'axios'

const request = {
   
}

export default {
    install(Vue){
        Vue.prototype.$request = request
    }
}