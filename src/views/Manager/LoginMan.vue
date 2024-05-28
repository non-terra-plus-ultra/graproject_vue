<template>
    <div class="loginbody">
        <div class="logindata">
          <div class="logintext">
            <h3>Manager</h3>
          </div>
          <div class="formdata">
            <el-form ref="form" :model="form" :rules="rules" class="formitem">
              <el-form-item prop="id_st" >
                <el-input 
                  prefix-icon="el-icon-user-solid"
                  v-model="form.id_st"
                  clearable
                  placeholder="请输入用户名"
                ></el-input>
              </el-form-item>
              <el-form-item prop="pwd_st">
                <el-input
                  prefix-icon="el-icon-lock"
                  v-model="form.pwd_st"
                  clearable
                  placeholder="请输入密码"
                  show-password
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          

          <div class="butt">
            <el-button class="loginButt"  @click="login">Sign in</el-button>

          </div> 
        
        </div>
      </div>
   
  </template>
  
  <script>
   import Cookies from 'js-cookie'
    import API from "@/api";
    import qs from "qs";

  export default {
    name: "login-1",
    data() {
      return {
        value1:false,
        form: {
          id_st: "",
          pwd_st: "",
        },
        checked: false,
        rules: {
          id_st: [
            { required: true, message: "请输入用户名", trigger: "blur" },
            { max: 10, message: "不能大于10个字符", trigger: "blur" },
          ],
          pwd_st: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { max: 10, message: "不能大于10个字符", trigger: "blur" },
          ],
        },
      };
    },
   
    mounted() {
      
    },
    methods: { 
      
      login() {
        if(this.form.id_st===""){
          this.$notify({
          title: '警告',
          message: '请输入学号/工号',
          type: 'warning',
          
        });
        }else if(this.form.pwd_st===""){
          this.$notify({
          title: '警告',
          message: '请输入密码',
          type: 'warning',
          
        });
        }else{
          
              let data = {
                  id_st: parseInt(this.form.id_st),
                  pwd_st: this.form.pwd_st
              };
              data = qs.stringify(data);
              // alert(data);
              API.ManagerLogin(data).then(res=>{
                // alert("我是学生2")
                  if(res==='Login fail'){
                    this.$notify.error({
                    title: '错误',
                    message: '账号/密码错误'
                  });
                      return;
                  }
                  
                
                  this.$router.push("/ManagerMain");
              }).catch(msg=>{
                  alert("我是错误");
                  alert(msg)
              })
          // }
        }
            },
   
      
  
  
     
    },
  };
  </script>
  
  <style scoped>
  .loginbody {
    width: 100%;
    height: 100%;
 
    min-width: 1000px;
    background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
    /* background-image: url("@/assets/back3.jpg"); */
    background-size: 100% 100%;
    background-position: center center;
    overflow: auto;
    background-repeat: no-repeat;
    position: fixed;
    line-height: 100%;
    padding-top: 150px;
    margin: -8px -8px auto;
  }
  
  .logintext {
    margin-bottom: 40px;
    line-height: 50px;
    text-align: center;
    font-size: 30px;
    font-weight: bolder;
    color: black;
    /* text-shadow: 2px 2px 4px #000000; */
  }
  
  
   .logindata {
    width: 450px;
    height: 400px;
    transform: translate(-50%,0%);
    margin-left: 50%;
    background: #ffffffff;
    padding: 50px;
    border-radius: 25px;
  }

 
  
  .tool {

    justify-content: space-between;
    color: #606266;
  }
  
  .butt {
    margin-top: 50px;
    text-align: center;
  
  }
  .loginButt { 
    color: #ffffff;
    font-weight: bolder;
    width: 80%;
    background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
  }
  .forgetpsw{
    float: right;
  }
  .shou {
    cursor: pointer;
    color: #7abbe4;
    font-weight: bolder;
  }
  .msg {
            text-align: center;
            line-height: 88px;
        }

  </style>
  
  
  
  

  
  