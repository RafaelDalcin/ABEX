import controller from '../controllers/pacientesController'

export default (app) => {
	app.get('/pacientes', controller.getAll)
	app.post('/pacientes/persist', controller.persist)
	app.post('/pacientes/destroy', controller.destroy)
	app.get('/pacientes/:id', controller.getById)
}