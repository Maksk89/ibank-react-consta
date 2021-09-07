import currency from 'currency.js';

export const rub = (value) => currency(value, {
  pattern: '# !',
  negativePattern: '-# !',
}).format({
  symbol: '₽',
  decimal: ',',
  separator: ' ',
});

