import { data } from 'jquery'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { convertToQuery } from '../utils/Query'
import { api } from './AxiosService'

class PostsService {
  async getPosts(query = {}) {
    const res = await api.get('api/posts' + convertToQuery(query))
    logger.log(res.data.posts)
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
    await api.post((`api/posts/${id}/like`))
  }
}

export const postsService = new PostsService()
