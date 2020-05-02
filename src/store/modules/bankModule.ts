import Vue from "vue";

import bankService from "../../services/bankService";
import Lob from "../../../node_modules/lob"

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    // Aqui van los atributos
    banks: [],
  },
  // -----------------------------------------------------------------
  getters: {
    // getters and computed props
    collection: (state: any) => state.banks,
  },
  // -----------------------------------------------------------------
  mutations: {
    // Aqui se setean los atributos del state
    setBanks(state: any, banks: []) {
      Vue.set(state, "banks", banks);
    },
  },
  // -----------------------------------------------------------------
  actions: {
    // create: (context, bankData) => {
    //   // stuff to create a new bank on the backend : CRUD CREATE ACTION
    // },
    read: async (context: any) => {
      await bankService.getBanks().then((response: any) => {
        console.log(response);
        context.commit("setBanks", response.data.data);
      });
    },

    /*verify: async (context: any, address: any) => {
      await Lob.usVerifications.verify({
        primary_line: address.primaryLine,
        city: address.city,
        state: address.state,
        zip_code: address.zipCode,  
      }, (err: any, res: any) => {
        if (err){
          console.log(err)
        }else {
          console.log(res)
        }
      })
    },*/

    // update: (context, bankData) => {
    //   // stuff to update bank data to the backend : CRUD UPDATE ACTION
    // },
    // delete: context => {
    //   // stuff to erase bank on the backend : CRUD DELETE ACTION
    // },
  },
};

//Ejemplo de obtener datos:
// beforeCreate() {
//   this.$store.dispatch("banks/read");
// }

// get banks() {
//   return this.$store.state.banks;
// }
