<template>
    <!-- 右侧内容 -->
    <div class="order-right">
        <div class="order-content">
            <div class="title">
                <h3>我的订单</h3>
            </div>
            <div class="chosetype">
                <table>
                    <thead>
                        <tr>
                            <th width="29%">商品</th>
                            <th width="31%">订单详情</th>
                            <th width="13%">收货人</th>
                            <th>金额</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div
                class="orders"
                v-if="centerInfo"
            >
                <table
                    class="order-item"
                    v-for="item in centerInfo.records"
                >
                    <thead>
                        <tr>
                            <th colspan="5">
                                <span class="ordertitle">
                                    {{ item.createTime }}　订单编号：{{
                                        item.outTradeNo
                                    }}
                                    <span class="pull-right delete">
                                        <img src="./images/delete.png" />
                                    </span>
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(goods, index) in item.orderDetailList">
                            <td width="60%">
                                <div class="typographic">
                                    <img
                                        :src="goods.imgUrl"
                                        style="width: 100px"
                                    />
                                    <a
                                        href="#"
                                        class="block-text"
                                    >
                                        {{ goods.skuName }}
                                    </a>
                                    <span>x{{ goods.skuNum }}</span>
                                    <a
                                        href="#"
                                        class="service"
                                    >
                                        售后申请
                                    </a>
                                </div>
                            </td>
                            <td
                                :rowspan="item.orderDetailList.length"
                                width="8%"
                                class="center"
                                v-if="index == 0"
                            >
                                {{ item.consignee }}
                            </td>
                            <td
                                :rowspan="item.orderDetailList.length"
                                width="13%"
                                class="center"
                                v-if="index == 0"
                            >
                                <ul class="unstyled">
                                    <li>总金额¥{{ item.totalAmount }}</li>
                                    <li>在线支付</li>
                                </ul>
                            </td>
                            <td
                                :rowspan="item.orderDetailList.length"
                                width="8%"
                                class="center"
                                v-if="index == 0"
                            >
                                <a
                                    href="#"
                                    class="btn"
                                >
                                    {{ item.orderStatusName }}
                                </a>
                            </td>
                            <td
                                :rowspan="item.orderDetailList.length"
                                width="13%"
                                class="center"
                                v-if="index == 0"
                            >
                                <ul class="unstyled">
                                    <li>
                                        <a
                                            href="mycomment.html"
                                            target="_blank"
                                        >
                                            评价|晒单
                                        </a>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="choose-order">
                <pagination
                    v-if="centerInfo"
                    :pageNo="currentPage"
                    :pageSize="5"
                    :total="centerInfo.total"
                    :continues="5"
                    @changePage="changePage"
                ></pagination>
            </div>
        </div>
        <!--猜你喜欢-->
        <div class="like">
            <h4 class="kt">猜你喜欢</h4>
            <ul class="like-list">
                <li class="likeItem">
                    <div class="p-img">
                        <img src="./images/itemlike01.png" />
                    </div>
                    <div class="attr">
                        <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>3699.00</i>
                    </div>
                    <div class="commit">已有6人评价</div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="./images/itemlike02.png" />
                    </div>
                    <div class="attr">
                        Apple苹果iPhone 6s/6s Plus 16G 64G 128G
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4388.00</i>
                    </div>
                    <div class="commit">已有700人评价</div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="./images/itemlike03.png" />
                    </div>
                    <div class="attr">
                        DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4088.00</i>
                    </div>
                    <div class="commit">已有700人评价</div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="./images/itemlike04.png" />
                    </div>
                    <div class="attr">
                        DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4088.00</i>
                    </div>
                    <div class="commit">已有700人评价</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { reqCenter } from "@/api";
    import type { centerInfo } from "@/interface";
    import { onMounted, ref } from "vue";
    const currentPage = ref(1);
    const centerInfo = ref<centerInfo>();

    const getCenterInfo = async (page: number) => {
        try {
            const res = await reqCenter(page);
            console.log(res);
            if (res.data.code == 200) {
                centerInfo.value = res.data.data;
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            alert((error as Error).message);
        }
    };
    onMounted(() => {
        getCenterInfo(currentPage.value);
    });
    const changePage = (pageNo: number) => {
        currentPage.value = pageNo;
        getCenterInfo(currentPage.value);
    };
</script>

<style scoped lang="less"></style>
