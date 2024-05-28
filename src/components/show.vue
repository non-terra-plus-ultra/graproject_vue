
<template>
    <div style="margin-left: 2%;margin-top: 2%;">
      <div>
        <el-input v-model="input" placeholder="筛查轮数" style="width: 20%; margin-right: 2%;"></el-input>
        <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期"
            style="margin-right: 2%;">
            </el-date-picker>
        <el-input v-model="input1" placeholder="输入具体用户" style="width: 20%; margin-right: 2%;"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
  
        <el-table :data="fileList" height="400px" 
        :default-sort = "{prop: 'number', order: 'descending'}"
      highlight-current-row>
            <el-table-column width="200px" prop="pno" label="所属用户" :formatter='formatter' sortable>
              </el-table-column>
             <el-table-column width="200px" prop="result_time" fixed label="预测时间" :formatter='formatter' sortable>
              </el-table-column>
              <el-table-column width="200px" prop="number" label="预测轮数" :formatter='formatter' sortable>
              </el-table-column>
              <el-table-column width="200px" prop="result_describe" label="预测类型"   :filters="[{text: '异物检测', value: 'detect'}, {text: '覆冰检测', value: 'segment'}]" :filter-method="filterHandler">
              </el-table-column>
              <el-table-column width="200px" prop="result_no" label="文件号" :formatter='formatter' sortable>
              </el-table-column>
              <el-table-column width="200px" prop="result_name" label="文件名" :formatter='formatter' sortable>
              </el-table-column>
              <el-table-column width="500px" prop="result_path" label="文件路径" :formatter='formatter' sortable>
              </el-table-column>
              
              
              <el-table-column  label="操作" width="200px" fixed="right">
              >  
                <template slot-scope="scope">
          
              <el-button type="text" @click="getPic(scope.$index,scope.row)" size="mini">查看图片详情</el-button>
               </template>
  
            </el-table-column>
            </el-table>
  
            <el-dialog
            title="图片展示"
            :visible.sync="dialogVisible1"
            width="40%"
            height="600px">
            <div class = "imgdiv">
              <img :src="picurl" alt="beachball" width="100%" height="100%"/>  </div>
            </el-dialog>
          
          </div>
        </div>
    </template>
    
    <script>
    
    import API from "@/api";
    import Cookies from 'js-cookie'
    import qs from "qs";
    import axios from "axios";
    
     export default {
            name: 'showAll',
          data() {
            return {
              picurl: "",//图片url
              optionValue:"",
              dialogVisible1:false,
              fileList:[],
              id_st:Cookies.get('id_st'),
              pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },},
              value1:'',
               input:'',
               input1:''
              // form:{
              //   id_st:'',
              //   name_st:'',
              //   college:'',
              //   major:'',
              //   id_cl:'',
              //   mail:'',
              //   phone:'', 
              // }         
            }
          },
          mounted(){
            this.getfileList();
            // this.setSelectOption();
            },
          methods:{
          
            myformatDate(dateString) {  
              const date = new Date(dateString);  
              if (isNaN(date.getTime())) {  
                throw new Error('Invalid date string');  
              }  
              const year = date.getFullYear();  
              const month = String(date.getMonth() + 1).padStart(2, '0');  
              const day = String(date.getDate()).padStart(2, '0');  
              const hours = String(date.getHours()).padStart(2, '0');  
              const minutes = String(date.getMinutes()).padStart(2, '0');  
              const seconds = String(date.getSeconds()).padStart(2, '0');  
              return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;  
            }  ,

            search(){
              let data={
                input:this.input,
                value:this.value1,
                input1:this.input1,
              };
              data = qs.stringify(data)
                
              API.getSearch(data).then(res=>{
               
                // alert(res.name_st)
                this.fileList=res
                this.fileList.forEach(item=>{
                              item.result_time=this.myformatDate(item.result_time);
                              if(item.result_describe=="detect"){
                                item.result_describe="异物检测"
                              }else{
                                item.result_describe="覆冰检测"
                              }
                      })
              })
            },
            getfileList(){
              let data={
                id_st:null,
              };
              data = qs.stringify(data)
              
              API.getResult3(data).then(res=>{
                // alert(2)
                // alert(res.name_st)
                this.fileList=res
                this.fileList.forEach(item=>{
                              item.result_time=this.myformatDate(item.result_time);
                              if(item.result_describe=="detect"){
                                item.result_describe="异物检测"
                              }else{
                                item.result_describe="覆冰检测"
                              }
                      })
              })
            },
            filterHandler(value, row, column) {
              const describe = column['result_describe'];
              return row[describe] === value;
            },
  
            getPic(index,row){
              this.dialogVisible1=true
              var that = this;
              
              axios({
                method: "get",
                url: "http://127.0.0.1:8801/getPic?"   ,
                params: {
                  result_path:row.result_path,
                },
                
                responseType: "arraybuffer", // 最为关键
              }).then(function (response) {
                that.picurl =
                  "data:image/jpeg;base64," + that.arrayBufferToBase64(response.data);
              });
             
              
              
            },
            // ArrayBuffer转为base64字符串
            arrayBufferToBase64(buffer) {
              //第一步，将ArrayBuffer转为二进制字符串
              var binary = "";
              var bytes = new Uint8Array(buffer);
              var len = bytes.byteLength;
              for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
              }
              //将二进制字符串转为base64字符串
              return window.btoa(binary);
            },
         
         
              
            
            
          },  
        };
        
    </script>
     <style scoped>
   
    </style>