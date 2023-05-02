export const fetchProduct = async (id) => {
  // seu código aqui
  if (!id) {
    throw new Error('ID não informado');
  }
  const infoDoProduto = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const dadosDoProduto = await infoDoProduto.json();
  return dadosDoProduto;
};

export const fetchProductsList = async (termo) => {
  // seu código aqui
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${termo}`;
  if (!termo) {
    throw new Error('Termo de busca não informado');
  }
  return fetch(endpoint)
    .then((response) => response.json())
    .then((dados) => dados.results)
    .catch((error) => (error.message));
};
