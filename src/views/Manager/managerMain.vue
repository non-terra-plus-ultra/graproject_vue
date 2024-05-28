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
       
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-message"></i>所有用户</template>
              <el-menu-item-group>
               
                <el-menu-item index="userManager" >用户信息</el-menu-item>
               
              </el-menu-item-group>
              </el-submenu>
            
             
          </el-menu>
        </el-aside>
      
          <el-main style="height:600px;margin: 0%;padding: 0%;" >
        
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