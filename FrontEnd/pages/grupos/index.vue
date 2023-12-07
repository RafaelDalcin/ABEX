<template>
	<v-container>
		<v-row>
			<v-col>
				<v-card>
					<v-dialog v-model="dialog" persistent max-width="600px">
						<template v-slot:activator="{ on, attrs }">
							<v-btn class="ml-4 mt-4" large color="success" dark v-bind="attrs" v-on="on">
								Cadastrar
							</v-btn>
						</template>
						<v-card>
							<v-card-title>
								<span class="text-h5">Cadastrar grupo</span>
							</v-card-title>
							<v-card-text>
								<v-form ref="form">
									<v-container>
										<v-row>
											<v-col cols="12">
												<v-text-field v-model="grupo.descricao" outlined label="Descrição" required
													placeholder="Descrição"></v-text-field>
											</v-col>
										</v-row>
									</v-container>
								</v-form>
							</v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="blue darken-1" text @click="dialog = false">
									Fechar
								</v-btn>
								<v-btn color="blue darken-1" text @click="adicionar">
									Salvar
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<v-card-title>
						Grupos de Enfermagem
						<v-spacer></v-spacer>
						<v-text-field append-icon="mdi-magnify" label="Search" single-line hide-details>
						</v-text-field>
					</v-card-title>
					<v-data-table :headers="headers" :items="grupos">
						<template v-slot:item.actions="{ item }">
							<v-icon color="info" small class="mr-2" @click="atualizar(item)">
								mdi-pencil
							</v-icon>
							<v-icon color="red" small @click="excluirGrupo(item)">
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

			grupo: {
				id: null,
				descricao: null
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
					text: 'Descrição',
					align: 'center',
					sortable: 'false',
					value: 'descricao',
				},
				{ text: "", value: "actions" }
			],
			grupos: []
		}
	},

	created() {
		this.getGrupos();
	},

	methods: {
		async getGrupos() {
			this.grupos = await this.$api.get('/grupos').then(res => res.data);
		},

		async excluirGrupo(grupo) {
            this.$swal({
                title: 'Deletar grupo',
                text: 'Você tem certeza que deseja deletar esse registro?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não'

            }).then(async (isConfirm) => {
                if (isConfirm.value) {
                    try {
                        let response = await this.$api.post('/grupos/destroy', { id: grupo.id });
                        this.mensagemRetorno(response.type, response.message);

                        await this.getGrupos();
                    } catch (error) {
                        this.mensagemRetorno(response.type, response.message);
                    }
                }
            })
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

		async limparCampos() {
			this.grupo = {
				id: null,
				descricao: null
			},

				this.valid = true;
			this.dialog = false;
			this.$refs.form.reset();
			await this.getAlunos();
		},

		async adicionar() {
			try {

				let grupo = {
					id: this.grupo.id,
					descricao: this.grupo.descricao,
				};


				if (!grupo.id) {
					await this.$api.post('/grupos/persist', grupo);
					this.$toast.success('Cadastro realizado com sucesso!');
				} else {
					await this.$api.post('/grupos/persist', grupo);
					this.$toast.success('Cadastro atualizado com sucesso!');
				}
				this.dialog = false;
				await this.getGrupos()
				this.$refs.form.reset();

			} catch (error) {
				this.$toast.error('Ocorreu um erro ao realizar o cadastro!');
			}
		},

		async atualizar(item) {
			try {

				this.dialog = true;
				this.grupo = item;

			} catch (error) {

			}
		}

	}
}
</script>