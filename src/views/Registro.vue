<template>
  <v-content
    align = "center"
    justify="center"
  >
    <v-container
        align = "center"
        justify="center"
    >
        <v-col
            cols="12"
            sm="8"
            md="4"
            align = "center"
            justify="center"
          >
            <form v-on:submit="createUser">
                <v-text-field
                v-model="userFirstName"
                label="Nombre"
                required
                ></v-text-field>

                <v-text-field
                v-model="userLastName"
                label="Apellido"
                required
                ></v-text-field>

                <v-text-field
                v-model="userAlias"
                label="Usuario"
                required
                ></v-text-field>

                <v-text-field
                v-model="userPassword"
                label="Password"
                required
                ></v-text-field>

                <v-text-field
                v-model="userBirthday"
                label="Fecha de Nacimiento"
                required
                type="date"
                ></v-text-field>

                <v-text-field
                v-model="userEmail"
                label="E-mail"
                required
                ></v-text-field>

                <input 
                type="file"
                @change="uploadImage"
                required
                >

                <v-btn class="mr-4" type="submit">submit</v-btn>
            </form>
        </v-col>
      </v-container>
  </v-content>
</template>

<script lang="ts">

  import {Vue} from 'vue-property-decorator'
  import Component from "vue-class-component";
  import { fb } from '../firebase';
import { storage } from 'firebase';

  @Component
  export default class Registro extends Vue{
    
    userFirstName = '';
    userLastName = '';
    userEmail = '';
    userAlias = '';
    userBirthday = '';
    userPassword ='';
    userPhoto = null;
    imageUrl = '';

    // data(){
    //     return {
    //         userFirstName: '',
    //         userLastName: '',
    //         userEmail: '',
    //         userAlias: '',
    //         userBirthday: '',
    //         userPassword: '',
    //         userCreateDate: '',
    //         fkStatusId: null,
    //     }
    // };


    uploadImage(event: any){
      const file = event.target.files[0];
      this.userPhoto = file;
      console.log(event.target.files[0]);
    }


    createUser(e:any){
        e.preventDefault();
        console.log(this.getUser());

        if (this.userPhoto != null){
              const storageRef = fb.storage().ref('images/'+this.userPhoto.name);
              const uploadTask = storageRef.put(this.userPhoto);
              uploadTask.on('state_changed', function(snapshot){

                console.log(snapshot);
              }, function(error) {
                // Handle unsuccessful uploads
              }, function() {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                  console.log('File available at', downloadURL);
                });
              });

            }

        this.$store.dispatch("users/create", this.getUser()).then((response:any) =>{
          
            console.log(response);
            alert('Usuario creado Satisfactoriamente');
            localStorage.setItem("token", response.data.token)
        });
    }

    getUser(){
        return {
            userFirstName: this.userFirstName,
            userLastName: this.userLastName,
            userEmail: this.userEmail,
            userAlias: this.userAlias,
            userBirthdate: this.userBirthday,
            userPassword: this.userPassword,
            imageUrl: this.imageUrl,
        } 
    }
  }
</script>
