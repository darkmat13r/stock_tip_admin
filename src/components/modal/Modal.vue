<template>
    <transition name="modal-fade">
        <div class="modal-backdrop">
            <div class="modal" :class="modalClass">
                <header class="modal-header d-flex">
                    <div class="header-title">
                        <h5 class="card-header-title">
                            <slot name="modal-title"></slot>
                        </h5>
                        <small class="text-muted">
                            <slot name="modal-subtitle"></slot>
                        </small>
                    </div>
                    <button class="btn" v-if="closable" @click="close()">
                        <i class="mdi mdi-close"></i>
                    </button>
                </header>
                <section class="modal-body">
                    <slot name="body">

                    </slot>
                </section>

            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'modal',
        props: {
            closable: {
                type: Boolean,
                default: () => true
            },
            modalClass: {
                type: String,
                default: () => 'modal-lg'
            }
        },
        data() {
            return {
                showModal: false
            }
        },
        mounted() {
        },
        methods: {
            show() {
                this.showModal = true
            },
            close() {
                this.showModal = false
                this.$emit('close');
            },
        },
    };
</script>

<style scoped>


    .modal-backdrop {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal {
        background: #FFFFFF;
        box-shadow: 2px 2px 20px 1px;
        overflow-x: auto;
        display: flex !important;
        flex-direction: column;
        height: auto !important;
        position: relative !important;
    }

    .header-body {
        width: 100%;
    }


    .modal-body {
        position: relative;
        padding: 20px 10px;
    }

    .header-title {
        margin: auto 0;
    }

</style>
