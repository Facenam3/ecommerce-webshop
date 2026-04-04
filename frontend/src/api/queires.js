export const CREATE_ORDER_MUTATION = `
    mutation CreateOrder($input: CreateOrderInput!) {
        createOrder(input: $input) {
            id
        }
    }
`;

export const CATEGORIES_QUERY = `
  query {
    categories {
      id
      name
    }
  }
`;

export const PRODUCTS = `
    query GetProducts {
        products {
            id
            name
            brand
            inStock
            gallery
            prices {
                amount
                currency {
                    label
                    symbol
                }
            }
            attributes {
                id
                name
                type
                items {
                    id
                    displayValue
                    value
                }
            }
        }
    }
`;

export const PRODUCTS_BY_CATEGORY_QUERY = `
    query GetProductsByCategory($categoryId: ID!) {
        products(categoryId: $categoryId) {
            id
            name
            brand
            inStock
            gallery
            prices {
                amount
                currency {
                    label
                    symbol
                }
            }
            attributes {
                id
                name
                type
                items {
                    id
                    displayValue
                    value
                }
            }
        }
    }
`;

export const PRODUCT_BY_ID = `
    query GetProductById($id: String!) {
        product(id: $id) {
            id
            name
            brand
            inStock
            description
            gallery
            prices {
                amount
                currency {
                    label
                    symbol
                }
            }
            attributes {
                id
                name
                type
                items {
                    id
                    displayValue
                    value
                }
            }
        }
    }
`;

