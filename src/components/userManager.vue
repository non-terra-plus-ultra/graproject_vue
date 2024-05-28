
<template>
    <div>
      <el-table :data="studentList" height="400px"
      :default-sort = "{prop: 'phone', order: 'descending'}"
    highlight-current-row>
            <el-table-column prop="pno" label="账号" :formatter='formatter' sortable>
            </el-table-column>
            <el-table-column prop="name" label="姓名" :formatter='formatter' sortable>
            </el-table-column>
            <el-table-column prop="loc" label="地址" :formatter='formatter' sortable>
            </el-table-column>
            <el-table-column prop="mail" label="邮箱" :formatter='formatter' sortable>
            </el-table-column>
            <el-table-column  label="操作" width="200px" 
            >  
              <template slot-scope="scope">
        
            <el-button type="text" @click="lookStudentInfo(scope.$index,scope.row)" size="mini">查看详细信息</el-button>
            <el-button type="text" @click="setOringinpwd(scope.$index,scope.row)" size="mini">重置密码</el-button>
             </template>

          </el-table-column>
          </el-table>
      
          <el-dialog
          title="用户详细信息"
          :visible.sync="dialogVisible1"
          width="40%"
          >
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="账号：">
              <el-span v-model="form.pno">{{ form.pno }}</el-span>
              </el-form-item>
              <el-form-item label="姓名：">
                <el-span v-model="form.name"> {{form.name}}</el-span>
              </el-form-item>
              <el-form-item label="姓别：">
                <el-span v-model="form.sex"> {{form.sex}}</el-span>
              </el-form-item>
              <el-form-item label="邮箱：">
                <el-span v-model="form.mail"> {{form.mail}}</el-span>
              </el-form-item>
              <el-form-item label="地址：">
                <el-span  v-model="form.loc"> {{form.loc}}</el-span>
              </el-form-item>
              
           
              <el-form-item>
                <el-button type="primary" @click="dialogVisible1=false">确定</el-button>
                <el-button @click="dialogVisible1=false">取消</el-button>
              </el-form-item>
              
          </el-form>
        </el-dialog>
  
          
        </div>
  </template>
  
  <script>
  
  import API from "@/api";

  import qs from "qs";
  
   export default {
          name: 'UpLoadClass',
        data() {
         
  
          return {
          options:[{
              id_cl:""
            }
            ],
            optionValue:"",
            
            dialogVisible1:false,
            studentList:[],
           
            form:{
              pno:'',
              name:'',
              sex:'',
              loc:'',
            
              mail:'',
             
            }         
          
          }
        },
        mounted(){
          this.getUserList();
          
         
          },
        methods:{
          
          getUserList(){
            let data={
             
            };
            data = qs.stringify(data)
            
            API.userInfoList(data).then(res=>{
             
              this.studentList=res
            })
          },
          lookStudentInfo(index,row){
            this.dialogVisible1=true
            let data = {
              pno:row.pno,
            };
            data = qs.stringify(data);
            API.getUserInfo2(data).then(res=>{
              
              let getdata=JSON.parse(res)
                this.form.pno = getdata.pno
                this.form.sex = getdata.sex
                this.form.loc = getdata.loc
                this.form.name = getdata.name
                this.form.mail = getdata.mail
             
            })
            
          },
        
          setOringinpwd($index,row){
            let data={
              pno:parseInt(row.pno)
              }
         
              data = qs.stringify(data)
              
              API.updateUserPwd(data).then(res=>{
                
                if(res=="Success update"){
                  this.$notify.success({
                    title: '成功',
                    message: '重置密码成功'
                  });
                  this.getUserList();
                }
              })
          }
          
          
        },  
      };
      
  </script>