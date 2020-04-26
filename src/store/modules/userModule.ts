import Vue from "vue";
import userService from "../../services/userService"

export default {
    namespaced: true,
    state: {
        user: {},
    },
    getters: {
        // getters and computed props
    },
      // -----------------------------------------------------------------
    mutations: {
        // Aqui se setean los atributos del state
   
    },
      // -----------------------------------------------------------------
    actions: {
        create: async (context:any , user: any) =>{
            return await userService.createUser(user);
        },
    },
}