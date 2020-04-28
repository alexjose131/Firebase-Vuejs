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
                accept="img/*"
                >

                <v-btn class="mr-4" type="submit">submit</v-btn>
            </form>

            <v-btn @click="seeImg"> traer imagenes</v-btn>

            <div v-if="mostrar">
              <div v-for="img in imageUrl" :key = "img.id" >
                <img v-bind:src="img" alt="">
                <v-btn @click="deleteImg(img, img.id)">Eliminar</v-btn>
              </div>
            </div>
        </v-col>
      </v-container>
  </v-content>
</template>

<script lang="ts">

  import {Vue} from 'vue-property-decorator'
  import Component from "vue-class-component";
  import { fb, db, fs } from '../firebase';
  import { storage } from 'firebase';

  @Component
  export default class Registro extends Vue{
    
    userFirstName = '';
    userLastName = '';
    userEmail = '';
    userAlias = '';
    userBirthday = '';
    userPassword ='';
    userPhoto: any;
    userPhotos: any = []
    imageUrl: any  = [];
    mostrar = false;
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

     async createUser(e:any){
        e.preventDefault();
        console.log(this.getUser());


        if (this.userPhoto != null){

              const storageRef = fb.storage().ref('images/productos/1/' + this.userPhoto);
              const uploadTask = storageRef.put(this.userPhoto);

              await uploadTask.on('state_changed', snapshot =>{
                console.log(snapshot)
              }, error =>{
                console.log(error)
              }, ()=> {
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                  this.imageUrl.push(downloadURL);
                  console.log('File available at', this.imageUrl);
                  
                });
              });
        }

        /*this.$store.dispatch("users/create", this.getUser()).then((response:any) =>{
          
            console.log(response);
            alert('Usuario creado Satisfactoriamente');
            localStorage.setItem("token", response.data.token)
        });*/
    }

    deleteImg(imageUrl:any, i: any){
      const storage = fs;
      const storageRef = storage.ref();

      console.log(imageUrl);

      this.userPhotos.forEach((itemRef:any, index:number) => {
        itemRef.getDownloadURL().then( (downloadUrl: any) =>{
          if (downloadUrl == imageUrl){
            console.log('localizacion de la img', itemRef.location.path)
            storageRef.child(itemRef.location.path).delete().then(()=>{
              this.userPhotos.splice(index, 1);
              this.imageUrl.splice(i, 1);
              console.log("imagen eliminada: ", itemRef, ' ', index);
            }).catch(err => {
              console.log(err);
            });
          };
        });
      });
    }

    seeImg(){
      const storage = fs;
      const storageRef = storage.ref();
      
        storageRef.child('/images/productos/1/').listAll().then(res => {
          const i = 0;
          console.log('esta es la res', res)
          res.items.forEach(itemRef => {
            console.log(itemRef)
            this.userPhotos.push(itemRef);
            itemRef.getDownloadURL().then( downloadUrl => {
              this.imageUrl.push(downloadUrl);
              console.log('img url ' + downloadUrl)
            })
          });
        }).catch(error => {
          console.log(error)
        });

        this.mostrar = true;
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


<style lang="stylus" scoped>

</style>
