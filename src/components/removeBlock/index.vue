<template>
  <div class="removeBlock">
    <div class="game">
      <div class="x" v-for="(i, ind) in initArr" :key="'x-' + ind">
        <div
          :class="`y ${ind === click.x && index === click.y ? 'selected' : ''}`"
          v-for="(j, index) in i"
          :key="'y-' + index"
        >
          <div class="block" @click="handleClick(ind, index)" v-if="j.animate">
            <icon-font :name="j.animate" :style="{ color: j.color }" v-if="j.animate"></icon-font>
          </div>
        </div>
      </div>
    </div>
    <div class="score">
      <div>
        当前积分：<span>{{ score }}</span>
      </div>
      <div>
        <span>规则：</span>
        <div>1. 消除一个方块，获得10积分</div>
        <div>2. 横向或纵向有三个及以上相同动物相连时即可消除</div>
      </div>
      <button @click="init" class="btn">重置游戏</button>
      <div class="hasFail" id="message" v-show="result"></div>
    </div>
  </div>
</template>
<script>
import IconFont from './icon/index.vue'
export default {
  components: {
    IconFont,
  },
  data() {
    return {
      animate: [
        'yu',
        'mao',
        'gou',
        'woniu',
        'tuzi',
        'niao',
        'gezi',
        'kunchong',
        'ying',
        'ying1',
        'haitun',
        'songshu',
        'lu',
        'changjinglu',
        'xiniu',
        'luotuo',
        'daxiang',
        'xiong',
      ],
      block: 0,
      defaultNum: 5,
      initArr: [],
      click: { x: null, y: null },
      score: 0,
      result: false,
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.result = false
      let block = Math.round(Math.random() * 10)
      this.block = block > 2 ? block : 3
      let initAnima = JSON.parse(JSON.stringify(this.animate))
      let select = []
      for (let i = 0; i < this.defaultNum; i++) {
        let round = Math.floor(Math.random() * initAnima.length)
        select.push({ animate: initAnima[round], color: this.getRandomColor() })
        initAnima.splice(round, 1)
      }
      const arr = []
      // 生成初始化二维数组
      for (let i = 0; i < this.block; i++) {
        arr[i] = []
        for (let j = 0; j < this.block; j++) {
          arr[i][j] = select[Math.floor(Math.random() * this.defaultNum)]
        }
      }
      this.initArr = arr
    },
    handleClick(x, y) {
      if (this.click.x) {
        if (this.click.x === x && this.click.y === y) return
        let old = this.initArr[this.click.x][this.click.y]
        this.initArr[this.click.x][this.click.y] = this.initArr[x][y]
        this.initArr[x][y] = old
        this.click.x = null
        this.click.y = null
        this.$nextTick(() => {
          setTimeout(() => {
            this.getRemove()
          }, 500)
        })
      } else {
        this.click.x = x
        this.click.y = y
      }
    },
    getRemove() {
      let tArr = JSON.parse(JSON.stringify(this.initArr))
      let score = 0
      let hasRemove = false
      // 消除
      for (let x = 0; x < this.block; x++) {
        for (let y = 0; y < this.block; y++) {
          if (tArr[x][y].animate) {
            let start = tArr[x][y].animate
            if (this.block - x > 2 && start === tArr[x + 1][y].animate && start === tArr[x + 2][y].animate) {
              let flag = true
              if (this.block - 1 > x + 2) {
                for (let i = x + 3; i < this.block; i++) {
                  if (tArr[i][y].animate === start && flag) {
                    tArr[i][y].remove = true
                    flag = true
                  } else {
                    flag = false
                  }
                }
              }
              tArr[x][y].remove = tArr[x + 1][y].remove = tArr[x + 2][y].remove = true
            }
            if (this.block - y > 2 && start === tArr[x][y + 1].animate && start === tArr[x][y + 2].animate) {
              let flag = true
              if (this.block - 1 > y + 2) {
                for (let i = y + 3; i < this.block; i++) {
                  if (tArr[x][i].animate === start && flag) {
                    tArr[x][i].remove = true
                    flag = true
                  } else {
                    flag = false
                  }
                }
              }
              tArr[x][y].remove = tArr[x][y + 1].remove = tArr[x][y + 2].remove = true
            }
          }
        }
      }
      for (let x = this.block - 1; x > -1; x--) {
        for (let y = this.block - 1; y > -1; y--) {
          if (tArr[x][y].remove) {
            hasRemove = true
            tArr[x][y] = {
              color: null,
              animate: null,
            }
          }
        }
      }
      // 排序
      for (let x = this.block - 1; x > -1; x--) {
        for (let y = this.block - 1; y > -1; y--) {
          if (!tArr[x][y].animate) {
            let i = x - 1
            while (i > -1) {
              if (tArr[i][y].animate) {
                tArr[x][y] = tArr[i][y]
                tArr[i][y] = {
                  color: null,
                  animate: null,
                }
                i = -1
              }
              i--
            }
          }
        }
      }
      this.initArr = tArr

      if (hasRemove) {
        this.getRemove()
        return
      }
      // 得分
      let annimate = {}
      for (let x = 0; x < this.block; x++) {
        for (let y = 0; y < this.block; y++) {
          if (!tArr[x][y].animate) {
            score += 1
          } else {
            annimate[tArr[x][y].animate] = annimate[tArr[x][y].animate] ? annimate[tArr[x][y].animate] + 1 : 1
          }
        }
      }
      this.score = score * 10

      if (Object.values(annimate).every((i) => i === 0)) {
        this.result = true
        document.getElementById('message').innerText = '太棒了！所有方块都已消除！'
      } else if (Object.values(annimate).every((i) => i < 3)) {
        this.result = true
        document.getElementById('message').innerText = '真遗憾！没有可以消除的方块了！'
      }
    },
    getRandomColor() {
      return '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
    },
  },
}
</script>
<style lang="less" scoped>
.removeBlock {
  display: flex;
  padding: 24px;
  .game {
    width: 60%;
  }
  .score {
    width: 40%;
  }
}
.x {
  display: flex;
  .y {
    border: 1px solid #ddd;
    width: 64px;
    height: 64px;
  }
  .selected {
    border: 1px solid #ff0000;
  }
  .hasFail {
    color: red;
  }
  .block {
    cursor: pointer;
    position: relative;
    width: 64px;
    height: 64px;
  }
  .block:hover {
    > span {
      position: absolute;
      font-size: 70px;
      top: -8px;
      left: -4px;
    }
  }
}
</style>
