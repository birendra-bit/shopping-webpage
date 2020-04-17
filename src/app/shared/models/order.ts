import { ShoppingCart } from './shopping-carts';

export class Order{
    datePlaced: number;
    items: any[]=[];
    constructor(public userId: string, public shipping: any,private shoppingCart: ShoppingCart){
        this.datePlaced= new Date().getTime();
        for( let key in this.shoppingCart.items){
            if(this.shoppingCart.items[key].quantity > 0 ){
              this.items.push({
                product: this.shoppingCart.items[key].product,
                quantity:this.shoppingCart.items[key].quantity
              })
            }
          }
    }
}