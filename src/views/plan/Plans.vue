<template>
    <datatable :columns="columns" title="Plans" :request="fetchPlans" :on-data-change="onDataChange">
        <template slot="header-action">
            <router-link to="/plans/create" class="btn btn-primary">Add New Plan</router-link>
        </template>
        <tr v-for="plan in plans">
            <td>
                <strong class="d-block mb-0">{{plan.name|capitalize}}</strong>
                <small>{{plan.description}}</small>
            </td>
            <td>
                {{plan.currency}} {{plan.price}}
            </td>
            <td>
                {{plan.invoice_period}} {{plan.invoice_interval|capitalize}}
            </td>
            <td>
                {{plan.subscriptions_count}}
            </td>
        </tr>
    </datatable>
</template>

<script>
    import Datatable from "../../components/table/Datatable";
    import planService from "../../services/planService";

    export default {
        name: "Plans",
        components: {Datatable},
        data() {
            return {
                columns: [
                    'name', 'price', 'invoice_period', 'Active Subscriptions'
                ],
                plans: []
            }
        },
        methods: {
            fetchPlans(url, params) {
                return planService.get(url, true, params)
            },
            onDataChange(data) {
                this.plans = data
            }
        }
    }
</script>

<style scoped>

</style>