export const state = () => ({
    token: null,
    usuario: null,
});

export const mutations = {
    SET_AUTH_TOKEN(state, token) {
        state.token = token
    },
    SET_AUTH_USER(state, usuario) {
        state.usuario = usuario
    },
};