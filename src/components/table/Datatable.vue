<template>
    <div class="data-table">
        <div class="row  justify-content-center">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <div class=" float-sm-left">
                                    <h4 class="card-title">
                                        {{title}}
                                    </h4>
                                    <p class="card-title-desc">
                                        Result {{paginateData.from}} - {{paginateData.to}} of {{paginateData.total}}
                                    </p>
                                </div>
                                <div class="float-sm-right">
                                    <slot name="header-action"/>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-4">
                            <div class="col-sm-12 col-md-6">
                                <div id="datatable-buttons_filter" class="dataTables_filter"><label><input
                                    type="search" class="form-control form-control-sm" placeholder="Search "
                                    v-model="query"
                                    aria-controls="datatable-buttons"></label></div>
                            </div>
                        </div>
                        <div class="">
                            <table class="table table-centered table-nowrap mb-0 ">
                                <thead class="thead-light">
                                <tr v-if="columns &&  columns.length > 0">
                                    <th v-for="column in columns" @click="sortData(column)" class="sortable">
                                        {{column | capitalize|replaceUnderscore}} <span v-if="sort.column === column">
                                            <i class="la la-arrow-down" v-if="sort.order === 'desc'"/>
                                            <i class="la la-arrow-up" v-else/>
                                    </span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody class="list"  v-if="!isLoading">
                                <slot/>

                                </tbody>
                                <tbody class="list"  v-if="isLoading">

                                <tr>
                                    <td :colspan="columns.length" class="text-center">Loading</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row" v-if="isLoading">
                            <div class="col-12">
                                <div id="status">
                                    <div class="spinner-chase">
                                        <div class="chase-dot"></div>
                                        <div class="chase-dot"></div>
                                        <div class="chase-dot"></div>
                                        <div class="chase-dot"></div>
                                        <div class="chase-dot"></div>
                                        <div class="chase-dot"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" style="width:100%"
                             v-if="(paginateData === undefined || paginateData.total===0 ) && !isLoading">
                            <div class="col-12">
                                <p class="text-center text-muted">No Data</p>
                            </div>
                        </div>
                        <div class="row" v-if="paginateData && getNumberOfPages >0 && !isLoading">
                            <div class="col-lg-12">
                                <ul class="pagination pagination-rounded justify-content-center mt-4 flex-wrap">
                                    <li class="page-item" :class="paginateData.prev_page_url === null ? 'disabled':''">
                                        <a
                                            class="page-link" v-on:click="prevPage"
                                        ><i class="mdi mdi-chevron-left"/></a>
                                    </li>
                                    <li class="page-item"
                                        v-for="i in getNumberOfPages"
                                        :class="i === paginateData.current_page  ?'active':''">
                                        <a
                                            class="page-link"
                                            v-on:click="fetchData(paginateData.path+'?page='+i)">{{i}}</a>
                                    </li>
                                    <li class="page-item" :class="paginateData.next_page_url === null?'disabled':''"><a
                                        class="page-link" v-on:click="nextPage"><i class="mdi mdi-chevron-right"/></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>


    export default {
        name: "Datatable",
        components: {},
        props: {
            request: Function,
            onDataChange: Function,
            title: '',
            registerReloadCallback: Function,
            loadAtInit: {
                type: Boolean,
                default: true
            },
            hasHeaderAction: {
                type: Boolean,
                default: false
            },
            columns: Array,


        },
        data() {
            return {
                paginateData: {},
                currentUrl: null,
                query: null,
                isLoading:false,
                sort:{
                    column: null,
                    order : 'desc'
                },
            }
        },
        mounted() {
            if (this.loadAtInit)
                this.fetchData()
        },
        watch: {
            query(val) {
                this.fetchData()
            }
        },
        computed: {
            getNumberOfPages() {
                return (Math.ceil(this.paginateData.total / this.paginateData.per_page))
            }
        },
        methods: {
            sortData(column){
                if(column === this.sort.column){
                    this.sort.order = this.sort.order === 'desc' ? 'asc': 'desc';
                }else{
                    this.sort = {
                        column : column,
                        order : 'desc'
                    }
                }
                this.fetchData()
            },
            fetchData(url = null) {
                this.isLoading =  true
                this.request(url, {
                    query : this.query,
                    sort : this.sort.column,
                    order: this.sort.order
                }).then(
                    res => {
                        this.isLoading =  false
                        if (res) {
                            this.paginateData = res
                            this.onDataChange(res.data)
                            this.currentUrl = res.path + '?page=' + res.current_page
                        }
                    }
                ).catch(err => {
                    this.isLoading =  false
                    console.log(err)
                })
            },
            nextPage() {
                let nextPageUrl = this.paginateData.next_page_url
                if (nextPageUrl !== null)
                    this.fetchData(nextPageUrl)
            },
            prevPage() {
                let prevPageUrl = this.paginateData.prev_page_url
                if (prevPageUrl !== null)
                    this.fetchData(prevPageUrl)
            },
            reload() {
                this.fetchData(this.currentUrl)
            },
            onHeaderActionClicked() {
                this.$emit('click')
            }
        }
    }
</script>


<style lang="scss" scoped>
    .image-placeholder {
        background-color: #cccccc;
    }

    .data-table {
        .data-image {
            width: 80px;
            height: 48px;
            @extend .image-placeholder !optional;
        }

        .data-circle-image {
            width: 48px;
            height: 48px;
            @extend .image-placeholder !optional;
        }

    }

    .page-item {
        cursor: pointer;
    }

    table tr th {
        font-weight: 700;
        color: #1652F0;
    }

    .sortable{
        cursor: pointer;
    }

</style>
