const userRouter = [
    {
        path: 'user/list',
        name: '用户列表',
        component: resolve => require(['@/views/user/userList.vue'],resolve),
        meta: {title: '用户列表',requireAuthor: true,index: '1-3-1'}
    }
]

export default userRouter