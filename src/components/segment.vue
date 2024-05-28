<template>

    <div class="body">
       <div>
        <div class="header">
            <form action="file_upload" method="post" onsubmit="return check()">
                <el-button type="text" @click="detect" style="margin-left:2%;color: #706875;font-weight: bold; font-size: 15px;  padding-left: 2%; padding-right: 2%; background-color: rgb(238, 241, 246);" ><p>输电线覆冰检测</p></el-button>
                
                
                    </form>
        </div>
      <div class="upload_demo">
    <el-upload
      multiple
      ref="upload"
      action="#"
      list-type="picture-card"  
      :file-list="fileList"
      :on-change="onFilesChange"
      :auto-upload="false"
      >
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          >
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <i class="el-icon-zoom-in"></i>
            </span>
            
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
    </el-upload>
      </div>
      
    </div>
    
    </div>
    </template>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    
    <script>
      import Cookies from 'js-cookie'
        import API from "@/api";
        import qs from "qs";
        import axios from 'axios';
      export default {
        data() {
          return {
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            fileList:[],
            id_st:Cookies.get('id_st'),
          };
        },
        methods: {
            onFilesChange(file, fileList){
                this.fileList =  this.$refs.upload.uploadFiles;
                console.log(this.fileList)
            },
           
            
             detect(){
                
               
            // if(fileList == undefined || fileList.length <= 0){
            //   this.$notify({
            //   title: '警告',
            //   message: '请选择要预测的图片',
            //   type: 'warning',
            //   });
            // }else{
                // const form = new FormData(); 
                // for (let i = 0; i < this.fileList.length; i++) {  
                //     form.append('file', this.fileList[i]);  
                //     }  
                var param = new FormData();
                        this.fileList.forEach(
                            (val, index) => {
                                param.append("file", val.raw);
                                
                            }
                        );
                        param.append("user_no",this.id_st)
                        this.$message({
                                                message: "开始检测！",
                                                duration: 1000
                                            });
                        axios.post("http://127.0.0.1:8801/api/segment", param).then(responce => {
                            if (responce==='success'){
                                this.$message({
                                                message: "覆冰检测完成！",
                                                duration: 1000
                                            });  
                            }
                            else{
                                this.$message({
                                                message: "覆冰检测成功！",
                                                duration: 1000
                                            }); 
                            }
                        });
    
                        
    
                
            // }
            },
    
            handleRemove(file) {
            let fileList = this.$refs.upload.uploadFiles;
            let index = fileList.findIndex( fileItem => {return fileItem.uid === file.uid});
            fileList.splice(index, 1);
        },
    
    
          handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
            window.open(file.url, '_blank');
          },
          handleDownload(file) {
            
          }
        }
      }
    </script>
    
    <style scoped>
    .body{
        height: 560px; 
        width: 93%; 
        background-color: rgb(238, 241, 246);
        margin-right: 5%;

        margin-left: 1%;
        margin-top: 1%;
        
       
        
    }
    .header {
            background-color: rgb(238, 241, 246);
            color: white;
            padding-top: 0px;
        }
    .upload_demo{
        
        background-color: rgb(238, 241, 246);
        border: #000;
        border-color: #000;
        margin-left: 2%;
        margin-top: 0%;
    }
  
    </style>