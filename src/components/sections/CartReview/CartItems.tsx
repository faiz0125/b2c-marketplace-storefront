import { HttpTypes } from '@medusajs/types';

import { CartItemsHeader, CartItemsProducts } from '@/components/cells';
import { groupItemsBySeller } from '@/lib/helpers/group-cart-items-by-seller';

export const CartItems = ({ cart }: { cart: HttpTypes.StoreCart | null }) => {
  if (!cart) return null;

  const groupedItems = groupItemsBySeller(cart);

  return Object.keys(groupedItems).map(key => (
    <div
      key={key}
      className="mb-4"
    >
      <CartItemsHeader seller={groupedItems[key]?.seller} />
      <CartItemsProducts
        delete_item={false}
        change_quantity={false}
        products={groupedItems[key].items || []}
        currency_code={cart.currency_code}
      />
    </div>
  ));
};
