<template>
    <form v-on:submit.prevent="onSubmit" :class="formClass">
        <div class="alert alert-danger " v-if="error">{{error}}</div>
        <slot/>
    </form>
</template>

<script>
    export default {
        name: "AppForm",
        props: {
            onSubmit: Function,
            formClass: String,
            error: String,
        },
        methods: {}
    }
</script>

<style scoped>

</style>
