<template>
    <div>
        <datatable :request="fetchUsers" :on-data-change="onDataChanged"
                   ref="usersTable"
                   title="Users"
                   :columns="columns"
                   :register-reload-callback="registerReload">

            <tr v-for="user in users">
                <td>{{user.name|capitalize}}</td>
                <td>{{user.email}}</td>
                <td>{{user.contact | not_defined}}</td>
                <td>{{user.stocks_subscribed_count}}</td>
                <td>{{user.created_at|timeAgo}}</td>
                <td>{{user.last_login_at|timeAgo}}</td>
                <td>{{user.android_app_version}}</td>
                <td>
                    <span class="badge badge-success" v-if="user.is_premium"><i
                            class="la la-check"></i>Active</span>
                    <span class="badge badge-danger" v-else>No</span>
                </td>
                <td>
                    <dropdown>
                        <div>
                            <span class="arrow">
                                <i class="la la-angle-down"></i>
                            </span>
                        </div>
                        <template v-slot:dropdown-menu>
                            <a href="#" class="dropdown-item" @click="showUpgradePlan(user)">
                                <i class="mdi mdi-account"></i> Upgrade Plan
                            </a>
                            <a href="#"  class="dropdown-item" @click="viewProfile(user)">
                                <i class="mdi mdi-account"></i> View profile
                            </a>
                            <a href="#" class="dropdown-item" @click="showEmailModal(user)">
                                <i class="mdi mdi-email"></i> Send Mail
                            </a>

                            <a href="#"  class="dropdown-item" @click="showNotificationModal(user)">
                                <i class="mdi mdi-bell-outline"></i> Send Notification
                            </a>
                        </template>
                    </dropdown>
                </td>
            </tr>
        </datatable>
        <email-modal ref="emailModal"/>
        <notification-modal ref="notificationModal"/>
        <upgrade-plan-modal ref="upgradePlanModal" @close="onCloseUpgradePlan()"/>
    </div>

</template>

<script>
    import Datatable from "../../components/table/Datatable";
    import EmptyState from "../../components/empty/EmptyState";
    import userService from "../../services/usersService";
    import Dropdown from "../../components/common/Dropdown";
    import Modal from "../../components/modal/Modal";
    import EmailModal from "../../components/modal/EmailModal";
    import NotificationModal from "../../components/modal/NotificationModal";
    import UserDetails from "./UserDetails";
    import UpgradePlanModal from "../../components/modal/UpgradePlanModal";

    export default {
        name: "Users",
        components: {UpgradePlanModal, NotificationModal, EmailModal, Modal, Dropdown, Datatable, EmptyState},
        data() {
            return {
                users: [],
                showEmptyState: true,
                reloadCallback: null,
                columns: [
                    'name', 'email', 'contact', 'stocks_subscribed_count', 'created_at', 'last_login_at', 'android_app_version', 'subscription', 'action'
                ]
            }
        },
        mounted() {
            this.fetchUsers()

        },
        methods: {
            fetchUsers(url = null, params) {
                return userService.get(url, true, params)
            },
            onDataChanged(data) {
                this.users = data
                if (this.users === undefined || this.users.length === 0) {
                    this.showEmptyState = true
                } else {
                    this.showEmptyState = false
                }
            },
            registerReload(reloadCallback) {
                this.reloadCallback = reloadCallback
            },
            showEmailModal(user) {
                this.$refs.emailModal.show(user.id)
            },
            showNotificationModal(user) {
                this.$refs.notificationModal.show(user.id)
            },
            viewProfile(user){
              this.$router.push({
                  name:UserDetails.name,
                  params: {
                      userId: user.id
                  },
              })
            },
            deleteUser(user) {
                if (confirm("Do you really want to delete?")) {
                    userService.delete(user.id)
                        .then((res) => {
                            this.reloadCallback()
                            toastr.success('Deleted successfully')
                        }).catch((error) => {
                        toastr.error(error)
                    })
                }
            },
            showUpgradePlan(user){
                this.$refs.upgradePlanModal.show(user.id)
            },
            onCloseUpgradePlan(){
                this.$refs.usersTable.reload()
            }
        }
    }
</script>

<style scoped>

</style>
