const express = require('express');
const router = express.Router();


// RETORNA TODOS OS PEDIDOS
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: "Todos os pedidos encontrados."
    });
});


// INSERE UM PEDIDO
router.post('/', (req, res, next) =>{
    const pedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    }
    res.status(201).send({
        mensagem: "O pedido foi criado com sucesso!",
        pedidoCriado: pedido
    });
});


// RETORNA OS DADOS DE UM PEDIDO
router.get('/:id_pedido', (req, res, next) =>{
    const id = req.params.id_pedido;

    if (id === '1'){
        res.status(200).send({
            mensagem: 'O ID do primeiro pedido foi recebido com sucesso!',
            id: id
        });
    }else{
        res.status(200).send({
            mensagem: 'Um ID foi passado com sucesso!',
            id: id
        });
    }
});


// EXCLUI UM PEDIDO
router.delete('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'Um pedido foi excluído com sucesso!'
    })
});


module.exports = router;