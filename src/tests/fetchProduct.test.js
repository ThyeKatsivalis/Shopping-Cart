import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
    it('fetchProduct é uma função', () => {
      expect(typeof fetchProduct).toBe('function')
    });
  
    it('fetch é chamado ao executar fetchProduct', () => {
      fetchProduct('MLB1405519561');
      expect(fetch).toHaveBeenCalled();
    });
  
    it('fetch é chamado com o endpoint correto ao executar fetchProduct', () => {
      fetchProduct('MLB1405519561');
      expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561')
    });
  
    it('testa se a funcao com o parametro computador é igual ao product (mock)', async () => {
      await expect(fetchProduct('MLB1405519561')).resolves.toEqual(product);
    });
  
    it('testa se retorna erro e mensagem é "ID não informado"', async () => {
      const erroMessage = 'ID não informado'
      await expect(() => fetchProduct()).rejects.toThrowError(erroMessage);
    });
  });
