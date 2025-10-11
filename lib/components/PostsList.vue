<template>
  <!-- 模板部分保持不变 -->
  <div class="main-div posts-list">
    <TransitionFadeSlide>
      <div
        v-if="listPosts.length === 0"
        key="no-posts"
        class="no-posts"
      >
        {{ $themeConfig.lang.noRelatedPosts }}
      </div>
      <div
        v-else
        :key="page"
        class="posts-items"
      >
        <TransitionFadeSlide
          tag="div"
          direction="x"
          group
        >
          <PostsListItem
            v-for="post in pagePosts"
            :key="post.path"
            :post="post"
            :each-side="2"
          />
        </TransitionFadeSlide>
      </div>
    </TransitionFadeSlide>
    <div
      v-if="total > 1"
      class="posts-paginator"
    >
      <Pagination
        v-model="page"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import TransitionFadeSlide from '@theme/components/TransitionFadeSlide.vue'
import PostsListItem from '@theme/components/PostsListItem.vue'
import Pagination from '@theme/components/Pagination.vue'

export default {
  name: 'PostsList',
  components: { TransitionFadeSlide, PostsListItem, Pagination },
  props: { posts: { type: Array, required: false, default: null } },
  data () {
    return { page: 1 }
  },
  computed: {
    perPage () {
      return this.$themeConfig.pagination.perPage || 5
    },
    total () {
      return Math.ceil(this.listPosts.length / this.perPage)
    },
    listPosts () {
      const posts = this.posts || this.$posts
      // 适配时分秒格式：正则提取 YYYY-MM-DD-HH-mm-ss
      return posts.sort((a, b) => {
        const timeA = a.path.match(/(\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2})/)[0]
        const timeB = b.path.match(/(\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2})/)[0]
        return (
          new Date(timeB.replace(/-/g, ' ')) -
          new Date(timeA.replace(/-/g, ' '))
        )
      })
    },
    pagePosts () {
      const begin = (this.page - 1) * this.perPage
      const end = begin + this.perPage
      return this.listPosts.slice(begin, end)
    },
  },
  watch: {
    listPosts () {
      this.page = 1
    },
  },
}
</script>

<style lang="stylus" scoped>
@require '~@theme/styles/variables'
.no-posts { color $grayTextColor }
</style>
