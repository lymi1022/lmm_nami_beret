<style scoped>
.group {
  height: 40px;
  line-height: 40px;
  text-align: left;
  font-size: 12px;
}

.group .item-a {
  display: inline-block;
  padding: 0 20px;
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.group .item-b {
  /* display: inline-block; */
  padding: 20 0px;
}
.group .ellipsis {
  display: inline-block;
  width: 50px;
  overflow: hidden;
  white-space: nowrap;
}
.group .item-b-icon {
  position: relative;
  border: 1px solid #999;
  padding: 0 20px;
  cursor: pointer;
  right: 0;
}
.group .item-b-item {
  position: absolute;
  border: 1px solid #999;
  padding: 5px 10px;
}
</style>

<template>
  <div class="group" ref="groupWrap">
    <div class="item-a" v-for="item in listA" :key="item.id">
      {{item.name}}
    </div>
    <div class="ellipsis" v-if="listB.length > 0">
      <div class="item-b-icon" @click="handleIconClick">...</div>
      <div class="item-b-item" v-if="showIcon">
        <div class="item-b" v-for="item in listB" :key="item.id">
          {{item.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let groupList = [
  {
    name: "未分组",
    id: 0
  },
  {
    name: "分组一1",
    id: 1
  },
  {
    name: "分组二22",
    id: 2
  },
  {
    name: "分组三333",
    id: 3
  },
  {
    name: "分组四4444",
    id: 4
  },
  {
    name: "分组五55555眼保健操现在开始",
    id: 5
  },
  {
    name: "分组六66666",
    id: 6
  },
  {
    name: "分组七777777",
    id: 7
  },
  {
    name: "分组八8888888",
    id: 8
  },
  {
    name: "分组九99999999",
    id: 9
  },
  {
    name: "分组十10",
    id: 10
  },
  {
    name: "分组十一11",
    id: 11
  }
];
export default {
  data() {
    return {
      groupList,
      showIcon: false,
      availableWidth1: 0
    };
  },
  mounted() {
    this.updateGroup();
    window.addEventListener("resize", this.updateGroup);
  },
  computed: {
    listA() {
      return this.groupList.slice(0, this.displayGroupNum());
    },
    listB() {
      return this.groupList.slice(this.displayGroupNum());
    }
  },
  methods: {
    getChartsWidth(chart, fontSize) {
      const $dom = document.createElement('div')
      const $text = document.createTextNode(chart)
      $dom.setAttribute('style', `position: fixed;left:-999em;font-size: ${fontSize}px`)
      const $body = document.querySelector('body')
      $dom.appendChild($text)
      $body.appendChild($dom)
      let domWidth = $dom.clientWidth
      $body.removeChild($dom)
      return domWidth
    },
    displayGroupNum() {
      let maxTextItemWidth = 100
      const groupWidth = this.groupList.map(i => {
        return this.getChartsWidth(i.name, 12)
      }).map(width => {
        return (width >  maxTextItemWidth ? maxTextItemWidth : width) + 40
      })

      const sum = num => {
        return groupWidth.slice(0, num).reduce((total, w) => {
          return total + w
        }, 0)
      }
      
      const getFreeWidth = num => {
        const w1 = sum(num)
        if (w1 > this.availableWidth1) {
          return -1
        }
        if (num === this.groupList.length) {
          return this.availableWidth1 - w1 - 55
        } else {
          return this.availableWidth1 - w1
        }
      }

      const results = this.groupList.map((i, index) => {
        const num = index + 1
        return {
          num,
          rest: getFreeWidth(num)
        }
      }).filter(i => i.rest > 0)
      .sort((a, b) => a.rest - b.rest)

      return results.length === 0 ? 0 : results[0].num
    },
    updateGroup() {
      this.displayGroupNum();
      this.availableWidth1 = this.$refs.groupWrap.clientWidth - 50;
    },
    handleIconClick() {
      this.showIcon = !this.showIcon;
    }
  }
};
</script>