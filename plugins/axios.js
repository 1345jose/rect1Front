export default function ({ $axios, store }) {
    $axios.onRequest(config => {
        const token = store.state.auth?.token || localStorage.getItem('token');

        if (token) {
            config.headers.common['Authorization'] = `Bearer ${token}`;
        }
        return config;
    });

    $axios.onError(error => {
        if (error.response && error.response.status === 401) {
            console.error("No autorizado - Token inválido o expirado");
        }
        return Promise.reject(error);
    });
}
