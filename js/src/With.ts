/* PS : Disable strict mode for this file */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-with */

const _model = {
  year: 1956,
  brand: "Ford",
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
with (_model) {
  const year = 1932;
  const brand = "Mustang";
}

console.log(_model);

/* 
The with keyword allows to access and modify an object's properties and methods,
by giving you access to the property and method names of __one__ selected object.
This is a bad idea to use since you can't know when an object's method or
properties are getting modified. Instead, you can use a dot to specify that you 
are editing an object's properties : 
*/

_model.year = 1932;
_model.brand = "Mustang";
