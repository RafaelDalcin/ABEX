export default function ({ $axios }, inject) {

  const api = $axios.create()

  api.onResponse(resp => resp.data)

  api.setBaseURL('http://localhost:3333')

  inject('api', api)
}