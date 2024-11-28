const produtos = JSON.parse(localStorage.getItem("produtos")) || [];  // Inicia como um array vazio se não houver dados no localStorage
const tabela = document.getElementById("tabela-produtos");

for (let index = 0; index < produtos.length; index++) {
    const produto = produtos[index];

    const linha = `
        <tr>
            <td>${produto.id}</td>
            <td>${produto.nome}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.descrição}</td>
            <td>
                <div class="btn btn-sm btn-warning">Editar</div>
                <div class="btn btn-sm btn-danger" onclick="apagarProduto(${produto.id})">Excluir</div>
            </td>
        </tr>
    `;
    tabela.innerHTML += linha;
}

const formularioCadastro = document.getElementById("formulario_modal");
formularioCadastro.addEventListener("submit", (event) => {
    event.preventDefault();
    const ultimoproduto = produtos[produtos.length - 1];
    const produtoNovo = {
        id: (ultimoproduto?.id || 0) + 1,
        nome: document.getElementById("nome_produto").value,
        quantidade: document.getElementById("quantidade_produto").value,
        descrição: document.getElementById("descrição_produto").value
    };

    produtos.push(produtoNovo);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    location.reload();
});

function apagarProduto(id) {
    const produtoEncontrado = produtos.find((produto) => {
        return produto.id == id
    })
    console.log("Produto a apagar: ", produtoEncontrado)
    
   
    Swal.fire({
        title: "Você deseja apagar o produto?",
        text: "Essa ação não poderá ser desfeita!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#008000",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, deletar produto!"
      }).then((result) => {
        if (result.isConfirmed) {
            produtos.splice(produtos.indexOf(produtoEncontrado), 1)
            localStorage.setItem("produtos", JSON.stringify(produtos))  // Corrigido para setItem
            location.reload()
        }
      });
}
