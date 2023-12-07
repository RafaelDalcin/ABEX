<template>
	<v-container>
		<v-row>
			<v-col>
				<v-card>
					<v-dialog v-model="dialog" persistent max-width="800px">
						<template v-slot:activator="{ on, attrs }">
							<v-btn class="ml-4 mt-4" large color="success" dark v-bind="attrs" v-on="on">
								Cadastrar
							</v-btn>
						</template>
						<v-card>
							<v-card-title>
								<span class="text-h5">{{ this.tituloChange }}</span>
							</v-card-title>
							<v-card-text>
								<v-form ref="form" v-model="valid">

									<v-container>
										<v-row>
											<v-col cols="12">
												<v-text-field v-model="aluno.nome" outlined label="Nome" required
													placeholder="Nome" :rules="rule"></v-text-field>
											</v-col>
											<v-col cols="6">
												<v-text-field v-model="usuario.username" outlined label="Username" required
													:rules="rule" placeholder="Username"></v-text-field>
											</v-col>
											<v-col cols="6">
												<v-text-field type="password" v-model="usuario.senha" outlined label="Senha"
													required :rules="rule" placeholder="Senha"></v-text-field>
											</v-col>
											<v-col cols="12">
												<v-text-field v-model="usuario.email" outlined label="E-mail" required
													:rules="rule" placeholder="E-mail"></v-text-field>
											</v-col>
											<v-col cols="4">
												<v-text-field v-model="aluno.matricula" outlined label="Matrícula" required
													:rules="rule" placeholder="Matrícula"></v-text-field>
											</v-col>
											<v-col cols="8">
												<v-text-field v-model="aluno.curso" outlined label="Curso" required
													:rules="rule" placeholder="Curso"></v-text-field>
											</v-col>
											<v-col cols="4">
												<v-text-field v-model="aluno.semestre" outlined label="Semestre" required
													:rules="rule" placeholder="Semestre"></v-text-field>
											</v-col>
											<v-col cols="8">
												<v-autocomplete v-model="aluno.idGrupo" :items="grupos"
													item-text="descricao" item-value="id" outlined label="Grupo" required
													:rules="rule" placeholder="Grupo"></v-autocomplete>
											</v-col>
										</v-row>
									</v-container>
								</v-form>
							</v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="blue darken-1" text @click="limparCampos">
									Fechar
								</v-btn>
								<v-btn color="blue darken-1" text @click="adicionarAluno">
									Salvar
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<v-card-title>
						Alunos
						<v-spacer></v-spacer>
						<v-text-field append-icon="mdi-magnify" label="Search" single-line hide-details>
						</v-text-field>
					</v-card-title>
					<v-data-table :headers="headers" :items="alunos">
						<template v-slot:item.actions="{ item }">
							<v-icon color="info" small class="mr-2" @click="editarAluno(item)">
								mdi-pencil
							</v-icon>
							<v-icon color="red" small @click="excluirAluno(item)">
								mdi-delete
							</v-icon>
						</template>
					</v-data-table>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
  
<script>
export default {
	layout: 'default',

	data() {
		return {
			title: '',
			valid: false,

			editMode: false,

			rule: [
				v => !!v || 'Esse campo é obrigatório'
			],

			aluno: {
				id: null,
				nome: null,
				matricula: null,
				curso: null,
				semestre: null,
				idGrupo: null,
				idUsuario: null,
			},

			usuario: {
				id: null,
				username: null,
				senha: null,
				email: null,
				tipo: 'aluno',
			},


			dialog: false,
			headers: [
				{
					text: 'Código',
					align: 'center',
					sortable: 'false',
					value: 'id',
				},
				{
					text: 'Grupo',
					align: 'center',
					sortable: 'false',
					value: 'grupo.descricao',
				},
				{
					text: 'Nome',
					align: 'center',
					sortable: 'false',
					value: 'nome',
				},
				{
					text: 'Username',
					align: 'center',
					sortable: 'false',
					value: 'usuario.username',
				},
				{
					text: 'Email',
					align: 'center',
					sortable: 'false',
					value: 'usuario.email',
				},
				{
					text: 'Curso',
					align: 'center',
					sortable: 'false',
					value: 'curso',
				},
				{
					text: 'Matricula',
					align: 'center',
					sortable: 'false',
					value: 'matricula',
				},

				{ text: "", value: "actions" }
			],
			alunos: [],
			grupos: [],
		}
	},


	computed: {
		tituloChange: function () {
			return this.usuario.id > 0 ? 'Editar aluno' : 'Cadastrar aluno';
		},

		editMode: function () {
			return this.usuario.id > 0 ? true : false;
		}
	},

	created() {
		this.getAlunos();
		this.getGrupos();

	},

	methods: {


		async limparCampos() {
			this.aluno = {
				id: null,
				nome: null,
				matricula: null,
				curso: null,
				semestre: null,
				idGrupo: null,
				idUsuario: null,
			},

				this.usuario = {
					id: null,
					username: null,
					senha: null,
					email: null,
					tipo: 'aluno',
				}

			this.valid = true;
			this.dialog = false;
			this.$refs.form.reset();
			await this.getAlunos();
		},

		async getAlunos() {
			try {
				let response = await this.$api.get('http://localhost:3333/alunos').then(res => res.data);
				this.alunos = response;

			} catch (error) {
				this.$toast.error(error.message);
			}
		},

		async getGrupos() {
			try {
				let response = await this.$api.get('http://localhost:3333/grupos').then(res => res.data);
				this.grupos = response;

			} catch (error) {
				this.$toast.error(error.message);
			}
		},

		async buscarTodos() {
			await this.getAlunos();
			await this.getGrupos();
		},

		async adicionarUsuario() {
			try {

				if (!this.valid) {
					return this.$toast.warning('Preencha todos os campos');
				}

				let usuario = {
					id: this.usuario.id,
					username: this.usuario.username,
					senha: this.usuario.senha,
					email: this.usuario.email,
					tipo: this.usuario.tipo,
				}

				let response = await this.$api.post('http://localhost:3333/usuarios/persist', usuario);
				if (response.type == 'success') {
					return response.data;
				} else {
					return this.$toast.error(response.message);
				}

			} catch (error) {
				return this.$toast.error(response.message);
			}

		},

		async editarAluno(aluno) {
			try {
				this.editMode = true;
				let response = await this.$api.get(`http://localhost:3333/alunos/${aluno.id}`).then(res => res.data);
				this.dialog = true;

				this.aluno = response;
				this.usuario = response.usuario;

			} catch (error) {

			}
		},

		async adicionarAluno() {
			try {

				if (!this.valid) {
					return this.$toast.warning('Preencha todos os campos');
				}

				let usuario = await this.adicionarUsuario();
				if (usuario.id) {

					let aluno = {
						id: this.aluno.id,
						nome: this.aluno.nome,
						matricula: this.aluno.matricula,
						curso: this.aluno.curso,
						semestre: this.aluno.semestre,
						idGrupo: this.aluno.idGrupo,
						idUsuario: usuario.id,

					}

					if (!aluno.id) {
						let response = await this.$api.post("http://localhost:3333/alunos/persist", aluno);
						if (response.type == 'success') {
							this.$toast.success(response.message);
							await this.getAlunos();
							this.dialog = false;
						} else {
							this.$toast.error(response.message);
						}
					} else {
						let response = await this.$api.post("http://localhost:3333/alunos/persist", aluno);
						if (response.type == 'success') {
							this.$toast.success(response.message);
							await this.getAlunos();
							this.dialog = false;
						} else {
							this.$toast.error(response.message);
						}
					}

					await this.limparCampos();
				}
			} catch (error) {

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

		async excluirAluno(aluno) {
            this.$swal({
                title: 'Deletar aluno',
                text: 'Você tem certeza que deseja deletar esse registro?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não'

            }).then(async (isConfirm) => {
                if (isConfirm.value) {
                    try {
                        let response = await this.$api.post('/alunos/destroy', { id: aluno.id });
                        await this.$api.post('/usuarios/destroy', { id: aluno.idUsuario });
                        this.mensagemRetorno(response.type, response.message);
                        await this.buscarTodos();

                    } catch (error) {
                        this.mensagemRetorno(response.type, response.message);
                    }
                }
            })
        },
	}
}
</script>

<style>

.swal2-popup {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
}


</style>