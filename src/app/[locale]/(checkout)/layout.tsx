import Image from 'next/image';

import { Button } from '@/components/atoms';
import LocalizedClientLink from '@/components/molecules/LocalizedLink/LocalizedLink';
import { CollapseIcon } from '@/icons';

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="border-b border-primary">
        <div className="relative flex w-full items-center px-4 py-4 lg:px-8">
          <LocalizedClientLink href="/cart">
            <Button
              variant="tonal"
              className="flex items-center gap-2"
            >
              <CollapseIcon className="rotate-90" />
              <span>BACK TO SHOPPING CART</span>
            </Button>
          </LocalizedClientLink>
          <div className="absolute left-1/2 -translate-x-1/2">
            <LocalizedClientLink href="/">
              <Image
                src="/Logo.svg"
                width={126}
                height={40}
                alt="Logo"
                priority
              />
            </LocalizedClientLink>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
