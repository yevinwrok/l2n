import http from "./http";


interface IShareIntro {
    today_price: number;
    total_price: number;
    balance: number;
}
export function getShareIntro(): Promise<IShareIntro> {
    return http.get(
        "/invitation_wallet",
        {}
    )
}

// is_partner: true,
//     total_first_cnt: 0,
//     user_first_cnt: 0,
//     technician_first_cnt: 0,
//     total_second_cnt: 2,
//     user_second_cnt: 2,
//     technician_second_cnt: 0,
//     total_price: 0,
//     user_price: 0,
//     technician_price: 0,
//     order_user_cnt: 0,
//     order_user_rate: 0.0,
//     order_technician_cnt: 0,
//     order_technician_rate: 0.0,
export interface IShareDetail {
    is_partner: boolean;
    total_first_cnt: number;
    user_first_cnt: number;
    technician_first_cnt: number;
    total_second_cnt: number;
    user_second_cnt: number;
    technician_second_cnt: number;
    total_price: number;
    user_price: number;
    technician_price: number;
    order_user_cnt: number;
    order_user_rate: number;
    order_technician_cnt: number;
    order_technician_rate: number;
}
export function getShareDetail(): Promise<IShareDetail> {
    return http.get(
        "/invitation_statistic",
        {}
    )
}

export interface IRewarded {
    page: {
        page: number,
        limit: number,
        total_record: number,
        total_page: number
    },
    data: {
        nickname: string,
        price: number,
        create_time: number,
        source: number,
        status: string,
        user_type: string,
        contribute_id: number,
        real_name: string
    }[]
}
export function getRewarded({
    type, page, limit = 20
}: {
    type: "rewarded" | "unrewarded",
    page: number,
    limit: number,
}): Promise<IRewarded> {
    return http.post(
        type === 'rewarded' ? "/invitation_award_list" : "/invitation_no_award_list",
        {
            page,
            limit
        }
    )
}