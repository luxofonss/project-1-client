import { delay, put, takeLatest, call } from 'redux-saga/effects';
import { REQUEST_STATE } from '~/app-configs';
import { apiGetAllOrder } from '~/app-data/order';
import { GET_ALL_ORDER, GET_ALL_ORDER_FAIL, GET_ALL_ORDER_SUCCESS } from './action';

function* handleGetAllOrder({ type, payload }) {
    try {
        const response = yield call(apiGetAllOrder, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(GET_ALL_ORDER_SUCCESS(response.data));
        } else {
            yield put(GET_ALL_ORDER_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* productSaga() {
    yield takeLatest(GET_ALL_ORDER().type, handleGetAllOrder);
}

// {
//     "id": 1,
//     "userAddress": "12 Xã Lũng Cú Huyện Đồng Văn Tỉnh Hà Giang",
//     "userPhone": "124",
//     "userEmail": "luxofons@gmail.com",
//     "userFullName": "Nguyen Van A",
//     "payment": "COD",
//     "status": "PENDING",
//     "fee": 500000,
//     "totalPrice": 7080000,
//     "createdAt": "2023-02-23T21:52:46.745Z",
//     "updatedAt": "2023-02-23T21:52:46.745Z",
//     "deletedAt": null,
//     "UserId": 2,
//     "PromoId": null,
//     "Promo": {
//         "code": null,
//         "percent": null
//     },
//     "hasStocks": {
//         "id": null,
//         "order_stocks": {
//             "quantity": null,
//             "createdAt": null,
//             "updatedAt": null,
//             "OrderId": null,
//             "StockId": null
//         },
//         "Size": {
//             "id": null,
//             "size": null
//         },
//         "Color": {
//             "id": null,
//             "color": null
//         },
//         "Product": {
//             "id": null,
//             "name": null,
//             "price": null,
//             "description": null,
//             "Images": {
//                 "id": null,
//                 "src": null
//             }
//         }
//     }
// },

// PENDING
// APPROVED
// DELIVERING
// COMPLETED
// REFUSED
// CANCELLED
