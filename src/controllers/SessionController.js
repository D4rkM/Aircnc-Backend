// Methods used on controller
//index => Para listar várias sessões
//show => Para listar apenas uma sessão
//store => Para Salvar uma sessão
//update => Para atualizar uma sessão
//destroy => Para destruir uma sessão

const User = require('../models/User');

module.exports = {

    async store(req, res){

        const {email} = req.body;
        console.log(req.body);

        let user = await User.findOne({email});

        if(!user){

            user = await User.create({ email });

        }

        return res.json(user);

    }

};