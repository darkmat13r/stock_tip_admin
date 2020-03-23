<template>
    <modal @close="closeModal" v-if="isModalOpen">
        <div slot="modal-title">
            Send Notification
        </div>

        <div slot="body">
            <div class="card-body">
                <form @submit.prevent='sendNotification()'>
                    <div class="form-group">
                        <div>
                            <label>Title</label>
                            <input type="text" placeholder="Enter Subject" required class="form-control "
                                   v-model="title">
                        </div>
                        <div class="has-error" v-if="titleError">
                            <div class="text-danger" v-model="titleError"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div>
                            <label>Message</label>
                            <textarea type="text" placeholder="Enter message here" required class="form-control "
                                      v-model="message">
                </textarea>
                        </div>
                        <div class="has-error" v-if="messageError">
                            <div class="text-danger" v-model="messageError"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <app-button :disabled="isLoading">
                            Send Notification
                        </app-button>
                    </div>
                </form>
            </div>
        </div>
    </modal>
</template>

<script>
    import Modal from "./Modal";
    import AppButton from "../common/AppButton";
    import usersService from '../../services/usersService'

    export default {
        name: "NotificationModal",
        components: {AppButton, Modal},
        props: {
            openEmailModal: Boolean,
        },
        watch: {
            openEmailModal(val) {
                this.isLoading = false
                this.isModalOpen = val
            },

        },

        data() {
            return {
                message: '',
                messageError: "",
                title: '',
                titleError: '',
                isModalOpen: false,
                isLoading: false,
                userId: null
            }
        },
        methods: {
            closeModal() {
                this.isModalOpen = false
                this.message = ''
                this.title = ''

                this.$emit('close')
            },
            show(userId) {
                this.userId = userId
                this.isModalOpen = true
            },
            sendNotification() {
                this.messageError = ''
                this.titleError = ''
                if (this.message && this.title) {
                    this.isLoading = true
                    usersService.sendNotification(this.userId, {
                        title: this.title,
                        message: this.message
                    }).then(res => {
                        this.isLoading = false
                        this.closeModal()
                        toastr.success('Email Sent')
                    }).catch(err => {
                        this.isLoading = false
                        this.messageError = err
                    })
                } else {
                    this.messageError = 'Message cannot be empty'
                }

            },
        }
    }
</script>

<style scoped>

</style>
