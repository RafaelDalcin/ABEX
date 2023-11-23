<template>
    <v-container fill-height class="height-container">
        <v-row align="center" justify="center">
            <v-col v-for="(item, i) in items" :key="i">
                <v-card elevation="5" class="mx-auto custom-card" :to="item.to" router exact>
                    <v-card-item>
                        <v-card-title class="justify-center">
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-card-title>
                        <v-card-subtitle class="d-flex justify-center">
                            <h2>{{ item.titulo }}</h2>
                        </v-card-subtitle>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    layout: 'user',
    data() {
        return {

            items: [{ titulo: 'Buscar famílias', icon: "mdi-human-male-male-child", to: "/familias" }, { titulo: 'Buscar pacientes', icon: "mdi-account-injury", to: '/pacientes' }, { titulo: 'Meu perfil', icon: "mdi-account" }]

        }
    }

}

</script>

<style scoped>
.height-container {
    height: 90vh
}

.v-icon {
    color: #94d8a4;
    font-size: 125px;
}

.custom-card {
    border-radius: 5%;
    display: flex;
    width: 350px;
    height: 250px;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease-in-out;
}

.custom-card:hover {
    transform: scale(1.05);
}
</style>