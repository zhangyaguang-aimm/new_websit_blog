const userRouter = [
    {
        path: 'user/list',
        name: '用户列表',
        component: resolve => require(['@/views/user/userList.vue'],resolve),
        meta: {title: '用户列表',requireAuthor: true,index: '1-3-1'}
    },
    {
        path: 'usercenter',
        name: '用户中心',
        component: resolve => require(['@/views/user/userCenter.vue'], resolve),
        meta: {title: '用户中心', requireAuthor: true,index: '1-3-2'}
    }
]

export default userRouter