<template>
    <div class="sidebar">
        <div class="menu">
            <ul>
                <li>
                    <router-link to="/" data-toggle="tooltip" data-placement="right" title="Home">
                        <span><i class="la la-igloo"></i></span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/sheets" data-toggle="tooltip" data-placement="right" title="Google Sheets">
                        <span><i class="la la-receipt"></i></span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/stocks" data-toggle="tooltip" data-placement="right" title="Shares">
                        <span><i class="la la-boxes"></i></span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/users" data-toggle="tooltip" data-placement="right" title="Users">
                        <span><i class="la la-user"></i></span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/plans" data-toggle="tooltip" data-placement="right" title="Plans">
                        <span><i class="la la-money"></i></span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/orders" data-toggle="tooltip" data-placement="right" title="Orders">
                        <span><i class="la la-exchange"></i></span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/support/chat" data-toggle="tooltip" data-placement="right" title="Orders">
                        <span><i class="la la-headphones-alt"></i></span>
                    </router-link>
                </li>
                <li>
                    <a href="settings.html" data-toggle="tooltip" data-placement="right" title="Setting">
                        <span><i class="la la-tools"></i></span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Sidebar"
    }
</script>

<style scoped>

</style>