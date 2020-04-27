<template>
    <v-app id="inspire">

      <meta name="google-signin-client_id" content="516785942358-39lmimh5jdt7au1u4jre5188nkgnbkf8.apps.googleusercontent.com">

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Iniciar Sesion</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    type="text"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary">Login</v-btn>
              </v-card-actions>

              <v-card-actions>
                <v-btn @click="loginGoogle" color="secondary">Ingresar con Google</v-btn>
              </v-card-actions>

              <v-card-actions>
                <v-btn @click="loginFacebook" color="secondary">Ingresar con Facebook</v-btn>
              </v-card-actions>

              <v-card-actions>
                <router-link :to="{name: 'Registro'}">
                    <v-btn color="primary">Registro </v-btn>
                </router-link>
              </v-card-actions>
            </v-card>
            
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>


<script lang="ts">

import {Vue} from 'vue-property-decorator'
import Component from "vue-class-component";
import { fa, providerGoogle, providerFacebook } from '../firebase';

  @Component
  export default class Registro extends Vue{
    loginGoogle(){
      fa.signInWithPopup(providerGoogle).then(result =>{
        const token = result.credential
        const user = result.user
        console.log("datos del usuario",user);
        console.log("token", token);
      }).catch(error =>{
        console.log(error);
      })
    };

    loginFacebook(){
      fa.signInWithPopup(providerFacebook).then(result => {
        const token = result.credential
      const user = result.user
      console.log("datos del usuario",user);
      console.log("token", token);
      }).catch(error =>{
        console.log(error);
      })
    }
  }
</script>