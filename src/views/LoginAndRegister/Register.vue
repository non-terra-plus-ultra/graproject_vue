<template>
    <div class="loginbody">
     
        <div class="logindata">
          <div class="logintext">
            <h2>注册</h2>
          </div>
          <div class="formdata">
            <el-form ref="form" :model="form" :rules="rules">
              <el-form-item prop="id_st" >
                <el-input 
                  prefix-icon="el-icon-user-solid"
                  v-model="form.id_st"
                  clearable
                  placeholder="请输入账号"
                ></el-input>
              </el-form-item>
              <el-form-item prop="name_st" >
                <el-input 
                  prefix-icon="el-icon-user-solid"
                  v-model="form.name_st"
                  clearable
                  placeholder="请输入姓名"
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
              <el-form-item prop="pwdAgain">
                <el-input
                  prefix-icon="el-icon-lock"
                  v-model="form.pwdAgain"
                  clearable
                  placeholder="请输入重复密码"
                  show-password
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="butt">
            <el-button class="shou" @click="register">注册</el-button>
          </div>
        </div>
      </div>
   
  </template>
  
  <script>


    import API from "@/api";
    import qs from "qs";
   
  
  export default {
    name: "register-1",
    data() {
      return {
        options:[{
          id_cl:""
        }
        ],
        optionValue:"",
        form: {
          id_st: "",
          name_st:"",
          id_cl:"",
          pwd_st:"",
          pwdAgain:""
        },
        rules: {
          id_st: [
            { required: true, message: "请输入帐号", trigger: "blur" },
            { max: 8, message: "不能大于8个字符", trigger: "blur" },
          ],
          name_st: [
            { required: true, message: "请输入姓名", trigger: "blur" },
            { max: 10, message: "不能大于10个字符", trigger: "blur" },
          ],
          pwd_st: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { max: 10, message: "不能大于10个字符", trigger: "blur" },
          ],
          pwdAgain: [
            { required: true, message: "请输入重复密码", trigger: "blur" },
            { max: 10, message: "不能大于10个字符", trigger: "blur" },
          ],
        },
      };
    },
 
    mounted() {
      this.setSelectOption();
    },
    methods: {
      setSelectOption(){
        let data ={};
        data = qs.stringify(data);
        API.getclasses(data).then(res=>{
        
          this.options=res;
        })
      },


      register() {
        if(this.form.id_st===""){
          this.$notify({
          title: '警告',
          message: '请输入帐号',
          type: 'warning',
          
        });
        }
        else if(this.form.name_st===""){
          this.$notify({
          title: '警告',
          message: '请输入姓名',
          type: 'warning',
          
        });
        }
        else if(this.form.pwd_st!=this.form.pwdAgain){
          this.$notify({
          title: '警告',
          message: '两次输入密码不一样',
          type: 'warning',
          
        });
        }
        else {
        let data = {
          id_st: parseInt(this.form.id_st),
          name_st: this.form.name_st,
          id_cl: parseInt(this.optionValue),
          pwd_st:this.form.pwd_st,
            };
          data = qs.stringify(data);
          // alert(data)
          API.userReg(data).then(res=>{
          if(res==='Fail register'){
            alert("注册失败，请检查是否已注册");
            return;
         }
         else{
        alert("注册成功，请登录");
        this.$router.push("/");
        }}).catch(msg=>{
          alert(msg);
        })  
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
    padding-top: 100px;
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
    height: 470px;
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