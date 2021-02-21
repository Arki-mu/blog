const Login={
    path:'/login',
    name:'Login',
    component:()=>import('@/pages/index/views/Login.vue'),
    meta:{
        title:'后台管理系统 - 登陆',
        keepAlive:false,
        requiresAuth:true,//身份验证
    }
}

export default Login