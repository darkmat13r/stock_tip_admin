<template>
    <div class="chat-container">
        <div class="card">
            <div class="chatapp-wrap">
                <div class="chatapp-left">
                    <header>
                        <a href="javascript:void(0)" class="chat-more">
                            <span class="feather-icon"><i data-feather="more-vertical"></i></span>
                        </a>
                        <span class="">Chats</span>
                        <a href="javascript:void(0)" class="chat-compose">
                            <span class="feather-icon"><i data-feather="edit"></i></span>
                        </a>
                    </header>
                    <form role="search" class="chat-search">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="feather-icon"><i data-feather="search"></i></span>
                            </div>
                            <input type="text" class="form-control" placeholder="Search">
                        </div>
                    </form>
                    <div class="chatapp-users-list">
                        <div class="nicescroll-bar">
                            <div v-for="chat in chats">
                                <a href="javascript:void(0);" @click="selectChat(chat)" class="media read-chat "
                                   :class="(selectedChat && selectedChat.id === chat.id)?'active-user':''">
                                    <div class="media-img-wrap">
                                        <div class="avatar">
                                            <img src="../../assets/images/avatar1.jpg" alt="user"
                                                 class="avatar-img rounded-circle">
                                        </div>
                                        <span class="badge badge-success badge-indicator"></span>
                                    </div>
                                    <div class="media-body">
                                        <div>
                                            <div class="user-name" v-if="chat.from_id  === currentUser.id">
                                                {{chat.to.name}}
                                            </div>
                                            <div class="user-name" v-else>{{chat.from.name}}</div>
                                            <div class="user-last-chat">{{chat.content}}</div>
                                        </div>
                                        <div>
                                            <div class="last-chat-time block">{{chat.created_at | timeAgo}}</div>
                                        </div>
                                    </div>
                                </a>
                                <div class="chat-hr-wrap">
                                    <hr>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="chatapp-right">
                    <header v-if="selectedChat">
                        <a id="back_user_list" href="javascript:void(0)" class="back-user-list">
                            <span class="feather-icon"><i data-feather="chevron-left"></i></span>
                        </a>
                        <div class="media">
                            <div class="media-img-wrap">
                                <div class="avatar">
                                    <img src="../../assets/images/avatar1.jpg" alt="user"
                                         class="avatar-img rounded-circle">
                                </div>
                                <span class="badge badge-success badge-indicator"></span>
                            </div>
                            <div class="media-body">
                                <div class="user-name">{{selectedChat.from.name}}</div>
                                <div class="user-status">online</div>
                            </div>
                        </div>
                    </header>
                    <div class="chat-body">
                        <div class="nicescroll-bar">
                            <ul class="list-unstyled">
                                <li class="media" v-for="message in messages"
                                    :class="message.from_id === currentUser.id?'sent':'received'">
                                    <div class="media-body">
                                        <div class="msg-box">
                                            <div>
                                                <p>{{message.content}}</p>
                                                <span class="chat-time">{{message.created_at | timeAgo}}</span>
                                                <div class="arrow-triangle-wrap">
                                                    <div class="arrow-triangle left"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <footer>
                        <div class="input-group">
                            <input type="text"  name="send-msg" v-model="message"
                                   class="form-control form-control-sm" placeholder="Type something">
                            <div class="" @click="sendMessage">
                                <button class="btn"><i class="mdi mdi-send"></i></button>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    </div>
    <!-- /Row -->

</template>

<script>
    import supportService from '../../services/supportService'

    export default {
        name: "Chat",
        data() {
            return {
                currentUser: this.$auth.getCurrentUser(),
                chats: [],
                selectedChat: null,
                message: '',
                messages: [],
                pageData: null
            }
        },
        mounted() {
            this.fetchChats()
        },
        watch: {
            selectedChat(value) {
                this.fetchConversation()
            }
        },
        methods: {
            fetchChats() {
                supportService.getChats()
                    .then(res => {
                        this.chats = res
                    })
            },
            sendMessage() {
                let userId = this.selectedChat.to_id
                if (this.selectedChat.to_id === this.currentUser.id) {
                    userId = this.selectedChat.from_id
                }
                supportService.sendMessage(userId, {
                    content: this.message
                }).then(res => {
                    this.messages.push(res)
                    this.message = ''
                })
            },
            fetchConversation() {
                console.log(this.selectedChat)
                let userId = this.selectedChat.to_id
                if (this.selectedChat.to_id === this.currentUser.id) {
                    userId = this.selectedChat.from_id
                }
                supportService.getMessages(userId).then(res => {
                    this.pageData = res
                    this.messages = res.data
                })
            },
            selectChat(chat) {
                this.selectedChat = chat
                let userId = this.selectedChat.to_id
                if (this.selectedChat.to_id === this.currentUser.id) {
                    userId = this.selectedChat.from_id
                }
                Echo.private(`chat.${userId}`)
                    .listen('chat', (data) => {
                        console.log("Chat", data)
                    })
            }

        }
    }
</script>

<style scoped>

</style>