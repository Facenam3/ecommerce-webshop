import {graphqlRequest} from "./graphqlClient";

const CREATE_ORDER_MUTATION = `
    mutation CreateOrder($input: CreateOrderInput!) {
        createOrder(input: $input) {
            id
        }
    }
`;

export async function createOrder(input) {
    const data = await graphqlRequest(CREATE_ORDER_MUTATION, {input});

    return data.createOrder;
};