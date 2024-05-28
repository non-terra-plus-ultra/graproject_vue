export default {

    //baseURL: 'http://39.106.160.119:8080/',//后端地址
    // baseURL: 'http://127.0.0.1:8081/',//后端地址
    baseURL:'http://127.0.0.1:8801/',
    
    method: 'post',
    //测试数据集
    testData: {url:'testData/inputDB'},
    //登录模块接口

    Login: {url:'user/login'},
    ManagerLogin: {url:'manager/malogin'},

    //查看历史结果
    getResult:{url:'/user/getResult'},
    getResult2:{url:'/user/getSegment'},
    studentLogin: {url:'student/login'},
    teacherLogin:{url:'teacher/login'},
    managerLogin:{url:'manager/login'},
    getResult3:{url:'/user/getResult3'},
    getResult4:{url:'/user/getResult4'},
    getSearch:{url:'/manager/getSearch'},
    getSearch2:{url:'/manager/getSearch2'},
    //查看统计结果
    getStatistics:{url:'/user/getStatistics'},
    getStaSegment:{url:'/user/getStaSegment'},
    //注册模块
    userReg:{url:'user/register'},
    //修改信息
    getUserInfo:{url:'user/getUserInfo'},
    getUserInfo2:{url:'user/getUserInfo2'},
    updateUserInfo:{url:'user/updateUserInfo'},
    //修改密码
    userInfoList:{url:'user/userInfoList'},
    updateUserPwd:{url:'user/updateUserPwd'},
   

    studentReg:{url:'student/register'},




    


}
