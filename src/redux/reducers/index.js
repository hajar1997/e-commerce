import { example1 } from "../types";

export const exampleReducer = (data = "Test 1", action) => {
    switch (action.type) {
        case example1:
            return action.payload
            break;
        default:
            return data
            break;
    }
}