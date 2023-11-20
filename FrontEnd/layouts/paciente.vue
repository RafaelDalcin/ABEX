<template>
    <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      color="#94d8a4"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon class="mr-2" medium color="white">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="v-list-item-title" v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="#94d8a4"
    >
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer" />
      <v-btn
        color="white"
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title style="color:white;" v-text="title" />
      <v-spacer />
      <v-btn
        color="black"
        class="mr-1"
        large
        to="/"
        icon
        >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
      <v-main>
        <v-container>
          <Nuxt/>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'DefaultLayout',
    data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [

        {
          icon: 'mdi-list-box',
          title: 'Meu prontuário',
          to: '/prontuario'
        },

        {
          icon: 'mdi-map-marker',
          title: 'Endereço',
          to: '/enderecos'
        },

        
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Sistema de Gestão de Pacientes'
    }
  },


  }
  </script>

  
<style>

.v-list-item-title {
  color:white;
  font-size:16px
}

</style>