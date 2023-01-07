<template>
    <div class="cart">
        <h4>全部商品</h4>
        <div class="cart-main">
            <div class="cart-th">
                <div class="cart-th1">全部</div>
                <div class="cart-th2">商品</div>
                <div class="cart-th3">单价（元）</div>
                <div class="cart-th4">数量</div>
                <div class="cart-th5">小计（元）</div>
                <div class="cart-th6">操作</div>
            </div>
            <div
                class="cart-body"
                v-if="cartInfo"
            >
                <ul
                    class="cart-list"
                    v-for="item in cartInfo?.cartInfoList"
                >
                    <li class="cart-list-con1">
                        <input
                            type="checkbox"
                            name="chk_list"
                            :checked="item.isChecked == 1"
                            @change="
                                changeChecked(
                                    item.skuId,
                                    ($event.target as HTMLInputElement).checked,
                                )
                            "
                        />
                    </li>
                    <li class="cart-list-con2">
                        <img :src="item.imgUrl" />
                        <div class="item-msg">
                            {{ item.skuName }}
                        </div>
                    </li>

                    <li class="cart-list-con4">
                        <span class="price">{{ item.skuPrice }}.00</span>
                    </li>
                    <li class="cart-list-con5">
                        <a
                            @click="
                                changeSkuNum(
                                    item.skuId,
                                    `increase`,
                                    undefined,
                                    item.skuNum,
                                )
                            "
                            class="mins"
                        >
                            -
                        </a>
                        <input
                            autocomplete="off"
                            type="number"
                            :value="item.skuNum"
                            minnum="1"
                            class="itxt"
                            min="1"
                            step="1"
                            @change="
                                changeSkuNum(
                                    item.skuId,
                                    `number`,
                                    $event.target as HTMLInputElement,
                                    item.skuNum,
                                )
                            "
                        />
                        <a
                            @click="changeSkuNum(item.skuId, `add`)"
                            class="plus"
                        >
                            +
                        </a>
                    </li>
                    <li class="cart-list-con6">
                        <span class="sum">
                            {{ item.skuNum * item.skuPrice }}
                        </span>
                    </li>
                    <li class="cart-list-con7">
                        <a
                            class="sindelet"
                            @click="delCart(item.skuId)"
                        >
                            删除
                        </a>
                        <br />
                        <a href="#none">移到收藏</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="cart-tool">
            <div class="select-all">
                <input
                    class="chooseAll"
                    type="checkbox"
                    :checked="isAllChecked"
                    @change="
                        changeAllChecked(
                            ($event.target as HTMLInputElement).checked,
                        )
                    "
                />
                <span>全选{{ isAllChecked }}</span>
            </div>
            <div class="option">
                <a @click="deleteChecked">删除选中的商品</a>
                <a href="#none">移到我的关注</a>
                <a href="#none">清除下柜商品</a>
            </div>
            <div class="money-box">
                <div class="chosed">
                    已选择
                    <span>0</span>
                    件商品
                </div>
                <div class="sumprice">
                    <em>总价（不含运费） ：</em>
                    <i class="summoney">{{ totalPrice }}.00</i>
                </div>
                <div class="sumbtn">
                    <a
                        class="sum-btn"
                        href="###"
                        target="_blank"
                    >
                        结算
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "ShopCart",
    };
</script>

<script lang="ts" setup>
    import { reqAddCart, reqDelShopCart, reqChangeChecked } from "@/api";
    import { useShopCartStore } from "@/stores/shopCart";
    import { storeToRefs } from "pinia";
    import { computed, ref } from "vue";
    import { throttle } from "lodash";
    import type { AxiosResponse } from "axios";

    const store = useShopCartStore();
    const { shopCartData: cartInfo } = storeToRefs(store);
    store.getShopCart();
    const isAllChecked = computed(() => {
        return cartInfo.value?.cartInfoList.every(
            (item) => item.isChecked == 1,
        );
    });
    const totalPrice = computed(() => {
        return cartInfo.value?.cartInfoList.reduce((pre, current) => {
            return pre + current.skuNum * current.skuPrice;
        }, 0);
    });
    const changeSkuNum = throttle(
        async (
            skuId: number, // 商品id
            type: "add" | "increase" | "number", // 当前操作类型
            target?: HTMLInputElement, // 如果是input框的输入需要用到
            currentVal?: number, // 当前服务器端的值
        ) => {
            let num: number;
            switch (type) {
                case "add":
                    num = 1;
                    break;
                case "increase":
                    if (currentVal !== 1) {
                        num = -1;
                    } else num = 0;
                    break;
                case "number":
                    if (target && currentVal) {
                        // 检查input的数字合法性, 如果不合法, 就设为1
                        // 先四舍五入
                        target.value = Math.round(
                            Number(target.value),
                        ).toString();
                        // 小于零的处理
                        if (Number(target.value) < 0) {
                            target.value = "1";
                        }
                        let inputVal = Number(target.value);

                        num = inputVal - currentVal;
                    } else num = 0;

                    break;
                default:
                    num = 0;
                    break;
            }
            // 请求服务器更新购物车数据;
            try {
                await reqAddCart(skuId, num);
            } catch (error) {
                alert("修改失败");
            }
            store.getShopCart();
        },
        500,
    );

    const delCart = async (skuId: number) => {
        try {
            const res = await reqDelShopCart(skuId);
        } catch (error) {
            alert((error as Error).message);
        }
        store.getShopCart();
    };
    const changeChecked = async (skuId: number, isChecked: boolean) => {
        try {
            const res = await reqChangeChecked(skuId, isChecked ? 1 : 0);
        } catch (error) {
            alert((error as Error).message);
        }
        store.getShopCart();
    };
    const deleteChecked = async () => {
        try {
            const res = await store.deleteChecked();
            console.log(res);
        } catch (error) {
            alert((error as Error).message);
        }
        store.getShopCart();
    };
    const changeAllChecked = async (isChecked: boolean) => {
        console.log(isChecked);
        try {
            await store.changeAllChecked(isChecked);
        } catch (error) {
            alert((error as Error).message);
        }
        store.getShopCart();
    };
</script>

<style lang="less" scoped>
    .cart {
        width: 1200px;
        margin: 0 auto;

        h4 {
            margin: 9px 0;
            font-size: 14px;
            line-height: 21px;
        }

        .cart-main {
            .cart-th {
                background: #f5f5f5;
                border: 1px solid #ddd;
                padding: 10px;
                overflow: hidden;

                & > div {
                    float: left;
                }

                .cart-th1 {
                    width: 25%;

                    input {
                        vertical-align: middle;
                    }

                    span {
                        vertical-align: middle;
                    }
                }

                .cart-th2 {
                    width: 25%;
                }

                .cart-th3,
                .cart-th4,
                .cart-th5,
                .cart-th6 {
                    width: 12.5%;
                }
            }

            .cart-body {
                margin: 15px 0;
                border: 1px solid #ddd;

                .cart-list {
                    padding: 10px;
                    border-bottom: 1px solid #ddd;
                    overflow: hidden;

                    & > li {
                        float: left;
                    }

                    .cart-list-con1 {
                        width: 15%;
                    }

                    .cart-list-con2 {
                        width: 35%;

                        img {
                            width: 82px;
                            height: 82px;
                            float: left;
                        }

                        .item-msg {
                            float: left;
                            width: 150px;
                            margin: 0 10px;
                            line-height: 18px;
                        }
                    }

                    .cart-list-con4 {
                        width: 10%;
                    }

                    .cart-list-con5 {
                        width: 17%;

                        .mins {
                            border: 1px solid #ddd;
                            border-right: 0;
                            float: left;
                            color: #666;
                            width: 6px;
                            text-align: center;
                            padding: 8px;
                        }

                        input {
                            border: 1px solid #ddd;
                            width: 40px;
                            height: 33px;
                            float: left;
                            text-align: center;
                            font-size: 14px;
                            &::-webkit-outer-spin-button,
                            &::-webkit-inner-spin-button {
                                -webkit-appearance: none;
                            }
                        }

                        .plus {
                            border: 1px solid #ddd;
                            border-left: 0;
                            float: left;
                            color: #666;
                            width: 6px;
                            text-align: center;
                            padding: 8px;
                        }
                    }

                    .cart-list-con6 {
                        width: 10%;

                        .sum {
                            font-size: 16px;
                        }
                    }

                    .cart-list-con7 {
                        width: 13%;

                        a {
                            color: #666;
                        }
                    }
                }
            }
        }

        .cart-tool {
            overflow: hidden;
            border: 1px solid #ddd;

            .select-all {
                padding: 10px;
                overflow: hidden;
                float: left;

                span {
                    vertical-align: middle;
                }

                input {
                    vertical-align: middle;
                }
            }

            .option {
                padding: 10px;
                overflow: hidden;
                float: left;

                a {
                    float: left;
                    padding: 0 10px;
                    color: #666;
                }
            }

            .money-box {
                float: right;

                .chosed {
                    line-height: 26px;
                    float: left;
                    padding: 0 10px;
                }

                .sumprice {
                    width: 200px;
                    line-height: 22px;
                    float: left;
                    padding: 0 10px;

                    .summoney {
                        color: #c81623;
                        font-size: 16px;
                    }
                }

                .sumbtn {
                    float: right;

                    a {
                        display: block;
                        position: relative;
                        width: 96px;
                        height: 52px;
                        line-height: 52px;
                        color: #fff;
                        text-align: center;
                        font-size: 18px;
                        font-family: "Microsoft YaHei";
                        background: #e1251b;
                        overflow: hidden;
                    }
                }
            }
        }
    }
</style>
