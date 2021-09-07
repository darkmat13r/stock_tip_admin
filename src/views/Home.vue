<template>

    <div>
        <div class="row">
            <div class="col-xl-6 col-lg-6 col-xxl-6">
                <div class="card balance-widget">
                    <div class="card-body" v-if="revenue" >
                        <line-chart :chart-data="revenue" style="height: 264px"/>
                    </div>
                </div>
            </div>

            <div class="col-xl-6 col-lg-6 col-xxl-6 col-md-12">
                <div class="card profile_chart">
                    <div class="card-body">
                        <div id="timeline-chart"></div>
                        <div class="chart-content text-center" v-if="analytics">
                            <div class="row">

                                <div class="col-xl-6 col-sm-6 col-6">
                                    <div class="chart-stat">
                                        <p class="mb-1">Daily Users</p>
                                        <h5>{{analytics.daily_users}}</h5>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-sm-6 col-6">
                                    <div class="chart-stat">
                                        <p class="mb-1">Monthly Users</p>
                                        <h5>{{analytics.monthly_users}}</h5>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-sm-6 col-6">
                                    <div class="chart-stat">
                                        <p class="mb-1">Total Users</p>
                                        <h5>{{analytics.total_users}}</h5>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-sm-6 col-6">
                                    <div class="chart-stat">
                                        <p class="mb-1">Daily Revenue</p>
                                        <h5>{{analytics.daily_revenue}} INR</h5>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-sm-6 col-6">
                                    <div class="chart-stat">
                                        <p class="mb-1">Monthly Revenue</p>
                                        <h5>{{analytics.monthly_revenue}} INR</h5>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-sm-6 col-6">
                                    <div class="chart-stat">
                                        <p class="mb-1">Total Revenue</p>
                                        <h5>{{analytics.total_revenue}} INR</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-12 col-lg-12 col-xxl-12">
                <div class="card">
                    <div class="card-header border-0 py-0">
                        <h4 class="card-title">Last 10 orders</h4>
                        <a href="#" @click="gotToOrders">View More </a>
                    </div>
                    <div class="card-body">
                        <div class="transaction-table">
                            <div class="table-responsive">
                                <table class="table mb-0 table-responsive-sm">
                                    <tbody>
                                    <tr v-for="order in orders">
                                        <td>
                                            {{order.id}}
                                        </td>
                                        <td> {{order.user.name}}
                                        </td>
                                        <td>
                                            {{order.user.email}}
                                        </td>
                                        <td>
                                            {{order.amount}}
                                        </td>
                                        <td> {{order.created_at|timeAgo}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <canvas id="gradient"></canvas>
    </div>

</template>

<script>
    // @ is an alias to /src
    import dashboardService from '../services/dashboardService'
    import orderService from '../services/orderService'
    import LineChart from "../components/charts/LineChart";

    export default {
        name: 'home',
        components: {LineChart},
        data() {
            return {
                analytics: null,
                orders: [],
                revenue: null,
            }
        },
        mounted() {
            this.getAnalytics()
            this.getLastOrders()
            this.getRevenueReport()
        },
        methods: {
            getAnalytics() {
                dashboardService.getAnalytics().then(res => {
                    this.analytics = res
                });
            },
            getLastOrders() {
                orderService.get(null, false, {
                    status: 'completed',
                    limit: 10
                }).then(res => {
                    console.log(res)
                    this.orders = res
                })
            },
            gotToOrders() {
                this.$router.push('orders')
            },
            getRevenueReport() {
                let ctx = document.getElementById('gradient').getContext("2d");
                var gradientStroke = ctx.createLinearGradient(0, 0, 0, 400);
                gradientStroke.addColorStop(0, "rgba(123, 111, 255,50)");
                gradientStroke.addColorStop(1, "rgba(255, 255, 255,0)");

                dashboardService.getRevenueReport().then(res => {
                    let labels = []
                    let data = []
                   res.forEach(item =>{
                       labels.push(moment(item.date, 'MM-YYYY').format('MMMM'))
                       data.push(item.amount)
                   })

                    this.revenue = {
                        labels  : labels,
                        datasets:[
                            {
                                label :'Revenue',
                                data : data,
                                borderColor : '#0d40c6',
                                backgroundColor : gradientStroke,
                            }
                        ]
                    }

                })
            }
        }
    }
</script>
