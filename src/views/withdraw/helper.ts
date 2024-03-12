export enum ECheckboxSelect {
    alipay = "ALI_PAY",
    wechat = "WECHAT_PAY",
}
export const withdrawTypeList = [
    {
        name: "支付宝",
        type: ECheckboxSelect.alipay,
        icon: "./assets/hybrid/icon_alipay.png",
        field: "ali_account"
    },
    {
        name: "微信",
        type: ECheckboxSelect.wechat,
        icon: "./assets/hybrid/icon_wechat.png",
        field: "wechat_nickname"
    },
];

export type WithdrawTypeListItem = (typeof withdrawTypeList)[number];