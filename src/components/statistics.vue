
<template>
    <div style="margin-left: 2%;margin-top: 2%;">
      <div>
        <!-- <el-select v-model="optionValue" filterable placeholder="按班级查询" style="width: 20%;" inputmode="false" @change="selectByClass()">
                    <el-option
                      v-for="item in options"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select> -->
        <el-table :data="fileList" height="520px" 
        :default-sort = "{prop: 'number', order: 'descending'}"
      highlight-current-row>
             <el-table-column width="200px" prop="sta_time" fixed label="统计时间" :formatter='formatter' sortable>
              </el-table-column>
              <el-table-column width="200px" prop="number" label="预测轮数" :formatter='formatter' sortable>
              </el-table-column>
              <el-table-column width="200px" prop="sta_describe" label="预测类型"   :filters="[{text: '异物检测', value: 'detect'}, {text: '覆冰检测', value: 'segment'}]" :filter-method="filterHandler">
              </el-table-column>
              <el-table-column width="200px" prop="sta_no" label="文件号" :formatter='formatter' sortable>
              </el-table-column>
              <el-table-column width="200px" prop="sta_name" label="文件名" :formatter='formatter' sortable>
              </el-table-column>
              <el-table-column width="500px" prop="sta_path" label="文件路径" :formatter='formatter' sortable>
              </el-table-column>
             
              
              <el-table-column  label="操作" width="200px" fixed="right">
              >  
                <template slot-scope="scope">
          
              <el-button type="text" @click="getPic(scope.$index,scope.row)" size="mini">查看图片详情</el-button>
               </template>
  
            </el-table-column>
            </el-table>
            <el-pagination  
            @current-change="handleCurrentChange"  
            @size-change="handleSizeChange"  
            :current-page="currentPage"  
            :page-sizes="[10]"  
            :page-size="pageSize"  
            layout="total, sizes, prev, pager, next, jumper"  
            :total="total"
            style="margin-top: 5px;margin-left: 40%;">  
          </el-pagination> 
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
              
              tableData: [], // 这里存储当前页要展示的数据  
              currentPage: 1, // 当前页码  
              pageSize: 10, // 每页显示的条目个数  
              total: 0, // 总条目数  
              // 假设你有一个包含所有数据的数组 allData  
              allData: [] // 从后端获取的所有数据  
                    
            }
          },
          mounted(){
            this.getfileList();
            // this.setSelectOption();
            },
          methods:{
            // setSelectOption(){
            //   let data ={};
            //   data = qs.stringify(data);
            //   API.getclasses(data).then(res=>{
            //     this.options=res;
            //   })
            // },
            handleCurrentChange(val) {  
            this.currentPage = val;  
            this.fetchData(); // 更新表格数据  
          },  
          handleSizeChange(val) {  
            this.pageSize = val;  
            this.currentPage = 1; // 通常当每页显示数量改变时，会回到第一页  
            this.fetchData(); // 更新表格数据  
          },  
          fetchData() {  
            // 根据 currentPage 和 pageSize 从 allData 中筛选出当前页要展示的数据  
            // 假设 allData 已经包含了所有数据  
            const start = (this.currentPage - 1) * this.pageSize;  
            const end = this.currentPage * this.pageSize;  
            this.tableData = this.allData.slice(start, end);  
            this.fileList=this.tableData 
           
        
             
            this.total = this.allData.length;  
          } ,
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
    
            getfileList(){
              let data={
                id_st:this.id_st,
              };
              data = qs.stringify(data)
              
              API.getStatistics(data).then(res=>{
                // alert(2)
                // alert(res.name_st)
                this.allData=res;
              this.total = this.allData.length;
                this.fileList=res
                this.fileList.forEach(item=>{
                              item.sta_time=this.myformatDate(item.sta_time);
                              if(item.sta_describe=="detect"){
                                item.sta_describe="异物检测"
                              }else{
                                item.sta_describe="覆冰检测"
                              }
                      })
                      this.tableData = this.allData.slice(0, this.pageSize); 
              this.fileList=this.tableData 
              })
            },
            filterHandler(value, row, column) {
              const describe = column['sta_describe'];
              return row[describe] === value;
            },
  
            getPic(index,row){
              this.dialogVisible1=true
              var that = this;
              
              axios({
                method: "get",
                url: "http://127.0.0.1:8801/getSta?"   ,
                params: {
                  sta_path:row.sta_path,
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
            // lookStudentInfo(index,row){
            //   this.dialogVisible1=true
            //   let data = {
            //     id_st:row.id_st,
            //   };
            //   data = qs.stringify(data);
            //   API.getStudentInfo(data).then(res=>{
            //     this.form=res;
            //   })
            // },
            // selectByClass(){
            //   let data = {
            //     id_cl:parseInt(this.optionValue),
            //   };
            //   data = qs.stringify(data);
          
            //   API.getStudentInfoById_cl(data).then(res=>{
                
            //     this.studentList=res;
            //   })
            //   this.setSelectOption()
            // },
         
              
            
            
          },  
        };
        
    </script>
     <style scoped>
    /* .imgdiv{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    } */
    </style>