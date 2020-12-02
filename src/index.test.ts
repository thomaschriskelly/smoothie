import {validateSmoothie} from './utils'

test('undefined name smoothie', () => {
  expect(validateSmoothie(undefined, {'A': 'B'})).toStrictEqual(['No name specified']);
});

test('blank name smoothie', () => {
  expect(validateSmoothie('', {'A': 'B'})).toStrictEqual(['No name specified']);
});

test('undefined ingredients smoothie', () => {
  expect(validateSmoothie('Delicious Smoothie', undefined)).toStrictEqual(['No ingredients specified']);
});

test('no ingredients smoothie', () => {
  expect(validateSmoothie('Delicious Smoothie', {})).toStrictEqual(['No ingredients']);
});

test('invalid ingredients smoothie', () => {
  expect(validateSmoothie('Delicious Smoothie', 'abc')).toStrictEqual(['Ingredients not an object']);
});

test('valid smoothie', () => {
  expect(validateSmoothie('Delicious Smoothie', {'A': 'B'})).toStrictEqual([]);
});