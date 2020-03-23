<template>
    <div>
        <datatable :request="fetchUsers" :on-data-change="onDataChanged"
                   title="Users"
                   :columns="columns"
                   :register-reload-callback="registerReload">

            <tr v-for="user in users">
                <td>{{user.name|capitalize}}</td>
                <td>{{user.email}}</td>
                <td>{{user.contact | not_defined}}</td>
                <td>{{user.stocks_subscribed_count}}</td>
                <td>{{user.last_login_at|timeAgo}}</td>
                <td>{{user.android_app_version}}</td>
                <td>
                    <span class="badge badge-success" v-if="user.is_premium"><i class="la la-check"></i>Active</span>
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
                            <a v-on:click="" class="dropdown-item" @click="showEmailModal(user)">
                                <i class="mdi mdi-email"></i> Send Mail
                            </a>
                            <a v-on:click="" class="dropdown-item" @click="showNotificationModal(user)">
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
    import EmptyState from "../../components/empty/EmptyState";
    import userService from "../../services/usersService";
    import Dropdown from "../../components/common/Dropdown";
    import Modal from "../../components/modal/Modal";
    import EmailModal from "../../components/modal/EmailModal";
    import NotificationModal from "../../components/modal/NotificationModal";

    export default {
        name: "Users",
        components: {NotificationModal, EmailModal, Modal, Dropdown, Datatable, EmptyState},
        data() {
            return {
                users: [],
                showEmptyState: true,
                reloadCallback: null,
                columns: [
                    'name', 'email', 'contact', 'stocks_subscribed_count', 'last_login_at', 'android_app_version', 'subscription', 'action'
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
            }
        }
    }
</script>

<style scoped>

</style>
