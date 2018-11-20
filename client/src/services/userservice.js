import api from '@/services/api'

export default {
  index () {
    return api().get('users')
  },
  post (user) {
    return api().post('users', user)
  }
}
