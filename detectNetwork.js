// Given a credit card number, this function should return a string with the
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy!
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

var detectNetwork = function(cardNumber) {
  // Note: `cardNumber` will always be a string
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  // The American Express network always starts with a 34 or 37 and is 15 digits long

// Visa always has a prefix of 4 and a length of 13, 16, or 19.
// MasterCard always has a prefix of 51, 52, 53, 54, or 55 and a length of 16.
// Discover always has a prefix of 6011, 644-649, or 65, and a length of 16 or 19.
// Maestro always has a prefix of 5018, 5020, 5038, or 6304, and a length of 12-19.


  // Once you've read this, go ahead and try to implement this function, then return to the console.
  let length = cardNumber.length;
  let cardStart = function(){
    if(cardNumber[0] === '3' && (cardNumber[1] === '8' || cardNumber[1] === '9')) return 'dinersclub';
    if(cardNumber[0] === '3' && (cardNumber[1] ==='4' || cardNumber[1] ==='7')) return 'amex';
    if(cardNumber[0] === '4') return 'visa';
    if(cardNumber[0] === '5' && /[1-5]/.test(cardNumber[1])) return 'mastercard';
    if(cardNumber.slice(0,4) === '6011' || cardNumber.slice(0,7) === '644-649' ||
    cardNumber.slice(0,2) === '65') return 'discover';
    if(['5018', '5020', '5038', '6304'].indexOf(cardNumber.slice(0,4)) > -1) return 'maestro';
  }

  if(length === 14 && cardStart() === 'dinersclub') return 'Diner\'s Club';
  if(length === 15 && cardStart() === 'amex') return 'American Express';
  if([13, 16, 19].indexOf(length) > -1 && cardStart() === 'visa') return 'Visa';
  if(length === 16 && cardStart() === 'mastercard') return 'MasterCard';
  if((length === 16 || length === 19) && cardStart() === 'discover') return 'Discover';
  if(length > 11 && length < 20 && cardStart() === 'maestro') return 'Maestro';

};
