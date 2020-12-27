const obj = { name: "yil", age: 12 };
const b = Object.getOwnPropertyDescriptor(obj, "name");
console.log(b);
