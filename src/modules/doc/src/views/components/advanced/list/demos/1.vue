<template>
  <div style="height: 400px">
    <mu-list title="诗词列表" :model="model" :cols="cols">
      <template #querybar>
        <el-form-item label="作者">
          <el-input v-model="model.author"></el-input>
        </el-form-item>
        <el-form-item label="朝代">
          <el-select v-model="model.dynasty">
            <el-option label="唐朝" value="1"></el-option>
            <el-option label="宋朝" value="2"></el-option>
            <el-option label="元朝" value="3"></el-option>
            <el-option label="明朝" value="4"></el-option>
            <el-option label="清朝" value="5"></el-option>
          </el-select>
        </el-form-item>
      </template>
    </mu-list>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'
export default {
  setup() {
    const model = reactive({ user: '', dynasty: '' })
    const cols = ref([
      { name: 'id', label: '序号' },
      { name: 'name', label: '名称' },
      { name: 'author', label: '作者' },
      { name: 'dynasty', label: '朝代' },
      { name: 'type', label: '类型' },
      { name: 'id', label: '序号' },
      { name: 'name', label: '名称' },
      { name: 'author', label: '作者' },
      { name: 'dynasty', label: '朝代' },
      { name: 'type', label: '类型' },
      { name: 'id', label: '序号' },
      { name: 'name', label: '名称' },
      { name: 'author', label: '作者' },
      { name: 'dynasty', label: '朝代' },
      { name: 'type', label: '类型' },
      { name: 'id', label: '序号' },
      { name: 'name', label: '名称' },
      { name: 'author', label: '作者' },
      { name: 'dynasty', label: '朝代' },
      { name: 'type', label: '类型' },
      { name: 'id', label: '序号' },
      { name: 'name', label: '名称' },
      { name: 'author', label: '作者' },
      { name: 'dynasty', label: '朝代' },
      { name: 'type', label: '类型' },
    ])
    return {
      model,
      cols,
    }
  },
}
</script>
