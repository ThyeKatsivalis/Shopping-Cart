export const getAddress = async (cep) => {
  // seu código aqui
  const endpointCep1 = fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
  const endpointCep2 = fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);

  const promessas = [endpointCep1, endpointCep2];
  const resultado = await Promise.any(promessas);
  const dados = await resultado.json();

  return dados;
};

export const searchCep = async () => {
  const cartAddress = document.querySelector('.cart__address');
  const cepInput = document.getElementsByTagName('input')[0].value;
  const length = 8;
  try {
    if (cepInput.length === length) {
      const result = await getAddress(cepInput);
      const { address, street, neighborhood, district, city, state } = result;
      if (result.address && result.district) {
        cartAddress.innerText = `${address} - ${district} - ${city} - ${state}`;
      } else {
        cartAddress.innerText = `${street} - ${neighborhood} - ${city} - ${state}`;
      }
    }
  } catch (error) {
    cartAddress.innerText = 'CEP não encontrado';
  }
};
