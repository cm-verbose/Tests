const Person = {
  age: 19,
  name: "John",
  job: "cashier",
  parentName: undefined,
};

console.log(Person); // { age: 19, job: 'cashier', parentName: undefined }

/* 
  Here the delete operator removes the property parentName from the object Person.
  In the modified object, the property is thus removed and can't be accessed. To 
  be safe with this operator, the property value must be optional in your code, or 
  else missing an essential object property can cause issues in production. 
*/
delete Person.parentName;
console.log(Person); // { age: 19, job: 'cashier' }

const FavoriteNumbers: number[] = [23, 49, 32];

/* 
  Here you can see that I'm deleting FavoriteNumbers[1], which is 49. Do not think
  that this will remove 49. It will set it an <1 empty item> or <empty>, which it-
  self is a placeholder for undefined. Thus the length of the array still is 3, and 
  FavoriteNumbers can still be accessed. 
*/
delete FavoriteNumbers[1]; // [ 23, <1 empty item>, 32 ] (may vary)

/* 
  To remove an element of an array using delete, you can use Array.splice() :
*/

const removeArrayElement = function <K>(array: K[], position: number): void {
  array = array.splice(position, 1);
};

removeArrayElement(FavoriteNumbers, 1); // [ 23, 32 ]
