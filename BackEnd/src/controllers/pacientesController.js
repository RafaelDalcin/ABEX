import Paciente from "../models/Paciente";

const getAll = async (req, res) => {
    try {
        let response = await Paciente.findAll({
        order: [
            ['nome', 'ASC']
        ],
        include: ['usuario', 'familia']
        });
    
        return res.status(200).send({
        type: 'success',
        message: 'Pacientes retornados com sucesso!',
        data: response
        });
    } catch (error) {
        return res.status(200).send({
        type: 'error',
        message: 'Ops! Ocorreu um erro!',
        data: error.message
        });
    }

    
}

const getById = async (req, res) => {
    try {
        let {id} = req.params;

        id = id.toString().replace(/\D/g, '');
    
        if (!id) {
        return res.status(200).send({
            type: 'error',
            message: 'Informe um ID válido para consulta!'
        });
        }

        let paciente = await Paciente.findOne({
            where: {
                id
            },
            include: ['usuario', 'grupo']
        })
    
        if(!paciente){
            return res.status(200).send({
                type: 'error',
                message: 'Paciente não encontrado!'
            });
        }

        return res.status(200).send({
        type: 'success',
        message: 'Paciente retornado com sucesso!',
        data: paciente
        });
    } catch (error) {
        return res.status(200).send({
        type: 'error',
        message: 'Ops! Ocorreu um erro!',
        data: error.message
        });
    }
}

const persist = async (req, res) => {
    try {
        let { id } = req.body;

        if(!id) {
            return await create(req.body, res);
        }
        return await update(id, req.body, res);

    } catch (error) {
        return res.status(200).send({
        type: 'error',
        message: 'Ops! Ocorreu um erro!',
        data: error.message
        });
         
    }
}

const create = async (dados, res) => {
    try {
        let {nome, cpf, dataNascimento, relacaoFamiliar, idUsuario, idFamilia} = dados;
        
        let response = await Paciente.create({
            nome,
            cpf,
            dataNascimento,
            relacaoFamiliar,
            idUsuario,
            idFamilia,
        });

        return res.status(200).send({
            type: 'success',
            message: 'Paciente cadastrado com sucesso!',
            data: response
        });
    } catch (error) {
        return res.status(200).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro!',
            data: error.message
        });
    }
}

const update = async (id, dados, res) => {
    try {
        let {nome, cpf, dataNascimento, relacaoFamiliar, idUsuario, idFamilia} = dados;

        let paciente = await Paciente.findOne({
            where: {
                id
            }
        })

        if(!paciente){
            return res.status(200).send({
                type: 'error',
                message: 'Paciente não encontrado!'
            });
        }

        Object.keys(dados).forEach(field => item[field] = dados[field]);

        await paciente.save();
        return res.status(200).send({
            type: 'success',
            message: 'Paciente atualizado com sucesso!',
            data: paciente
        });
        
    } catch (error) {
        return res.status(200).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro!',
            data: error.message
        });
    }
}

const destroy = async (req, res) => {
    try {
        let { id } = req.body;
        id = id ? id.toString().replace(/\D/g, '') : null;

        if (!id) {
            return res.status(400).send({
              message: 'Informe um paciente para ser deletado!'
            });
          }

        let paciente = await Paciente.findOne({
            where: {
                id
            }
        })

        if(!paciente){
            return res.status(200).send({
                type: 'error',
                message: 'Paciente não encontrado!'
            });
        }

        await paciente.destroy();
        return res.status(200).send({
            type: 'success',
            message: 'Paciente excluído com sucesso!',
            data: paciente
        });
        
    } catch (error) {
        return res.status(200).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro!',
            data: error.message
        });
    }
}


export default {
    getAll,
    getById,
    persist,
    create,
    destroy
}