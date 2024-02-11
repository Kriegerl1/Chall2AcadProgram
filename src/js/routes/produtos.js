const express = require('express');
const router = express.Router();


// RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: "Todos os Produtos encontrados."
    });
});


// INSERE UM PRODUTO
router.post('/', (req, res, next) =>{
    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    };

    res.status(201).send({
        mensagem: "Produto criado com sucesso!",
        produtoCriado: produto
    });
});


// RETORNA OS DADOS DE UM PRODUTO
router.get('/:id_produto', (req, res, next) =>{
    const id = req.params.id_produto;

    if (id === '1'){
        res.status(200).send({
            mensagem: 'Você passou o primeiro ID com sucesso!',
            id: id
        });
    }else{
        res.status(200).send({
            mensagem: 'Voce encontrou um ID com sucesso!',
            id: id
        });
    }
});

// ALTERA UM PRODUTO
router.patch('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'Produto alterado com sucesso!'
    })
});

// EXCLUI UM PRODUTO
router.delete('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'Produto excluído com sucesso!'
    })
});


module.exports = router;