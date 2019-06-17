const userRouter = [
    {
        path: 'user/list',
        name: '用户列表',
        component: resolve => require(['@/views/user/userList.vue'],resolve),
        meta: {title: '用户列表',requireAuthor: true,index: '1-3-1'}
    },
    {
        path: 'user/add',
        name: '新增用户',
        component: resolve => require(['@/views/user/addUser.vue'], resolve),
        meta: {title: '新增用户',requireAuthor: true, index: '1-3-2'}
    }
]

export default userRouter