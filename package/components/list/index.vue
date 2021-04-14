<template>
  <div class="mu-list" :style="{ width, height }">
    <!--头部-->
    <mu-head class="mu-list_header" :icon="icon" :icon-color="iconColor" :size="size_">
      <slot name="title">{{ title }}</slot>
      <template #toolbar>
        <!--工具栏插槽-->
        <slot name="toolbar" />
        <!--刷新按钮-->
        <mu-button v-if="!noRefresh" icon="refresh" />
        <!--全屏按钮-->
        <mu-button v-if="!noFullscreen" :icon="isFullscreen ? 'full-screen-exit' : 'full-screen'" @click="toggleFullscreen" />
      </template>
    </mu-head>
    <!--查询栏-->
    <div v-if="!noQuerybar" class="mu-list_querybar">
      <el-form :inline="true" :model="queryModel">
        <slot name="querybar" />
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--数据表格-->
    <div class="mu-list_body">
      <div class="mu-list_table">
        <el-table :data="rows" height="100%" :size="size_" border stripe highlight-current-row>
          <template v-for="col in cols_">
            <el-table-column v-if="col.show" :key="col.name" :prop="col.name" :label="col.label"> </el-table-column>
          </template>
        </el-table>
      </div>
    </div>
    <!--底部-->
    <mu-flex-row class="mu-list_footer" mode="right">
      <mu-flex-left class="mu-list_footer_left">
        <slot name="footer" />
      </mu-flex-left>
      <mu-flex-right>
        <mu-flex-row mode="left">
          <mu-flex-left class="mu-list_pagination">
            <!--分页信息-->
            <el-pagination background layout="prev, pager, next" :total="1000"> </el-pagination>
          </mu-flex-left>
          <mu-flex-right class="mu-list_setcolumn">
            <mu-dialog title="配置列信息"></mu-dialog>
            <!--配置列-->
            <el-popover placement="top-start" trigger="click" popper-class="mu-list_setcolumn_popper">
              <template #reference>
                <mu-button text="选择列" />
              </template>
              <mu-drag-sort v-model="cols_" handle=".mu-list_setcolumn_handle">
                <div v-for="col in cols_" :key="col.name" class="mu-list_setcolumn_item">
                  <div class="mu-list_setcolumn_handle">
                    <mu-icon name="drag" />
                  </div>
                  <div class="mu-list_setcolumn_checkbox">
                    <el-checkbox v-model="col.show" :label="col.name">{{ col.label }}</el-checkbox>
                  </div>
                </div>
              </mu-drag-sort>
            </el-popover>
          </mu-flex-right>
        </mu-flex-row>
      </mu-flex-right>
    </mu-flex-row>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import { useFullscreen } from '../../composables'
import { useStore } from 'vuex'
import { columnOptions } from './default'
import _ from 'lodash'
export default {
  name: 'List',
  props: {
    /** 查询参数模型 */
    queryModel: {
      type: Object,
      default: null,
    },
    /** 数据列 */
    cols: {
      type: Array,
      required: true,
    },
    /** 标题 */
    title: {
      type: String,
      default: '',
    },
    /** 图标 */
    icon: {
      type: String,
      default: 'list',
    },
    /**图标颜色 */
    iconColor: {
      type: String,
      default: '',
    },
    /** 不显示刷新按钮 */
    noRefresh: Boolean,
    /** 不显示全屏按钮 */
    noFullscreen: Boolean,
    /** 不显示查询栏 */
    noQuerybar: Boolean,
    /** 宽度 */
    width: {
      type: String,
      default: '100%',
    },
    /** 高度 */
    height: {
      type: String,
      default: '100%',
    },
    /** 尺寸 */
    size: {
      type: String,
      default: '',
    },
  },
  setup(props, ctx) {
    const store = useStore()
    const size_ = computed(() => props.size || store.state.app.account.skin.size)

    //全屏操作
    const { isFullscreen, openFullscreen, closeFullscreen, toggleFullscreen } = useFullscreen(ctx.emit)

    //处理列配置信息
    const cols_ = ref(props.cols.map(m => _.merge({}, columnOptions, m)))

    const rows = ref([])

    return {
      isFullscreen,
      openFullscreen,
      closeFullscreen,
      toggleFullscreen,
      rows,
      size_,
      cols_,
    }
  },
}
</script>
