'use client';

import { useActionState, useEffect } from 'react';

import { HttpTypes } from '@medusajs/types';
import { useToggleState } from '@medusajs/ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/atoms';
import ErrorMessage from '@/components/molecules/ErrorMessage/ErrorMessage';
import LocalizedClientLink from '@/components/molecules/LocalizedLink/LocalizedLink';
import ShippingAddress from '@/components/organisms/ShippingAddress/ShippingAddress';
import { TickThinIcon } from '@/icons';
import Spinner from '@/icons/spinner';
import { setAddresses } from '@/lib/data/cart';
import compareAddresses from '@/lib/helpers/compare-addresses';

export const CartAddressSection = ({
  cart,
  customer
}: {
  cart: HttpTypes.StoreCart | null;
  customer: HttpTypes.StoreCustomer | null;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isAddress = Boolean(
    cart?.shipping_address &&
    cart?.shipping_address.first_name &&
    cart?.shipping_address.last_name &&
    cart?.shipping_address.address_1 &&
    cart?.shipping_address.city &&
    cart?.shipping_address.postal_code &&
    cart?.shipping_address.country_code
  );
  const isOpen = searchParams.get('step') === 'address' || !isAddress;

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  );

  const [message, formAction] = useActionState(setAddresses, sameAsBilling);

  useEffect(() => {
    if (!isAddress) {
      router.replace(pathname + '?step=address');
    }
  }, [isAddress]);

  const handleEdit = () => {
    router.replace(pathname + '?step=address');
  };

  return (
    <div
      className="overflow-hidden rounded-sm border"
      data-testid="checkout-step-address"
    >
      <div className="flex items-center justify-between bg-component-secondary p-4">
        <div className="flex items-center gap-2">
          {!isOpen && isAddress ? (
            <span className="flex w-10 shrink-0 justify-center">
              <TickThinIcon size={24} />
            </span>
          ) : (
            <span className="heading-md w-10 shrink-0 text-center text-primary">1</span>
          )}
          <span className="heading-md uppercase text-primary">SHIPPING ADDRESS</span>
        </div>
        {!isOpen && isAddress && (
          <Button
            onClick={handleEdit}
            variant="tonal"
            data-testid="checkout-address-edit-button"
          >
            EDIT
          </Button>
        )}
      </div>
      <form
        action={async data => {
          await formAction(data);
          router.replace(`${pathname}?step=delivery`);
          router.refresh();
        }}
      >
        {isOpen ? (
          <div className="border-t border-primary p-4 pb-8">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />
            <Button
              className="mt-6"
              data-testid="submit-address-button"
              variant="tonal"
            >
              Save
            </Button>
            <ErrorMessage
              error={message !== 'success' && message}
              data-testid="address-error-message"
            />
          </div>
        ) : (
          <div className="border-t border-primary p-4">
            <div className="text-small-regular">
              {cart && cart.shipping_address ? (
                <div className="flex items-start gap-x-8">
                  <div className="flex w-full items-start gap-x-1">
                    <div>
                      <p className="label-md font-bold">
                        {cart.shipping_address.first_name} {cart.shipping_address.last_name}
                      </p>
                      <p className="label-md">
                        {cart.shipping_address.address_1} {cart.shipping_address.address_2},{' '}
                        {cart.shipping_address.postal_code} {cart.shipping_address.city},{' '}
                        {cart.shipping_address.country_code?.toUpperCase()}
                      </p>
                      <p className="label-md">
                        {cart.email}, {cart.shipping_address.phone}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        )}
        {isAddress && !searchParams.get('step') && (
          <div className="border-t border-primary px-4 pb-4 pt-4">
            <LocalizedClientLink href="/checkout?step=delivery">
              <Button variant="tonal">Continue to Delivery</Button>
            </LocalizedClientLink>
          </div>
        )}
      </form>
    </div>
  );
};
