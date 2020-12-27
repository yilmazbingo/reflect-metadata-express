in js, inheritance is implemented with prototyping.

- In JavaScript, the object’s prototype property is an internal property that’s not directly accessible (so we mark it with [[prototype]] ). Instead, the built-in method `Object.setPrototypeOf` takes in two object arguments and sets the second object as
  the prototype of the first. For example, calling `Object.setPrototypeOf(yoshi, hattori)`; sets up hattori as a prototype of yoshi
- It’s important to emphasize that every object can have a prototype, and an object’s prototype can also have a prototype, and so on, forming a prototype chain. The search delegation for a particular property occurs up the whole chain, and it stops only when
  there are no more prototypes to explore.
- every function has a proto typeobject that’s automatically set as the prototype of the objects created with that function. Let’s see how that works in the following listing. Every function, when created, gets a new prototype object. When we use a function
  as a constructor, the constructed object’s prototype is set to the function’s prototype. The prototype object initially has only one property, constructor , that references back to the function. so as u can see, in constructor functions constructor properties
  `this.name=name` is set to in each object instance, but proptotype is still empty, has only constructor property. and we add methods to protype object via the `Function's.prototype=method`. this is How `Class` work. Every instance gets the cnstructor properties, but methods are set to be in the prototype object.
- you can have methods in constructor as well. if you have same named method in the constructor as in protortype, constructor has presedence over the prototype.
- The function’s prototype can be replaced at will. The already constructed instances reference the old prototype!. Becasue its **proto** is referencing the old prototype object. The reference between an object and the function’s prototype is established at
  the time of object instantiation.

## INheritance

`Ninja.prototype = { dance: Person.prototype.dance }` ==> this is just copying not inheritance.
`Ninja.prototype = new Person()` Person is called superClass. This preserves the prototype chain, because the prototype of the SubClass instance will be an instance of the SuperClass , which has a prototype with all the properties of SuperClass , and which will in turn have a prototype pointing to an instance of its superclass, andon and on.
we are overriding here. we’ve lost our connection to the Ninja constructor that was previously kept by the original Ninja prototype. This is a problem, because the constructor property can be used to determine the function with which the object was created. to solve this we use object descriptors

```
Object.defineProperty(Ninja.prototype, "constructor", {
enumerable: false,
value: Ninja,
writable: true})
```

We’ve reestablished the connection between ninja instances and the Ninja function, so we can know that they were constructed by the Ninja function. In addition, if anybody tries to loop through the properties of the Ninja.prototype object, we’ve made sure that our patched-on property constructor won’t be visited. Now that’s the mark of a true ninja; we went in, did our job, and got out, without anybody noticing anything from the outside!

`NOTE` = in class, when we extend the class, our original constructor is not changing.

- `Ninja.prototype = Person.prototype`
  Any changes to the Ninja prototype will then also change the Person prototype (because they’re the same object), and that’s bound to have undesirable side effects.
