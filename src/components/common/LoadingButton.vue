<template>
    <button class="btn btn-success btn-block" :class="classes" type="submit" :disabled="isLoading"
            @click="$emit('click')">
        <div class="spinner-border" role="status" v-if="isLoading" >
            <span class="sr-only">Loading...</span>
        </div>
        <div v-if="!isLoading">{{btnText}}</div>
    </button>
</template>

<script>
    export default {
        name: "LoadingButton",
        props: {
            btnText: String,
            isLoading: Boolean,
            classes  : String
        }

    }
</script>

<style scoped>

</style>
