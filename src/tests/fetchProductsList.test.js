import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    const isFunction = typeof fetchProductsList === 'function';
    expect(isFunction).toBe(true);
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador') 
  });

  it('testa se retorna erro e mensagem é "Termo de busca não informado"', async () => {
    const erroMessage = 'Termo de busca não informado'
    await expect(() => fetchProductsList()).rejects.toThrowError(erroMessage);
  });

  it('testa url não mapeada', async () => {
    expect( await fetchProductsList('textoerro')).toBe('URL não mapeadahttps://api.mercadolibre.com/sites/MLB/search?q=textoerro')
  });
});
