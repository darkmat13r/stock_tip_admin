<template>
    <div>
        <datatable title="Google Sheets" :on-data-change="onDataChanged" :request="getRequest" :columns="columns">

            <tr v-for="googleSheet in googleSheets">
                <td><div class="text-dark">
                    {{googleSheet.sheet_name}}
                </div>
                    {{googleSheet.sheet_id}}
                </td>
                <td>
                    <span class="badge badge-primary" v-if="googleSheet.status =='available'">{{googleSheet.status}}</span>
                    <span class="badge badge-danger" v-else>{{googleSheet.status}}</span>

                </td>
                <td>
                    {{googleSheet.interval}}
                </td>
                <td>
                    <dropdown>
                        <div>
                            <span class="arrow">
                                <i class="la la-angle-down"></i>
                            </span>
                        </div>
                        <template v-slot:dropdown-menu>
                            <a v-on:click="" class="dropdown-item">
                                <i class="fe fe-edit"></i> Edit
                            </a>
                            <a v-on:click="" class="dropdown-item">
                                <i class="fe fe-trash"></i> Delete
                            </a>
                        </template>
                    </dropdown>
                </td>
            </tr>
        </datatable>

    </div>

</template>

<script>
    import Datatable from "../../components/table/Datatable";
    import googleSheetService from "../../services/googleSheetService";
    import Dropdown from "../../components/common/Dropdown";

    export default {
        name: "GoogleSheets",
        components: {Dropdown, Datatable},
        data() {
            return {
                googleSheets: [],
                columns:[
                    'sheet_name','status',  'input_interval', 'Action'
                ]
            }
        },
        methods: {
            onDataChanged(data) {
                this.googleSheets = data
            },
            getRequest(url, params) {
                return googleSheetService.get(url, true, params)
            }
        }
    }
</script>

<style scoped>

</style>