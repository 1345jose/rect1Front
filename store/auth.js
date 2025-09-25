export const state = () => ({
    token: null,
    usuario: null,
});

export const mutations = {
    SET_AUTH_TOKEN(state, token) {
        state.token = token;
    },
    SET_AUTH_USER(state, usuario) {
        state.usuario = usuario;
    },
};

export const actions = {
    async fetchUser({ commit, state }) {
        if (state.token) {
            const { data } = await this.$axios.get('/usuario');
            commit('SET_AUTH_USER', data);
        }
    },

    login({ commit }, form) {
        return this.$axios.post("/auth/loguear-usuario", form).then(({ data }) => {
            commit('SET_AUTH_TOKEN', data.token);

            // Only store token in browser
            if (process.client) {
                localStorage.setItem('token', data.token);
            }

            commit('SET_AUTH_USER', data.usuario);
        });
    },

    initAuth({ commit, dispatch }) {
        if (process.client) {
            const token = localStorage.getItem('token');
            if (token) {
                commit('SET_AUTH_TOKEN', token);
                dispatch('fetchUser');
            }
        }
    }
};
