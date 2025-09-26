
// Given API json 
export const userjsondataFactory = () => ({
  name: "John Doe",
  email: `john.${Date.now()}@example.com`,
  accountType: "premium"
});

// for temp.spec.ts
export const userjson = () => ({   
     name: 'Loquat',
     id: 100 
});
