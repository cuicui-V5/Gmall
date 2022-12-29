<template>
    <div class="pagination">
        <button
            :disabled="pageNo == 1"
            @click="emit('changePage', pageNo - 1)"
        >
            上一页
        </button>
        <button
            v-if="startAndEnd.start > 1"
            :class="{
                active: pageNo == 1,
            }"
            @click="emit('changePage', 1)"
        >
            1
        </button>
        <button v-if="startAndEnd.start > 2">···</button>

        <button
            :class="{
                active: pageNo == index + 1,
            }"
            v-for="(page, index) in startAndEnd.end"
            v-show="page >= startAndEnd.start"
            @click="emit('changePage', index + 1)"
        >
            {{ page }}
        </button>

        <button v-if="startAndEnd.end < totalPage - 1">···</button>
        <button
            v-if="startAndEnd.end < totalPage"
            :class="{ active: pageNo == totalPage }"
            @click="emit('changePage', totalPage)"
        >
            {{ totalPage }}
        </button>
        <button
            :disabled="pageNo == totalPage"
            @click="emit('changePage', pageNo + 1)"
        >
            下一页
        </button>

        <button style="margin-left: 30px">共 {{ total }} 条</button>
        <!-- <div>pageNo:{{ pageNo }}</div>
        <div>{{ pageSize }}</div>
        <div>{{ total }}</div>
        <div>{{ continues }}</div>
        <div>{{ totalPage }}</div>

        <div>{{ startAndEnd() }}</div>
        <button @click="test">c</button> -->
    </div>
</template>

<script setup lang="ts">
    import { computed, toRefs, type Ref } from "vue";

    const props = defineProps<{
        pageNo: number;
        pageSize: number;
        total: number;
        continues: number;
    }>();
    const { pageNo, pageSize, total, continues } = toRefs(props);

    const emit = defineEmits(["changePage"]);

    const totalPage = computed(() => {
        return Math.ceil(total.value / pageSize.value);
    });
    const test = () => {
        console.log(pageNo.value);
    };
    const startAndEnd = computed(() => {
        let start = 0,
            end = 0;
        console.log(pageNo.value);

        // 如果总页数小于要显示的页数
        if (totalPage.value < continues.value) {
            start = 1;
            end = totalPage.value;
        } else {
            // 正常情况
            start = pageNo.value - Math.floor(continues.value / 2);
            end = pageNo.value + Math.floor(continues.value / 2);
        }
        // 异常情况
        if (start < 1) {
            start = 1;
            end = continues.value;
        }
        if (end > totalPage.value) {
            start = totalPage.value - continues.value + 1;
            end = totalPage.value;
        }

        // debugger;
        return {
            start,
            end,
        };
    });
</script>
<script lang="ts">
    export default {
        name: "pagination",
    };
</script>

<style lang="less" scoped>
    .pagination {
        text-align: center;
        button {
            margin: 0 5px;
            background-color: #f4f4f5;
            color: #606266;
            outline: none;
            border-radius: 2px;
            padding: 0 4px;
            vertical-align: top;
            display: inline-block;
            font-size: 13px;
            min-width: 35.5px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            border: 0;

            &[disabled] {
                color: #c0c4cc;
                cursor: not-allowed;
            }

            &.active {
                cursor: not-allowed;
                background-color: #409eff;
                color: #fff;
            }
        }
    }
</style>
