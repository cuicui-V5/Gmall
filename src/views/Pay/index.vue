<template>
    <div class="pay-main">
        <div class="pay-container">
            <div class="checkout-tit">
                <h4 class="tit-txt">
                    <span class="success-icon"></span>
                    <span class="success-info">
                        订单提交成功，请您及时付款，以便尽快为您发货~~
                    </span>
                </h4>
                <div class="paymark">
                    <span class="fl">
                        请您在提交订单
                        <em class="orange time">4小时</em>
                        之内完成支付，超时订单会自动取消。订单号：
                        <em>{{ orderId }}</em>
                    </span>
                    <span class="fr">
                        <em class="lead">应付金额：</em>
                        <em class="orange money">￥17,654</em>
                    </span>
                </div>
            </div>
            <div class="checkout-info">
                <h4>重要说明：</h4>
                <ol>
                    <li>
                        尚品汇商城支付平台目前支持
                        <span class="zfb">支付宝</span>
                        支付方式。
                    </li>
                    <li>其它支付渠道正在调试中，敬请期待。</li>
                    <li>
                        为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。
                    </li>
                </ol>
                <h4>
                    支付宝账户信息：（很重要，
                    <span class="save">请保存！！！</span>
                    ）
                </h4>
                <ul>
                    <li>支付帐号：11111111</li>
                    <li>密码：111111</li>
                    <li>支付密码：111111</li>
                </ul>
            </div>
            <div class="checkout-steps">
                <div class="step-tit">
                    <h5>支付平台</h5>
                </div>
                <div class="step-cont">
                    <ul class="payType">
                        <li><img src="./images/pay2.jpg" /></li>
                        <li><img src="./images/pay3.jpg" /></li>
                    </ul>
                </div>
                <div class="hr"></div>

                <div class="payshipInfo">
                    <div class="step-tit">
                        <h5>支付网银</h5>
                    </div>
                    <div class="step-cont">
                        <ul class="payType">
                            <li><img src="./images/pay10.jpg" /></li>
                            <li><img src="./images/pay11.jpg" /></li>
                            <li><img src="./images/pay12.jpg" /></li>
                            <li><img src="./images/pay13.jpg" /></li>
                            <li><img src="./images/pay14.jpg" /></li>
                            <li><img src="./images/pay15.jpg" /></li>
                            <li><img src="./images/pay16.jpg" /></li>
                            <li><img src="./images/pay17.jpg" /></li>
                            <li><img src="./images/pay18.jpg" /></li>
                            <li><img src="./images/pay19.jpg" /></li>
                            <li><img src="./images/pay20.jpg" /></li>
                            <li><img src="./images/pay21.jpg" /></li>
                            <li><img src="./images/pay22.jpg" /></li>
                        </ul>
                    </div>
                </div>
                <div class="hr"></div>

                <div class="submit">
                    <a
                        class="btn"
                        @click="pay"
                    >
                        立即支付
                    </a>
                </div>
                <div class="otherpay">
                    <div class="step-tit">
                        <h5>其他支付方式</h5>
                    </div>
                    <div class="step-cont">
                        <span>
                            <a
                                href="weixinpay.html"
                                target="_blank"
                            >
                                微信支付
                            </a>
                        </span>
                        <span>中国银联</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "Pay",
    };
</script>
<script setup lang="ts">
    import "element-plus/es/components/message-box/style/css";
    import "element-plus/es/components/message/style/css";

    import { ElMessageBox, ElMessage } from "element-plus";
    import QRCode from "qrcode";
    import { reqPay, reqPayStatus } from "@/api";
    import { computed, onMounted, onUnmounted } from "vue";
    import { RouterLink, useRoute } from "vue-router";
    import router from "@/router";
    const route = useRoute();

    const orderId = computed(() => {
        return route.query.orderId as string;
    });
    let payUrl = "";
    let timer: NodeJS.Timeout | undefined = undefined;
    let status = 0;

    const getPayInfo = async () => {
        try {
            const res = await reqPay(orderId.value);
            console.log(res);
            payUrl = res.data.data.codeUrl;
            if (res.data.code == 200) {
            } else {
                alert("失败" + res.data.message);
            }
        } catch (error) {
            alert("支付失败" + (error as Error).message);
        }
    };
    onMounted(() => {
        getPayInfo();
    });
    const pay = async () => {
        // 首先生成二维码
        const url = await QRCode.toDataURL(payUrl);
        console.log(url);

        ElMessageBox.alert(`<img src="${url}" />`, "请支付", {
            dangerouslyUseHTMLString: true,
            center: true,
            showClose: false,
            cancelButtonText: "支付遇到问题",
            confirmButtonText: "我已支付成功",
            showCancelButton: true,
            // 判断点了确定还是取消
            beforeClose(action, instance, done) {
                if (action == "confirm") {
                    if (status == 200) {
                        // 清空定时器
                        clearInterval(timer);
                        // 关闭对话框
                        ElMessageBox.close();
                        // 路由跳转到成功页面
                        router.push({
                            name: "paySuccess",
                        });
                    } else {
                        ElMessage({
                            type: "warning",
                            message: "您还未支付",
                        });
                    }
                } else {
                    clearInterval(timer);

                    done();
                    ElMessage({
                        type: "info",
                        message: "支付遇到问题请联系管理员",
                    });
                }
            },
        });
        // 开启定时器轮询支付结果
        timer = setInterval(async () => {
            const res = await reqPayStatus(orderId.value);
            status = res.data.code;
            if (res.data.code == 200) {
                // 支付成功
                console.log("支付成功");
                // 清空定时器
                clearInterval(timer);
                // 关闭对话框
                ElMessageBox.close();
                // 路由跳转到成功页面
                router.push({
                    name: "paySuccess",
                });
            } else {
                console.log("等待支付成功");
            }
        }, 1000);
    };
    onUnmounted(() => {
        clearInterval(timer);
    });
</script>

<style lang="less" scoped>
    .pay-main {
        margin-bottom: 20px;

        .pay-container {
            margin: 0 auto;
            width: 1200px;

            a:hover {
                color: #4cb9fc;
            }

            .orange {
                color: #e1251b;
            }

            .money {
                font-size: 18px;
            }

            .zfb {
                color: #e1251b;
                font-weight: 700;
            }

            .checkout-tit {
                padding: 10px;

                .tit-txt {
                    font-size: 14px;
                    line-height: 21px;

                    .success-icon {
                        width: 30px;
                        height: 30px;
                        display: inline-block;
                        background: url(./images/icon.png) no-repeat 0 0;
                    }

                    .success-info {
                        padding: 0 8px;
                        line-height: 30px;
                        vertical-align: top;
                    }
                }

                .paymark {
                    overflow: hidden;
                    line-height: 26px;
                    text-indent: 38px;

                    .fl {
                        float: left;
                    }

                    .fr {
                        float: right;

                        .lead {
                            margin-bottom: 18px;
                            font-size: 15px;
                            font-weight: 400;
                            line-height: 22.5px;
                        }
                    }
                }
            }

            .checkout-info {
                padding-left: 25px;
                padding-bottom: 15px;
                margin-bottom: 10px;
                border: 2px solid #e1251b;

                h4 {
                    margin: 9px 0;
                    font-size: 14px;
                    line-height: 21px;
                    color: #e1251b;
                }

                ol {
                    padding-left: 25px;
                    list-style-type: decimal;
                    line-height: 24px;
                    font-size: 14px;
                }

                ul {
                    padding-left: 25px;
                    list-style-type: disc;
                    line-height: 24px;
                    font-size: 14px;
                }
            }

            .checkout-steps {
                border: 1px solid #ddd;
                padding: 25px;

                .hr {
                    height: 1px;
                    background-color: #ddd;
                }

                .step-tit {
                    line-height: 36px;
                    margin: 15px 0;
                }

                .step-cont {
                    margin: 0 10px 12px 20px;

                    ul {
                        font-size: 0;

                        li {
                            margin: 2px;
                            display: inline-block;
                            padding: 5px 20px;
                            border: 1px solid #ddd;
                            cursor: pointer;
                            line-height: 18px;
                        }
                    }
                }
            }

            .submit {
                text-align: center;

                .btn {
                    display: inline-block;
                    padding: 15px 45px;
                    margin: 15px 0 10px;
                    font: 18px "微软雅黑";
                    font-weight: 700;
                    border-radius: 0;
                    background-color: #e1251b;
                    border: 1px solid #e1251b;
                    color: #fff;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    user-select: none;
                    text-decoration: none;
                }
            }
        }
    }
</style>
