<template>

    <div class="text-center">
        <h2 class="empty-state-icon fe" :class="icon"></h2>
        <h1 class="mt-4">{{title}}</h1>
        <p>{{description}}</p>
        <router-link class="btn btn-primary  mt-4" :to="redirectAction" v-if="buttonLabel">{{buttonLabel}}</router-link>
    </div>
</template>

<script>
    export default {
        name: "EmptyState",
        props: {
            title: String,
            description: String,
            redirectAction: String,
            buttonLabel: String,
            imagePath: String,
            icon: String
        }
    }
</script>

<style scoped>


</style>
