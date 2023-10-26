import { orderBy, where } from "firebase/firestore";

// shop
export const shopsCollection = "shops";
export const seatsCollection = "seats";
export const coverChargeCollection = "cover_charges";
export const optionsCollection = "options";
export const menusCollection = "menus";
export const categoriesCollection = "categories";
export const normalBHsCollection = "normal_business_hours";
export const holidayBHsCollection = "holiday_business_hours";

// payment
export const orderPaymentsCollection = "order_payments";
export const payersCollection = "payers";
export const tipPaymentsCollection = "tip_payments";

// order
export const orderRoomsCollection = "order_rooms";
export const orderCartsCollection = "order_carts";
export const orderHistoriesCollection = "order_histories";
export const callStaffsCollection = "call_staffs";
export const orderChatsCollection = "order_chats";
export const orderRoomUsersCollection = "order_room_users";

// user
export const usersCollection = "users";
export const userAuthInfoCollection = "user_auth_info";
export const cardInfoCollection = "card_info";
export const followingsCollection = "followings";

// firebase
export const desc = "desc";

// orderBy
export const updatedOrderBy = orderBy("updatedAt", "desc");

// where
export const activeWhere = where("isActive", "==", true);

// id
export const kOrderRoomId = "orderRoomId";
export const kShopId = "shopId";
// export const kId = "Id";
// export const kId = "Id";
// export const kId = "Id";
// export const kId = "Id";
