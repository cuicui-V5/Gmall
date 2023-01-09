<template>
    <!-- 头部 -->
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <p v-if="!userStore.user">
                        <span>请</span>
                        <RouterLink to="/login">登录</RouterLink>
                        <RouterLink
                            to="/register"
                            class="register"
                        >
                            免费注册
                        </RouterLink>
                    </p>
                    <p v-if="userStore.user">
                        <span>欢迎 &nbsp;</span>
                        <span>{{ userStore.user?.nickName }}</span>
                        <a
                            class="register"
                            @click="logout"
                        >
                            退出登录
                        </a>
                    </p>
                </div>
                <div class="typeList">
                    <a href="###">我的订单</a>
                    <a href="###">我的购物车</a>
                    <a href="###">我的尚品汇</a>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <RouterLink
                    class="logo"
                    title="尚品汇"
                    to="/"
                >
                    <img
                        src="./images/logo.png"
                        alt=""
                    />
                </RouterLink>
            </h1>
            <div class="searchArea">
                <div class="searchForm">
                    <input
                        type="text"
                        id="autocomplete"
                        class="input-error input-xxlarge"
                        v-model="keyWord"
                        @keydown.enter="search"
                    />
                    <button
                        class="sui-btn btn-xlarge btn-danger"
                        type="button"
                        @click="search"
                    >
                        搜索
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
    import router from "@/router";
    import { useRoute } from "vue-router";
    import { ref } from "vue";
    import eventBus from "@/lib/eventBus";
    import { useUserStore } from "@/stores/user";
    const route = useRoute();
    const userStore = useUserStore();

    let keyWord = ref("");

    function search() {
        const location = {
            name: "search",
            query: {},
            params: { keyword: keyWord.value || undefined },
        };
        if (route.query) {
            location.query = route.query;
        }
        router.push(location);
    }
    eventBus.on("clearKeyword", () => {
        keyWord.value = "";
    });

    const logout = async () => {
        try {
            await userStore.logout();
        } catch (error) {
            alert((error as Error).message);
        }
    };
</script>

<style scoped lang="less">
    .header {
        & > .top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        & + a {
                            border-left: 1px solid #b3aeae;
                        }
                    }
                }
            }
        }

        & > .bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>
