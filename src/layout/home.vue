<template>
  <el-container class="home__container s-full-h" flex="dir:top">
    <el-header class="home__header s-border-b">
      <h1 class="ho-title s-text-center">Life is a never - ending road, I walk, walk, keep walking.</h1>
    </el-header>

    <el-main class="home__content" flex-box="1" flex="dir:left">
      <div class="ho-aside s-border-r" :class="{'ho-aside--mini':!isShowMenu}">
        <h3 class="ho-title">
          <span v-show="isShowMenu" @click="handleShowMenu" class="s-cp s-pd-l-10">MENU</span>
          <i
            v-show="isShowMenu"
            class="el-icon-s-fold s-cp s-fs-20"
            @click="handleShowMenu('close')"
          ></i>
          <i
            v-show="!isShowMenu"
            class="el-icon-s-unfold s-cp s-fs-20"
            @click="handleShowMenu('open')"
          ></i>
        </h3>

        <template>
          <el-tree
            v-show="isShowMenu"
            :data="menus"
            :props="defaultProps"
            @node-click="handleNodeClick"
          >
            <span slot-scope="{node}">
              <span class="s-mg-r-10">
                <i class="el-icon-s-order"></i>
              </span>
              <span>{{node.label}}</span>
            </span>
          </el-tree>
        </template>
      </div>

      <div
        class="ho-content"
        :class="{'ho-content--mini':!isShowMenu,'ho-content--bg':isHome}"
        flex-box="1"
        flex="dir:top"
      >
        <div class="ho-breadcrumb" v-show="!isHome">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{breadcrumbs[0]?breadcrumbs[0]:''}}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="breadcrumbs[1]">{{breadcrumbs[1]}}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="breadcrumbs[2]">{{breadcrumbs[2]}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div flex-box="1" class="main-content">
          <router-view></router-view>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      isShowMenu: true,
      img: require('@/assets/images/bg.png')
    }
  },
  computed: {
    ...mapGetters('yuSys/menu', ['menus', 'isHome', 'breadcrumbs'])
  },
  props: {},
  methods: {
    handleNodeClick(data) {
      if (data.path) {
        // router.push 重复点击 'bug'
        this.$router.push(data.path, () => {})
        // this.$router.push(data.path).catch(err => {})
      }
    },
    /**
     * @description 侧边栏
     */
    handleShowMenu(type) {
      if (type === 'open') {
        this.isShowMenu = true
      } else if (type === 'close') {
        this.isShowMenu = false
      } else {
        this.isShowMenu = !this.isShowMenu
      }
    }
  }
}
</script>


<style lang="scss">
// Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif
$border-line: 1px solid #ddd;
$nav-height: 80px;
.home__container {
  .el-header.home__header {
    height: $nav-height !important;
  }
  .el-main.home__content {
    display: flex;
    .ho-content {
      .main-content {
        & > div {
          height: 100%;
        }
      }
      .ho-breadcrumb {
        .el-breadcrumb {
          .el-breadcrumb__item {
            .el-breadcrumb__inner {
              color: rgb(27, 26, 26);
            }
            .el-breadcrumb__separator {
              color: rgb(233, 227, 227);
            }
          }
        }
      }
    }
  }
}
</style>

<style scoped lang="scss">
$nav-height: 80px;
.home__container {
  width: 100%;
  .home__header {
    font-family: 'Gayathri', sans-serif;
    padding: 0;
    &::before {
      display: block;
      content: '';
      z-index: -1;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      min-width: 1200px;
      height: $nav-height;
      background-image: url('../assets/images/img_flwr.gif');
      background-position: right 20px bottom 0px;
      background-repeat: no-repeat;
      background-size: 86px;
    }
    &::after {
      display: block;
      content: '';
      z-index: -2;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      min-width: 1200px;
      height: $nav-height;
      background-image: url('../assets/images/paper.gif');
      background-position: right bottom, left top;
      background-repeat: repeat;
    }
    .ho-title {
      height: 100%;
      line-height: $nav-height;
      box-sizing: border-box;
      padding-top: 15px;
      padding-right: 120px;
      margin: 0;
      z-index: 1;
    }
  }
  .home__content {
    .ho-aside {
      width: 200px;
      min-height: 300px;
      .ho-title {
        font-family: consolas;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0;
        margin-right: 20px;
      }
    }
    .ho-aside--mini {
      width: 20px !important;
      .ho-title {
        margin-right: 0;
      }
    }
    .ho-content {
      width: calc(100% - 201px);
      padding: 0 30px;
      box-sizing: border-box;
      overflow: hidden;
      .ho-breadcrumb {
        // background: linear-gradient(-90deg, #29bdd9 0%, #276ace 100%);
        background: #56ccf2; /* fallback for old browsers */
        background: -webkit-linear-gradient(
          to right,
          #2f80ed,
          #56ccf2,
          #ffffff
        ); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(
          to right,
          #2f80ed,
          #56ccf2,
          #ffffff
        ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

        padding: 10px;
        margin-bottom: 10px;
        border-radius: 4px;
      }
    }
    .ho-content--mini {
      width: calc(100% - 41px);
    }
    .ho-content--bg {
      background-image: url('../assets/images/bg.png');
      background-size: cover;
    }
  }
}
</style>
