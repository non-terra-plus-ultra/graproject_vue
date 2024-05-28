
<template>
  <div style="background-color:#FCFCFC;">
      <div>
          <my-bread level1='个人中心' level2='修改密码' :level3="levelName"></my-bread>
      </div>
      <div style="margin-top:25px;margin-left:80px;">
          <el-row :gutter="10">
              <el-col :span="2">
                  <div style="background-color:#FFEBCD;width:60px;height:60px;display:inline-block;border-radius:50%;overflow:hidden;">
                      <el-image :src= "img" style="width:60px;height:60px;"></el-image>
                  </div>
                  
                  <div style="margin-top:50px;margin-left:1px;"><el-button type="text" style="font-size:15px;color:#4D4D4D;"  @click="infomationClick()">个人信息<span style="color:#B0E0E6;" v-show="infomationShow" class="el-icon-s-promotion"></span></el-button></div>
                  <div style="margin-top:5px;margin-left:1px;"><el-button type="text" style="font-size:15px;color:#4D4D4D;" @click="updateInfoClick()">修改个人信息<span style="color:#B0E0E6;" v-show="studentInfoShow" class="el-icon-s-promotion"></span></el-button></div>
              </el-col>

              <el-col :span="21">
                  <el-row :gutter="10" style="margin-top:20px;">
                      <el-col :span="4"><div style="text-align:right;"><span>账号：</span></div></el-col>
                      <el-col :span="5" v-model="pno">{{pno}}</el-col>
                  </el-row>
                  
                  <!-- 个人信息 -->
                  <el-row v-show="infomationShow">
                      <el-card style="margin-top:30px;">
                          <el-row>
                              <el-col :span="6">
                                <el-form :model="form">
                                <el-row :gutter="12" style="margin-top:20px;">
                                      <el-col :span="8"><div style="text-align:right;"><span>帐号：</span></div></el-col>
                                      <el-col :span="16" v-model="pno">{{pno}}</el-col>
                                  </el-row>
                                  <el-row :gutter="12" style="margin-top:20px;">
                                      <el-col :span="8"><div style="text-align:right;"><span>姓名：</span></div></el-col>
                                      <el-col :span="16" v-model="name">{{ name }}</el-col>
                                  </el-row>
                                  <el-row :gutter="12" style="margin-top:30px;">
                                      <el-col :span="8"><div style="text-align:right;"><span>性别：</span></div></el-col>
                                      <el-col :span="16" v-model="sex">{{sex}}</el-col>
                                  </el-row>
                                  <el-row :gutter="12" style="margin-top:30px;">
                                      <el-col :span="8"><div style="text-align:right;"><span>地址：</span></div></el-col>
                                      <el-col :span="16" v-model="loc">{{ loc }}</el-col>
                                  </el-row>
                                  
                                  <el-row :gutter="12" style="margin-top:30px;">
                                      <el-col :span="8"><div style="text-align:right;"><span>邮箱：</span></div></el-col>
                                      <el-col :span="16" v-model="mail">{{ mail }}</el-col>
                                  </el-row>
                               
                                </el-form>
                                 
                              </el-col>
                              
                                
                          </el-row>
                      </el-card>
                  </el-row>
                  <!-- 修改个人信息 -->
                  <el-row v-show="studentInfoShow">
                    <el-card style="margin-top:30px;">
                        <el-form :model="form1">
                            <el-form-item label="账号:" :label-width="'120px'" >
                                <el-input v-model="form1.pno" autocomplete="off" size="mini" style="width:35%" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="姓名:" :label-width="'120px'" >
                                <el-input v-model="form1.name" autocomplete="off" size="mini" style="width:35%"></el-input>
                            </el-form-item>
                            <el-form-item label="性别:" :label-width="'120px'" >
                                <el-input v-model="form1.sex" autocomplete="off" size="mini" style="width:35%"></el-input>
                            </el-form-item>
                            <el-form-item label="地址:" :label-width="'120px'" >
                                <el-input v-model="form1.loc" autocomplete="off" size="mini" style="width:35%"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱:" :label-width="'120px'" >
                                <el-input v-model="form1.mail" autocomplete="off" size="mini" style="width:35%"></el-input>
                            </el-form-item>
                           
                            <el-form-item>
                                 <el-button class="shou" @click="updateStudnetInfo" style="margin-left: 20%;">修改</el-button>
                            </el-form-item>
                        </el-form>
                    </el-card>
                  </el-row>
              </el-col>
          </el-row>
      </div>
      
      <div>

      </div>
  </div>
</template>
<script>

import picture from "@/assets/back3.jpg"
import Cookies from 'js-cookie'
import qs from "qs";
import API from "@/api";

export default {
  data(){
      return {
        pno:Cookies.get('id_st'),
          
           
            sex:'',
            loc:'',
            name:'',
            mail:'',
          
          img:picture,

          levelName:'',
      
          infomationShow:false,
          studentInfoShow:false,
          form1:{
            pno:'',
            sex:'',
            loc:'',
            name:'',
            mail:'',
          },
         
      }
  },
  mounted() {

    },
  methods:{
      

        getInfo(){
            let data = {
                  pno: this.pno,
                 
              };
              data = qs.stringify(data)
              API.getUserInfo(data).then(res=>{
                let getdata=JSON.parse(res)
                this.sex = getdata.sex
                this.loc = getdata.loc
                this.name = getdata.name
                this.mail = getdata.mail
                this.form1=JSON.parse(res)
                // alert(JSON.parse(res).name)
                
       
              }).catch(msg=>{
                  alert("我是错误");
                  alert(msg)
              })
              
        },
        //修改个人信息界面
        getInfo2(){
            let data = {
                  pno: this.pno,
                 
              };
              data = qs.stringify(data)
              API.getUserInfo(data).then(res=>{
                this.form1=JSON.parse(res)
       
              }).catch(msg=>{
                  alert("我是错误");
                  alert(msg)
              })
              
        },
  
      infomationClick(){ 
           //个人信息事件
        this.getInfo()
        this.infomationShow = true
        this.studentInfoShow = false
       
      },
      
      updateInfoClick(){     //修改个人信息事件
          this.getInfo2
          this.infomationShow = false
          this.studentInfoShow = true
          
      },
   
      updateStudnetInfo(){  //提交a
        let data = {
            pno:parseInt(this.form1.pno),
            name:this.form1.name,
            sex:this.form1.sex,
            mail:this.form1.mail,
            loc:this.form1.loc,
          };
       
    
        API.updateUserInfo(data).then(res=>{
            if(res==="Success update"){
                this.$message({
                    type:"success",
                    message:"成功修改",
                    showClose:true
                })
             
            }else if(res==="Fail update"){
                this.$message({
                    type:"error",
                    message:"修改失败",
                    showClose:true
                })
            }

        })
       
      },

  }
}
</script>

<style>
  .name{ text-align: right; }
  .value{ text-align: left; }
</style>
