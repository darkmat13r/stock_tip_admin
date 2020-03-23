<template>
    <div class="page-title dashboard">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-12">
                    <div class="page-title-content">
                        <p>Welcome Back,
                            <span> {{user.name}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Title",
        data(){
            return{
                user : this.$auth.getCurrentUser()
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>