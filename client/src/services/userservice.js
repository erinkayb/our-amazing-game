import api from '@/services/api'

export default {
  index () {
    return api().get('loggedin')
  },
  post (user) {
    return api().post('users', user)
  }
}
