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
        },
        {
            path: 'tag',
            name: '标签管理',
            component: resolve => require(['@/views/admin/tag.vue'], resolve),
            meta: {title: '标签管理', requireAuthor: true,index: '1-4'}
        },
        {
            path: 'article',
            name: '个人日记',
            component: resolve => require(['@/views/admin/articleList.vue'], resolve),
            meta: {title: '个人日记', requireAuthor: true, index: '2-1'}
        },
        {
            path: 'add_article',
            name: '新增日记',
            component: resolve => require(['@/views/admin/newArticle.vue'], resolve),
            meta: {title: '新增日记',requireAuthor: true, index: '2-2'}
        }
    ].concat(userRouter)
}

export default admineRouter