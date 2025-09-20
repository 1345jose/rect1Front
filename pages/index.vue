<template>
    <div>
        <Login />
    </div>
</template>

<script>
import Login from "@/components/auth/login.vue";
export default {

    name: 'login',
    layout: 'guest',

    components: {
        Login
    }
};

</script>
