<template>
  <div>
    <el-row style="height: 840px;">
      <search-bar
        ref="searchBar"
        @onSearch="searchResult"/>
      <el-tooltip
        v-for="item in books.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        :key="item.id"
        effect="dark"
        placement="right">
        <p
          slot="content"
          style="font-size: 14px;margin-bottom: 6px;">{{ item.title }}</p>
        <p
          slot="content"
          style="font-size: 13px;margin-bottom: 6px">
          <span>{{ item.author }}</span> /
          <span>{{ item.date }}</span> /
          <span>{{ item.press }}</span>
        </p>
        <p
          slot="content"
          style="width: 300px"
          class="abstract">{{ item.abs }}</p>
        <el-card
          style="width: 135px;margin-bottom: 20px;height: 233px;float: left;margin-right: 15px"
          class="book"
          body-style="padding:10px"
          shadow="hover">
          <div
            class="cover"
            @click="editBook(item)">
            <img
              :src="item.cover"
              alt="封面">
          </div>
          <div class="info">
            <div class="title">
              <a href="">{{ item.title }}</a>
            </div>
            <i
              class="el-icon-delete"
              @click="deleteBook(item.id)"/>
          </div>
          <div class="author">{{ item.author }}</div>
        </el-card>
      </el-tooltip>
      <edit-form
        ref="edit"
        @onSubmit="loadBooks()"/>
    </el-row>
    <el-row>
      <el-pagination
        :current-page="currentPage"
        :page-size="pagesize"
        :total="books.length"
        @current-change="handleCurrentChange"/>
    </el-row>
  </div>
</template>

<script>
import EditForm from './EditForm'
import SearchBar from './SearchBar'
import { bookLoad, searchBook, deleteBook } from '../../api/Library/book'

export default {
  name: 'Books',
  components: { EditForm, SearchBar },
  data() {
    return {
      books: [],
      currentPage: 1,
      pagesize: 17
    }
  },

  mounted: function() {
    this.loadBooks()
  },

  methods: {
    loadBooks() {
      bookLoad().then(res => {
        if (res && res.status === 200) {
          this.books = res.data
        }
      })
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    },
    searchResult() {
      searchBook(this.$refs.searchBar.keywords).then(res => {
        if (res && res.status === 200) {
          this.books = res.data
        }
      })
    },
    deleteBook(id) {
      this.$confirm('此操作将永久删除该书籍, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBook(id).then(res => {
          if (res && res.status === 200) {
            this.loadBooks()
          }
        })
      }
      ).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editBook(item) {
      this.$refs.edit.dialogFormVisible = true
      this.$refs.edit.form = {
        id: item.id,
        cover: item.cover,
        title: item.title,
        author: item.author,
        date: item.date,
        press: item.press,
        abs: item.abs,
        category: {
          id: item.category.id.toString(),
          name: item.category.name
        }
      }
      /* eslint-disable */
      console.log(item)
    }
  }
}
</script>

<style scoped>

.cover {
  width: 115px;
  height: 172px;
  margin-bottom: 7px;
  overflow: hidden;
  cursor: pointer;
}

img {
  width: 115px;
  height: 172px;
  /*margin: 0 auto;*/
}

.title {
  font-size: 14px;
  text-align: left;
}

.author {
  color: #333;
  width: 102px;
  font-size: 13px;
  margin-bottom: 6px;
  text-align: left;
}

.abstract {
  display: block;
  line-height: 17px;
}

.el-icon-delete {
  cursor: pointer;
  float: right;
}

.switch {
  display: flex;
  position: absolute;
  left: 780px;
  top: 25px;
}

a {
  text-decoration: none;
}

a:link, a:visited, a:focus {
  color: #3377aa;
}

</style>
