const createBtn = document.querySelector('.system-btn-create');
const readBtn = document.querySelector('.system-btn-read');
const createTarget = document.querySelector('.div-inputs form');
const readTarget = document.querySelector('.div-Products');
const pi = 3.14
createBtn.addEventListener('click', function (event) {
    createTarget.hidden = false;
    readTarget.hidden = true;
    createBtn.hidden = true;
    readBtn.hidden = false;
});

readBtn.addEventListener('click', function (event) {
    createTarget.hidden = true;
    readTarget.hidden = false;
    createBtn.hidden = false;
    readBtn.hidden = true;
});

const $meuForm = document.querySelector('form');

const meuEstoque = {

    Produto: [],

    idPrimeiroProduto: 1,


    readProduct() {

        meuEstoque.Produto.forEach(({ id, productName, category, productInfo, productPrice, productData, productFactory }) => {
            meuEstoque.createProduct({ id, productName, category, productInfo, productPrice, productData, productFactory }, true);

        });
    },

    createProduct(dados, frontEnd = false) {
        const idInterno = meuEstoque.idPrimeiroProduto++;


        var novoProduct = { id: idInterno, ...dados };

        meuEstoque.Produto.push(novoProduct);

        if (frontEnd) {
            meuEstoque.Produto.push({
                id: idInterno,
                productName: dados.productName,
                category: dados.category,
                productInfo: dados.productInfo,
                productPrice: dados.productPrice,
                productData: dados.productData,
                productFactory: dados.productFactory,
            });


        }

        let structHTMLProduto = `
        <div class="meu-Product" data-id="${idInterno}">
        <div class="name-productName">
            <h2 class="tittle-name">Nome: ${dados.productName} <hr> id de Serie: ${'CdP0' + idInterno}</h2>
        </div>
        <div class="Product-containner">
            <p>Descrição: ${dados.productInfo}</p>
            <p>Categoria: ${dados.category}</p>
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
        let structHTMLChamado = `
                <div class="meu-Product" data-id="${idInterno}">
            <div class="name-productName">
                <h2 class="tittle-name">Nome: ${dados.productName} <hr> id de Serie: ${'CdS0' + idInterno}</h2>
            </div>
            <div class="Product-containner">
                <p>Descrição: ${dados.productInfo}</p>
                <p>Categoria: ${dados.category}</p>
                <p>Orçamento: ${dados.productPrice}</p>
                <p>Data do Chamado: ${dados.productData}</p>
                <div class="btn-content">
                <ion-icon class="del-btn" name="trash-outline"></ion-icon>
                <ion-icon class="edit-btn" name="pencil-outline"></ion-icon>
                </div>
                </div>
                </div>`
        if (dados.category === 'Produto') {
            let $ListadeProdutos = document.querySelector('.div-Products');

<<<<<<< HEAD
        let $ListadeProdutos = document.querySelector('.div-Products');

        $ListadeProdutos.insertAdjacentHTML('beforeend', structHTMLProduto);
=======
            $ListadeProdutos.insertAdjacentHTML('beforeend', structHTMLProduto);
        } else {
            let $ListadeChamados = document.querySelector('.div-Products');
>>>>>>> 7474cacbeadad1e7acdc701744da5c0c9fe55cbf

            $ListadeChamados.insertAdjacentHTML('beforeend', structHTMLChamado);
        }
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


    editaProduct(id, newProductName, category, newInfoProduct, newProductPrice, newProductData, newProductFactory) {
        const ProductId = Number(id);

        const Product = meuEstoque.Produto.find(Product => Product.id == ProductId);

        if (Product) {
            Product.productName = newProductName;
            Product.category = category;
            Product.productInfo = newInfoProduct;
            Product.productPrice = newProductPrice;
            Product.productData = newProductData;
            Product.productFactory = newProductFactory;

            const $productHtml = document.querySelector(`.meu-Product[data-id="${id}"]`); // Corrigido aqui
            if ($productHtml) {
                $productHtml.innerHTML = `
                    <div class="name-productName">
                        <h2 class="tittle-name">${newProductName.value} <hr> id de Serie: ${'teste'+id}</h2>
                    </div>
                    <div class="Product-containner">
                        <p>Descrição: ${newInfoProduct.value}<p>
                        <p>Categoria: ${category.value}</p>
                        <p>Preço: ${newProductPrice.value}</p>
                        <p>Data de Fabricação: ${newProductData.value}</p>
                        <p>Fabricante: ${newProductFactory.value}</p>
                        <div class="btn-content">
                            <ion-icon class="del-btn" name="trash-outline"></ion-icon>
                            <ion-icon class="edit-btn" name="pencil-outline"></ion-icon>
                        </div>
                    </div>
                `;
            }
        } else {
            console.log(`Product com ID ${ProductId} não encontrado.`);
        }
    }
};


// CRUD [CREATE]
$meuForm.addEventListener('submit', function createProductController(infosdoevento) {
    infosdoevento.preventDefault();
    const select = document.getElementById('input-category');
    const option = select.options[select.selectedIndex];

    const $prod_Name = document.querySelector('input[name="prod-input-name"]');
    const $category_type = option.value;
    const $prod_Info = document.querySelector('input[name="prod-input-info"]');
    const $prod_Price = document.querySelector('input[name="prod-input-price"]');
    const $prod_Data = document.querySelector('input[name="prod-input-data"]');
    const $prod_Factory = document.querySelector('input[name="prod-input-factory"]');


    let target = document.querySelector('.aviso');
    if ($prod_Name.value === '' || $prod_Name.value.length <= 5) {

        target.innerHTML = 'Seu nome deve conter no mínimo 6 caracteres.';

    } else {

        meuEstoque.createProduct({
            productName: $prod_Name.value,
            category: $category_type,
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

// CRUD [UPDATE]

document.querySelector('.div-Products').addEventListener('click', function (event) {

    const editBtn = event.target.classList.contains('edit-btn');

    if (editBtn) {
        const id = event.target.closest('[data-id]').getAttribute('data-id');
        const ProductId = Number(id);
        const Product = meuEstoque.Produto.find(meuID => meuID.id === ProductId);

<<<<<<< HEAD
        if (Product) {
            const $oldName = Product.productName;
=======

        if (Product) {
            const $oldName = Product.productName;
            const $category = Product.category;
>>>>>>> 7474cacbeadad1e7acdc701744da5c0c9fe55cbf
            const $oldInfo = Product.productInfo;
            const $oldPrice = Product.productPrice;
            const $oldData = Product.productData;
            const $oldFactory = Product.productFactory;

<<<<<<< HEAD

            console.log('ID do Produto: ', ProductId, '\nNome: ', $oldName, '\nDescrição: ', $oldInfo, '\nPreço: ', $oldPrice, '\nData de fabricação: ', $oldData, '\nFabricante: ', $oldFactory);
=======
            const html_produto = `
                Produto
            Id do produto: ${id}
            Nome: ${$oldName}
            Categoria: ${$category}
            Preço: ${$oldPrice}
            Data de fabricação: ${$oldData}
            Fabricante: ${$oldFactory}
            `
            console.log(html_produto);
>>>>>>> 7474cacbeadad1e7acdc701744da5c0c9fe55cbf


            let target = document.querySelector('.fog');
            if (target.classList.contains('hide')) {
                target.classList.remove('hide');

            }


            // Preenche os campos de edição com os valores do produto atual
<<<<<<< HEAD

            target.innerHTML =
=======
            let structHTMLEditorProduto =
>>>>>>> 7474cacbeadad1e7acdc701744da5c0c9fe55cbf
                `
                <div class="edit-wrapper">
                <div class="close-btn"><ion-icon name="close"></ion-icon>
                </div>
                <div class="div-inputs">
                    <form class="edit">
<<<<<<< HEAD
                        <div class="tittle-content">
                            <h1>Edição de produtos</h1>
                            <hr>
                        </div>
                
                        <div>
                            <h2>Nome do produto</h2>
                            <input name="prod-input-name-edit" placeholder="Digite o nome do produto" type="text"
=======
                    <div class="tittle-content">
                    <h1>Edição de produtos</h1>
                    <hr>
                </div>
                
                        <div>
                            <h2>Nome do produto</h2>
                            <input name="prod-input-name-edit" placeholder="Digite o nome do produto"  type="text"
>>>>>>> 7474cacbeadad1e7acdc701744da5c0c9fe55cbf
                                class="post-crud">
                            <span class="aviso"></span>
                        </div>
                        
                        <div>
<<<<<<< HEAD
=======
                        <h2>Categoria</h2>
                        <select disabled name="prod-input-categ" id="input-category-edit" class="select-input">
                            <option value="">${$category}</option>
                        </select>
                    </div>
                        <div>
>>>>>>> 7474cacbeadad1e7acdc701744da5c0c9fe55cbf
                            <h2>Descrição</h2><input name="prod-input-info-edit" placeholder="Digite a descrição do produto" type="text" class="post-crud">
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
<<<<<<< HEAD
                        </div><button type="submit" class="btnEdit">Editar</button>
=======
                        </div><button type="submit" class="btnEdit">confirmar</button>
>>>>>>> 7474cacbeadad1e7acdc701744da5c0c9fe55cbf
                    </form>
                </div>
                </div>
                </div>
            `;

            let structHTMLEditorServico =
                `
            <div class="edit-wrapper">
            <div class="close-btn"><ion-icon name="close"></ion-icon>
            </div>
            <div class="div-inputs">
                <form class="edit">
                <div class="tittle-content">
                <h1>Edição de produtos</h1>
                <hr>
            </div>
            
                    <div>
                        <h2>Nome do produto</h2>
                        <input name="prod-input-name-edit" placeholder="Digite o nome do produto"  type="text"
                            class="post-crud">
                        <span class="aviso"></span>
                    </div>
                    
                    <div>
                    <h2>Categoria</h2>
                    <select disabled name="prod-input-categ" id="input-category-edit" class="select-input">
                        <option value="">${$category}</option>
                    </select>
                </div>
                    <div>
                        <h2>Descrição</h2><input name="prod-input-info-edit" placeholder="Digite a descrição do produto" type="text" class="post-crud">
                    </div>
                    <div>
                        <h2>Preço</h2><input name="prod-input-price-edit" placeholder="Digite o preço do produto" type="text"
                            class="post-crud">
                    </div>
                    <h2>Data</h2><input name="prod-input-data-edit" placeholder="Digite a data de fabricação do produto" type="text"
                        class="post-crud">
                   <button type="submit" class="btnEdit">confirmar</button>
                </form>
            </div>
            </div>
            </div>
        `;

            if ($category === 'Produto') {
                let $teste1 = document.querySelector('.fog');

                target.insertAdjacentHTML('afterbegin', structHTMLEditorProduto);
            }

            if ($category === 'Serviço') {

                target.insertAdjacentHTML('afterbegin', structHTMLEditorServico);
            }

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
                const $category = document.getElementById('input-category-edit');
                const $newInfo = document.querySelector('input[name="prod-input-info-edit"]');
                const $newPrice = document.querySelector('input[name="prod-input-price-edit"]');
                const $newData = document.querySelector('input[name="prod-input-data-edit"]');
                const $newFactory = document.querySelector('input[name="prod-input-factory-edit"]');
                if ($newName.value === '') {
                    $newName.value = $oldName;
                } else if ($newName.value.length <= 5) {
                    let warning = document.querySelector('.fog .aviso');

<<<<<<< HEAD
                const produto_console = `
                    O produto ID ${ProductId}
                        \nFoi alterado:
                        \nNome: ${$newName.value}
                        \nDescrição: ${$newInfo.value}
                        \nPreço: ${$newPrice.value}
                        \nData de fabricação: ${$newData.value}
                        \nFabricante: ${$newFactory.value}
                        `

                // Verifica se o campo de nome está vazio
                if ($newName.value === '') {
                    // Se estiver vazio, preenche com o valor antigo
                    $newName.value = $oldName;
                }

                // Verifica se o campo de descrição está vazio
                if ($newInfo.value === '') {
                    // Se estiver vazio, preenche com o valor antigo
                    $newInfo.value = $oldInfo;

                }

                // Verifica se o campo de preço está vazio
                if ($newPrice.value === '') {
                    // Se estiver vazio, preenche com o valor antigo
                    $newPrice.value = $oldPrice;

                }

                // Verifica se o campo de data está vazio
                if ($newData.value === '') {
                    // Se estiver vazio, preenche com o valor antigo
                    $newData.value = $oldData;

                }

                // Verifica se o campo de fabricante está vazio
                if ($newFactory.value === '') {
                    // Se estiver vazio, preenche com o valor antigo
                    $newFactory.value = $oldFactory;
                }
                console.log(produto_console)
                // Chama a função editaProduct passando os valores atualizados
                meuEstoque.editaProduct(id, $newName, $newInfo, $newPrice, $newData, $newFactory);
                
            console.log('ID do Produto: ', ProductId, '\nNome: ', $oldName, '\nDescrição: ', $oldInfo, '\nPreço: ', $oldPrice, '\nData de fabricação: ', $oldData, '\nFabricante: ', $oldFactory);
                // Verifica se o campo de nome está vazio
                if ($newName.value === '') {
                    // Se estiver vazio, preenche com o valor antigo
                    $newName.value = meuEstoque.productName;
                }

                // Verifica se o campo de descrição está vazio
                if ($newInfo.value === '') {
                    // Se estiver vazio, preenche com o valor antigo
                    $newInfo.value = $oldInfo;

                }

                // Verifica se o campo de preço está vazio
                if ($newPrice.value === '') {
                    // Se estiver vazio, preenche com o valor antigo
                    $newPrice.value = $oldPrice;

                }

                // Verifica se o campo de data está vazio
                if ($newData.value === '') {
                    // Se estiver vazio, preenche com o valor antigo
                    $newData.value = $oldData;

                }

                // Verifica se o campo de fabricante está vazio
                if ($newFactory.value === '') {
                    // Se estiver vazio, preenche com o valor antigo
                    $newFactory.value = $oldFactory;
                }
=======
                    warning.innerHTML = "Seu nome deve conter no mínimo 6 caracteres."
                } else {

                    if ($newInfo.value === '') {
                        $newInfo.value = $oldInfo;

                    }
                    if ($newPrice.value === '') {
                        $newPrice.value = $oldPrice;

                    }
                    if ($newData.value === '') {
                        $newData.value = $oldData;

                    }
                    if ($newFactory.value === '') {
                        $newFactory.value = $oldFactory;

                    }

                    meuEstoque.editaProduct(id, $newName, $category, $newInfo, $newPrice, $newData, $newFactory);
                    warning.innerHTML = '';

                }
>>>>>>> 7474cacbeadad1e7acdc701744da5c0c9fe55cbf
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


function emptyPoster() {
    const emptyProduct = document.querySelector('.empty-content')
    if (meuEstoque.Produto.length === 0) {
<<<<<<< HEAD
        emptyProduct.innerHTML = 'Não há produtos';
    } else {
        emptyProduct.innerHTML = '';

=======
        emptyProduct.innerHTML = 'O estoque está vazio';
    } else {
        emptyProduct.innerHTML = '';
>>>>>>> 7474cacbeadad1e7acdc701744da5c0c9fe55cbf
    }
}
emptyPoster();

