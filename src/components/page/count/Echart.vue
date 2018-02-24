<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 图表</el-breadcrumb-item>
                <el-breadcrumb-item>基础图表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="plugins-tips">
            vue-echarts-v3：基于vue2和eCharts.js3的图表组件。
            访问地址：<a href="https://github.com/xlsdg/vue-echarts-v3" target="_blank">vue-echarts-v3</a>
        </div>
        <!-- <div class="echarts">
            <IEcharts :option="line" ></IEcharts>
        </div> -->
        <!-- <div class="echarts">
            <IEcharts :option="bar" ></IEcharts>
        </div> -->
        <div class="echarts">
            <IEcharts :option="pie" ></IEcharts>
        </div>
        <!-- <div class="echarts">
            <IEcharts :option="pie_radius" ></IEcharts>
        </div> -->
    </div>
</template>

<script>
// import IEcharts from 'vue-echarts-v3';
import IEcharts from 'vue-echarts-v3/src/full.vue';
import api_count from 'api/count'
import { mapGetters } from 'vuex'

export default {
    components: {
        IEcharts
    },
    data: () => ({
        line: {
            color:["#20a0ff","#13CE66","#F7BA2A","#FF4949"],
            title: {
                text: '曲线图'
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis:{},
            series: [
                {
                    name: "销量",
                    type: "line",
                    data: [5, 20, 36, 10, 10, 20]
                }
            ]
        },
        bar: {
            color:["#20a0ff","#13CE66","#F7BA2A","#FF4949"],
            title: {
                text: '柱状图'
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis:{},
            series: [
                {
                    name: "销量",
                    type: "bar",
                    data: [5, 20, 36, 10, 10, 20]
                }
            ]
        },
        pie: {
            color:["#20a0ff","#13CE66","#F7BA2A","#FF4949","#61a0a8"],
            title : {
                text: '当前用户来源数据',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                // data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋"]
                data: []
            },
            series : [
                {
                    name: '用户来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:[
                        // {value:335, name:'衬衫'},
                        // {value:310, name:'羊毛衫'},
                        // {value:234, name:'雪纺衫'},
                        // {value:135, name:'裤子'},
                        // {value:548, name:'高跟鞋'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
            
        },
        pie_radius:{
            color:["#20a0ff","#13CE66","#F7BA2A","#FF4949","#61a0a8"],
            title : {
                text: '环形图',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋"]
            },
            series : [
                {
                    name: '销量',
                    type: 'pie',
                    radius : ['40%','60%'],
                    data:[
                        {value:335, name:'衬衫'},
                        {value:310, name:'羊毛衫'},
                        {value:234, name:'雪纺衫'},
                        {value:135, name:'裤子'},
                        {value:548, name:'高跟鞋'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        },
        fromKeyList: [],
        pieColor: []
    }),
    computed: {
        ...mapGetters([
            'get_color',  // 获取颜色
        ])
    },
    methods: {
        // getList(val){
        //     api_count.userList({fromKey: val}).then(res=> {
        //         let data = res.data.data.list
        //         this.dataTotal = res.data.data.total
        //     })
        // },
        getFromkey(){
            api_count.fromKeyList().then(res=> {
                let data = res.data.data
                let len = data.length
                let arr = []
                let seriesArr = []
                let colorArr = this.get_color
                for(let [k, v] of data.entries()){
                    arr.push(colorArr[k])
                    let value = null
                    api_count.userList({fromKey: v}).then(response=> {
                        value = response.data.data.total
                        let obj = {
                            value: value,
                            name: v
                        }
                        seriesArr.push(obj)
                    })
                }
                this.pieColor = arr
                this.fromKeyList = res.data.data
                this.pie.color = arr
                this.pie.legend.data = res.data.data
                this.pie.series[0].data = seriesArr
            })
        },
    },
    mounted(){
        this.getFromkey()
    }
}
</script>




<style scoped>

.echarts {
    float: left;
    width: 500px;
    height: 400px;
}

</style>