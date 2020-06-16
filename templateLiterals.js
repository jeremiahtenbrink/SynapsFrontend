const logArgs = ( ...args ) => {
  console.log( ...args );
};

logArgs( "a", "b" );
logArgs``;
logArgs`I like pizza`;
const favoriteFood = "pizza";
logArgs( `I like ${ favoriteFood }.` );

logArgs`I like ${ favoriteFood }.`;

const favoriteDrink = "obi";

logArgs`I like ${ favoriteFood } and ${ favoriteDrink }.`;

logArgs( `Test ${ () => console.log( "test" ) }` );

logArgs`Test ${ () => console.log( "test" ) }`;

const execFuncArgs = ( ...args ) => args.forEach( arg => {
  if( typeof arg === "function" ){
    arg();
  }
} );

execFuncArgs( "a", "b" );
// -> undefined

execFuncArgs( () => {
  console.log( "this is a function" );
} );
// -> "this is a function"

execFuncArgs( "a", () => {
  console.log( "another one" );
} );