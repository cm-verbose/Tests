/* 
  When using values of type unknown, you can use the asserts ... is ... 
  as a type guard for this function to have a specific type passed. You 
  can thus declare a function :
*/

class AssertionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AssertionError";
  }
}

function isNotNull<K>(value: K): asserts value is NonNullable<K> {
  if (value === null || value === undefined) {
    /* 
      Here, you do not have to throw an error, you can use the value and  
      change it and use it later ; 
    */
    throw new AssertionError("Value is nullable");
  }
}

console.log(isNotNull("234")); // undefined

try {
  isNotNull(null);
} catch (e) {
  console.log(e); // AssertionError : Value is nullable
}
