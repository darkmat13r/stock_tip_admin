<template>
    <modal @close="closeModal" v-if="isModalOpen">
        <div slot="modal-title">
            Upgrade User Plan
        </div>

        <div slot="body">
            <div class="card-body">
                <form @submit.prevent='upgradePlan()'>
                    <div class="form-group">
                        <label>Plan</label>
                        <div class="input-group mb-3">
                            <select name="currency" class="form-control"  v-model="selectedPlan">
                                <option :value="null">--Select Plan--</option>
                                <option v-for="plan in plans" :value="plan.id" v-if="plan.price !== 0">
                                    {{plan.name}}
                                </option>
                            </select>

                        </div>
                    </div>
                    <div class="form-group">
                        <app-button :disabled="isLoading">
                            Upgrade Plan
                        </app-button>
                    </div>
                </form>
            </div>
        </div>
    </modal>
</template>

<script>
    import AppButton from "../common/AppButton";
    import Modal from "./Modal";
    import usersService from "../../services/usersService";
    import planService from "../../services/planService";

    export default {
        name: "UpgradePlanModal",
        components: {AppButton, Modal},
        props: {},
        watch: {
            isModalOpen(val) {
                if (val) {
                    this.fetchPlans()
                }
            }
        },
        data() {
            return {
                selectedPlan: null,
                isModalOpen: false,
                isLoading: false,
                userId: null,
                plans: [],
            }
        },
        methods: {
            closeModal() {
                this.isModalOpen = false
                this.message = ''
                this.title = ''
                this.$emit('close')
            },
            show(userId) {
                this.userId = userId
                this.isModalOpen = true
            },
            fetchPlans() {
                this.isLoading = true
                planService.get(null, false)
                    .then(res => {
                        this.isLoading = false
                        this.plans = res
                    }).catch(err => {
                    this.isLoading = false
                    console.log(err)
                })
            },
            upgradePlan() {
                if(!this.selectedPlan){
                    toastr.error('Please select a plan')
                }
                this.isLoading = true
                usersService.upgradePlan(this.userId, this.selectedPlan)
                    .then(res => {
                        this.isLoading = false
                        this.closeModal()
                    }).catch(err => {
                    this.isLoading = false
                    console.log(err)
                })
            },
        }
    }
</script>

<style scoped>

</style>