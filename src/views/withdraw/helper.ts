export enum ECheckboxSelect {
    alipay,
    wechat,
}
export const withdrawBtnList = [10, 30, 50, 100, 500, 1000];
export const withdrawTypeList = [
    {
        name: "支付宝",
        type: ECheckboxSelect.alipay,
        icon: "./assets/hybrid/icon_alipay.png",
        isBind: false,
    },
    {
        name: "微信",
        type: ECheckboxSelect.wechat,
        icon: "./assets/hybrid/icon_wechat.png",
        isBind: true,
    },
];

export type WithdrawTypeListItem = (typeof withdrawTypeList)[number];