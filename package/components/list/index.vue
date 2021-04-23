<template>
  <div
    v-loading="loading"
    :class="class_"
    :style="{ width, height }"
    :element-loading-text="loadingText || loadingOptions.text"
    :element-loading-background="loadingBackground || loadingOptions.background"
    :element-loading-spinner="loadingSpinner || loadingOptions.spinner"
  >
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
      <el-form ref="queryFormRef" :inline="true" :model="queryModel">
        <slot name="querybar" />
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--数据表格-->
    <div class="mu-list_body">
      <div class="mu-list_table">
        <slot :rows="rows">
          <el-table :data="rows" height="100%" :size="size_" :row-key="rowKey" border stripe highlight-current-row>
            <!-- 多选 -->
            <el-table-column v-if="multiple" fixed="left" align="center" type="selection" width="55" />

            <!--渲染列-->
            <template v-for="col in cols_">
              <el-table-column
                v-if="col.show"
                :key="col.prop"
                :prop="col.prop"
                :label="col.label"
                :width="col.width"
                :min-width="col.minWidth"
                :fixed="col.fixed"
                :sortable="col.sortable"
                :formatter="col.formatter"
                :show-overflow-tooltip="col.showOverflowTooltip"
                :align="col.align"
                :header-align="col.headerAlign"
                :class-name="col.className"
                :label-class-name="col.labelClassName"
              >
              </el-table-column>
            </template>
          </el-table>
        </slot>
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
            <!--分页-->
            <el-pagination
              :page-size="page.size"
              :current-page="page.index"
              :small="pagination_.small"
              :background="pagination_.background"
              :page-sizes="pagination_.pageSizes"
              :layout="pagination_.layout"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
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
import { computed, reactive, ref } from 'vue'
import { useFullscreen } from '../../composables'
import { useStore } from 'vuex'
import { columnOptions, paginationOptions } from './default'
import _ from 'lodash'
export default {
  name: 'List',
  props: {
    /** 数据列 */
    cols: {
      type: Array,
      required: true,
    },
    /** 查询参数模型 */
    queryModel: {
      type: Object,
      default: null,
    },
    /** 查询操作 */
    queryAction: {
      type: Function,
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
    /** 对应ElementPlus中表格的row-key，默认id */
    rowKey: {
      type: String,
      default: 'id',
    },
    /** 分页配置 */
    pagination: {
      type: Object,
      default: null,
    },
    /** 多选 */
    multiple: Boolean,
    /** 加载动画文本 */
    loadingText: {
      type: String,
      default: '正在加载数据，请稍后...',
    },
    /** 加载动画背景色 */
    loadingBackground: {
      type: String,
      default: null,
    },
    /** 加载动画图标 */
    loadingSpinner: {
      type: String,
      default: null,
    },
    /** 不显示刷新按钮 */
    noRefresh: Boolean,
    /** 不显示全屏按钮 */
    noFullscreen: Boolean,
    /** 不显示查询栏 */
    noQuerybar: Boolean,
  },
  emits: ['size-change', 'current-change'],
  setup(props, ctx) {
    //全屏操作
    const { isFullscreen, openFullscreen, closeFullscreen, toggleFullscreen } = useFullscreen(ctx.emit)
    //加载动画配置
    const loadingOptions = MkhUI.config.component.loading

    const store = useStore()
    const size_ = computed(() => props.size || store.state.app.account.skin.size)
    const class_ = computed(() => {
      return ['mu-list', size_, isFullscreen.value ? 'is-fullscreen' : '']
    })
    const pagination_ = computed(() => Object.assign({}, paginationOptions, props.pagination || {}))

    //处理列配置信息
    const cols_ = ref(props.cols.map(m => _.merge({}, columnOptions, m)))

    //数据集
    const rows = ref([])
    //总数量
    const total = ref(0)
    //分页信息
    const page = reactive({ index: 1, size: 15 })
    //查询表单引用
    const queryFormRef = ref(null)
    //加载动画
    const loading = ref(false)

    //查询操作
    const query = () => {
      props.queryAction({ ...props.queryModel, page }).then(data => {
        rows.value = data.rows
        total.value = data.total
      })
    }

    //重置
    const reset = () => {
      queryFormRef.value.resetFields()
    }

    //处理页大小更改事件
    const handleSizeChange = size => {
      page.index = 1
      page.size = size
      query()
      ctx.emit('size-change', size)
    }

    //处理页码更改事件
    const handleCurrentChange = index => {
      page.index = index
      query()
      ctx.emit('current-change', index)
    }

    query()

    return {
      isFullscreen,
      openFullscreen,
      closeFullscreen,
      toggleFullscreen,
      loadingOptions,
      rows,
      total,
      page,
      queryFormRef,
      loading,
      size_,
      class_,
      cols_,
      query,
      reset,
      pagination_,
      handleSizeChange,
      handleCurrentChange,
    }
  },
}
</script>
