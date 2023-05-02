import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createCustomElement, createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const section = document.querySelector('.products');

const loadingText = () => {
  const loading = document.querySelector('.loading');
  const generateLoad = createCustomElement('h2', 'loading', 'carregando...');
  return !loading ? section.appendChild(generateLoad) : loading.remove();
};

const loadingItem = async (nomeDoProduto) => {
  loadingText();
  try {
    const produtos = await fetchProductsList(nomeDoProduto);
    loadingText();
    produtos.forEach((produto) => section.appendChild(createProductElement(produto)));
  } catch (error) {
    loadingText();
    const h2 = document.createElement('h2');
    h2.classList.add('error');
    h2.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
    section.appendChild(h2);
  }
};

const addToCart = async () => {
  await loadingItem('computador');

  const btnAddToCart = document.querySelectorAll('.product__add');
  const sectionCart = document.querySelector('.cart__products');
  btnAddToCart.forEach((button) => {
    button.addEventListener('click', async (event) => {
      const divProduct = event.target.parentNode;
      const productID = divProduct.querySelector('.product__id').innerHTML;
      saveCartID(productID);
      const getProductInfos = await fetchProduct(productID);
      const productElement = createProductElement(getProductInfos);
      sectionCart.appendChild(productElement);
    });
  });
};

window.onload = async () => {
  await addToCart();
  const storageCart = getSavedCartIDs();
  storageCart.forEach(async (selectedItem) => {
    const sectionCart = document.querySelector('.cart__products');
    const getProductInfos = await fetchProduct(selectedItem);
    const productElement = createProductElement(getProductInfos);
    sectionCart.appendChild(productElement);
  });
};

document.querySelector('.cep-button').addEventListener('click', searchCep);

// for (let i = 0; i < produtos.results.length; i += 1) {
//   const elemento = section.appendChild(createProductElement(produtos.results[i]));
//   section.appendChild(elemento);
// }
