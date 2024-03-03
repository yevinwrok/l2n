interface ITableConfig {
    name: string,
    span: number,
    offset?: number,
    center?: boolean,
    right?: boolean,
}
export let tableConfig_1: ITableConfig[] = [
    {
        name: "用户",
        span: 2,
    },
    {
        name: "身份",
        span: 2,
        center: true,
    },
    {
        name: "状态",
        span: 2,
        center: true,
    },
    {
        name: "时间",
        span: 3,
        center: true,
    },
    {
        name: "奖励金额",
        span: 3,
        right: true,
    },
];


export let tableConfig_2: ITableConfig[] = [
    {
        name: "用户",
        span: 3,
    },
    {
        name: "身份",
        span: 3,
        center: true,
    },
    {
        name: "状态",
        span: 3,
        center: true,
    },
    {
        name: "时间",
        span: 3,
        right: true,
    },
];

export enum tableType {
    "left", "right"
}

export let tableConfig = {
    [tableType.left]: tableConfig_1,
    [tableType.right]: tableConfig_2
}
