/*
 * You'll eventually be given instructions how to use this file
 * If you want to use it before then, you'll have to figure it out yourself
 */

// You don't actually want to fill *this* value in on line 9, but you'll see
// other places in this file where you'll replace the FILL_ME_IN with a
// different value.
var FILL_ME_IN = 'Fill this value in';

describe('Introduction to Mocha Tests - READ ME FIRST', function() {
  // A Mocha test is just a function!
  // If the function throws an error when run, it fails.
  // If it doesn't throw an error when run, it doesn't fail.
  // To read more about mocha, visit mochajs.org
  //
  // Once you've read and understood this section, please comment it out.
  // You will not be able to proceed with a failing test.

  it('Throws an error so it fails', function() {

  });

  it('Doesn\'t throw an error, so it doesn\'t fail', function() {
    // This test doesn't really test anything at all! It will pass no matter what.
    var even = function(num){
      return num/2 === 0;
    }
    return even(10) === true;
  });

  // In tests, we want to compare the expected behavior to the actual behavior.
  // A test should only fail if the expected behavior doesn't match the actual.
  it('Throws an error when expected behavior does not match actual behavior', function() {
    var even = function(num){
      return num % 2 === 0;
    }

    if(even(10) !== true) {
      throw new Error('10 should be even!');
    }
  });
});
describe('Diner\'s Club', function() {
  // Be careful, tests can have bugs too...

  it('has a prefix of 38 and a length of 14', function() {
    if (detectNetwork('38345678901234') !== 'Diner\'s Club') {
      throw new Error('Test failed');
    }
  });

  it('has a prefix of 39 and a length of 14', function() {
    if (detectNetwork('39345678901234') !== 'Diner\'s Club') {
      throw new Error('Test failed');
    }

  });
});

describe('American Express', function() {
  // It can get annoying to keep typing the if/throw, so here is a
  // helper function to throw an error if the input statement isn't true.
  // var assert = function(isTrue) {
  //   if(isTrue) {
  //     throw new Error('Test failed');
  //   }
  //
  // };
  const should = chai.should();

  it('has a prefix of 34 and a length of 15', function() {
    detectNetwork('343456789012345').should.equal('American Express');
  });

  it('has a prefix of 37 and a length of 15', function() {
    detectNetwork('373456789012345').should.equal('American Express');
  });
});

describe('Visa', function() {
  // Chai is an entire library of helper functions for tests!
  // Chai provides an assert that acts the same as our previous assert.
  // Search the documentation to figure out how to access it.
  //   http://chaijs.com/
  const should = chai.should();


  it('has a prefix of 4 and a length of 13', function() {
    detectNetwork('4123456789012').should.equal('Visa');
  });

  it('has a prefix of 4 and a length of 16', function() {
    detectNetwork('4123456789012345').should.equal('Visa');
  });

  it('has a prefix of 4 and a length of 19', function() {
    detectNetwork('4123456789012345678').should.equal('Visa');
  });
});

describe('MasterCard', function() {
  // Chai lets you write more human-readable tests that throw helpful errors.
  // Expect syntax is one way to do this, but there are others.
  // If you want to know more, check out the documentation.
  //   http://chaijs.com/api/bdd/
  const should = chai.should();

  it('has a prefix of 51 and a length of 16', function() {
    detectNetwork('5112345678901234').should.equal('MasterCard');
  });

  it('has a prefix of 52 and a length of 16', function() {
    detectNetwork('5212345678901234').should.equal('MasterCard');
  });

  it('has a prefix of 53 and a length of 16', function() {
    detectNetwork('5312345678901234').should.equal('MasterCard');
  });


  // You can also use should instead of expect, which changes the style
  // slightly. It really doesn't matter which one you use - check out
  // http://chaijs.com/guide/styles/ for more info, but it's important
  // to be consistent (unlike in this file, where we use BOTH expect
  // and should, but that's just for learning), so once you've gotten
  // these tests to pass using should syntax, refactor your tests to
  // use either expect or should, but not both.

  it('has a prefix of 54 and a length of 16', function() {
    detectNetwork('5412345678901234').should.equal('MasterCard');
  });

  it('has a prefix of 55 and a length of 16', function() {
    detectNetwork('5512345678901234').should.equal('MasterCard');
  })

});

// Discover always has a prefix of 6011, 644-649, or 65, and a length of 16 or 19.
describe('Discover', function() {

  const should = chai.should();

  let pref = ['6011', '644', '645', '646', '647', '648', '649', '65'];
  let num, str;
  // let str;

  function testCardNumber(i, str, len){
    it(`has a prefix of ${pref[i]} and a length of ${len}`, function() {
      detectNetwork(str).should.equal('Discover');
    });
  }

  for (let len = 16; len <= 19; len += 3) {
    for(let i = 0; i < pref.length; i++) {
      num ='';
      for(let j = 0; j < (len - pref[i].length); j++) {
        num += '1';
      }
      str = pref[i] + num;
      testCardNumber(i, str, len);
    }
  }
});

// Maestro always has a prefix of 5018, 5020, 5038, or 6304, and a length of 12-19.
describe('Maestro', function() {

  const should = chai.should();

  let pref = ['5018', '5020', '5038', '6304'];
  let num = '';
  let str;

  for(let i = 0; i < 8; i++) {
    num += '1';
  }

  function testCardNumber(i, str, len){
    it(`has a prefix of ${pref[i]} and a length of ${len}`, function() {
      detectNetwork(str).should.equal('Maestro');
    });
  }

  for (let len = 12; len <= 19; len++) {
    for(let i = 0; i < pref.length; i++) {
      str = '';
      str = pref[i] + num;
      testCardNumber(i, str, len);
    }
    num += '1'
  }

});

// China UnionPay always has a prefix of 622126-622925, 624-626, or 6282-6288 and a length of 16-19.
describe('should support China UnionPay', function() {
  const should = chai.should();

  let pref = [];

  for(let i = 622126; i < 622926; i++) {
    pref.push(i.toString());
  }

  for(let i = 624; i < 627; i++) {
    pref.push(i.toString());
  }

  for(let i = 6282; i < 6289; i++) {
    pref.push(i.toString());
  }

  let num, str;

  function testCardNumber(i, str, len){
    it(`has a prefix of ${pref[i]} and a length of ${len}`, function() {
      detectNetwork(str).should.equal('China UnionPay');
    });
  }

  for (let len = 16; len <= 19; len ++) {
    for(let i = 0; i < pref.length; i++) {
      num ='';
      for(let j = 0; j < (len - pref[i].length); j++) {
        num += '1';
      }
      str = pref[i] + num;
      testCardNumber(i, str, len);
    }
  }
});

// Switch always has a prefix of 4903, 4905, 4911, 4936, 564182, 633110, 6333, or 6759 and a length of 16, 18, or 19.

describe('should support Switch', function() {
  const should = chai.should();

  let pref = ['4903', '4905', '4911', '4936', '564182', '633110', '6333', '6759'];
  let lenArr = [16, 18, 19];

  let num, str, len;

  function testCardNumber(i, str, len){
    it(`has a prefix of ${pref[i]} and a length of ${len}`, function() {
      detectNetwork(str).should.equal('Switch');
    });
  }

  for (let l = 0; l < lenArr.length; l++) {
    len = lenArr[l];
    for(let i = 0; i < pref.length; i++) {
      num ='';
      for(let j = 0; j < (len - pref[i].length); j++) {
        num += '1';
      }
      str = pref[i] + num;
      testCardNumber(i, str, len);
    }
  }
})
