<template>
    <div class="card">
        <div class="card-header">
            <h4 class="card-title">Plan Information</h4>
        </div>
        <div class="card-body">
           <div class="row justify-content-center">
               <div class="col-md-8 col-sm-12 col-xl-6">
                   <app-form form-class="personal_validate" :on-submit="submit" :error="error">
                       <div class="form-row">
                           <div class="form-group col-xl-12">
                               <label class="mr-sm-2">Name</label>
                               <input type="text" class="form-control" placeholder="Eg. Monthly" v-model="plan.name"
                                      required>
                           </div>
                           <div class="form-group col-xl-12">
                               <label class="mr-sm-2">Description</label>
                               <input type="text" class="form-control" placeholder="Description (optional)" v-model="plan.description"
                                      required>
                           </div>
                           <div class="form-group  col-xl-6">
                               <label class="mr-sm-2">Price</label>
                               <div class="input-group mb-3">
                                   <select name="currency" class="form-control" v-model="plan.currency">
                                       <option  value="INR">Indian Rupee</option>
                                   </select>
                                   <input type="text"  placeholder="Enter price" class="form-control" v-model="plan.price">
                               </div>

                           </div>
                           <div class="form-group  col-xl-6">
                               <label class="mr-sm-2">Validity</label>
                               <div class="input-group mb-3">
                                   <input type="text"  class="form-control" placeholder="Period" v-model="plan.invoice_period">
                                   <select name="currency" class="form-control" v-model="plan.invoice_interval">
                                       <option  value="day">Days</option>
                                       <option  value="month">Monthly</option>
                                       <option  value="year">Yearly</option>
                                   </select>
                               </div>
                           </div>

                           <div class="form-group  col-xl-6">
                               <label class="mr-sm-2">Trial</label>
                               <div class="input-group mb-3">
                                   <input type="text"  class="form-control" placeholder="Period" v-model="plan.trial_period">
                                   <select name="currency" class="form-control" v-model="plan.trial_interval">
                                       <option  value="day">Days</option>
                                       <option  value="month">Monthly</option>
                                       <option  value="year">Yearly</option>
                                   </select>
                               </div>
                           </div>
                           <div class="col-12">
                               <div class="p-title">Add Features</div>
                               <table class="table">
                                   <thead>
                                   <tr>
                                       <td>Feature</td>
                                       <td>Description</td>
                                       <td>Value</td>
                                   </tr>
                                   </thead>
                                   <tbody>
                                   <tr v-for="feature in plan.features">
                                       <td>
                                           <select name="currency" class="form-control" v-model="feature.name">
                                               <option  value="stock_subscription">Stock Subscription</option>
                                           </select>
                                       </td>
                                       <td>
                                           <input type="text" placeholder="Enter Description"  class="form-control" v-model="feature.description">
                                       </td>
                                       <td>
                                           <input type="text" placeholder="Number of stocks user can subscribe"  class="form-control" v-model="feature.value">
                                       </td>
                                   </tr>
                                   </tbody>
                               </table>
                           </div>

                           <div class="form-group col-12">
                               <app-button btn-class="btn btn-success pl-5 pr-5" :disabled="isLoading">
                                   Save
                               </app-button>
                           </div>
                       </div>
                   </app-form>
               </div>
           </div>
        </div>
    </div>
</template>

<script>
    import AppButton from "../../components/common/AppButton";
    import AppForm from "../../components/common/AppForm";
    import planService from "../../services/planService";

    export default {
        name: "CreatePlan",
        components: {AppForm, AppButton},
        data() {
            return {
                isLoading: false,
                error: null,
                plan:{
                    name:null,
                    description:null,
                    price:100,
                    currency :  'INR',
                    invoice_period:1,
                    trial_period:1,
                    invoice_interval:'day',
                    trial_interval:'day',
                    features:[]
                },


            }
        },
        mounted() {
            this.addEmptyFeature()
        },

        methods: {
            addEmptyFeature(){
                this.plan.features.push({
                    name:'stock_subscription',
                    description:'Stock Subscription',
                    value:1
                })
            },
            submit() {
                this.isLoading = true
                planService.store(this.plan)
                .then(res =>{
                    this.isLoading = false
                    this.$router.back()
                }).catch(err =>{
                    this.isLoading = false
                    this.error = err
                })
            }
        }
    }
</script>

<style scoped>

</style>