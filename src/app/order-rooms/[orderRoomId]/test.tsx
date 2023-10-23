import { OrderChat, orderChatFromJson } from "@/domain/order_chat";
import { OrderRoom, orderRoomFromJson } from "@/domain/order_room";
import { Shop, shopFromJson } from "@/domain/shop";
import { auth, db } from "@/providers/firebase";
import { DocumentReference, Query, collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { atomFamily, selectorFamily } from "recoil";
import { OrderRoomState } from "./state";

/// repository
// order_room
export interface IOrderRoomRepo {
    getDoc: () => Promise<OrderRoom>;
    getDocs: () => Promise<OrderRoom[]>;
}

export class OrderRoomRepo implements IOrderRoomRepo {
    constructor(private orderRoomId: string) { }

    private getDocRef(): DocumentReference {
        return doc(db, "order_rooms", this.orderRoomId);
    }

    private getQuery(): Query {
        return query(collection(db, "order_rooms"));
    }

    async getDoc(): Promise<OrderRoom> {
        return await getDoc(this.getDocRef()).then(
            (value) => {
                if (value.data() == undefined) {
                    throw "orderRoom is null";
                }
                return orderRoomFromJson(value.data()!);
            }
        );
    }

    async getDocs(): Promise<OrderRoom[]> {
        return await getDocs(this.getQuery()).then((qs) => {
            return qs.docs.map((doc) => orderRoomFromJson(doc.data()));
        });
    }
}

export const orderRoomRepoAtomFamily = atomFamily<IOrderRoomRepo, string>({
    key: "orderRoomRepoAtomFamily",
    default: (orderRoomId: string) => new OrderRoomRepo(orderRoomId),
});

// order_chat
export interface IOrderChatRepo {
    getDoc: () => Promise<OrderChat>;
    getDocs: () => Promise<OrderChat[]>;
}

export class OrderChatRepo implements IOrderChatRepo {
    constructor(private orderRoomId: string) { }

    private getDocRef(): DocumentReference {
        return doc(db, "order_chats", this.orderRoomId);
    }

    private getQuery(): Query {
        return query(collection(db, `order_rooms/${this.orderRoomId}/order_chats`));
    }

    async getDoc(): Promise<OrderChat> {
        return await getDoc(this.getDocRef()).then(
            (value) => {
                if (value.data() == undefined) {
                    throw "orderChat is null";
                }
                return orderChatFromJson(value.data()!);
            }
        );
    }

    async getDocs(): Promise<OrderChat[]> {
        return await getDocs(this.getQuery()).then((qs) => {
            return qs.docs.map((doc) => {
                console.log(doc.data());
                return orderChatFromJson(doc.data());
            });
        });
    }
}

export const orderChatRepoAtom = atomFamily<IOrderChatRepo, string>({
    key: "orderChatRepoAtom",
    default: (orderChatId: string) => new OrderChatRepo(orderChatId),
});

// shop
export interface IShopRepo {
    getDoc: () => Promise<Shop>;
    getDocs: () => Promise<Shop[]>;
}

export class ShopRepo implements IShopRepo {
    constructor(private shopId: string) { }

    private getDocRef(): DocumentReference {
        return doc(db, "shops", this.shopId);
    }

    private getQuery(): Query {
        return query(collection(db, "shops"));
    }

    async getDoc(): Promise<Shop> {
        return await getDoc(this.getDocRef()).then(
            (value) => {
                if (value.data() == undefined) {
                    throw "shop is null";
                }
                return shopFromJson(value.data()!);
            }
        );
    }

    async getDocs(): Promise<Shop[]> {
        return await getDocs(this.getQuery()).then((qs) => {
            return qs.docs.map((doc) => shopFromJson(doc.data()));
        });
    }
}

export const shopRepoAtom = atomFamily<IShopRepo, string>({
    key: "shopRepoAtom",
    default: (shopId: string) => new ShopRepo(shopId),
});


/// 非同期Selector
export const orderRoomSelector = selectorFamily<OrderRoomState, string>({
    key: "orderRoomSelector",
    get: (orderRoomId: string) => async ({ get }) => {
        const uid = auth.currentUser?.uid;
        if (uid == undefined) {
            throw "";
        }

        const orderRoomRepo = get(orderRoomRepoAtomFamily(orderRoomId));
        const orderChatRepo = get(orderChatRepoAtom(orderRoomId));
        const shopRepo = get(shopRepoAtom('shopId'));

        // order_room を取得する
        const orderRoom: OrderRoom | null = await orderRoomRepo.getDoc();

        // エラー処理
        if (orderRoom == null) {
            throw "doc is null";
        } else if (orderRoom.isClosed) {
            throw "order room is closed";
        } else if ((orderRoom.userIds as any[]).indexOf(uid) == -1) {
            throw "user is not joined";
        }

        //todo Shop を取得
        const shop: Shop | null = await shopRepo.getDoc();
        if (shop == null) throw "shop is null";

        /// OrderChats 取得
        const orderChats: OrderChat[] = await orderChatRepo.getDocs();

        console.log(orderRoom);
        console.log(shop); 2
        console.log(orderChats);

        return {
            orderRoom: orderRoom,
            shop: shop,
            orderChats: orderChats,
        };
    },
});
