const myInjectedFunction = (str) => {
  console.log("Okay, another function", str);
};

export default ({ app }, inject) => {
  // Set the function directly on the context.app object
  // app.myInjectedFunction = (str) => {
  //   console.log("Okay, another function", str);
  // };
  app.myInjectedFunction2 = myInjectedFunction;
  inject("injectFunction", myInjectedFunction);
};
