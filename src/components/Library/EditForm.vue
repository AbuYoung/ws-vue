<template>
  <div>
    <i
      class="el-icon-circle-plus-outline"
      @click="dialogFormVisible = true"/>
    <el-dialog
      :visible.sync="dialogFormVisible"
      title="添加/修改图书"
      @close="clear">
      <el-form
        ref="dataForm"
        v-model="form"
        style="text-align: left">
        <el-form-item
          :label-width="formLabelWidth"
          label="书名"
          prop="title">
          <el-input
            v-model="form.title"
            autocomplete="off"
            placeholder="不加《》"/>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="作者"
          prop="author">
          <el-input
            v-model="form.author"
            autocomplete="off"/>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="出版日期"
          prop="date">
          <el-input
            v-model="form.date"
            autocomplete="off"/>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="出版社"
          prop="press">
          <el-input
            v-model="form.press"
            autocomplete="off"/>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="封面"
          prop="cover">
          <el-input
            v-model="form.cover"
            auto-complete="off"
            placeholder="图片 URL"/>
          <img-upload
            ref="imgUpload"
            @onUpload="uploadImg"/>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="简介"
          prop="abs">
          <el-input
            v-model="form.abs"
            autocomplete="off"
            type="textarea"/>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="分类"
          prop="cid">
          <el-select
            v-model="form.category.id"
            placeholder="请选择分类">
            <el-option
              label="文学"
              value="1"/>
            <el-option
              label="流行"
              value="2"/>
            <el-option
              label="文化"
              value="3"/>
            <el-option
              label="生活"
              value="4"/>
            <el-option
              label="经管"
              value="5"/>
            <el-option
              label="科技"
              value="6"/>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="id"
          style="height: 0">
          <el-input
            v-model="form.id"
            autocomplete="off"
            type="hidden"/>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="onSubmit">确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ImgUpload from './ImgUpload'
import { updateBook } from '../../api/Library/book'

export default {
  name: 'EditForm',
  components: { ImgUpload },

  data() {
    return {
      dialogFormVisible: false,
      form: {
        id: '',
        title: '',
        author: '',
        date: '',
        press: '',
        cover: '',
        abs: '',
        category: {
          id: '',
          name: ''
        }
      },
      formLabelWidth: '120px'
    }
  },

  mounted() {
    /* eslint-disable */
    console.log('1')
    console.log(this.form)
  },

  methods: {
    uploadImg() {
      this.form.cover = this.$refs.imgUpload.url
    },
    clear() {
      this.form = {
        id: '',
        title: '',
        author: '',
        date: '',
        press: '',
        cover: '',
        abs: '',
        category: {}
      }
    },
    onSubmit() {
      updateBook(this.form.id, this.form.cover, this.form.title, this.form.author, this.form.date,
        this.form.press, this.form.abs, this.form.category).then(res => {
        if (res && res.status === 200) {
          this.dialogFormVisible = false
          this.$emit('onSubmit')
        }
      })
      // TODO Fix the problem of passing values from parent files being initialized
      /* this.form.id, this.form.cover, this.form.title, this.form.author, this.form.date,
        this.form.press, this.form.abs, this.form.category*/
    }
  }
}
</script>

<style scoped>
.el-icon-circle-plus-outline {
  margin: 50px 0 0 20px;
  font-size: 100px;
  float: left;
  cursor: pointer;
}
</style>
