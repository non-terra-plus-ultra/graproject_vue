<template>

    <el-container style="height: 500x; border: 1px solid #eee">
        <el-header style="font-size: 20px ;background-color:#c1d8ed">
                <el-text style="color: #706875;font-size: 19px;font-weight: bold;">异物检测系统</el-text>
              </el-header>
        <el-container style="width: 100%;">
          <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu :default-openeds="['1','2','3','4','5']" @select="changeSidebar">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>历史记录</template>
              <el-menu-item-group>
               
                <el-menu-item index="showAll" >查看异物检测记录</el-menu-item>
                <el-menu-item index="showSegment" >查看覆冰检测记录</el-menu-item>
              </el-menu-item-group>
              <!-- <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项4-1</el-menu-item>
              </el-submenu> -->
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i>统计图</template>
              <el-menu-item-group>
               
                <el-menu-item index="statistics" >查看异物检测统计图</el-menu-item>
                <el-menu-item index="statisticsSegment" >查看覆冰检测统计图</el-menu-item>
              </el-menu-item-group>
              <!-- <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项4-1</el-menu-item>
              </el-submenu> -->
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-menu"></i>预测管理</template>
              <el-menu-item-group>
                <el-menu-item index="detect">异物检测</el-menu-item>
                
                <el-menu-item index="segment">覆冰预测</el-menu-item>
                
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-loading"></i>用户信息管理</template>
              <el-menu-item-group>
                <el-menu-item index="userInfo">查看个人信息</el-menu-item>
                
                
                
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-loading"></i>终端检测</template>
              <el-menu-item-group>
                <el-menu-item index="videoMain">摄像头模拟</el-menu-item>
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