import { data } from 'jquery'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
    logger.log(res.data.posts)
    AppState.posts = res.data.posts
  }

  async getPostById(id) {
    const res = await api.get(`api/posts/${id}`)
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
}

export const postsService = new PostsService()