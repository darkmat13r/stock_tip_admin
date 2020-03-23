<template>

    <div class="card">
        <div class="card-header">
            <h4 class="card-title">Stock Information</h4>
        </div>
        <div class="card-body">
            <app-form form-class="personal_validate" :on-submit="submit" :error="error">
                <div class="form-row">
                    <div class="form-group col-xl-6">
                        <label class="mr-sm-2">Stock Symbol</label>
                        <input type="text" class="form-control" placeholder="Eg. CrudeOil" v-model="stock.symbol"
                               required>
                    </div>
                    <div class="form-group col-xl-6">
                        <label class="mr-sm-2">Exchange</label>
                        <select class="form-control" v-model="stock.exchange" required>
                            <option :value="null">Not selected</option>
                            <option value="mcx_fo">MCX FO</option>
                        </select>
                    </div>
                    <div class="form-group col-xl-6">
                        <label class="mr-sm-2">Lot Size</label>
                        <input type="text" class="form-control" placeholder="Enter Lot size" v-model="stock.lot"
                               required>
                    </div>
                    <div class="form-group col-xl-6">
                        <label class="mr-sm-2">Assign Google Sheet</label>
                        <select class="form-control" v-model="stock.google_sheet_id">
                            <option :value="null">Not selected</option>
                            <option v-for="sheet in googleSheets" :value="sheet.id">{{sheet.sheet_name}}</option>
                        </select>
                    </div>

                    <div class="form-group col-12">
                        <app-button btn-class="btn btn-success pl-5 pr-5" :disabled="isLoading">
                            <div v-if="isEdit &&  !isRenew">Update</div>
                            <div v-else-if="isEdit &&  isRenew">Renew</div>
                            <div v-else>Save</div>
                        </app-button>
                    </div>
                </div>
            </app-form>
        </div>
    </div>


</template>

<script>
    import AppButton from "../../components/common/AppButton";
    import googleSheetService from "../../services/googleSheetService";
    import AppForm from "../../components/common/AppForm";
    import stocksService from "../../services/stocksService";

    export default {
        name: "CreateStock",
        components: {AppForm, AppButton},
        data() {
            return {
                googleSheets: [],
                isLoading: false,
                stock: {
                    symbol: null,
                    exchange: null,
                    google_sheet_id: null,
                    lot: 1
                },
                error: null,
                isRenew: false,
                isEdit: false,
                stockId  : null
            }
        },
        mounted() {
            this.fetchGoogleSheets()
            let params = this.$route.params
            let query = this.$route.query
            if (params.stockId) {
                this.isEdit = true
                this.stockId = params.stockId
                this.fetchStock(params.stockId)
                if (query.isRenew !== undefined) {
                    this.isRenew = query.isRenew
                }
            }

        },
        methods: {
            fetchStock(id) {
                this.isLoading = true
                stocksService.getById(id)
                    .then(res => {
                        this.isLoading = false
                        this.stock = res
                    }).catch(err => {
                    this.isLoading = false
                    this.error = err
                })
            },
            fetchGoogleSheets() {
                this.isLoading = true
                googleSheetService.get(null, false)
                    .then(res => {
                        this.isLoading = false
                        this.googleSheets = res
                    }).catch(err => {
                    this.isLoading = false
                    this.error = err
                    console.log(err)
                })
            },
            submit() {
                if (this.isEdit && !this.isRenew) {
                    this.update()
                } else if (this.isEdit && this.isRenew) {
                    this.renew()
                } else {
                    this.save()
                }

            },
            update() {
                this.isLoading = true
                stocksService.update(this.stockId, this.stock)
                    .then(res => {
                        this.isLoading = false
                        this.$router.back()
                    }).catch(err => {
                    this.isLoading = false
                    this.error = err
                })
            },
            renew() {
                this.isLoading = true
                stocksService.renew(this.stockId, this.stock)
                    .then(res => {
                        this.isLoading = false
                        this.$router.back()
                    }).catch(err => {
                    this.isLoading = false
                    this.error = err
                })
            },
            save() {
                this.isLoading = true
                stocksService.store(this.stock)
                    .then(res => {
                        this.isLoading = false
                        this.$router.back()
                    }).catch(err => {
                    this.isLoading = false
                    this.error = err
                })
            }
        }
    }
</script>

<style scoped>

</style>