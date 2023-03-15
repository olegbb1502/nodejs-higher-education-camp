/**
 * Write an add() function that will take any number of parameters in the next manner:
 * console.log(add(2)(5)(7)(1)(6)(5)(10)()); // 36 
 */
function add (num) {
    function adder (n) {
        if (n !== undefined) {
            num += n;
            return adder;
        } else {
            return num;
        }
    }
    return adder;
}

console.log('Currying: ', add(2)(5)(7)(1)(6)(5)(10)());

/**
 * Write function, which takes two strings, and returns true 
 * if they are anagrams of one another.
 */

const anagrams = (stringA, stringB) => prepareStr(stringA) === prepareStr(stringB);

// For prepare string it should be: 
// - cleaned from specific characters
// - transform to one case
// - converted to an array of characters
// - sorted and merged to a string
// As a result we can compare two strings, consisted from similar characters(for Anagram)
const prepareStr = str => str.replace(/[^\w]/g).toLowerCase().split('').sort().join();

console.log('Anagrams: ', anagrams('monk','konm'));

/**
 * Write the clone function so that it can clone deeply the object passed as a parameter.
 */

// The most easyest but dangerous method. It can break execution proccess for BIG OBJECTS
const deepObjClone = obj => ({...obj});

// Clone via Object.asign method, not sure that it can be good way for copying
const deepObjClone2 = obj => Object.assign({}, obj);

// Clone via JSON methods, it`s just for simple values :( For methods in obj it doesn`t work
const deepObjClone3 = obj => JSON.parse(JSON.stringify(obj))

const testingObj = {
    name: 'Name',
    age: 25,
    birth: new Date('10.10.1998'),
    incrementAge: function() {
  	  this.age++
    }
}

console.log(`Real Obj:`, testingObj, `Clone 1:`, deepObjClone(testingObj));
console.log(`Real Obj:`, testingObj, `Clone 2:`, deepObjClone2(testingObj));
console.log(`Real Obj:`, testingObj, `Clone 3:`, deepObjClone3(testingObj));

/**
 * Write a function-wrapper, that will cache the result of any other function.
 */

const addForCache = (a, b) => a+b;
/**
 * -> Create "global" cache for wrapper.
 * -> And return closure with all argunemts
 * -> check if record in cache with id = "arg1,arg2" existed
 * -> return cached value
 * in other case write new id in cache with new value
 */
const wrapper = (fn) => {
    let cache = {};
    return (...args) => {
        let id = args.join(',');  // just taking one argument here
        if (id in cache) {
            console.log(`${cache[id]} from cache`);
            return cache[id];
        } else {
            let result = fn(...args);
            console.log(`${result} calculated`);
            cache[id] = result;
            return result;
        }
    }
};
const cachedAdd = wrapper(addForCache);
cachedAdd(2,2); // 4 calculated
cachedAdd(5,8); // 13 calculated
cachedAdd(2,2); // 4 from cache
cachedAdd(2,4); // 6 calculated
cachedAdd(2,4); // 6 from cache

