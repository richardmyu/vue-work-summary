<template>
  <div flex="dir:left main:left">
    <el-popover
      v-for="item of imgList"
      :key="item.id"
      placement="top-start"
      width="400"
      trigger="click"
    >
      <img-item
        style="height: 400px; width: 400px;"
        :src="item.url"
        :text="item.sourceText"
        :isLocal="item.sourceType===0?true:false"
        :level="2"
        @remove="handleRemove(item)"
      />
      <img-item
        slot="reference"
        style="height: 200px; width: 200px;margin:0 30px 20px 0;"
        :src="item.url"
        :text="item.sourceText"
        :isLocal="item.sourceType===0?true:false"
      />
    </el-popover>
  </div>
</template>
<script>
import imgItem from './img-item'
export default {
  components: {
    imgItem
  },
  data() {
    return {
      imgList: []
    }
  },
  methods: {
    handleRemove(val) {
      this.imgList.filter((item, index) => {
        if (val.id === item.id) {
          this.imgList.splice(index, 1)
        }
      })
    }
  },
  created() {
    this.imgList = [
      {
        id: 1,
        name: 'hdha8989',
        sourceText: '本地',
        sourceType: 0,
        url:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575478559031&di=8b0850cdcaa9a0c6a08aa184031f5ba6&imgtype=0&src=http%3A%2F%2Fpic138.nipic.com%2Ffile%2F20170822%2F9413594_112851512035_2.jpg'
      },
      {
        id: 2,
        name: 'h45a8jk9',
        sourceText: 'URL',
        sourceType: 1,
        url:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575478559031&di=9e198cd14257e64f285e92db85bc0711&imgtype=0&src=http%3A%2F%2Fpic17.nipic.com%2F20111022%2F8659870_205527569166_2.jpg'
      },
      {
        id: 3,
        name: 'h45a8jk9',
        sourceText: 'URL',
        sourceType: 1,
        url: 'http://pic59.nipic.com/file/20150122/4329275_100353572000_2.jpg'
      },
      {
        id: 4,
        name: 'h45a8jk9',
        sourceText: 'URL',
        sourceType: 1,
        url: 'http://pic15.nipic.com/20110713/2707401_203649924000_2.jpg'
      },
      {
        id: 5,
        name: 'h45a8jk9',
        sourceText: 'URL',
        sourceType: 1,
        url: 'http://pic45.nipic.com/20140811/10416317_045837081000_2.jpg'
      }
    ]
  }
}
</script>
