<template>
  <div style="height: 400px">
    <mu-list title="诗词列表" :cols="cols" :query-action="query" :query-model="model" multiple>
      <template #querybar>
        <el-form-item label="名称：">
          <el-input v-model="model.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="作者：">
          <el-input v-model="model.author" clearable></el-input>
        </el-form-item>
        <el-form-item label="朝代：">
          <el-select v-model="model.dynasty" clearable>
            <el-option label="唐代" value="唐代"></el-option>
            <el-option label="宋代" value="宋代"></el-option>
            <el-option label="元代" value="元代"></el-option>
            <el-option label="明代" value="明代"></el-option>
            <el-option label="清代" value="清代"></el-option>
          </el-select>
        </el-form-item>
      </template>
    </mu-list>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'
import { query } from './api'
export default {
  setup() {
    const model = reactive({ name: '', author: '', dynasty: '' })
    const cols = ref([
      { prop: 'id', label: '编号', width: '55', show: false },
      { prop: 'name', label: '名称' },
      { prop: 'author', label: '作者' },
      { prop: 'dynasty', label: '代代' },
      { prop: 'type', label: '类型' },
    ])

    return {
      model,
      cols,
      query,
    }
  },
}
</script>
