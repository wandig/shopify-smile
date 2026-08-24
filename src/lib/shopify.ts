import { toast } from "sonner";

export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "hu0i4f-1k.myshopify.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = "99b7d9311e27561fa2bbce382e489dab";

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    images: { edges: Array<{ node: { url: string; altText: string | null } }> };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: { amount: string; currencyCode: string };
          compareAtPrice?: { amount: string; currencyCode: string } | null;
          availableForSale: boolean;
          selectedOptions: Array<{ name: string; value: string }>;
          image?: { url: string; altText: string | null } | null;
        };
      }>;
    };
    options: Array<{ name: string; values: string[] }>;
  };
}

export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Shopify: betaling vereist", {
      description: "De Shopify API vereist een actief abonnement. Upgrade je winkel via admin.shopify.com.",
    });
    return;
  }

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (data.errors) throw new Error(data.errors.map((e: { message: string }) => e.message).join(", "));
  return data;
}

export const PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id title description handle
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 20) {
            edges { node {
              url(transform: { maxWidth: 1600, preferredContentType: WEBP })
              altText
            } }
          }
          variants(first: 50) {
            edges { node {
              id title availableForSale
              price { amount currencyCode }
              compareAtPrice { amount currencyCode }
              selectedOptions { name value }
              image {
                url(transform: { maxWidth: 1600, preferredContentType: WEBP })
                altText
              }
            } }
          }
          options { name values }
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id title description handle
      priceRange { minVariantPrice { amount currencyCode } }
      images(first: 250) {
        edges { node {
          url(transform: { maxWidth: 1600, preferredContentType: WEBP })
          altText
        } }
      }
      variants(first: 100) {
        edges { node {
          id title availableForSale
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          selectedOptions { name value }
          image {
            url(transform: { maxWidth: 1600, preferredContentType: WEBP })
            altText
          }
        } }
      }
      options { name values }
    }
  }
`;

export function formatPrice(amount: string, _currencyCode: string) {
  const n = parseFloat(amount);
  return `${new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 0 }).format(n)},-`;
}

/** Laagste variantprijs die groter dan 0 is; null als geen enkele variant een prijs heeft. */
export function lowestPaidPrice(product: ShopifyProduct["node"]): { amount: string; currencyCode: string } | null {
  const fromRange = parseFloat(product.priceRange?.minVariantPrice?.amount ?? "0");
  if (fromRange > 0) return product.priceRange.minVariantPrice;

  const paid = (product.variants?.edges ?? [])
    .map((edge) => edge.node.price)
    .filter((price) => price && parseFloat(price.amount) > 0)
    .sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));

  return paid[0] ?? null;
}

/** Laagste betaalde variantprijs inclusief eventuele compareAtPrice. */
export function lowestPaidPriceWithCompare(product: ShopifyProduct["node"]): {
  price: { amount: string; currencyCode: string };
  compareAtPrice?: { amount: string; currencyCode: string } | null;
} | null {
  const paid = (product.variants?.edges ?? [])
    .map((edge) => edge.node)
    .filter((variant) => parseFloat(variant.price.amount) > 0)
    .sort((a, b) => parseFloat(a.price.amount) - parseFloat(b.price.amount));

  const first = paid[0];
  if (!first) return null;
  return { price: first.price, compareAtPrice: first.compareAtPrice };
}
