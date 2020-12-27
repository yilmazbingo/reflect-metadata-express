- functions that can be used to modify/change different properties or methods in the class. similar to js decorators but mostly different.
- in ts we are only going to use decorators around classes. decorators are experimental. enable, experimentalDecorators
- first arg is the prototype of the object. second arg is key. third arg is the property descriptor. `key ` decorator that we are applying. if we have pilot() in class and we apply decorator to pilot(), key would be pilot. 
  `  function testDecorator(target:any,key:string):void{} `
  
  ---IMPORTANT ----Decorators only gets executed one single time and that is when we defined our class. decorator does not get executed when we create the instance of the class.---------

## Property descriptor:
- desc:PropertyDescriptor type is globally available in ts
- this is an object that has some configuration options around a property defined on an object. it is part of es5 javascript.
- so property descriptor is essentially an obj that is meant to configure on another obj.
- - writable = whether or not this property can be changed.
- - enumerable= whether or not this property get looped over by a "for in"
- - valu = current value property
- - configurable = whether or not we can change the configuration of this property. like delete.

`const car={make:"honda", year:"2023"}`
`Object.getOwnPropertyDescriptor(car,'make')` ==> this will give me property descriptor object for the `make` property
`Object.defineProperty(car,'make',{writable:false})`==> i cannot update `make` in any way

` NOTE ==` `Object.getOwnPropertyDescriptor(a, 'x').writable = false` this wont work because Object.getOwnPropertyDescriptor has no setter and getter. that's why we use `defineProperty`

Property Descriptor object is gonna be the key way in which we modify different properties inside of our descriptors. we cannot do this 
`target[key]=()=>{} `
because after our __decorator gets called, ts internally is going to try to apply a property descriptor back to the prototype. 
## Decorator in Ts

this is a function that gets automatically added into our code by JS to implement decorator.

```
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
```

immediately we add the pilot methdd to the prototype, this `__decorate` function gets called

```
__decorate([
    testDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Boat.prototype, "pilot", null);
```
this is what __decorate() does precisely:
```
var __decorate=function(decorators,target,key,des){
  var desc=Object.getOwnPropertyDescriptor(target,key)
  for(var decorator of decorators){
    decorator(target,key,desc)}}
```
## what does \_\_decorate do?

it gets a reference to the property descriptor on the obj.
`desc = Object.getOwnPropertyDescriptor(target, key)`
all it does, it loop through all the different decorators in that array and calls each one with the prototype which is `target`,key and property descriptors. decorator is like a syntatic sugar .
## PropertyDescriptor example
```
pilot(){
  throw new Error()
  console.log("yil")}

function logError(target:any,key:string,desc:PropertyDescriptor){
  const method=desc.value
  desc.value=function(){
    try{
      method()
    } catch(e){
      catching the error inside pilot and modify
    }}}
```

## Decorator Factory

`@logError("an argument")` to pass an argument in the decorator, we have to define `logError` as the high order function.
```
function logError(errorMessage:string){
  return function (target:any,key:string,desc:PropertyDescriptor){
  const method=desc.value
  desc.value=function(){
    try{
      method()
    } catch(e){
      console.log(errorMessage)
    }
  }
}
```
## Decorators around properties
`color:string=red` // print out the value of this property

first argument of the decorator is the prototype of the class. prototypes generally only stores the methods. actual instance properties are defined inside constructors. and all the decorators are running when we defien our class. so our decorators will never going to be able to access any instance properties on an instance. we can console.log it.

## More on decorators
- we can use them on `get` accessors
- on arguments
function parameterDecorator(target:any,key:string,index:number){
  console.log(key,index)
}

pilot(@parameterDecorator speed:string)

- we can apply decorators to static methods, static properties and static accessories

## why decorators hard in express
-- when we apply multiple decorators to a class, communication of those decorators is challenging. express generate route object and we can associate middlewares  to it but syntax would make it hard to work because we had to register middleware first and then route handler. but route handler must be first.
    @use(logger)
    @get("/login") // this is going to set up  the metadata

## Solutin:
node.js executes the code. when class decorators are read in and the class itself is defined, that is when all of our different decorators are executed. we are going to have a bunch of different decorators and those are going to associate some route configure information with a given route handler by using METADATA. we are going to have each of thsese different decorators somehow store some configuration options in metadata. our method decorators are going to be executed immediately with our class definition. 
we are always guaranteed that the very last decorator to be executed around a class will be the class decorator itself which is `@controller` that is the key. by the time `@controller` runs that means that all of our other litte decorators have been executed and provided some route configuretion information. so inside of our class decorator we are going to add in some code that reads out some metadata information that has been assosicated with each method. That metadata information will contain all this different route configuration stuff. `@controller` will take that information and add the complete route definition in one single go to our router. 
