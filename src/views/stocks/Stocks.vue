<template>

    <datatable title="Stocks" ref="stocks" :columns="columns" :request="getStockRequest" :on-data-change="onDataLoaded">

        <template slot="header-action">
            <router-link to="/stocks/create" class="btn btn-primary">Add New Stock</router-link>
        </template>
        <tr v-for="stock in stocks">
            <td>{{stock.full_name}}</td>
            <td>{{stock.symbol}}</td>
            <td>{{stock.exchange}}</td>
            <td>
                <dropdown>
                    <div>
                            <span class="arrow">
                                <i class="la la-angle-down"></i>
                            </span>
                    </div>
                    <template v-slot:dropdown-menu>
                        <a v-on:click="" class="dropdown-item" @click="showUpdate(stock)">
                            <i class="la la-pencil"></i> Edit
                        </a>
                        <a v-on:click="" class="dropdown-item" @click="showRenew(stock)">
                            <i class="la la-refresh"></i> Renew
                        </a>
                        <a v-on:click="" class="dropdown-item" @click="updateStatus(stock)">
                            <i class="la la-trash"></i> Delete
                        </a>

                    </template>
                </dropdown>
            </td>
        </tr>
    </datatable>
</template>

<script>
    import Datatable from "../../components/table/Datatable";
    import stocksService from "../../services/stocksService";
    import Dropdown from "../../components/common/Dropdown";
    import CreateStock from "./CreateStock";

    export default {
        name: "Stocks",
        components: {Dropdown, Datatable},
        data() {
            return {
                stocks: [],
                columns: [
                    'full_name',
                    'symbol',
                    'exchange',
                    'Action'
                ]
            }
        },
        methods: {
            getStockRequest(nextPageUrl, params) {
                return stocksService.get(nextPageUrl, true, params)
            },
            updateStatus(stock) {
                if (confirm('Do you really want to delete the stock?')) {
                    stocksService.updateStatus(stock.id, 0)
                        .then(res => {
                            this.$refs.stocks.reload()
                        }).catch(err => {
                        //Show Error
                        console.log(err)
                    })
                }
            },
            showUpdate(stock) {
                this.$router.push({
                    name: 'EditStock',
                    params: {
                        stockId: stock.id
                    }
                })
            },
            showRenew(stock) {
                this.$router.push({
                    name: 'RenewStock',
                    params: {
                        stockId: stock.id
                    },
                    query:{
                        isRenew :  true
                    }
                })
            },
            onDataLoaded(data) {
                this.stocks = data
            }
        }
    }
</script>

<style scoped>

</style>