<template>
    <div class="card">
        <div class="card-header" v-if="title">
            <slot name="card-header">
                <h4 class="card-title">
                    {{title}}
                </h4>
            </slot>
        </div>
        <div class="card-body">
            <slot></slot>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Card",
        props: {
            title: String
        }
    }
</script>

<style scoped>

</style>
