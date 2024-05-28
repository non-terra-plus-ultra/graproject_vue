<template>

    <el-container style="height: 500x; border: 1px solid #eee">
       
        <el-container style="width: 100%;">
          
    
    
    
          <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu :default-openeds="['1']" @select="changeSidebar">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>历史记录</template>
              <el-menu-item-group>
               
                <el-menu-item index="show" >异物检测记录</el-menu-item>
                <el-menu-item index="showSegment2" >覆冰检测记录</el-menu-item>
              </el-menu-item-group>
              <!-- <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项4-1</el-menu-item>
              </el-submenu> -->
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-message"></i>所有用户</template>
              <el-menu-item-group>
               
                <el-menu-item index="userManager" >用户信息</el-menu-item>
               
              </el-menu-item-group>
              </el-submenu>
            
              <!-- <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项4-1</el-menu-item>
              </el-submenu> -->

          
            <!-- <el-submenu index="3">
              <template slot="title"><i class="el-icon-setting"></i>作业管理</template>
              <el-menu-item-group>
                
                <el-menu-item index="HomeWorkTeacher">查看作业</el-menu-item>
                <el-menu-item index="HomeWorkInfoTeacher">批改作业</el-menu-item>
          
              </el-menu-item-group>
            </el-submenu> -->
          </el-menu>
        </el-aside>
      
          <el-main style="height:600px;margin: 0%;padding: 0%;" >
            <!-- <el-table :data="tableData">
              <el-table-column prop="date" label="日期" width="140">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="120">
              </el-table-column>
              <el-table-column prop="address" label="地址">
              </el-table-column>
              <el-table-column prop="id" label="地址">
              </el-table-column>
              
            </el-table> -->
            <router-view></router-view>
            
          </el-main>
        </el-container>
        </el-container>
        
      </el-container>
    </template>
      <style>
        .el-header {
          background-color: #B3C0D1;
          color: #333;
          line-height: 60px;
        }
        
        .el-aside {
          
          color: #333;
          height: 100%;
        }
      </style>
      
      <script>
        export default {
            name: 'userFrm3',
          data() {
            
          },
          mounted() {
            this.sidebarItem = this.$route.name;
        },
        methods: {
            changeSidebar(path) {
                this.$router.replace(path);
            },
    
          },
        };
      </script>