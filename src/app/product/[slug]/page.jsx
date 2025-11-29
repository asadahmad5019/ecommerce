//internal import

import ProductScreen from "@components/slug-card/ProductScreen";
import { showingTranslateValue } from "@lib/translate";
import { getShowingAttributes } from "@services/AttributeServices";
import { getShowingStoreProducts } from "@services/ProductServices";
import { Products } from "../../../products";
// This async function generates the metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const { products } = await getShowingStoreProducts({
    category: "",
    slug: slug,
  });

  const product = Products?.find((p) => p.id === parseInt(slug));
  console.log("this is product on the product detail page ", product);
  return {
    title: `${product?.title?.en} | Kachabazar`,
    description: product?.description?.en,
    keywords: [product?.tags],
    openGraph: {
      images: [product?.image],
    },
  };
}

const ProductSlug = async ({ params }) => {
  const { slug } = await params;

  const { attributes } = await getShowingAttributes();

  const { relatedProducts, products, reviews, error } =
    await getShowingStoreProducts({
      category: "",
      slug: slug,
    });

  const product = Products?.find((p) => p.id === parseInt(slug));
  console.log("products", product);
  return (
    <>
      <ProductScreen
        product={product}
        reviews={reviews}
        attributes={attributes}
        relatedProducts={relatedProducts}
      />
    </>
  );
};

export default ProductSlug;
