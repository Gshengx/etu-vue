<template>
  <div>
    <div class="title">js实现-扫雷小游戏</div>
    <div class="landMine">
      <table>
        <tr v-for="(item, index) in initArr" :key="index">
          <td
            v-for="(childItem, childIndex) in item"
            :key="childIndex"
            :id="`${index}${childIndex}`"
            class="unKnow"
            @click="clickLandmine(childItem, index, childIndex)"
          >
            {{ childItem }}
          </td>
        </tr>
      </table>
      <div class="option">
        <div class="params">
          <div>设置参数：</div>
          <div>
            <span>行(n):</span>
            <input id="row" :value="n" />
          </div>
          <div>
            <span>列(m):</span>
            <input id="column" :value="m" />
          </div>
          <div>
            <span>地雷数量:</span>
            <input id="num" :value="num" />
          </div>
          <div>
            <button @click="newGame()">生成</button>
            <button @click="rezise()">重置</button>
          </div>
          <div class="count">计步器:{{ count }}</div>
        </div>
        <div class="hasFail" id="message" v-show="isLandmine"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'landMine',
  data() {
    return {
      isLandmine: false,
      initArr: [],
      n: 9,
      m: 9,
      num: 10,
      count: 0,
    }
  },
  components: {},
  async mounted() {
    await this.initLandmine()
    await this.addLandmine()
    await this.setNum()
  },
  computed: {},
  methods: {
    initLandmine() {
      const arr = []
      // 生成初始化二维数组
      for (let i = 0; i < this.n; i++) {
        arr[i] = []
        for (let j = 0; j < this.m; j++) {
          arr[i][j] = 0
        }
      }
      this.initArr = arr
    },
    addLandmine() {
      for (let lm = 0; lm < this.num; lm++) {
        this.setLandmine()
      }
    },
    async setLandmine() {
      const x = parseInt(Math.random() * this.n, 10)
      const y = parseInt(Math.random() * this.m, 10)
      if (this.initArr[x][y] !== -1) {
        const newArr = []
        for (let i = 0; i < this.n; i++) {
          newArr[i] = []
          for (let j = 0; j < this.m; j++) {
            if (i === x && j === y) {
              newArr[i][j] = -1
            } else {
              newArr[i][j] = this.initArr[i][j]
            }
          }
        }
        this.initArr = newArr
      } else {
        await this.setLandmine()
      }
    },
    setNum() {
      const newArr = []
      for (let i = 0; i < this.n; i++) {
        newArr[i] = []
        for (let j = 0; j < this.m; j++) {
          newArr[i][j] = this.addNum(i, j)
        }
      }
      this.initArr = newArr
    },
    addNum(x, y) {
      let num = 0
      if (this.initArr[x][y] !== -1) {
        if (x - 1 >= 0) {
          if (y - 1 >= 0) {
            num = this.initArr[x - 1][y - 1] === -1 ? ++num : num
          }
          if (y + 1 < this.m) {
            num = this.initArr[x - 1][y + 1] === -1 ? ++num : num
          }
          num = this.initArr[x - 1][y] === -1 ? ++num : num
        }
        if (x + 1 < this.n) {
          if (y - 1 >= 0) {
            num = this.initArr[x + 1][y - 1] === -1 ? ++num : num
          }
          if (y + 1 < this.m) {
            num = this.initArr[x + 1][y + 1] === -1 ? ++num : num
          }
          num = this.initArr[x + 1][y] === -1 ? ++num : num
        }
        if (y - 1 >= 0) {
          num = this.initArr[x][y - 1] === -1 ? ++num : num
        }
        if (y + 1 < this.m) {
          num = this.initArr[x][y + 1] === -1 ? ++num : num
        }
      } else {
        num = -1
      }
      return num
    },
    async clickLandmine(item, x, y) {
      if (this.isLandmine) {
        this.$emit('游戏已结束')
      } else if (item === -1) {
        document.getElementById(`${x}${y}`).className = 'isLandmine'
        document.getElementById('message').innerText = '踩到地雷啦！'
        this.isLandmine = true
        this.count += 1
      } else if (item === 0) {
        this.count += 1
        await this.isEmpty(x, y)
        if (document.getElementsByClassName('unKnow').length === this.num) {
          this.isLandmine = true
          document.getElementById('message').innerText = '找到全部地雷啦！'
        }
      } else {
        this.count += 1
        document.getElementById(`${x}${y}`).className = 'isNum'
        console.log(document.getElementsByClassName('unKnow').length)
        if (document.getElementsByClassName('unKnow').length === this.num) {
          this.isLandmine = true
          document.getElementById('message').innerText = '找到全部地雷啦！'
        }
      }
    },
    isEmpty(x, y) {
      document.getElementById(`${x}${y}`).className = 'isEmpty'
      if (x - 1 >= 0) {
        if (y - 1 >= 0) {
          if (
            document.getElementById(`${x - 1}${y - 1}`).innerText === '0' &&
            document.getElementById(`${x - 1}${y - 1}`).className === 'unKnow'
          ) {
            this.isEmpty(x - 1, y - 1)
          } else if (document.getElementById(`${x - 1}${y - 1}`).innerText === '0') {
            document.getElementById(`${x - 1}${y - 1}`).className = 'isEmpty'
          } else {
            document.getElementById(`${x - 1}${y - 1}`).className = 'isNum'
          }
        }
        if (y + 1 < this.m) {
          if (
            document.getElementById(`${x - 1}${y + 1}`).innerText === '0' &&
            document.getElementById(`${x - 1}${y + 1}`).className === 'unKnow'
          ) {
            this.isEmpty(x - 1, y + 1)
          } else if (document.getElementById(`${x - 1}${y + 1}`).innerText === '0') {
            document.getElementById(`${x - 1}${y + 1}`).className = 'isEmpty'
          } else {
            document.getElementById(`${x - 1}${y + 1}`).className = 'isNum'
          }
        }
        if (
          document.getElementById(`${x - 1}${y}`).innerText === '0' &&
          document.getElementById(`${x - 1}${y}`).className === 'unKnow'
        ) {
          this.isEmpty(x - 1, y)
        } else if (document.getElementById(`${x - 1}${y}`).innerText === '0') {
          document.getElementById(`${x - 1}${y}`).className = 'isEmpty'
        } else {
          document.getElementById(`${x - 1}${y}`).className = 'isNum'
        }
      }
      if (x + 1 < this.n) {
        if (y - 1 >= 0) {
          if (
            document.getElementById(`${x + 1}${y - 1}`).innerText === '0' &&
            document.getElementById(`${x + 1}${y - 1}`).className === 'unKnow'
          ) {
            this.isEmpty(x + 1, y - 1)
          } else if (document.getElementById(`${x + 1}${y - 1}`).innerText === '0') {
            document.getElementById(`${x + 1}${y - 1}`).className = 'isEmpty'
          } else {
            document.getElementById(`${x + 1}${y - 1}`).className = 'isNum'
          }
        }
        if (y + 1 < this.m) {
          if (
            document.getElementById(`${x + 1}${y + 1}`).innerText === '0' &&
            document.getElementById(`${x + 1}${y + 1}`).className === 'unKnow'
          ) {
            this.isEmpty(x + 1, y + 1)
          } else if (document.getElementById(`${x + 1}${y + 1}`).innerText === '0') {
            document.getElementById(`${x + 1}${y + 1}`).className = 'isEmpty'
          } else {
            document.getElementById(`${x + 1}${y + 1}`).className = 'isNum'
          }
        }
        if (
          document.getElementById(`${x + 1}${y}`).innerText === '0' &&
          document.getElementById(`${x + 1}${y}`).className === 'unKnow'
        ) {
          this.isEmpty(x + 1, y)
        } else if (document.getElementById(`${x + 1}${y}`).innerText === '0') {
          document.getElementById(`${x + 1}${y}`).className = 'isEmpty'
        } else {
          document.getElementById(`${x + 1}${y}`).className = 'isNum'
        }
      }
      if (y - 1 >= 0) {
        if (
          document.getElementById(`${x}${y - 1}`).innerText === '0' &&
          document.getElementById(`${x}${y - 1}`).className === 'unKnow'
        ) {
          this.isEmpty(x, y - 1)
        } else if (document.getElementById(`${x}${y - 1}`).innerText === '0') {
          document.getElementById(`${x}${y - 1}`).className = 'isEmpty'
        } else {
          document.getElementById(`${x}${y - 1}`).className = 'isNum'
        }
      }
      if (y + 1 < this.m) {
        if (
          document.getElementById(`${x}${y + 1}`).innerText === '0' &&
          document.getElementById(`${x}${y + 1}`).className === 'unKnow'
        ) {
          this.isEmpty(x, y + 1)
        } else if (document.getElementById(`${x}${y + 1}`).innerText === '0') {
          document.getElementById(`${x}${y + 1}`).className = 'isEmpty'
        } else {
          document.getElementById(`${x}${y + 1}`).className = 'isNum'
        }
      }
    },
    async rezise() {
      await this.initLandmine()
      await this.addLandmine()
      await this.setNum()
      this.isLandmine = false
      this.count = 0
      for (let i = 0; i < this.n; i++) {
        for (let j = 0; j < this.m; j++) {
          document.getElementById(`${i}${j}`).className = 'unKnow'
        }
      }
    },
    async newGame() {
      const row = document.getElementById('row')
      const column = document.getElementById('column')
      const num = document.getElementById('num')
      if (isNaN(row.value)) {
        this.isLandmine = true
        document.getElementById('message').innerText = '行请输入数字'
      } else if (isNaN(column.value)) {
        this.isLandmine = true
        document.getElementById('message').innerText = '列请输入数字'
      } else if (isNaN(num.value)) {
        this.isLandmine = true
        document.getElementById('message').innerText = '地雷数请输入数字'
      } else if (Number(row.value) * Number(column.value) < Number(num.value)) {
        this.isLandmine = true
        document.getElementById('message').innerText = '地雷数请不能大于格子数'
      } else {
        this.n = Number(row.value)
        this.m = Number(column.value)
        this.num = Number(num.value)
        await this.initLandmine()
        await this.addLandmine()
        await this.setNum()
        this.isLandmine = false
        for (let i = 0; i < this.n; i++) {
          for (let j = 0; j < this.m; j++) {
            this.isLandmine = false
            this.count = 0
            document.getElementById(`${i}${j}`).className = 'unKnow'
          }
        }
      }
    },
  },
}
</script>
<style>
body {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.title {
  font-size: 24px;
  margin-bottom: 20px;
}
.landMine {
  display: flex;
  justify-content: center;
}
td {
  border: 1px solid #000;
  width: 70px;
  height: 70px;
}
.isLandmine {
  color: red;
  background-color: red;
}
.isNum {
  color: black;
  background: #fff;
}
.isEmpty {
  color: #fff;
  background: #fff;
}
.hasFail {
  color: red;
}
.unKnow {
  color: #ddd;
  background: #ddd;
}
.option {
  font-size: 16px;
}
.params {
  width: 265px;
  height: 250px;
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  margin-left: 20px;
}
.params > div {
  width: 100%;
}
</style>
