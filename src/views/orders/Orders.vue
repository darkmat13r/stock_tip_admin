<template>
    <div>
        <datatable ref="orders" :request="fetchOrders" :on-data-change="onLoadData" title="Orders"
                   :columns="columns">

            <tr v-for="order in orders">
                <td>
                    Order No. {{order.id}}
                </td>
                <td>
                    {{order.amount}}
                </td>
                <td>
                    {{order.user.name}}
                    <div>
                        <small>{{order.user.email}}</small>
                    </div>
                </td>
                <td>
                    <span class="badge badge-success"
                          v-if="order.status === 'completed'">{{order.status|capitalize}}</span>
                    <span class="badge badge-warning"
                          v-if="order.status === 'pending'">{{order.status|capitalize}}</span>
                    <span class="badge badge-danger" v-if="order.status === 'failed'">{{order.status|capitalize}}</span>
                </td>
                <td>
                    {{getPaymentResponse(order)}}
                </td>
                <td>
                    {{order.created_at|timeAgo}}
                </td>
                <td>
                    <dropdown>
                        <div>
                            <span class="arrow">
                                <i class="la la-angle-down"></i>
                            </span>
                        </div>
                        <template v-slot:dropdown-menu>
                            <a v-on:click="" class="dropdown-item" @click="showEmailModal(order)">
                                <i class="mdi mdi-email"></i> Send Mail
                            </a>
                            <a v-on:click="" class="dropdown-item" @click="showNotificationModal(order)">
                                <i class="mdi mdi-bell-outline"></i> Send Notification
                            </a>
                        </template>
                    </dropdown>
                </td>
            </tr>
        </datatable>
        <email-modal ref="emailModal"/>
        <notification-modal ref="notificationModal"/>
    </div>
</template>

<script>
    import Datatable from "../../components/table/Datatable";
    import orderService from "../../services/orderService";
    import EmailModal from "../../components/modal/EmailModal";
    import NotificationModal from "../../components/modal/NotificationModal";
    import Dropdown from "../../components/common/Dropdown";

    export default {
        name: "Orders",
        components: {Dropdown, NotificationModal, EmailModal, Datatable},
        data() {
            return {
                orders: [],
                columns: ['id', 'amount', 'user', 'status', 'response', 'created_at', 'action']
            }
        },
        methods: {
            fetchOrders(url, params) {
                return orderService.get(url, true, params)
            },
            onLoadData(data) {
                this.orders = data
            },
            showEmailModal(order) {
                this.$refs.emailModal.show(order.user_id)
            },
            showNotificationModal(order) {
                this.$refs.notificationModal.show(order.user_id)
            },
            getPaymentResponse(order) {
                if (order.payment_response) {
                    let response = JSON.parse(order.payment_response)
                    if (response.resultInfo && response.resultInfo.resultMsg) {
                        return response.resultInfo.resultMsg
                    }
                }
                return 'Pending'

            }

        }
    }
</script>

<style scoped>

</style>