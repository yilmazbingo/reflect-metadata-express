- proposed feature to be added to js and thus ts. it is experimental
- it is a snippet of data can be tied to a method, property or class definition.
- ts itself has some pretty close integration with the metadata system. typescript will optionaly provide some type information as metada to javascript. this metadata will provide some types that exist inside of our application. nowmally when we convert ts to js, all that type information inside of our ts gets wiped away. we can have ts export some type information but we are going to use reflect_metadata package
- import 'reflext-metadata` adds Reflect to global code. this is invisible
  Reflect.defineMetadata(key,value,objectName)
