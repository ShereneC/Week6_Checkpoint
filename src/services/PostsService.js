import { data } from 'jquery'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { convertToQuery } from '../utils/Query'
import { api } from './AxiosService'

class PostsService {
  async getPosts(query = {}) {
    const res = await api.get('api/posts' + convertToQuery(query))
    AppState.newer = res.data.newer
    AppState.older = res.data.older
    AppState.posts = res.data.posts
  }

  async getOlder(olderUrl) {
    const res = await api.get(olderUrl)
    logger.log(res.data.posts)
    logger.log(res.data.older)
    AppState.newer = res.data.newer
    AppState.older = res.data.older
    AppState.posts = res.data.posts
  }

  async getPostById(id) {
    const res = await api.get(`api/profiles/${id}`)
    AppState.activePost = res.data
  }

  async createPost(post) {
    const res = await api.post('api/posts', post)
    // console.log(res.data)
    AppState.posts = [res.data, ...AppState.posts]
  }

  async destroy(id) {
    await api.delete(`api/posts/${id}`)
    AppState.posts = AppState.posts.filter(post => post.id !== id)
  }

  async addLike(id) {
    const res = await api.post((`api/posts/${id}/like`))

    const updatedPost = res.data
    const oldPostIndex = AppState.posts.findIndex(p => p.id === id)
    AppState.posts.splice(oldPostIndex, 1, updatedPost)
  }

  async searchFor(searchTerm) {
    try {
      const res = await api.get('api/posts?query=' + searchTerm)
      logger.log(res.data.posts)
      AppState.posts = res.data.posts
    } catch (error) {
      logger.log(error)
    }
  }
}

export const postsService = new PostsService()
