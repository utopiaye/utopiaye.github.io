<template>
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

  components: {
    TransitionFadeSlide,
    PostsListItem,
    Pagination,
  },

  props: {
    posts: {
      type: Array,
      required: false,
      default: null,
    },
  },

  data () {
    return {
      page: 1,
    }
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
      if (!posts) {
        return []
      }

      const timeRegex = /(\d{4}-\d{2}-\d{2})(-\d{2}-\d{2}-\d{2})?/

      return posts.sort(function (a, b) {
        const matchA = a.path.match(timeRegex)
        var matchB = b.path.match(timeRegex)

        function getTimeStr (post, match) {
          if (match && match[0]) {
            return match[0].replace(/-/g, ' ')
          }
          if (post.frontmatter && post.frontmatter.date) {
            return new Date(post.frontmatter.date).toISOString()
          }
          if (post._fileMeta && post._fileMeta.createTime) {
            return post._fileMeta.createTime
          }
          return '1970-01-01'
        }

        const timeA = getTimeStr(a, matchA)
        const timeB = getTimeStr(b, matchB)

        return new Date(timeB) - new Date(timeA)
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

.no-posts
  color $grayTextColor
</style>
