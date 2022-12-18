<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div
            class="container"
            @mouseleave="clearBGC()"
            @mouseenter="show()"
        >
            <h2 class="all">全部商品分类</h2>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            <Transition name="card">
                <div
                    class="sort"
                    v-show="isShow"
                >
                    <div
                        class="all-sort-list2"
                        @click="goSearch($event)"
                    >
                        <div
                            class="item"
                            v-for="(c1, index) in store.categoryList"
                            :key="c1.categoryId"
                            @mouseenter="changeBGC(index)"
                            :class="{
                                cur: currentIndex === index,
                            }"
                        >
                            <h3>
                                <a
                                    :data-CategoryName="c1.categoryName"
                                    :data-Category1Id="c1.categoryId"
                                >
                                    {{ c1.categoryName }}
                                </a>
                            </h3>
                            <div
                                class="item-list clearfix"
                                :class="{ display: currentIndex === index }"
                            >
                                <div
                                    class="subitem"
                                    v-for="(c2, index) in c1.categoryChild"
                                    :key="c2.categoryId"
                                >
                                    <dl class="fore">
                                        <dt>
                                            <a
                                                :data-CategoryName="
                                                    c2.categoryName
                                                "
                                                :data-Category2Id="
                                                    c2.categoryId
                                                "
                                            >
                                                {{ c2.categoryName }}
                                            </a>
                                        </dt>
                                        <dd>
                                            <em
                                                v-for="(
                                                    c3, index
                                                ) in c2.categoryChild"
                                                :key="c3.categoryId"
                                            >
                                                <a
                                                    :data-CategoryName="
                                                        c3.categoryName
                                                    "
                                                    :data-Category3Id="
                                                        c3.categoryId
                                                    "
                                                >
                                                    {{ c3.categoryName }}
                                                </a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script setup lang="ts">
    import router from "@/router";
    import { useRoute } from "vue-router";
    import { useHomeStore } from "@/stores/home/index";
    import { ref } from "vue";

    const store = useHomeStore();

    // store.getCategoryList();

    const currentIndex = ref(-1);

    const route = useRoute();
    // 是否显示三级导航
    const isShow = ref(true);
    console.log(route.path);

    if (route.path !== "/") {
        isShow.value = false;
    }

    // 一级分类的鼠标放上背景色效果
    function changeBGC(i: number) {
        currentIndex.value = i;
    }
    function clearBGC() {
        currentIndex.value = -1;
        if (route.path !== "/") {
            isShow.value = false;
        }
    }
    function show() {
        if (route.path !== "/") {
            isShow.value = true;
        }
    }

    function goSearch(e: MouseEvent) {
        // 事件委派, 只有点击a标签才生效
        // console.log(e);
        const element = e.target as HTMLElement;
        console.log(element.dataset);

        if (element.tagName === "A") {
            let location = {
                name: "search",
                query: {},
            };
            let query: {
                categoryName: any;
                category1id?: any;
                category2id?: any;
                category3id?: any;
            } = {
                categoryName: element.dataset.categoryname,
            };
            if (element.dataset.category1id) {
                query.category1id = element.dataset.category1id;
            } else if (element.dataset.category2id) {
                query.category2id = element.dataset.category2id;
            } else if (element.dataset.category3id) {
                query.category3id = element.dataset.category3id;
            }
            location.query = query;
            router.push(location);
        }
    }
</script>

<style scoped lang="less">
    .type-nav {
        border-bottom: 2px solid #e1251b;
        a {
            cursor: pointer;
        }

        .card-enter-from,
        .card-leave-to {
            opacity: 0;
        }
        .card-enter-to,
        .card-leave-from {
            opacity: 1;
        }
        .card-enter-active,
        .card-leave-active {
            transition: 0.2s all;
        }
        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }
                        .display {
                            display: block;
                        }
                        // &:hover {
                        //     .item-list {
                        //         display: block;
                        //     }
                        // }
                    }
                }
            }
            .cur {
                background-color: skyblue;
            }
        }
    }
</style>
