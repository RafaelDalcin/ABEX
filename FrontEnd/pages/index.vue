<template>
	<v-container fill-height class="height with-lines">
		<v-row align="center" justify="center">
			<v-col cols="12" sm="8" md="4">
				<v-card elevation="8" height="400px">
					<v-card-title class="justify-center default-color">
						<h2>Login</h2>
						<v-icon class="ml-2 default-color" large>
							mdi-hospital-box
						</v-icon>
					</v-card-title>
					<v-container>
						<v-form @submit.prevent="login">
							<v-row justify="center">
								<v-col cols="10">
									<v-text-field v-model="usuario.username" label="Usuário"
										placeholder="Digite seu usuário" outlined required></v-text-field>
								</v-col>
							</v-row>
							<v-row justify="center" no-gutters>
								<v-col cols="10">
									<v-text-field v-model="usuario.password" placeholder="Digite seu usuário" label="Senha"
										type="password" outlined required></v-text-field>
								</v-col>
							</v-row>
							<v-card-actions>
								<v-row justify="center">
									<v-btn outlined type="submit" class="login-btn" rounded width="65%">Entrar</v-btn>
								</v-row>
							</v-card-actions>
							<v-card-text class="mt-3 font-padrao text-center text-below-login ">
								<span>Enfermagem Unochapecó - Chapecó</span>
							</v-card-text>
						</v-form>
					</v-container>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	layout: 'login',
	data() {
		return {

			titlePage: 'Login',

			usuario: {
				username: '',
				password: ''

			}
		};

	},

	methods: {
		async login() {

			let dados = this.usuario
			let response = await this.$api.post("http://localhost:3333/usuarios/login", dados);
			if (response.data) {
				this.$router.push({ name: 'home', params: { idUsuarioLogado: response.data } })
				this.mensagemRetorno('success', response.message)
			} else {
				this.mensagemRetorno('error', response.message)
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
		}
	},
};
</script>

<style scoped>
.text-center {
	text-align: center;
}

.default-color {
	color: #94d8a4;
}

.height {
	height: 95vh
}

.login-btn {
	background-color: white;
	color: #94d8a4;
}

.text-below-login {
	font-size: 1.3vh;
	color: #94d8a4
}
</style>
