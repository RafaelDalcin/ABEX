import gruposRoute from './gruposRoute';
import alunosRoute from './alunosRoute';
import usuariosRoute from './usuariosRoute';
import familiasRoute from './familiasRoute';
import pacientesRoute from './pacientesRoute';

function Routes(app) {
    alunosRoute(app);
    gruposRoute(app);
    usuariosRoute(app);
    familiasRoute(app);
    pacientesRoute(app);
}

export default Routes;