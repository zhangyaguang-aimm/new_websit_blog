<template>
    <div class="user-list">
        <v-search></v-search>
        <div class="blog-list">
             <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                label="日期"
                width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="姓名"
                property="name"
                width="180">
                </el-table-column>
                <el-table-column
                label="地址"
                property="address"
                >
                </el-table-column>
                <el-table-column label="操作" width='200'>
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="paging">
            <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import vSearch from '@/components/admin/search'
export default {
    components: {
        'v-search': vSearch
    },
    data () {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.user-list{
    font-family: '宋体';
    box-sizing: border-box;
    padding: 20px;
    .paging{
        margin-top: 20px;
        text-align: center;
    }
}
</style>
