import userRouter from './user'
const admineRouter = {
    path: '/admin',
    name: '管理系统',
    component: resolve => require(['@/views/admin/admin.vue'], resolve),
    children: [
        {
            path: '/',
            name: '文章列表',
            component: resolve => require(['@/views/admin/index.vue'], resolve),
            meta: { title: '文章列表', requireAuthor: true,index: '1-1' }
        },
        {
            path: 'add_blog',
            name: '新增博客',
            component: resolve => require(['@/views/admin/newBlog.vue'], resolve),
            meta: {title: '新增博客',requireAuthor: true,index: '1-2'}
        }
    ].concat(userRouter)
}

export default admineRouter