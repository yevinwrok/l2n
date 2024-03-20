import * as echarts from 'echarts/core';
import {
    TitleComponent,
    type TitleComponentOption,
    ToolboxComponent,
    type ToolboxComponentOption,
    TooltipComponent,
    type TooltipComponentOption,
    GridComponent,
    type GridComponentOption,
    LegendComponent,
    type LegendComponentOption
} from 'echarts/components';
import { LineChart, type LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition
]);

type EChartsOption = echarts.ComposeOption<
    | TitleComponentOption
    | ToolboxComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | LegendComponentOption
    | LineSeriesOption
>;





export function mkOpt(params: EChartsOption = {}): EChartsOption {
    return Object.assign({
        title: {},
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            },
            position: function (point) {
                if (window.innerWidth / 2 > point[0]) {
                    return {
                        left: point[0],
                        top: point[1]
                    }
                } else {
                    return {
                        right: window.innerWidth - 10 - point[0],
                        top: point[1]
                    }
                }

            }

        },
        // legend: {
        //     data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        // },
        toolbox: {
            feature: {
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '4%',
            top: "10%",
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: []
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            
        ]
    } as EChartsOption, params)
}




export function initChart(chartDom: HTMLElement, opt = {}): echarts.ECharts {
    var myChart = echarts.init(chartDom);
    myChart.setOption(mkOpt(opt));
    return myChart
}