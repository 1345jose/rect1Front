export default function ({ store, redirect }) {
    if (process.client) {
        if (!store.getters['auth/isAuthenticated']) {
            return redirect('/');
        }
    }
}
