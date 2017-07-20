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
// Switch always has a prefix of 4903, 4905, 4911, 4936, 564182, 633110, 6333, or 6759 and a length of 16, 18, or 19.

// Heads up! Switch and Visa seem to have some overlapping card numbers - in any apparent conflict, you should choose the network with
 // the longer prefix.

  // Once you've read this, go ahead and try to implement this function, then return to the console.




  let length = cardNumber.length;
  // let cardStart = function(){
  //   if(cardNumber[0] === '3' && (cardNumber[1] === '8' || cardNumber[1] === '9')) return 'dinersclub';
  //   if(cardNumber[0] === '3' && (cardNumber[1] ==='4' || cardNumber[1] ==='7')) return 'amex';
  //   if(cardNumber[0] === '4') return 'visa';
  //   if(/^5[1-5]/.test(cardNumber)) return 'mastercard';
  //   if(/^(64[4-9]|6011|65)/.test(cardNumber)) return 'discover';
  //   if(/^(5018|5020|5038|6304)/.test(cardNumber)) return 'maestro';
    // if(/^(62[4-6]|628[2-8])/.test(cardNumber) || (parseInt(cardNumber.slice(0,6)) > 622125 &&
    // parseInt(cardNumber.slice(0,6)) < 622926)) return 'china';
  // };
  // const cardNum = cardStart();
  //
  // if(length === 14 && cardStart() === 'dinersclub') return 'Diner\'s Club';
  // if(length === 15 && cardStart() === 'amex') return 'American Express';
  // if([13, 16, 19].indexOf(length) > -1 && cardStart() === 'visa') return 'Visa';
  // if(length === 16 && cardStart() === 'mastercard') return 'MasterCard';
  // if((length === 16 || length === 19) && cardStart() === 'discover') return 'Discover';
  // if(length > 11 && length < 20 && cardStart() === 'maestro') return 'Maestro';


  let objOfFuncs = {};
  let takesPrecedent = false;

  let isDinersClub = function () {
    if(/^(3[8-9])/.test(cardNumber) && length === 14) return true;
    return false;
  };
  objOfFuncs['Diner\'s Club'] = isDinersClub;

  let isAmEx = function () {
    if(/^(34|37)/.test(cardNumber) && length === 15) return true;
    return false;
  };
  objOfFuncs['American Express'] = isAmEx;

  let isVisa = function () {
    //Make sure Switch check is run first to change takesPrecedent if necessary.
    isSwitch();
    let isLen = [13, 16, 19].indexOf(length) > -1
    if(/^4/.test(cardNumber) && isLen && !takesPrecedent) return true;
    return false;
  };
  objOfFuncs.Visa = isVisa;

  let isMasterCard = function() {
    if(/^5[1-5]/.test(cardNumber) && length === 16) return true;
    return false;
  };
  objOfFuncs.MasterCard = isMasterCard;

  let isDiscover = function() {
    let isLen = length === 16 || length === 19;
    if(/^(64[4-9]|6011|65)/.test(cardNumber) && isLen) return true;
    return false;
  };
  objOfFuncs.Discover = isDiscover;

  let isMaestro = function() {
    let isLen = length > 11 && length < 20;
    let isNum = /^(5018|5020|5038|6304)/.test(cardNumber);
    if(isLen && isNum) return true;
    return false;
  };
  objOfFuncs.Maestro = isMaestro;

  // Switch always has a prefix of 4903, 4905, 4911, 4936, 564182, 633110, 6333, or 6759 and a length of 16, 18, or 19.
  // Check if card number has a 4 in front and takes precedent over Visa. If yes, takesPrecedent changes to true.
  let isSwitch = function() {
    let isNum = /^(4903|4905|4911|4936|564182|633110|6333|6759)/.test(cardNumber);
    let isLen = [16, 18, 19].indexOf(length) > -1
    let isVisaConflict = (length !== 18) && /^4/.test(cardNumber);
    if(isNum && isLen) {
      if (isVisaConflict) takesPrecedent = true;
      return true;
    }
    return false;
  };
  objOfFuncs.Switch = isSwitch;

  // China UnionPay always has a prefix of 622126-622925, 624-626, or 6282-6288 and a length of 16-19.
  let isChinaUnionPay = function() {
    let num = parseInt(cardNumber.slice(0,6))
    let isInRange = num > 622125 && num < 622926;
    let isLen = length > 15 && length < 20;
    let isNum = /^(62[4-6]|628[2-8])/.test(cardNumber) || isInRange;
    if(isNum && isLen) return true;
    return false;
  };
  objOfFuncs['China UnionPay'] = isChinaUnionPay;


  for (key in objOfFuncs) {
    if (objOfFuncs[key]()) return key;
  }

  return 'Invalid number';

};
