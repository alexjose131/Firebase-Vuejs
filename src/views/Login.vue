<template>
    <v-app id="inspire">
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