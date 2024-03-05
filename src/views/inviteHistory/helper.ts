import dayjs from "dayjs"
interface ITableConfig {
    name: string,
    span: number,
    offset?: number,
    center?: boolean,
    right?: boolean,
    field: string,
    fieldHandler?: (val: any) => string
}
export let tableConfig_1: ITableConfig[] = [
    {
        name: "用户",
        span: 3,
        field: "nickname",
        fieldHandler(val: string) {
            return `<span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;width:100%;display:inline-block; ">${val}</span>`
        }
    },
    {
        name: "身份",
        span: 2,
        center: true,
        field: "user_type"
    },
    {
        name: "状态",
        span: 2,
        center: true,
        field: "status"
    },
    {
        name: "时间",
        span: 3,
        center: true,
        field: "create_time",
        fieldHandler(val: number) {
            return dayjs(val).format("MM/DD HH:mm")
        }
    },
    {
        name: "奖励金额",
        span: 2,
        right: true,
        field: "price",
        fieldHandler(val: number) {
            return `<span style="font-weight: bold">¥${val}</span>`
        }
    },
];


export let tableConfig_2: ITableConfig[] = [
    {
        name: "用户",
        span: 3,
        field: "nickname",
        fieldHandler(val: string) {
            return `<span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;width:100%;display:inline-block; ">${val}</span>`
        }
    },
    {
        name: "身份",
        span: 3,
        center: true,
        field: "user_type"
    },
    {
        name: "状态",
        span: 3,
        center: true,
        field: "status"
    },
    {
        name: "时间",
        span: 3,
        right: true,
        field: "create_time",
        fieldHandler(val: number) {
            return dayjs(val).format("MM/DD HH:mm")
        }
    },
];

export enum tableType {
    "rewarded" = "rewarded",
    "unrewarded" = "unrewarded"
}
tableConfig_1.forEach(item => {
    if (!item.fieldHandler) {
        item.fieldHandler = (val) => val
    }
})
tableConfig_2.forEach(item => {
    if (!item.fieldHandler) {
        item.fieldHandler = (val) => val
    }
})
export let tableConfig = {
    [tableType.rewarded]: tableConfig_1,
    [tableType.unrewarded]: tableConfig_2
}

// "is_partner": true,
//     "total_first_cnt": 2,
//     "user_first_cnt": 2,
//     "technician_first_cnt": 0,
//     "total_second_cnt": 2,
//     "user_second_cnt": 2,
//     "technician_second_cnt": 0,
//     "total_price": 0,
//     "user_price": 0,
//     "technician_price": 0,
//     "order_user_cnt": 0,
//     "order_user_rate": 0.0,
//     "order_technician_cnt": 0,
//     "order_technician_rate": 0.0
