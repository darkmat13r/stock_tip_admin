<template>
    <div class="dropdown" :class="dropdownClass" v-click-outside="closeDropDown">
        <div class="user" @click="toggle()">
            <slot/>
        </div>
        <div class="dropdown-menu dropdown-menu-right show" v-if="isOpen">
            <slot name="dropdown-menu"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Dropdown",
        props: {
            dropdownClass: String
        },
        data() {
            return {
                isOpen: false
            }
        },
        methods: {
            toggle() {
                console.log("Toggle")
                this.isOpen = !this.isOpen
            },
            closeDropDown(){
                this.isOpen = false
            }
        }
    }
</script>

<style scoped>

</style>