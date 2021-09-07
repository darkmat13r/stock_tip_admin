<template>

    <div class="row" v-if="user">
        <div class="col-12 col-lg-3">
            <div class="card">
                <div class="card-body">
                    <div>Name : {{user.name}}</div>
                    <div>Email : {{user.email}}</div>
                    <div>Contact : {{user.contact}}</div>
                    <div>Created At : {{user.created_at}}</div>
                </div>
            </div>
        </div>
        <div class="col-12 col-lg-9">
            <div class="card">
                <div class="card-body">
                    <h5>Active Subscriptions</h5>
                    <div v-if="user.current_subscription" class="subscription-card">
                        <div>Plan Name: {{user.current_subscription.name}}</div>
                        <div>Activated At : {{user.current_subscription.created_at | timeAgo}}</div>
                        <div>Trail Ends : {{user.current_subscription.trial_ends_at | timeAgo | not_defined}}</div>
                        <div>Ends At: {{user.current_subscription.ends_at | timeAgo}}</div>
                    </div>
                    <div v-else>
                        <h6 class="text-muted text-center">No active subscription</h6>
                    </div>

                    <h5 class=" mt-10" style="margin-top: 25px">All Subscriptions</h5>
                    <div class="col-md-12 col-lg-4 subscription-card" v-for="subscription in user.subscriptions" >
                        <div>Plan Name: {{subscription.name}}</div>
                        <div>Activated At : {{subscription.created_at | timeAgo | not_defined}}</div>
                        <div>Trail Ends : {{subscription.trial_ends_at | timeAgo  | not_defined}}</div>
                        <div>Ends At: {{subscription.ends_at | timeAgo}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import userService from "../../services/usersService";

    export default {
        name: "UserDetails",
        data() {
            return {
                userId: null,
                user: null
            }
        },
        watch: {
            userId(val) {
                this.fetchUser(val)
            }
        },
        mounted() {
            this.userId = this.$route.params.userId

        },
        methods: {
            fetchUser(userId) {
                userService.getById(userId)
                    .then(res => {
                        this.user = res
                    }).catch(err => {

                })
            }
        }
    }
</script>

<style scoped>
    .subscription-card {
        border: 1px solid rgba(148,148,148,0.74);
        border-radius: 8px;
        padding: 24px;
    }

</style>