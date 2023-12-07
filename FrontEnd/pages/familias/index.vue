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
								<span class="text-h5">Cadastrar família</span>
							</v-card-title>
							<v-card-text>
								<v-form ref="form" v-model="valid">
									<v-container>
										<v-row>
											<v-col cols="12">
												<v-text-field v-model="familia.descricao" outlined label="Descrição"
													required placeholder="Descrição"></v-text-field>
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
						Famílias
						<v-spacer></v-spacer>
						<v-text-field append-icon="mdi-magnify" label="Search" single-line hide-details>
						</v-text-field>
					</v-card-title>
					<v-data-table :headers="headers" :items="familias">
						<template v-slot:item.actions="{ item }">
							<v-icon color="info" small class="mr-2" @click="atualizar(item)">
								mdi-pencil
							</v-icon>
							<v-icon color="red" small @click="excluirFamilia(item)">
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

			familia: {
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
			familias: []
		}
	},

	created() {
		this.getFamilias();
	},

	methods: {
		async getFamilias() {
			this.familias = await this.$api.get('http://localhost:3333/familias').then(res => res.data);
		},

		async excluirFamilia(familia) {
            this.$swal({
                title: 'Deletar família',
                text: 'Você tem certeza que deseja deletar esse registro?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não'

            }).then(async (isConfirm) => {
                if (isConfirm.value) {
                    try {
                        let response = await this.$api.post('/familias/destroy', { id: familia.id });
                        this.mensagemRetorno(response.type, response.message);

                        await this.getFamilias();
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

		async adicionar() {
			try {
				//primeiro valida-se se o formulário está preenchido
				//montamos a variárel categoria para enviar nos posts
				let familia = {
					id: this.familia.id,
					descricao: this.familia.descricao,
				};


				if (!familia.id) {
					await this.$api.post('http://localhost:3333/familias/persist', familia);
					this.$toast.success('Cadastro realizado com sucesso!');
				} else {
					await this.$api.post('http://localhost:3333/familias/persist', familia);
					this.$toast.success('Cadastro atualizado com sucesso!');
				}
				this.dialog = false;
				await this.getFamilias()
				this.$refs.form.reset();

			} catch (error) {
				this.$toast.error('Ocorreu um erro ao realizar o cadastro!');
			}
		},

		async atualizar(item) {
			try {

				this.dialog = true;
				this.familia = item;

			} catch (error) {

			}
		}

	}
}
</script>