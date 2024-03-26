export const surveyList = [
    {
        title: "您的性别",
        type: "s",
        field: "gender",
        options: [
            {
                label: "男",
                input: false
            },
            {
                label: "女",
                input: false
            }
        ]
    },
    {
        title: "您的年龄",
        field: "age",
        type: "s",
        options: [
            {
                label: "20-25",
                input: false
            },
            {
                label: "26-30",
                input: false
            },
            {
                label: "30-35",
                input: false
            },
            {
                label: "36-40",
                input: false
            },
            {
                label: "40以上",
                input: false
            },
        ]
    },
    {
        title: "您所在城市",
        type: "d",
        field: "city",
    },
    {
        title: "您用过其他上门服务按摩吗",
        type: "s",
        field: "other_app",
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
        field: "care",
        sort: true,
        options: [
            {
                label: "技师手法",
                input: false
            },
            {
                label: "技师颜值",
                input: false
            },
            {
                label: "技师态度",
                input: false
            },
            {
                label: "技师跟自己位置的距离",
                input: false
            },
        ]
    },
    {
        title: "您选择爱到家上门推拿的理由",
        type: "s",
        field: "reason",
        options: [
            {
                label: "老品牌，比较放心",
                input: false
            },
            {
                label: "看到了广告，尝试下单体验下",
                input: false
            },
            {
                label: "技师比较多，服务好",
                input: false
            },
            {
                label: "无意中网上搜到，觉得新奇体验下",
                input: false
            },
            {
                label: "其他",
                input: true
            }
        ]
    },
    {
        title: "为了您体验更好，您有哪些建议?",
        field: "suggestion",
        type: 'i'
    }
]