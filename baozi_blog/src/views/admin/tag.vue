<template>
    <div class="tag">
        <v-search></v-search>
        <div class="blog-list">
             <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                label="序号"
                type="index"
                width="180">
                
                </el-table-column>
                <el-table-column
                label="名称"
                property="name"
                width="180">
                </el-table-column>
                <el-table-column
                label="时间"
                property="address"
                >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.createAt | getTime }}</span>
                </template>
                </el-table-column>
                <el-table-column label="操作" width='200'>
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="editTagFun(scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="paging">
            <el-pagination
            background
            layout="prev, pager, next"
            :total="allNum">
            </el-pagination>
        </div>

        <!-- 新增的弹框 -->
        <el-dialog
            title="新增标签"
            :visible.sync="showAddTag"
            width="50%"
            center>
            <el-form ref="form" :model="tag" label-width="80px">
                <el-form-item label="标签名称">
                    <el-input v-model="tag.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancleTag">取 消</el-button>
                <el-button type="primary" @click="saveTagFun">保 存</el-button>
            </span>
        </el-dialog>
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
            tag: {
                name: ''
            },
            tableData: [
            ],
            showAddTag: false,
            allNum: 0,
            isEditFlag: false
        }
    },
    created () {
        this.getInitInfo()  
    },
    filters: {
        getTime(val){
            return val.substring(0,10)
        }  
    },
    methods: {
        addTagFun(){
            this.showAddTag = true
        },
        editTagFun(val){
            this.showAddTag = true
            this.isEditFlag = true
            this.tag = val
        },
        async getInitInfo(){
            let result = await this.$axios.get('/tag/list')
            console.log(result)
            this.tableData = result.data.data.list
            this.allNum = result.data.data.count
        },
        async saveTagFun(){
            if(this.isEditFlag){
                let updateResult = await this.$axios.get('/tag/edit',{
                    params: this.tag
                })
                if(updateResult.data.code == 1){
                    this.showAddTag = false
                    this.getInitInfo()
                    this.$message({
                        type: 'success',
                        message: updateResult.data.message
                    })
                }else{
                    this.$message({
                        type: 'error',
                        message: updateResult.data.message
                    })
                }

                this.isEditFlag = false
                return
            }
            let result = await this.$axios.post('/tag/add',this.tag)
            if(result.data.code == 1){
                this.showAddTag = false
                this.getInitInfo()
                this.$message({
                    type: 'success',
                    message: result.data.message
                })
            }else{
                this.$message({
                    type: 'error',
                    message: result.data.message
                })
            }
            
        },
        async handleDelete(val){
            console.log(val)
            let result = await this.$axios.get('/tag/delete',{
                params: {
                    id: val._id
                }
            })
            if(result.data.code == 1){
                this.getInitInfo()
                this.$message({
                    type: 'success',
                    message: result.data.message
                })
            }else{
                this.$message({
                    type: 'error',
                    message: result.data.message
                })
            }
            console.log(result)
        },
        cancleTag(){
            this.showAddTag = false
            this.isEditFlag = false
        }

    }
}
</script>
<style lang="scss" scoped>
.tag{
    font-family: '宋体';
    box-sizing: border-box;
    padding: 20px;
    .paging{
        margin-top: 20px;
        text-align: center;
    }
}
</style>
