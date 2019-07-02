<template>
    <div class="admin-index">
        <v-search 
        :searchResult='searchResult'
        @addTagFun='addTagFun'
        ></v-search>
        <div class="blog-list">
             <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                label="日期"
                width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.createAt | getTime }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="标题"
                property="title"
                width="180">
                </el-table-column>
                <el-table-column
                label="标签"
                property="tags"
                >
                <template slot-scope="scope">
                    
                    <el-tag style="margin-right: 5px;"
                    v-for="(tag,index) in scope.row.tagList" 
                    :key="tag.name"
                    :type='index%2 == 0?"success":"info"'
                    size="mini"
                    >
                        {{ tag.name }}
                    </el-tag>
                </template>
                </el-table-column>
                <el-table-column
                label="图片"
                property="imgUrl"
                >
                </el-table-column>
                <el-table-column
                label="作者"
                >
                <template slot-scope="scope">
                    <span>{{ scope.row.userinfo | getUserInfo }}</span>
                </template>
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
            @current-change='handlePageNum'
            :current-page='pageNum'
            :total="count">
            </el-pagination>
        </div>

        <el-dialog  
        top='5vh'
        width='80%'
        :visible.sync="dialogFormVisible">
            <blog-template :modifyFlag='true'></blog-template>
        </el-dialog>
    </div>
</template>
<script>
import blogTemplate from '@/components/admin/blogTemplate'
import vSearch from '@/components/admin/search'
export default {
    components: {
        'blog-template': blogTemplate,  
        'v-search': vSearch  
    },
    data () {
        return {
            serachValue: '',
            dialogFormVisible: false,
            count: 0,
            tableData: [],
            pageNum: 1
        }
    },
    created () {
        this.init()
    },
    filters: {
        getTime(val){
            return val.substring(0,10)
        },
        getUserInfo(val){
            return val[0].username
        }  
    },
    methods: {
        async init(obj){
            obj = obj || {}
            let result = await this.$axios.get('/blog/list',{
                params: {
                    pageNum: this.pageNum,
                    searchKey: obj.searchKey || ''
                }
            })
            console.log(result)
            if(result && result.data.code == 1){
                this.tableData = result.data.data.list
                this.count = result.data.data.count
            }
        },
        // 搜索列表
        searchResult(val){
            this.pageNum = 1
            this.init({
                searchKey: val
            })
        },
        nullSerarchResult(val){
            if(!val){
                this.pageNum = 1
                this.init()
            }
        },
        // 切换分页
        handlePageNum(val){
            console.log(val)
            this.pageNum = val
            this.init()
        },
        // 去新增页面
        addTagFun(){
            this.$router.push('/admin/add_blog')
        },
        handleEdit(index, row) {
            console.log(index, row);
            this.dialogFormVisible = true
        },
        handleDelete(index, row) {
            console.log(index, row);
        }
    }
}
</script>
<style lang="scss">
.admin-index{
    font-family: '宋体';
    box-sizing: border-box;
    padding: 20px;
    .blog-list{
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;
    }
    .paging{
        margin-top: 30px;
        text-align: center;
    }
}
</style>
