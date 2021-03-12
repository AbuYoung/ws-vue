import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const service = axios.create({
  baseUrl: 'http://localhost:8443/api',
  // baseUrl: 'http://xx.xx.xx.xx:8443/api'
  timeout: 30000
})

export default service
