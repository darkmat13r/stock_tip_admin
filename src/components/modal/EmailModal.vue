<template>
    <modal @close="closeModal" v-if="isModalOpen">
        <div slot="modal-title">
            Send Email
        </div>

        <div slot="body">
            <div class="card-body">
                <form @submit.prevent='sendEmail()'>
                    <div class="form-group">
                        <div>
                            <label>Subject</label>
                            <input type="text" placeholder="Enter Subject" required class="form-control "
                                   v-model="emailSubject">
                        </div>
                        <div class="has-error" v-if="emailSubjectError">
                            <div class="text-danger" v-bind="emailSubjectError"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div>
                            <label>Message</label>
                            <textarea type="text" placeholder="Enter message here" required class="form-control "
                                      v-model="emailText">
                </textarea>
                        </div>
                        <div class="has-error" v-if="emailError">
                            <div class="text-danger" v-bind="emailError"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <app-button :disabled="isLoading">
                            Send Mail
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
        name: "EmailModal",
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
                emailText: '',
                emailError: "",
                emailSubject: '',
                emailSubjectError: '',
                isModalOpen: false,
                isLoading: false,
                userId: null
            }
        },
        methods: {
            closeModal() {
                this.isModalOpen = false
                this.emailText = ''
                this.emailSubject = ''

                this.$emit('close')
            },
            show(userId) {
                this.userId = userId
                this.isModalOpen = true
            },
            sendEmail() {
                this.emailError = ''
                this.emailSubjectError = ''
                if (this.emailText && this.emailSubject) {
                    this.isLoading = true
                    usersService.sendMail(this.userId, {
                        subject: this.emailSubject,
                        message: this.emailText
                    }).then(res => {
                        this.isLoading = false
                        this.closeModal()
                        toastr.success('Email Sent')
                    }).catch(err => {
                        this.isLoading = false
                        this.emailError = err
                    })
                } else {
                    this.emailError = 'Message cannot be empty'
                }

            },
        }
    }
</script>

<style scoped>

</style>
