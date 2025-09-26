
// Given API json 
export const userjsondataFactory = () => ({
  name: "John Doe",
  email: `john.${Date.now()}@example.com`,
  accountType: "premium"
});

// for checking mytest-mockapi.spec.ts
export const newFruitjson = () => ({   
     name: 'Grapes',
     id: 100 
});
