export const surveyList = [
    {
        title: "您的性别",
        type: "s",
        fields: "sex",
        options: [
            {
                label: "男",
                value: 1,
                input: false
            },
            {
                label: "女",
                value: 2,
                input: false
            }
        ]
    },
    {
        title: "您的年龄",
        fields: "why",
        type: "s",
        options: [
            {
                label: "20-25",
                value: 1,
                input: false
            },
            {
                label: "26-30",
                value: 2,
                input: false
            },
            {
                label: "30-35",
                value: 3,
                input: false
            },
            {
                label: "36-40",
                value: 4,
                input: false
            },
            {
                label: "40以上",
                value: 5,
                input: false
            },
        ]
    },
    {
        title: "您用过其他上门服务按摩吗",
        type: "s",
        fields: "dd",
        options: [
            {
                label: "有",
                value: 1,
                input: true
            },
            {
                label: "没有",
                value: 2,
                input: false
            },
        ]
    },
    {
        title: "您在选择上门推拿时候更在乎什么（可以多选）",
        type: "m",
        fields: "dd",
        options: [
            {
                label: "技师手法",
                value: 1,
                input: false
            },
            {
                label: "技师颜值",
                value: 2,
                input: false
            },
            {
                label: "技师态度",
                value: 3,
                input: false
            },
            {
                label: "技师跟自己位置的距离",
                value: 4,
                input: false
            },
        ]
    },
    {
        title: "您选择往约上门推拿的理由",
        type: "s",
        fields: "dd",
        options: [
            {
                label: "老品牌，比较放心",
                value: 1,
                input: false
            },
            {
                label: "看到了广告，尝试下单体验下",
                value: 2,
                input: false
            },
            {
                label: "技师比较多，服务好",
                value: 3,
                input: false
            },
            {
                label: "无意中网上搜到，觉得新奇体验下",
                value: 4,
                input: false
            },
            {
                label: "其他",
                value: 5,
                input: true
            }
        ]
    },
    {
        title: "为了您体验更好，您有哪些建议?",
        fields: "dddd",
        type: 'i'
    }
]