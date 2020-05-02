<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex justify-center">
        <v-btn
          class="ma-2"
          tile
          outlined
          color="success"
          x-large
          :loading="loading"
          @click="getBanks"
        >
          GET Banks
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex flex-wrap justify-center">
        <v-card
          v-for="bank in banks"
          :key="bank.bank_id"
          color="#385F73"
          dark
          min-width="500"
          class="ma-5"
          transition="slide-y-transition"
        >
          <v-card-title class="headline text-center">{{
            bank.bank_name
          }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>

    
    <v-row justify="center">
      
      <v-col justify="center" md="6">
        <v-card-title>
          <h2>Verificador de Direcciones LOB</h2>
        </v-card-title>

        <v-form
          ref="form"
          lazy-validation
        >
          <v-text-field
            v-model="primary_line"
            label="Primary Line"
            required
          ></v-text-field>

          <v-text-field
            v-model="city"
            label="city"
            required
          ></v-text-field>

          <v-text-field
            v-model="state"
            label="state"
            required
          ></v-text-field>

          
          <v-text-field
            v-model="zip_code"
            label="ZIP code"
            required
            type="number"
          ></v-text-field>

          <v-btn
            color="success"
            class="mr-4"
            @submit="verifyAddress"
          >
            Validate
          </v-btn>

        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Home extends Vue {
  loading = false;
  primary_line = "";
  secondary_line = "";
  city = "";
  state = "";
  zip_code = "" ;

  getBanks() {
    this.loading = true;
    this.$store.dispatch("banks/read").then(() => {
      this.loading = false;
    });
  }

  verifyAddress(){
    console.log("a");
  }

  get banks() {
    return this.$store.state.banks.banks;
  }
}
</script>

<style lang="scss"></style>
