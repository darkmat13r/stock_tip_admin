<template>
    <button class="btn btn-primary waves-effect waves-light" :class="btnClass" :disabled="disabled"
            @click="onClick"
            :type="type">
        <slot>

        </slot>
    </button>
</template>

<script>
    export default {
        name: "AppButton",
        props: {
            type: {
                type:String,
                default:'submit'
            },
            btnClass: String,
            disabled: Boolean,
        },
        methods:{
            onClick(){
                this.$emit('click')
            }
        }

    }
</script>

<style scoped>

</style>
