<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="echarts">
            <IEcharts :option="pie" ></IEcharts>
            <p class="data_resource" @click="toPage">查看数据源</p>
        </div>
    </div>
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/full.vue';
import api_count from 'api/count'
import { mapGetters } from 'vuex'

export default {
    components: {
        IEcharts
    },
    data: () => ({
        
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
                data: []
            },
            series : [
                {
                    name: '用户来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:[],
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
        pieColor: [],
        seriesArr: []
    }),
    computed: {
        ...mapGetters([
            'get_color',  // 获取颜色
        ])
    },
    methods: {
        getFromkey(){
            api_count.fromKeyList().then(res=> {
                let data = res.data.data
                let arr = []
                let colorArr = this.get_color
                for(let [k, v] of data.entries()){
                    arr.push(colorArr[k])
                    api_count.userList({fromKey: v}).then(response=> {
                        let obj = new Object()
                        obj = {
                            value: response.data.data.total,
                            name: v
                        }
                        this.seriesArr.push(obj)
                    })
                }
                this.pieColor = arr
                this.fromKeyList = res.data.data
                this.pie.color = Array.from(arr)
                this.pie.legend.data = res.data.data
                this.pie.series[0].data = this.seriesArr
            })
            
        },
        toPage(){
            this.$router.push('/user-count')
        }
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
.data_resource {
    color: #bbb;
    width: 100px;
}
.data_resource:hover {
    color: #2196f3;
    cursor: pointer;
}
</style>

