var createBtn = document.querySelector('.system-btn-create');
var readBtn = document.querySelector('.system-btn-read');
var createTarget = document.querySelector('.div-inputs form');
var readTarget = document.querySelector('.div-Products');
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


// FUNÇÃO DE ALTERNAR ENTRE CADASTRO E ESTOQUE, SOMENTE VISUAL



// ABAIXO BACKEND DA APLICAÇÃO

const myStorage = {

    myData: [], // MEU ARRAY DE ESTOQUE

    firstDataID: 1, // DETERMINA QUE O PRIMEIRO ID, QUE É BASEADO NO PRODUTO.LENGTH, SEJA 1


    READ() { // LEITURA DO CRUD

        myStorage.myData.forEach(({ id, productName, category, productInfo, productPrice, productData, productFactory }) => {
            myStorage.CREATE({ id, productName, category, productInfo, productPrice, productData, productFactory }, true);

        });
    },

    CREATE(dados, frontEnd = false) { // CRIAÇÃO DOS DADOS BACKEND DO CRUD
        const myID = myStorage.firstDataID++; // AUTO INCREMENTO DO ID CRIADO COM VALOR INICIAL '1'


        var newData = { id: myID, ...dados }; // VARIÁVEL QUE CONCATENA O ID COM OS DADOS RECEBIDOS

        myStorage.myData.push(newData); // VARIÁVEL QUE ADICIONA O 'newData' DENTRO DO ARRAY 'myStorage' NO BACKEND;

        if (frontEnd) {
            myStorage.myData.push({
                id: myID,
                productName: dados.productName,
                category: dados.category,
                productInfo: dados.productInfo,
                productPrice: dados.productPrice,
                productData: dados.productData,
                productFactory: dados.productFactory,
            }); // ADICIONA OS DADOS PARA A UTILIZAÇÃO FRONTEND


        }

        // CONSTRUTOR DO PRODUTO NO HTML
        let structHTMLProduto = `
        <div class="meu-Product" data-id="${myID}">
            <div class="name-productName">
                <h2 class="tittle-name">Nome: ${dados.productName} <hr> id de Serie: ${'CdP0' + myID}</h2>
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

        // CONSTRUTOR DO CHAMADO NO HTML
        let structHTMLChamado = `
        <div class="meu-Product" data-id="${myID}">
            <div class="name-productName">
                <h2 class="tittle-name">Nome: ${dados.productName} <hr> id de Serie: ${'CdS0' + myID}</h2>
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

        // CONDIÇÃO QUE DETERMINA QUAL CONSTRUTOR SERÁ UTILIZADO
        if (dados.category === 'Produto') {
            let $ListadeProdutos = document.querySelector('.div-Products');

            $ListadeProdutos.insertAdjacentHTML('beforeend', structHTMLProduto);
        } else {
            let $ListadeChamados = document.querySelector('.div-Products');

            $ListadeChamados.insertAdjacentHTML('beforeend', structHTMLChamado);
        }
        console.log(myStorage.myData) // TODA VEZ QUE UM NOVO "DATA" É ADICIONADO, É LANÇANDO NO CONSOLE O ARRAY ATUALIZADO.
    },

    DELETE(id) {
        const ProductId = Number(id); // DETERMINA QUE O ID É UM NUMERO.

        const myID = myStorage.myData.findIndex(Product => Product.id === ProductId); // ENCONTRA O ID DENTRO DO ARRAY 'myStorage'

        // SE O ID SELECIONADO FOR DIFERENTE DE -1, É RETIRADO DO ARRAY.
        if (myID !== -1) {
            myStorage.myData.splice(myID, 1);
            console.log(`Product com ID ${ProductId} excluído com sucesso.`);
        } else {
            console.log(`Product com ID ${ProductId} não encontrado.`);
        }
        console.log(myStorage.myData) // ATUALIZA O ARRAY NO CONSOLE.
    }

    ,


    UPDATE(id, newProductName, category, newInfoProduct, newProductPrice, newProductData, newProductFactory) {
        const ProductId = Number(id);

        const Product = myStorage.myData.find(Product => Product.id == ProductId); // ENCONTRA O ID DENTRO DO ARRAY 'myStorage'

        if (Product) { //SE ENCONTRAR O ID, INICIA A EDIÇÃO DO 'DATA'

            Product.productName = newProductName;
            Product.category = category;
            Product.productInfo = newInfoProduct;
            Product.productPrice = newProductPrice;
            Product.productData = newProductData;
            Product.productFactory = newProductFactory;

            const $dataHTMLUpdate = document.querySelector(`.meu-Product[data-id="${ProductId}"]`); // TARGET ONDE SERÁ ALTERADO OS DADOS. SE BASEIA NO ${ProductId}.

            if ($dataHTMLUpdate) {
                let serieProduct = 'CdP0', serieChamado = 'CdS0', categorySerial, htmlFactory, htmlData; // VARIÁVEIS DE SERIALIZAÇÃO

                if (category.value === 'Produto') { // SE A CATEGORIA FOR "Produto" ENTRA A CONDIÇÃO E ALTERA OS DADOS.
                    categorySerial = serieProduct;
                    htmlFactory = `<p>Fabricante: ${newProductFactory.value}</p>`;
                    htmlData = `<p>Data de Fabricação: ${newProductData.value}</p>`
                    htmlPrice = `<p>Preço: ${newProductPrice.value}</p>`
                } else { // SE NÃO FOR ENCONTRADO, ALTERA TAMBÉM.
                    categorySerial = serieChamado;
                    htmlFactory = ``;
                    htmlData = `<p>Data do chamado: ${newProductData.value}</p>`;
                    htmlPrice = `<p>Orçamento: ${newProductPrice.value}</p>`

                }

                // BASE QUE É ALTERADA COM A CONDIÇÃO ACIMA, TODAS AS PARTES EM HTML DEVERIAM TER FICADO ASSIM...

                $dataHTMLUpdate.innerHTML = `
                    <div class="name-productName">
                        <h2 class="tittle-name">${newProductName.value} <hr> id de Serie: ${categorySerial + ProductId}</h2>
                    </div>
                    <div class="Product-containner">
                        <p>Descrição: ${newInfoProduct.value}</p>
                        <p>Categoria: ${category.value}</p>
                        ${htmlPrice}
                        ${htmlData}
                        ${htmlFactory}
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



// ACIMA BACKEND DA APLICAÇÃO



// ABAIXO O FRONTEND DA APLICAÇÃO


// CRUD [CREATE]
document.querySelector('form').addEventListener('submit', function CREATEController(infosdoevento) {
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

        target.innerHTML = 'Seu nome deve conter no mínimo 6 caracteres.'; // EXIBE ESSA MENSAGEM CASO O NOME TENHA MENOS DE 6 LETRAS. E NÃO CRIA O OBJETO.

    } else {
        //CRIA O OBJETO CASO TENHA MAIS DE 5 LETRAS;
        myStorage.CREATE({
            productName: $prod_Name.value,
            category: $category_type,
            productInfo: $prod_Info.value,
            productPrice: $prod_Price.value,
            productData: $prod_Data.value,
            productFactory: $prod_Factory.value
        })

        target.innerHTML = ''; // LIMPRA O CAMPO DO AVISO.

    }
    emptyPoster();
});

// CRUD [READ]

myStorage.READ();

// CRUD [UPDATE]

document.querySelector('.div-Products').addEventListener('click', function (event) {

    // TODA MINHA DOR ESTÁ CONCENTRADA NISSO AQUI...

    const editBtn = event.target.classList.contains('edit-btn'); // TARGET DO BOTÃO DE EDIÇÃO

    if (editBtn) { // SE O BOTÃO FOR ACIONADO
        const id = event.target.closest('[data-id]').getAttribute('data-id'); // ELE BUSCA O ALVO MAIS PRÓXIMO COM O NOME [data-id], LOGO É O QUE ESTÁ DENTRO DO OBJETO.

        const ProductId = Number(id);// DETERMINA QUE O ID É UM NUMERO

        const Product = myStorage.myData.find(meuID => meuID.id === ProductId); // ENCONTRA O ID DENTRO DO ARRAY 'MyStorage'.


        if (Product) {

            // AS VARIÁVEIS RECEBEM O VALOR DE CADA CARACTERISTICA DO OBJETO ANTES DA EDIÇÃO.

            const $oldName = Product.productName;
            const $category = Product.category;
            const $oldInfo = Product.productInfo;
            const $oldPrice = Product.productPrice;
            const $oldData = Product.productData;
            const $oldFactory = Product.productFactory;


            // CONSTRUTOR DO PRODUTO SELECIONADO NO CONSOLE, NEM PRECISAVA DISSO NA VERDADE...
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

            // TARGET ONDE SERÁ "INSTANCIADO" O  EDITOR
            let target = document.querySelector('.fog');
            if (target.classList.contains('hide')) {
                target.classList.remove('hide');

            }

            // CONSTRUTOR DO EDITOR DE PRODUTO
            let structHTMLEditorProduto =
                `
                <div class="edit-wrapper">
                <div class="close-btn"><ion-icon name="close"></ion-icon>
                </div>
                <div class="div-inputs">
                    <form class="edit">
                    <div class="tittle-content">
                    <h1>Edição de produto</h1>
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
                            <option value="${$category}">${$category}</option>
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
                        <div>
                            <h2>Fabricante</h2><input name="prod-input-factory-edit" placeholder="Digite o fabricante do produto" type="text"
                                class="post-crud">
                        </div><button type="submit" class="btnEdit">confirmar</button>
                    </form>
                </div>
                </div>
                </div>
            `;
            // CONSTRUTOR DO EDITOR DE CHAMADO
            let structHTMLEditorServico =
                `
            <div class="edit-wrapper">
            <div class="close-btn"><ion-icon name="close"></ion-icon>
            </div>
            <div class="div-inputs">
                <form class="edit">
                <div class="tittle-content">
                <h1>Edição de chamado de serviço</h1>
                <hr>
            </div>
            
                    <div>
                        <h2>Nome do produto</h2>
                        <input name="prod-input-name-edit" placeholder="Digite o titulo do chamado"  type="text"
                            class="post-crud">
                        <span class="aviso"></span>
                    </div>
                    
                    <div>
                    <h2>Categoria</h2>
                    <select disabled name="prod-input-categ" id="input-category-edit" class="select-input">
                        <option value="${$category}">${$category}</option>
                    </select>
                </div>
                    <div>
                        <h2>Descrição</h2><input name="prod-input-info-edit" placeholder="Digite a descrição do chamado" type="text" class="post-crud">
                    </div>
                    <div>
                        <h2>Valor</h2><input name="prod-input-price-edit" placeholder="Digite o valor do Serviço" type="text"
                            class="post-crud">
                    </div>
                    <h2>Data</h2><input name="prod-input-data-edit" placeholder="Digite a data de registro do chamado" type="text"
                        class="post-crud">
                <button type="submit" class="btnEdit">confirmar</button>
                </form>
            </div>
            </div>
            </div>
        `;
            // CONDIÇÃO DE QUE DETERMINA QUAL CONSTRUTOR SERÁ UTILIZADO
            if ($category === 'Produto') {

                target.insertAdjacentHTML('afterbegin', structHTMLEditorProduto);
            }

            if ($category === 'Serviço') {

                target.insertAdjacentHTML('afterbegin', structHTMLEditorServico);
            }

            // FUNÇÃO DE FECHAR DO EDITOR
            
            let closeFullscreen = document.querySelector('.close-btn');
            document.body.style.setProperty('--set-body-overflow', 'hidden');
            closeFullscreen.addEventListener('click', (event) => {
                let target = document.querySelector('.fog');

                if (!target.classList.contains('hide')) {
                    target.classList.add('hide');
                    document.body.style.setProperty('--set-body-overflow', 'none');
                }
            });

            document.querySelector('.btnEdit').addEventListener('click', function (event) {
                event.preventDefault();

                const $newName = document.querySelector('input[name="prod-input-name-edit"]');
                const $category = document.getElementById('input-category-edit');
                const $newInfo = document.querySelector('input[name="prod-input-info-edit"]');
                const $newPrice = document.querySelector('input[name="prod-input-price-edit"]');
                const $newData = document.querySelector('input[name="prod-input-data-edit"]');
                const $newFactory = document.querySelector('input[name="prod-input-factory-edit"]');

                // CONDIÇÕES PARA ALTERAR APENAS O QUE FOI EDITADO

                if ($newName.value === '') {
                    $newName.value = $oldName;
                } else if ($newName.value.length <= 5) {
                    let warning = document.querySelector('.fog .aviso');

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
                    if ($category.value === 'Produto') {
                        if ($newFactory.value === '') {
                            $newFactory.value = $oldFactory;

                        }
                    } else {
                        $newFactory === ''
                    }
                    myStorage.UPDATE(id, $newName, $category, $newInfo, $newPrice, $newData, $newFactory);
                    warning.innerHTML = '';
                }
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
        myStorage.DELETE(id);
        ProductElement.remove();
        emptyPoster();
    }

});

// FUNÇÃO QUE ESCREVE QUE O ARRAY ESTÁ VAZIO, SÓ VISUAL...
function emptyPoster() {
    const emptyProduct = document.querySelector('.empty-content')
    if (myStorage.myData.length === 0) {
        emptyProduct.innerHTML = 'O estoque está vazio';
    } else {
        emptyProduct.innerHTML = '';
    }
}
emptyPoster();

// ACIMA O FRONTEND DA APLICAÇÃO
