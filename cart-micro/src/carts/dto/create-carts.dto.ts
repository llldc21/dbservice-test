export interface CreateCartsDto {
  userId: string,
  totalPrice: number,
  totalQuantity: number,
  products: [
    name: string,
    price: number,
    quantity: number
  ]
}
