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
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="color:white" v-text="item.title"/>
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
      <v-toolbar-title style="color:white" v-text="title" />
      <v-spacer />
      <v-btn
        icon
        color="black"
        class="mr-1"
        large
        to="/"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'default',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [{ title: 'Home', icon: "mdi-home", to: "/home" }, { title: 'Buscar famílias', icon: "mdi-human-male-male-child", to: "/familias" }, { title: 'Buscar pacientes', icon: "mdi-account-injury", to: '/pacientes' }, { title: 'Buscar alunos', icon: "mdi-account-school", to: '/alunos'  }, { title: 'Grupos Enfermagem', icon: "mdi-account-group", to: '/grupos'  }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Sistema de Gestão de Pacientes'
    }
  },
}
</script>
