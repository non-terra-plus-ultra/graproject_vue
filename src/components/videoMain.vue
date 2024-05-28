
     <template>  
      <div>  
        <div class="controls">
        <el-button @click="startCamera">打开摄像头</el-button>
        <el-button @click="closeCamera">关闭摄像头</el-button> 
        </div>
        <div class="video-container">
        <img :src="videoFeedUrl" alt="Video Stream" style="display: none;" id="videos"/>
        </div>
      </div>  
    </template>  
    <style>
    .controls {
      margin-bottom: 10px;
      margin-top:10px;
      margin-left: 10px;
      
    }
    .video-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .video-container img {
      max-width: 100%;
      max-height: 100%;
    }
  </style>
    <script>  
    export default {  
      data() {  
        return {  
          // 假设你有一个方法来获取视频流的URL  
          // 这应该是Flask后端提供的视频流路由  
          videoFeedUrl: 'http://127.0.0.1:8801//video_feed',
        };  
      },  
      methods:{
        startCamera(){
          var img = document.getElementById('videos');  
          img.style.display = 'block'
        },
        closeCamera(){
          var img = document.getElementById('videos');  
          img.style.display = 'none'
        }
      }
      // 你可能还想在这里添加其他逻辑，比如连接状态、错误处理等  
      // ...  
    };  
    </script>  
      