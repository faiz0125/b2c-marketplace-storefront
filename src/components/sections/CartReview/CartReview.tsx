'use client';

import { CartSummary } from '@/components/organisms';
import { PromoCode } from '@/components/organisms/PromoCode/PromoCode';

import { CartItems } from './CartItems';

const Review = ({ cart }: { cart: any }) => {
  return (
    <div>
      <div className="mb-6 w-full">
        <CartItems cart={cart} />
      </div>

      <div className={'mb-6'}>
        <PromoCode cart={cart} />
      </div>

      <div className="mb-6 w-full rounded-sm border p-4">
        <CartSummary
          item_total={cart?.item_subtotal || 0}
          shipping_total={cart?.shipping_subtotal || 0}
          total={cart?.total || 0}
          currency_code={cart?.currency_code || ''}
          tax={cart?.tax_total || 0}
          discount_total={cart?.discount_subtotal || 0}
        />
      </div>
    </div>
  );
};

export default Review;
