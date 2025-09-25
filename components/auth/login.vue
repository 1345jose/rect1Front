<template>
    <v-app>
        <div id="background-login">
            <v-container fluid class="d-flex justify-center align-center">
                <v-card elevation="10" id="login">
                    <v-form ref="valLogin" v-if="!crearCuenta">
                        <div style="text-align: center">
                            <v-icon size="100" color="primary">mdi-cart</v-icon>
                        </div>

                        <h2 class="text-center mb-4">Bienvenido</h2>

                        <v-row>
                            <v-col cols="12">
                                <v-text-field dense outlined label="Usuario | Correo Electronico"
                                    prepend-inner-icon="mdi-account" v-model="formInicio.email"
                                    :rules="[rules.obligatorio, rules.emailValido]" />
                            </v-col>

                            <v-col cols="12">
                                <v-text-field dense outlined label="Contraseña" type="password"
                                    v-model="formInicio.password" prepend-inner-icon="mdi-lock"
                                    :rules="[rules.obligatorio]" />
                            </v-col>

                            <v-col cols="12" class="text-center">
                                <v-btn color="primary" dark @click="loguearUsuario()">Ingresar</v-btn>
                            </v-col>

                            <v-col cols="12" class="text-center">

                                <h5>¿ Aun no tienes cuenta ? .. registrate en el boton de abajo</h5>

                                <v-btn color="warning" dark @click="crearCuenta = true" class="mt-2">Crear
                                    cuenta</v-btn>
                            </v-col>

                        </v-row>
                    </v-form>

                    <v-form ref="valCrear" v-if="crearCuenta">
                        <div style="text-align: center">
                            <v-icon size="100" color="primary">mdi-account-plus</v-icon>
                        </div>

                        <h2 class="text-center mb-4">Bienvenido a Rect1 </h2>

                        <v-divider></v-divider>

                        <h4 class="mt-2 text-center">Completa el formulario para crear tu cuenta</h4>

                        <v-row dense class="mt-2">
                            <v-text-field dense outlined label="Correo Electrónico" v-model="formCrear.email"
                                type="email" :rules="[rules.obligatorio, rules.emailValido]" />


                            <v-col cols="12">
                                <v-text-field dense outlined label="Contraseña" type="password"
                                    v-model="formCrear.password" :rules="[rules.obligatorio, rules.contrasenaSegura]" />
                            </v-col>

                            <v-col cols=" 12">
                                <v-text-field dense outlined label="Nombre Completo" v-model="formCrear.nombre_completo"
                                    :rules="[rules.obligatorio]"></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field dense outlined label="Apellidos" v-model="formCrear.apellidos"
                                    :rules="[rules.obligatorio]"></v-text-field>
                            </v-col>


                            <v-col cols="12">
                                <v-text-field dense outlined label="Numero de Identificacion" type="number"
                                    v-model="formCrear.numero_documento"></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field dense outlined label="Telefono | Celular" type="number"
                                    v-model="formCrear.telefono"></v-text-field>
                            </v-col>

                            <v-col cols="12" class="text-center">
                                <v-btn color="error" dark @click="crear()">enviar formulario
                                    <v-icon right>mdi-arrow-right</v-icon></v-btn>
                            </v-col>


                            <v-col cols="12" class="text-center ">
                                <h5 class="text-center ">¿ Ya tienes una cuenta ? .. inicia Sesion </h5>
                                <v-btn @click="crearCuenta = false" color="primary" class="mt-2">Iniciar Sesion
                                    <v-icon>mdi-login</v-icon></v-btn>
                            </v-col>
                        </v-row>
                    </v-form>

                </v-card>
            </v-container>
        </div>



    </v-app>
</template>

<script>
import { mapActions } from "vuex"

export default {

    data() {
        return {
            formInicio: {
                email: null,
                password: null
            },
            crearCuenta: false,
            formCrear: {
                email: null,
                password: null,
                nombre_completo: null,
                apellidos: null,
                telefono: null,
                numero_documento: null
            },
            rules: {
                obligatorio: v => !!v || 'Este campo es obligatorio',
                emailValido: v => /.+@.+\..+/.test(v) || 'Debe ser un correo válido',
                contrasenaSegura: [
                    v => !!v || "La contraseña es obligatoria",
                    v => v.length >= 8 || "Mínimo 8 caracteres",
                    v => /[0-9]/.test(v) || "Debe tener al menos un número",
                    v => /[@$!%*?&]/.test(v) || "Debe tener al menos un carácter especial (@$!%*?&)"
                ]
            }
        }
    },

    methods: {
        ...mapActions("auth", ["login"]),

        async loguearUsuario() {
            try {
                await this.login(this.formInicio)

                this.$router.push("/inicio/principal");
                this.$toast.success("Bienvenido a Rect1");

            } catch (error) {
                this.$toast.error(error?.response?.data?.error || 'Ha ocurrido un error al iniciar sesion')
            }
        },

        async crear() {
            try {

                const data = {
                    ...this.formCrear
                }

                await this.$axios.post('auth/crear-usuario', data, {
                    headers: { Accept: "text/html" }
                });
            } catch (error) {
                this.$toast.error(error?.response?.data?.error || 'Ha ocurrido un error al crear tu cuenta')
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
    max-width: 500px;
    width: 100%;
}
</style>
