
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
             
              
              <el-table-column  label="操作" width="240px" fixed="right">
              >  
                <template slot-scope="scope">
          
              <el-button type="text" @click="getPic(scope.$index,scope.row)" size="mini">查看图片详情</el-button>
              <el-button type="text" @click="getSegmentAll(scope.$index,scope.row)" size="mini">本轮预测结果展示</el-button>
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
            <el-dialog
          title="本轮所有结果展示"
          :visible.sync="dialogVisible2"
          width="40%"
          height="600px"
          
          >
            <!-- <div style="display: flex"> -->
              <div v-for="(image, index) in images" :key="index"  >
                <img :src="image" alt="Image" style="width: 400px"> 
              </div> 
            <!-- </div> -->
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
              dialogVisible2:false,
              fileList:[],
              id_st:Cookies.get('id_st'),

              
              tableData: [], // 这里存储当前页要展示的数据  
              currentPage: 1, // 当前页码  
              pageSize: 10, // 每页显示的条目个数  
              total: 0, // 总条目数  
              // 假设你有一个包含所有数据的数组 allData  
              allData: [], // 从后端获取的所有数据  
              images: []  
               
               
            }
          },
          mounted(){
            this.getfileList();
            // this.setSelectOption();
            },
          methods:{
          
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
              
              API.getResult2(data).then(res=>{
                // alert(2)
                // alert(res.name_st)
                this.allData=res;
              this.total = this.allData.length;
                this.fileList=res
                this.fileList.forEach(item=>{
                              item.result_time=this.myformatDate(item.result_time);
                              if(item.result_describe=="detect"){
                                item.result_describe="异物检测"
                              }else{
                                item.result_describe="覆冰检测"
                              }
                      })
                      this.tableData = this.allData.slice(0, this.pageSize); 
              this.fileList=this.tableData 
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
            getSegmentAll(index,row){
            this.dialogVisible2=true
            var that = this;
            
            axios({
              method: "get",
              url: "http://127.0.0.1:8801/getSegmentAll?"   ,
              params: {
                result_path:row.result_path,
              },
              
              
            }).then(function (response) {
              that.images = response.data
             
                
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