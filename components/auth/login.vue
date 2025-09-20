<template>
    <v-app>
        <div id="background-login">
            <v-container fluid class="d-flex justify-center align-center">
                <v-card elevation="10" id="login">
                    <v-form>
                        <div style="text-align: center">
                            <v-icon size="100" color="primary">mdi-cart</v-icon>
                        </div>

                        <h2 class="text-center mb-4">Bienvenido</h2>

                        <v-row>
                            <v-col cols="12">
                                <v-text-field dense outlined label="Usuario | Correo Electronico"
                                    prepend-inner-icon="mdi-account" v-model="formInicio.email" />
                            </v-col>

                            <v-col cols="12">
                                <v-text-field dense outlined label="Contraseña" type="password"
                                    v-model="formInicio.password" prepend-inner-icon="mdi-lock" />
                            </v-col>

                            <v-col cols="12" class="text-center">
                                <v-btn color="primary" dark @click="loguearUsuario()">Ingresar</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card>
            </v-container>
        </div>
    </v-app>
</template>

<script>
export default {

    data() {
        return {
            formInicio: {
                email: null,
                password: null
            }
        }
    },

    methods: {

        async validarUsuario() {
            try {
                await this.$axios.post('auth/loguear');
                this.$toast.success('¡ Bienvenido !');
                this.$router.push('/inicio/principal');
            } catch (error) {
                this.$toast.error(error.response.data.error || 'Ha ocurrido un error al iniciar sesion')
            }
        }

    }


}
</script>

<style scoped>
#background-login {
    background-image: url("../../static/images/page1.jpg");
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    align-items: center;
}

#login {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    padding: 30px;
    max-width: 400px;
    width: 100%;
}
</style>
