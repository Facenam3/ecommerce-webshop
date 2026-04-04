import {graphqlRequest} from "./graphqlClient";

import { CREATE_ORDER_MUTATION } from "./queires";

export async function createOrder(input) {
    const data = await graphqlRequest(CREATE_ORDER_MUTATION, {input});

    return data.createOrder;
};