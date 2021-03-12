<template>
  <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <switch/>
      <SideMenu
        ref="sideMenu"
        @indexSelect="listByCategory"/>
    </el-aside>
    <el-main>
      <books
        ref="booksArea"
        class="books-area"/>
    </el-main>
  </el-container>
</template>

<script>
import SideMenu from './SideMenu'
import Books from './Books'

export default {
  name: 'AppLibrary',
  components: { Books, SideMenu },
  methods: {
    listByCategory() {
      const _this = this
      const cid = this.$refs.sideMenu.cid
      const url = 'categories/' + cid + '/books'
      this.$axios.get(url).then(resp => {
        if (resp && resp.status === 200) {
          _this.$refs.booksArea.books = resp.data
        }
      })
    }
  }
}
</script>

<style scoped>
.books-area {
  width: 990px;
  margin-left: auto;
  margin-right: auto;
}
</style>
