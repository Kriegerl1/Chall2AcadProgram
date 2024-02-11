const $meuForm = document.querySelector('form');

const minhaDivProducts = {
    usuário: [
        {
            username: 'Leo',
        }
    ],
    Product: [],
    firstId: 1,

    readProduct() {
        minhaDivProducts.Product.forEach(({ id, productName, productInfo, productPrice, productData, productFactory }) => {
            minhaDivProducts.criaProduct({ id, productName, productInfo, productPrice, productData, productFactory }, true);
        });

    },

    criaProduct(dados, frontEnd = false) {

        const idInterno = minhaDivProducts.firstId++;

        const novoProduct = { id: idInterno, ...dados };
        minhaDivProducts.Product.push(novoProduct);

        if (frontEnd) {
            const id = id;
            minhaDivProducts.Product.push({
                id: id  || idInterno,
                productName: dados.productName,
                productInfo: dados.productInfo,
                productPrice: dados.productPrice,
                productData: dados.productData,
                productFactory: dados.productFactory,
            });
        }
        const structureProduct = `
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
        const $ListadeProducts = document.querySelector('.div-Products');
        $ListadeProducts.insertAdjacentHTML('beforeend', structureProduct);
        console.log(minhaDivProducts.Product)

    }
    ,


    delProduct(id) {
        const ProductId = Number(id);

        const ProductIndex = minhaDivProducts.Product.findIndex(Product => Product.id === ProductId);

        if (ProductIndex !== -1) {
            // Remove o Product da lista
            minhaDivProducts.Product.splice(ProductIndex, 1);
            console.log(`Product com ID ${ProductId} excluído com sucesso.`);
        } else {
            console.log(`Product com ID ${ProductId} não encontrado.`);
        }
        console.log(minhaDivProducts.Product)

    }

    ,
    editaProduct(id, newProductName, newInfoProduct, newProductPrice, newProductData, newProductFactory) {
        const ProductId = Number(id);

        const Product = minhaDivProducts.Product.find(Product => Product.id === ProductId);

        if (Product) {
            console.log(Product)
            Product.productName = newProductName;
            Product.productInfo = newInfoProduct;
            Product.productPrice = newProductPrice;
            Product.productData = newProductData;
            Product.productFactory = newProductFactory;

            const $productHtml = document.querySelector(`.meu-Product[data-id="${id}"]`); // Corrigido aqui
            if ($productHtml) {
                $productHtml.innerHTML = `
                    <div class="name-productName">
                        <h2 class="tittle-name">${newProductName} ID: ${id}</h2>
                    </div>
                    <div class="Product-containner">
                        <h3>${newInfoProduct}</h3>
                        <p>Preço: ${newProductPrice}</p>
                        <p>Data de Fabricação: ${newProductData}</p>
                        <p>Fabricante: ${newProductFactory}</p>
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
$meuForm.addEventListener('submit', function criaProductController(infosdoevento) {
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

        minhaDivProducts.criaProduct({
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

minhaDivProducts.readProduct();

// Evento de edição de produto

document.querySelector('.div-Products').addEventListener('click', function (event) {

    const editBtn = event.target.classList.contains('edit-btn');
    if (editBtn) {
        const elemAtual = event.target;
        const id = elemAtual.getAttribute('data-id'); // Acessando o atributo data-id do elemento pai
        const ProductId = Number(id);
    
        const Product = minhaDivProducts.Product.find(Product => Product.id === ProductId);
    
        console.log(Number(ProductId), Number(id));
        if (Product) {
            console.log('passo 1');
            const $oldName = Product.productName;
            const $oldContent = Product.productInfo;
            console.log('Clicou no botão de editar\n ID do Produto: ', ProductId, '\nNome: ', $oldName, '\nConteúdo: ', $oldContent);
            let target = document.querySelector('.fog');
            if (target.classList.contains('hide')) {
                target.classList.remove('hide');
            console.log('passo 2');

            }

            // Preenche os campos de edição com os valores do produto atual
            target.innerHTML =
                `<div class="close-btn"><ion-icon name="close"></ion-icon>
                </div><div class="div-inputs"><form class="edit"><div><h2>Nome do produto</h2>
                <input name="prod-input-name" placeholder="Digite o nome do produto" value="${$oldName}" type="text" class="post-crud">
                <span class="aviso-nome"></span></div><div><h2>Descrição</h2><input name="prod-input-info" value="${$oldContent}" placeholder="Digite a descrição do produto" type="text" class="post-crud"></div><div>
                <h2>Preço</h2><input name="prod-input-price" placeholder="Digite o preço do produto" type="text" class="post-crud">
                </div><h2>Data</h2><input name="prod-input-data" placeholder="Digite a data de fabricação do produto" type="text" class="post-crud">
                <div><h2>Fabricante</h2><input name="prod-input-factory" placeholder="Digite o fabricante do produto" type="text" class="post-crud">
                </div><button type="submit" class="btnEdit">Enviar</button></form></div></div>
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
                const $newName = document.querySelector('input[name="prod-input-name"]').value;
                const $newInfo = document.querySelector('input[name="prod-input-info"]').value;
                const $newPrice = document.querySelector('input[name="prod-input-price"]').value;
                const $newData = document.querySelector('input[name="prod-input-data"]').value;
                const $newFactory = document.querySelector('input[name="prod-input-factory"]').value;
                

                minhaDivProducts.editaProduct(id, $newName, $newInfo, $newPrice, $newData, $newFactory); // Chama o método de edição do produto
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
        minhaDivProducts.delProduct(id);
        ProductElement.remove();
        emptyPoster();
    }

});


// function emptyPoster() {
//     const emptyProduct = document.querySelector('.empty-content')
//     if (minhaDivProducts.Product.length === 0) {
//         emptyProduct.innerHTML = 'Não há produtos';
//     } else {
//         emptyProduct.innerHTML = '';

//     }
// }
// emptyPoster();

