<template>
  <div class="txtReader">
    <div class="title">txt文本阅读器</div>
    <div :class="hasContent ? 'has-content' : 'no-content'">
      <div class="file-content" id="file">暂无内容</div>
      <div class="file-select">
        <input type="file" id="fileInput" @change="() => change()" />
        <div class="file-info" v-show="hasContent">
          <div>文件名:{{ fileName }}</div>
          <div>文件大小:{{ fileSize }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'txtReader',
  data() {
    return {
      hasContent: false,
      fileName: '',
      fileSize: 0,
    }
  },
  mounted() {},
  methods: {
    change() {
      const fileInput = document.getElementById('fileInput')
      const fileDiv = document.getElementById('file')
      if (fileInput.value) {
        this.hasContent = true
        // 获取File引用:
        const file = fileInput.files[0]
        // 获取File信息:
        this.fileName = file.name
        this.fileSize = file.size
        // if (
        //   file.type !== 'image/jpeg' &&
        //   file.type !== 'image/png' &&
        //   file.type !== 'image/gif'
        // ) {
        //   // window.alert('不是有效的图片文件!');
        //   return;
        // }
        // 读取文件:
        const reader = new FileReader()
        reader.onload = function (e) {
          console.log(e)
          const data = e.target.result // 'data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...'
          fileDiv.innerText = data
        }
        // 以DataURL的形式读取文件:
        reader.readAsText(file, 'gb2312')
      }
    },
  },
}
</script>
<style lang="less" scoped>
.txtReader {
  font-size: 20px;
}
.no-content {
  display: flex;
}
.file-content {
  width: 70%;
  height: 95vh;
  overflow-x: hidden;
  overflow-y: auto;
}
.file-select {
  width: 25%;
  margin-left: 5%;
  position: fixed;
  top: 30px;
  right: 0;
  font-size: 16px;
}
</style>
