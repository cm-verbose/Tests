/* Declare a generator function */
function* listItems(): Generator<string, void, void> {
  yield "foo";
  yield "bar";
  yield "eggs";
}

const listItemTable: { listItems: string }[] = [];

/* Iterating over yield values of a generator */
for (const element of listItems()) {
  listItemTable.push({ listItems: element });
}
console.table(listItemTable);

const infiniteListItems: { infiniteListItems: number | void }[] = [];

/* Quick instantiation of a generator (this one is infinite) */
const infinite = (function* (x: number): Generator<number, void, void> {
  let i = 1;
  while (true) {
    yield x ** i;
    i++;
  }
})(3); // You can pass in a parameter here with the generator

/* 
  Getting the next value of the generator (next gets the value along with a 
  done value to check if the generator's yield values are exhausted) 
*/
for (let i = 0; i < 5; i++) {
  infiniteListItems.push({ infiniteListItems: infinite.next().value });
}

console.table(infiniteListItems);

/* 
  Here in this generator, there is a try catch function, 
  here you can catch errors inside the next statment
*/
const articles: { article: string | void | TypeError }[] = [];
const getArticle = (function* (): Generator<string, void, string | TypeError> {
  try {
    yield "shoes";
  } catch (e) {
    console.log(`Error occured : ${e}`);
  }
})();

articles.push({ article: getArticle.next().value });

// here, the error is caught thus the value is undefined ;
articles.push({
  article: getArticle.next(new TypeError("efe")).value,
}); /* here the function is also done*/

console.table(articles);

/* 
  As you might have seen earlier, you can pass values 
  into the next() method of an existing generator; Here 
  is how you can use it : 
*/

const nextNumbersTable: { num: unknown }[] = [];
const f = (function* generator(): Generator<unknown, void, unknown> {
  while (true) {
    const s = yield;
    nextNumbersTable.push({ num: s });
  }
})();

f.next(
  34
); /* Here the function yields, thus passing this value and doesn't get logged */
f.next(342); // 342
f.next(344); // 344
console.table(nextNumbersTable);

/* 
  A return statement can be fetched using .next() or by
  iterating through the generator. It will appear as a 
  value of the form { value: <GeneratorReturn>, done:true }
  when using .next(); 
*/

const returnValue: { returnValue: string }[] = [];
const j = (function* (): Generator<string, string, void> {
  yield "1";
  return "2";
})();

returnValue.push({ returnValue: j.next().value });
returnValue.push({ returnValue: j.next().value });

console.table(returnValue);

/* 
  You can use the return() method to stop the generator, 
  so anything beyond this point for generator f 
  won't execute 
*/
f.return();
f.next(34);

/* 
  yield* can delegate the generator's iteration control 
  over another iterable : 
  */
const shoppingList = (function* (
  list: string[]
): Generator<string, void, undefined> {
  yield* list;
})(["fish", "eggs", "milk"]);

const shoppingListContents: { shoppingListContents: string }[] = [];
for (const food of shoppingList) {
  shoppingListContents.push({
    shoppingListContents: food,
  }); /* fish, eggs, milk */
}
console.table(shoppingListContents);

/* Another iterable type are other generators, so you 
  can do this:  
*/

const g = (function* getItems(
  x: Generator<string, void, undefined>[]
): Generator<Generator<string, void, undefined>, void, undefined> {
  yield* x;
})([
  (function* getList1() {
    yield "1";
    yield "2";
  })(),
  (function* getList2() {
    yield* "3";
    yield* "4";
  })(),
]);

const numberSequence: { numberSquence: string }[] = [];

/* 
  Here there is a double loop since we have to iterate 
  through the first generator's yielded generators. 
  Other iterable types included arrays, strings, etc.
*/
for (const iterator of g) {
  for (const values of iterator) {
    numberSequence.push({ numberSquence: values });
  }
}

console.table(numberSequence);
