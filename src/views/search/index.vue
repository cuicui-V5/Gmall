<template>
    <div>
        <typeNavVue />
        <div class="main">
            <div class="py-container">
                <!--bread-->
                <div class="bread">
                    <ul class="fl sui-breadcrumb">
                        <li>
                            <a href="#">全部结果</a>
                        </li>
                    </ul>
                    <ul class="fl sui-tag">
                        <!-- 面包屑 -->
                        <li
                            class="with-x"
                            v-if="searchParams.categoryName"
                        >
                            {{ searchParams.categoryName }}
                            <i @click="clearCategoryName">×</i>
                        </li>
                        <li
                            class="with-x"
                            v-if="searchParams.keyword"
                        >
                            {{ searchParams.keyword }}
                            <i @click="clearKeyWord">×</i>
                        </li>
                        <li
                            class="with-x"
                            v-if="searchParams.trademark"
                        >
                            {{ searchParams.trademark.split(":")[1] }}
                            <i @click="clearTrademark">×</i>
                        </li>
                        <li
                            class="with-x"
                            v-for="(prop, index) in searchParams.props"
                        >
                            {{ prop.split(":")[1] }}
                            <i @click="clearProps(index)">×</i>
                        </li>
                    </ul>
                </div>

                <!--selector-->
                <SearchSelector
                    @trademarkInfo="trademarkInfo"
                    @attrInfo="attrInfo"
                />

                <!--details-->
                <div class="details clearfix">
                    <div class="sui-navbar">
                        <div class="navbar-inner filter">
                            <ul class="sui-nav">
                                <li
                                    :class="{
                                        active: isOne,
                                    }"
                                    @click="changeOrder(1)"
                                >
                                    <a>
                                        综合
                                        <span
                                            v-if="isOne"
                                            class="iconfont"
                                            :class="{
                                                'icon-direction-down': isDesc,
                                                'icon-direction-up': isAsc,
                                            }"
                                        ></span>
                                    </a>
                                </li>
                                <li
                                    :class="{
                                        active: isTwo,
                                    }"
                                    @click="changeOrder(2)"
                                >
                                    <a>
                                        价格
                                        <span
                                            v-if="isTwo"
                                            class="iconfont"
                                            :class="{
                                                'icon-direction-down': isDesc,
                                                'icon-direction-up': isAsc,
                                            }"
                                        ></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="goods-list">
                        <ul class="yui3-g">
                            <li
                                class="yui3-u-1-5"
                                v-for="good in store.searchList?.goodsList"
                                :key="good.id"
                            >
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <RouterLink :to="`/detail/${good.id}`">
                                            <img v-lazy="good.defaultImg" />
                                        </RouterLink>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥ &nbsp;</em>
                                            <i>{{ good.price }}</i>
                                        </strong>
                                    </div>
                                    <div class="attr">
                                        <a
                                            target="_blank"
                                            href="item.html"
                                            title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                                        >
                                            {{ good.title }}
                                        </a>
                                    </div>
                                    <div class="commit">
                                        <i class="command">
                                            已有
                                            <span>2000</span>
                                            人评价
                                        </i>
                                    </div>
                                    <div class="operate">
                                        <a
                                            href="success-cart.html"
                                            target="_blank"
                                            class="sui-btn btn-bordered btn-danger"
                                        >
                                            加入购物车
                                        </a>
                                        <a
                                            href="javascript:void(0);"
                                            class="sui-btn btn-bordered"
                                        >
                                            收藏
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <pagination
                        v-if="store.searchList"
                        :pageNo="searchParams.pageNo"
                        :pageSize="searchParams.pageSize"
                        :total="store.searchList.total"
                        :continues="5"
                        @changePage="changePage"
                    ></pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    export default {
        name: "search",
    };
</script>
<script lang="ts" setup>
    import SearchSelector from "./SearchSelector/SearchSelector.vue";

    import { useSearchStore } from "@/stores/search";
    import { useRoute } from "vue-router";
    import { ref, watch, computed } from "vue";
    import router from "@/router";
    import eventBus from "@/lib/eventBus";

    const store = useSearchStore();
    const route = useRoute();

    // 发送请求携带的参数
    const searchParams = ref({
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 4,
        props: [] as string[],
        trademark: "",
    });
    // 将query和params合并到参数内
    Object.assign(searchParams.value, route.query, route.params);
    store.getSearchList(searchParams.value);
    const isOne = computed(() => {
        return searchParams.value.order.indexOf("1") != -1;
    });
    const isTwo = computed(() => {
        return searchParams.value.order.indexOf("2") != -1;
    });
    const isAsc = computed(() => {
        return searchParams.value.order.indexOf("asc") != -1;
    });
    const isDesc = computed(() => {
        return searchParams.value.order.indexOf("desc") != -1;
    });

    // 如果路由变化, 重新发送请求
    watch(route, () => {
        // console.log(route.query);

        Object.assign(searchParams.value, route.query, route.params);
        store.getSearchList(searchParams.value);

        // console.log(searchParams);
        // 搜完之后, 重置参数
        Object.assign(searchParams, {
            category1Id: "",
            category2Id: "",
            category3Id: "",
        });
    });
    // 清除分类面包屑
    const clearCategoryName = () => {
        searchParams.value.categoryName = "";

        router.push({
            name: "search",
            params: route.params,
        });
    };
    // 清楚关键字面包屑
    const clearKeyWord = () => {
        searchParams.value.keyword = "";
        // 通知header组件删除关键字
        eventBus.emit("clearKeyword");

        router.push({
            name: "search",
            query: route.query,
        });
    };
    // 点击商品品牌重新发请求
    const trademarkInfo = (trademark: { tmId: number; tmName: string }) => {
        console.log("收到子组件的td", trademark);
        searchParams.value.trademark = `${trademark.tmId}:${trademark.tmName}`;
        store.getSearchList(searchParams.value);
    };
    const clearTrademark = () => {
        searchParams.value.trademark = "";
        store.getSearchList(searchParams.value);
    };
    // 点击商品属性发送请求
    const attrInfo = (attr: string) => {
        // 如果已经有这个属性的面包屑了那么就不添加了, 并且不发请求了
        if (!searchParams.value.props.includes(attr)) {
            searchParams.value.props.push(attr);
            store.getSearchList(searchParams.value);
        }
    };
    const clearProps = (index: number) => {
        console.log(index);
        // 删除数组index的项
        // splice的用法, 开始的下标, 删除的元素的数量, 要添加的元素
        searchParams.value.props.splice(index, 1);
        store.getSearchList(searchParams.value);
    };
    const changeOrder = (type: number) => {
        // type为当前点击的排序类型
        console.log(type);
        // 获取当前的状态
        let originType = searchParams.value.order.split(":")[0];
        let originSort = searchParams.value.order.split(":")[1];

        // 如果点击的和当前状态的一样, 那么就切换asc或desc
        if (type.toString() === originType) {
            // console.log("same");
            searchParams.value.order = `${type}:${
                originSort == "asc" ? "desc" : "asc"
            }`;
            // console.log(searchParams);
        } else {
            // 反之则切换排序类型
            searchParams.value.order = `${type}:${originSort}`;
        }
        // 重新请求数据
        store.getSearchList(searchParams.value);
    };
    const changePage = (pageNo: number) => {
        console.log(pageNo);

        searchParams.value.pageNo = pageNo;
        store.getSearchList(searchParams.value);
    };
</script>

<style lang="less" scoped>
    .main {
        margin: 10px 0;

        .py-container {
            width: 1200px;
            margin: 0 auto;

            .bread {
                margin-bottom: 5px;
                overflow: hidden;

                .sui-breadcrumb {
                    padding: 3px 15px;
                    margin: 0;
                    font-weight: 400;
                    border-radius: 3px;
                    float: left;

                    li {
                        display: inline-block;
                        line-height: 18px;

                        a {
                            color: #666;
                            text-decoration: none;

                            &:hover {
                                color: #4cb9fc;
                            }
                        }
                    }
                }

                .sui-tag {
                    margin-top: -5px;
                    list-style: none;
                    font-size: 0;
                    line-height: 0;
                    padding: 5px 0 0;
                    margin-bottom: 18px;
                    float: left;

                    .with-x {
                        font-size: 12px;
                        margin: 0 5px 5px 0;
                        display: inline-block;
                        overflow: hidden;
                        color: #000;
                        background: #f7f7f7;
                        padding: 0 7px;
                        height: 20px;
                        line-height: 20px;
                        border: 1px solid #dedede;
                        white-space: nowrap;
                        transition: color 400ms;
                        cursor: pointer;

                        i {
                            margin-left: 10px;
                            cursor: pointer;
                            font: 400 14px tahoma;
                            display: inline-block;
                            height: 100%;
                            vertical-align: middle;
                        }

                        &:hover {
                            color: #28a3ef;
                        }
                    }
                }
            }

            .details {
                margin-bottom: 5px;

                .sui-navbar {
                    overflow: visible;
                    margin-bottom: 0;

                    .filter {
                        min-height: 40px;
                        padding-right: 20px;
                        background: #fbfbfb;
                        border: 1px solid #e2e2e2;
                        padding-left: 0;
                        border-radius: 0;
                        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

                        .sui-nav {
                            position: relative;
                            left: 0;
                            display: block;
                            float: left;
                            margin: 0 10px 0 0;

                            li {
                                float: left;
                                line-height: 18px;

                                a {
                                    display: block;
                                    cursor: pointer;
                                    padding: 11px 15px;
                                    color: #777;
                                    text-decoration: none;
                                }

                                &.active {
                                    a {
                                        background: #e1251b;
                                        color: #fff;
                                    }
                                }
                            }
                        }
                    }
                }

                .goods-list {
                    margin: 20px 0;

                    ul {
                        display: flex;
                        flex-wrap: wrap;

                        li {
                            height: 100%;
                            width: 20%;
                            margin-top: 10px;
                            line-height: 28px;

                            .list-wrap {
                                .p-img {
                                    padding-left: 15px;
                                    width: 215px;
                                    height: 255px;

                                    a {
                                        color: #666;

                                        img {
                                            max-width: 100%;
                                            height: auto;
                                            vertical-align: middle;
                                        }
                                    }
                                }

                                .price {
                                    padding-left: 15px;
                                    font-size: 18px;
                                    color: #c81623;

                                    strong {
                                        font-weight: 700;

                                        i {
                                            margin-left: -5px;
                                        }
                                    }
                                }

                                .attr {
                                    padding-left: 15px;
                                    width: 85%;
                                    overflow: hidden;
                                    margin-bottom: 8px;
                                    min-height: 38px;
                                    cursor: pointer;
                                    line-height: 1.8;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;

                                    a {
                                        color: #333;
                                        text-decoration: none;
                                    }
                                }

                                .commit {
                                    padding-left: 15px;
                                    height: 22px;
                                    font-size: 13px;
                                    color: #a7a7a7;

                                    span {
                                        font-weight: 700;
                                        color: #646fb0;
                                    }
                                }

                                .operate {
                                    padding: 12px 15px;

                                    .sui-btn {
                                        display: inline-block;
                                        padding: 2px 14px;
                                        box-sizing: border-box;
                                        margin-bottom: 0;
                                        font-size: 12px;
                                        line-height: 18px;
                                        text-align: center;
                                        vertical-align: middle;
                                        cursor: pointer;
                                        border-radius: 0;
                                        background-color: transparent;
                                        margin-right: 15px;
                                    }

                                    .btn-bordered {
                                        min-width: 85px;
                                        background-color: transparent;
                                        border: 1px solid #8c8c8c;
                                        color: #8c8c8c;

                                        &:hover {
                                            border: 1px solid #666;
                                            color: #fff !important;
                                            background-color: #666;
                                            text-decoration: none;
                                        }
                                    }

                                    .btn-danger {
                                        border: 1px solid #e1251b;
                                        color: #e1251b;

                                        &:hover {
                                            border: 1px solid #e1251b;
                                            background-color: #e1251b;
                                            color: white !important;
                                            text-decoration: none;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                .page {
                    width: 733px;
                    height: 66px;
                    overflow: hidden;
                    float: right;

                    .sui-pagination {
                        margin: 18px 0;

                        ul {
                            margin-left: 0;
                            margin-bottom: 0;
                            vertical-align: middle;
                            width: 490px;
                            float: left;

                            li {
                                line-height: 18px;
                                display: inline-block;

                                a {
                                    position: relative;
                                    float: left;
                                    line-height: 18px;
                                    text-decoration: none;
                                    background-color: #fff;
                                    border: 1px solid #e0e9ee;
                                    margin-left: -1px;
                                    font-size: 14px;
                                    padding: 9px 18px;
                                    color: #333;
                                }

                                &.active {
                                    a {
                                        background-color: #fff;
                                        color: #e1251b;
                                        border-color: #fff;
                                        cursor: default;
                                    }
                                }

                                &.prev {
                                    a {
                                        background-color: #fafafa;
                                    }
                                }

                                &.disabled {
                                    a {
                                        color: #999;
                                        cursor: default;
                                    }
                                }

                                &.dotted {
                                    span {
                                        margin-left: -1px;
                                        position: relative;
                                        float: left;
                                        line-height: 18px;
                                        text-decoration: none;
                                        background-color: #fff;
                                        font-size: 14px;
                                        border: 0;
                                        padding: 9px 18px;
                                        color: #333;
                                    }
                                }

                                &.next {
                                    a {
                                        background-color: #fafafa;
                                    }
                                }
                            }
                        }

                        div {
                            color: #333;
                            font-size: 14px;
                            float: right;
                            width: 241px;
                        }
                    }
                }
            }
        }
    }
</style>
