const $meuForm = document.querySelector('form');

const meuEstoque = {

    Produto: [],

    idPrimeiroProduto: 1,


    readProduct() {

        meuEstoque.Produto.forEach(({ id, productName, productInfo, productPrice, productData, productFactory }) => {
            meuEstoque.createProduct({ id, productName, productInfo, productPrice, productData, productFactory }, true);

        });
    },

    createProduct(dados, frontEnd = false) {
        const idInterno = meuEstoque.idPrimeiroProduto++;

        var novoProduct = { id: idInterno, ...dados };

        meuEstoque.Produto.push(novoProduct);

        if (frontEnd) {
            const id = id;
            meuEstoque.Produto.push({
                id: id || idInterno,
                productName: dados.productName,
                productInfo: dados.productInfo,
                productPrice: dados.productPrice,
                productData: dados.productData,
                productFactory: dados.productFactory,
            });
        }

        let structHTMLProduto = `
        <div class="meu-Product" data-id="${idInterno}">
        <div class="name-productName">
            <h2 class="tittle-name">${dados.productName} ID: ${idInterno}</h2>
        </div>
        <div class="Product-containner">
            <h3>${dados.productInfo}</h3>
            <p>Preço: ${dados.productPrice}</p>
            <p>Data de Fabricação: ${dados.productData}</p>
            <p>Fabricante: ${dados.productFactory}</p>
            <div class="btn-content">
                <ion-icon class="del-btn" name="trash-outline"></ion-icon>
                <ion-icon class="edit-btn" name="pencil-outline"></ion-icon>
            </div>
        </div>
    </div>
    `;

        let $ListadeProdutos = document.querySelector('.div-Products');
        
        $ListadeProdutos.insertAdjacentHTML('beforeend', structHTMLProduto);

        console.log(meuEstoque.Produto)
    },

    deleteProduct(id) {
        const ProductId = Number(id);

        const idInterno = meuEstoque.Produto.findIndex(Product => Product.id === ProductId);

        if (idInterno !== -1) {
            // Remove o Product da lista
            meuEstoque.Produto.splice(idInterno, 1);
            console.log(`Product com ID ${ProductId} excluído com sucesso.`);
        } else {
            console.log(`Product com ID ${ProductId} não encontrado.`);
        }
        console.log(meuEstoque.Produto)
    }

    ,


    editaProduct(id, newProductName, newInfoProduct, newProductPrice, newProductData, newProductFactory) {
        const ProductId = Number(id);

        const Product = meuEstoque.Produto.find(Product => Product.id == ProductId);

        if (Product) {
            Product.productName = newProductName;
            Product.productInfo = newInfoProduct;
            Product.productPrice = newProductPrice;
            Product.productData = newProductData;
            Product.productFactory = newProductFactory;

            const $productHtml = document.querySelector(`.meu-Product[data-id="${id}"]`); // Corrigido aqui
            if ($productHtml) {
                $productHtml.innerHTML = `
                    <div class="name-productName">
                        <h2 class="tittle-name">${newProductName.value} ID: ${id}</h2>
                    </div>
                    <div class="Product-containner">
                        <h3>${newInfoProduct.value}</h3>
                        <p>Preço: ${newProductPrice.value}</p>
                        <p>Data de Fabricação: ${newProductData.value}</p>
                        <p>Fabricante: ${newProductFactory.value}</p>
                        <div class="btn-content">
                            <ion-icon class="del-btn" name="trash-outline"></ion-icon>
                            <ion-icon class="edit-btn" name="pencil-outline"></ion-icon>
                        </div>
                    </div>
                `;
            } else {
                console.log(`Product com ID ${id} não encontrado.`);
            }
        } else {
            console.log(`Product com ID ${ProductId} não encontrado.`);
        }
    }
};


// CRUD [CREATE]
$meuForm.addEventListener('submit', function createProductController(infosdoevento) {
    infosdoevento.preventDefault();
    const $prod_Name = document.querySelector('input[name="prod-input-name"]');
    const $prod_Info = document.querySelector('input[name="prod-input-info"]');
    const $prod_Price = document.querySelector('input[name="prod-input-price"]');
    const $prod_Data = document.querySelector('input[name="prod-input-data"]');
    const $prod_Factory = document.querySelector('input[name="prod-input-factory"]');


    let target = document.querySelector('.aviso');
    if ($prod_Name.value === '') {

        target.innerHTML = 'Insira um valor.'

    } else if ($prod_Name.value.length <= 5) {

        target.innerHTML = 'Seu nome deve conter no mínimo 6 caracteres.';

    } else {

        meuEstoque.createProduct({
            productName: $prod_Name.value,
            productInfo: $prod_Info.value,
            productPrice: $prod_Price.value,
            productData: $prod_Data.value,
            productFactory: $prod_Factory.value
        })

        target.innerHTML = '';

    }
    emptyPoster();
});

// CRUD [READ]

meuEstoque.readProduct();

// Evento de edição de produto

document.querySelector('.div-Products').addEventListener('click', function (event) {

    const editBtn = event.target.classList.contains('edit-btn');

    if (editBtn) {
        const id = event.target.closest('[data-id]').getAttribute('data-id');
        const ProductId = Number(id);
        const Product = meuEstoque.Produto.find(meuID => meuID.id === ProductId);
        
        if (Product) {
            const $oldName = Product.productName;
            const $oldContent = Product.productInfo;
            console.log('Clicou no botão de editar\n ID do Produto: ', ProductId, '\nNome: ', $oldName, '\nConteúdo: ', $oldContent);
            let target = document.querySelector('.fog');
            if (target.classList.contains('hide')) {
                target.classList.remove('hide');

            }

            // Preenche os campos de edição com os valores do produto atual
            target.innerHTML =
                `
                <div class="close-btn"><ion-icon name="close"></ion-icon>
                </div>
                <div class="div-inputs">
                    <form class="edit">
                        <div>
                            <h2>Nome do produto</h2>
                            <input name="prod-input-name-edit" placeholder="Digite o nome do produto" value="${$oldName}" type="text"
                                class="post-crud">
                            <span class="aviso-nome"></span>
                        </div>
                        <div>
                            <h2>Descrição</h2><input name="prod-input-info-edit" value="${$oldContent}"
                                placeholder="Digite a descrição do produto" type="text" class="post-crud">
                        </div>
                        <div>
                            <h2>Preço</h2><input name="prod-input-price-edit" placeholder="Digite o preço do produto" type="text"
                                class="post-crud">
                        </div>
                        <h2>Data</h2><input name="prod-input-data-edit" placeholder="Digite a data de fabricação do produto" type="text"
                            class="post-crud">
                        <div>
                            <h2>Fabricante</h2><input name="prod-input-factory-edit" placeholder="Digite o fabricante do produto" type="text"
                                class="post-crud">
                        </div><button type="submit" class="btnEdit">Enviar</button>
                    </form>
                </div>
                </div>
            `;

            let closeFullscreen = document.querySelector('.close-btn');
            document.body.style.setProperty('--set-body-overflow', 'hidden');
            closeFullscreen.addEventListener('click', (event) => {
                let target = document.querySelector('.fog');

                if (!target.classList.contains('hide')) {
                    target.classList.add('hide');
                    document.body.style.setProperty('--set-body-overflow', 'none');
                }
            });

            // Adiciona evento de clique ao botão de envio do formulário de edição
            document.querySelector('.btnEdit').addEventListener('click', function (event) {
                event.preventDefault();
                const $newName = document.querySelector('input[name="prod-input-name-edit"]');
                const $newInfo = document.querySelector('input[name="prod-input-info-edit"]');
                const $newPrice = document.querySelector('input[name="prod-input-price-edit"]');
                const $newData = document.querySelector('input[name="prod-input-data-edit"]');
                const $newFactory = document.querySelector('input[name="prod-input-factory-edit"]');


                meuEstoque.editaProduct(id, $newName, $newInfo, $newPrice, $newData, $newFactory); // Chama o método de edição do produto
            });
        }
    }
});


// CRUD [DELETE]

document.querySelector('.div-Products').addEventListener('click', function (infosdoevento) {
    const delBtn = infosdoevento.target.classList.contains('del-btn');

    if (delBtn) {
        const ProductElement = infosdoevento.target.closest('.meu-Product');
        const id = ProductElement.getAttribute('data-id');
        console.log('Clicou no botão de exclusão');
        meuEstoque.deleteProduct(id);
        ProductElement.remove();
        emptyPoster();
    }

});


// function emptyPoster() {
//     const emptyProduct = document.querySelector('.empty-content')
//     if (meuEstoque.Product.length === 0) {
//         emptyProduct.innerHTML = 'Não há produtos';
//     } else {
//         emptyProduct.innerHTML = '';

//     }
// }
// emptyPoster();

