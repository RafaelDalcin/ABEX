<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        Pacientes
                        <v-spacer></v-spacer>
                        <v-text-field append-icon="mdi-magnify" label="Search" single-line hide-details>
                        </v-text-field>
                    </v-card-title>
                    <v-data-table :headers="headers" :items="pacientes">
                        <template v-slot:item.actions="{ item }">
                            <v-icon color="info" small class="mr-2" @click="editarPaciente(item)">
                                mdi-pencil
                            </v-icon>
                            <v-icon color="red" small @click="excluirPaciente(item)">
                                mdi-delete
                            </v-icon>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-tabs fixed-tabs v-model="tab" dark icons-and-text>
                        <v-tabs-slider></v-tabs-slider>
                        <v-tab href="#tab1">
                            Detalhes
                            <v-icon>mdi-card-account-details</v-icon>
                        </v-tab>
                        <v-tab href="#tab2">
                            Endereço
                            <v-icon>mdi-map-marker</v-icon>
                        </v-tab>
                        <v-tab href="#tab3">
                            Prontuário
                            <v-icon>mdi-form-select</v-icon>
                        </v-tab>
                        <v-tab-item value="tab1">
                            <v-card>
                                <v-card-title>Cadadstro paciente</v-card-title>
                                <v-card-item>
                                    <v-form ref="form" v-model="valid">

                                        <v-container>
                                            <v-row>
                                                <v-col cols="4">
                                                    <v-text-field v-model="paciente.nomeCompleto" outlined required
                                                        :rules="rule" label="Nome completo">

                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="4">
                                                    <v-text-field v-mask="'###.###.###-##'" v-model="paciente.cpf" outlined required :rules="rule"
                                                        label="CPF">

                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="2">
                                                    <v-text-field v-model="paciente.relacaoFamiliar" outlined required
                                                        :rules="rule" label="Relação familiar">

                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="2">
                                                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                                        :return-value.sync="date" transition="scale-transition" offset-y
                                                        min-width="auto">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field outlined v-model="paciente.dataNasc"
                                                                label="Data de nascimento" append-icon="mdi-calendar"
                                                                readonly v-bind="attrs" v-on="on"></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="paciente.dataNasc" no-title scrollable>
                                                            <v-spacer></v-spacer>
                                                            <v-btn text color="primary" @click="menu = false">
                                                                Cancelar
                                                            </v-btn>
                                                            <v-btn text color="primary" @click="$refs.menu.save(date)">
                                                                OK
                                                            </v-btn>
                                                        </v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col>
                                                    <v-text-field v-model="usuario.username" required :rules="rule" outlined
                                                        label="Usuário"></v-text-field>
                                                </v-col>
                                                <v-col>
                                                    <v-text-field v-model="usuario.senha" required :rules="rule"
                                                        type="password" outlined label="Senha"></v-text-field>
                                                </v-col>
                                                <v-col>
                                                    <v-text-field v-model="usuario.email" required :rules="rule" outlined
                                                        label="E-mail"></v-text-field>
                                                </v-col>
                                                <v-col>
                                                    <v-autocomplete v-model="paciente.idFamilia" :items="familias"
                                                        item-text="descricao" item-value="id" outlined label="Família"
                                                        required :rules="rule" placeholder="Família"></v-autocomplete>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-form>
                                </v-card-item>
                                <v-card-actions>
                                    <v-container>
                                        <v-row>
                                            <v-col align="right">
                                                <v-btn @click="adicionarPaciente" color="success">Salvar</v-btn>
                                                <v-btn dark>Cancelar</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-actions>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {

            pacientes: [],
            familias: [],


            valid: false,

            rule: [
                v => !!v || 'Esse campo é obrigatório'
            ],

            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            menu: false,

            paciente: {
                id: null,
                nomeCompleto: null,
                cpf: null,
                dataNasc: null,
                relacaoFamiliar: null,
                idUsuario: null,
                idFamilia: null
            },

            usuario: {
                id: null,
                username: null,
                senha: null,
                email: null,
                tipo: 'paciente',
            },

            tab: null,
            itemsTab: ['Detalhes', 'Endereço', 'Prontuário'],

            headers: [
                {
                    text: 'Nome',
                    align: 'center',
                    sortable: 'false',
                    value: 'nome',
                },

                {
                    text: 'Usuário',
                    align: 'center',
                    sortable: 'false',
                    value: 'usuario.username',
                },

                {
                    text: 'E-mail',
                    align: 'center',
                    sortable: 'false',
                    value: 'usuario.email',
                },

                {
                    text: 'CPF',
                    align: 'center',
                    sortable: 'false',
                    value: 'cpf',
                },

                { text: "", value: "actions" }
            ],

        }
    },

    created() {
        this.buscarPacientes();
        this.buscarFamilias();
    },

    methods: {

        async buscarTodos () {
            await this.buscarFamilias();
            await this.buscarPacientes();    
        },

        async buscarPacientes() {
            let response = await this.$api.get('/pacientes/').then(res => res.data);
            this.pacientes = response;
        },
        async buscarFamilias() {
            let response = await this.$api.get('/familias/').then(res => res.data);
            this.familias = response;
        },

        preencherDadosUsuario() {
            let retorno = {
                id: this.usuario.id,
                username: this.usuario.username,
                senha: this.usuario.senha,
                email: this.usuario.email,
                tipo: this.usuario.tipo,
            }
            return retorno
        },

        preencherDadosPaciente(usuario) {
            let retorno = {
                nome: this.paciente.nomeCompleto,
                cpf: this.paciente.cpf,
                relacaoFamiliar: this.paciente.relacaoFamiliar,
                dataNascimento: this.paciente.dataNasc,
                idFamilia: this.paciente.idFamilia,
                idUsuario: usuario.id
            }
            return retorno
        },

        async adicionarUsuario() {
            try {
                let usuario = this.preencherDadosUsuario();

                let response = await this.$api.post('/usuarios/persist', usuario);
                if(response.data) {
                    return response;
                }
                this.mensagemRetorno(response.type, response.message);
                
            } catch (error) {
                this.mensagemRetorno(response.type, response.message);
            }
        },

        async adicionarPaciente() {
            try {

                if (!this.valid)
                    return this.$toast.warning("Preencha todos os campos!")

                let usuario = await this.adicionarUsuario();
                let paciente = this.preencherDadosPaciente(usuario);

                let response = await this.$api.post('/pacientes/persist', paciente);
                this.mensagemRetorno(response.type, response.message);

                await this.buscarTodos();

            } catch (error) {
                this.mensagemRetorno(response.type, response.message);
            }

        },

        mensagemRetorno(resStatus, message) {
			if (resStatus == 'success') {
				return this.$toast.success(message);
			}
			if (resStatus == 'error') {
				return this.$toast.error(message);
			}
			if (resStatus == 'warning') {
				return this.$toast.warning(message);
			}
		},

        async editarPaciente (paciente) {
            try { 
                let response = await this.$api.get(`/pacientes/${paciente.id}`);
                this.mensagemRetorno(response.type, response.message);
                this.usuario = response.usuario;
                this.paciente = response;
                
            } catch (error) {
                this.mensagemRetorno(response.type, response.message);
            }
        },

        async excluirPaciente (paciente) {
            this.$swal({
                title: 'Deletar paciente',
                text:'Você tem certeza que deseja deletar esse registro?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText:'Sim',
                cancelButtonText: 'Não'

            }).then(async (isConfirm) => {
                if(isConfirm) {
                    try {
                        let response = await this.$api.post('/pacientes/destroy', { id: paciente.id });
                        this.mensagemRetorno(response.type, response.message);
                        await this.buscarTodos();
                    } catch (error) {
                        this.mensagemRetorno(response.type, response.message);
                    }                    
                }
            })
        }

    }



}

</script>
    
<style>
.swal2-popup {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
}

</style>