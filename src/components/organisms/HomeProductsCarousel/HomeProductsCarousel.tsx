import { Carousel } from "@/components/cells"
import { ProductCard } from "../ProductCard/ProductCard"
import { sdk } from "@/lib/config"
import { Product } from "@/types/product"

export const HomeProductsCarousel = async ({
  locale,
  sellerProducts,
  home,
}: {
  locale: string
  sellerProducts: Product[]
  home: boolean
}) => {
  let products: any[] = []
  
  try {
    const region = await sdk.store.region.list()
    const regionId = region?.regions?.[0]?.id
    
    if (regionId) {
      const result = await sdk.store.product.list({
        limit: 4,
        region_id: regionId,
        fields: "*variants.calculated_price,+variants.inventory_quantity,*seller,*variants",
      })
      products = result?.products || []
    }
  } catch (e) {
    console.error("Product fetch error:", e)
  }

  if (!products.length && !sellerProducts.length) return null
  
  return (
    <div className="flex justify-center w-full">
      <Carousel
        align="start"
        items={(sellerProducts.length ? sellerProducts : products).map(
          (product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          )
        )}
      />
    </div>
  )
}
