// Given API json 
export const transactiondataFactory = (userId: string) => ({
  userId: "123",
  amount: Math.floor(Math.random() * 1000),
  type: "transfer",
  recipientId: "456"
});