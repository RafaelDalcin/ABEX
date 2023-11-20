export default function ({ $axios }, inject) {

  const api = $axios.create()

  api.onResponse(resp => resp.data)

  api.setBaseURL('http://localhost:5555')

  inject('api', api)
}