function Programmer1() {
    this.languages = [];
    // return this;
}

Programmer1.prototype.learnNewLanguage = function(language) {
    this.languages.push(language);
};

Programmer1.prototype.isPragmatic = function() {
    return this.languages.length > 2;
};

const programmer1 = new Programmer1();
programmer1.learnNewLanguage('Java');
programmer1.learnNewLanguage('Ruby');
console.log(programmer1.isPragmatic()); // false
programmer1.learnNewLanguage('Python');
console.log(programmer1.isPragmatic()); // true

// 4 ways of calling a function
function foo() {
    return this;
}
const o = {};
o.foo = foo;
// foo() - window, undefined in strict
// o.foo(); - left of .
// foo.call({}) - explicit this
// new foo() - newly created object 1/4

['Java', 'Ruby', 'Python'].forEach(lang => programmer1.learnNewLanguage(lang));