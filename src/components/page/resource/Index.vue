<template>
<div>
    <page-wrap>
        <div slot="sideLeft">
            <el-card>
                <div slot="header" class="header_part">
                    <p>图片资源</p>
                </div>

                <!-- 图片组列表 -->
                <div>
                    <el-menu theme="light" unique-opened>
                        <el-menu-item :index="item" :key="index" v-for="(item, index) in resourceList" @click.native="getList(item)">
                            {{item}}
                        </el-menu-item>
                    </el-menu>
                </div>
            </el-card>
        </div>

        <div slot="sideRight">
            <el-card>
                <div slot="header" class="header_part">
                    <p>{{content}}</p>
                </div>

                <div class="img_pane">
                    <image-card v-for="item in imgList" @deleteItem="deleteItem(item.id)" class="img_item">
                        <img :src="(preUrl+'/'+item.path)">
                        <p slot="title">{{item.name}}</p>
                    </image-card>
                    <add-img-item @callbackFn="getList(content)" :group="content" class="img_item"></add-img-item>
                </div>
            </el-card>
        </div>
    </page-wrap>
</div>
</template>



<script>
import api_resource from 'api/resource'
import ImgCard from 'components/common/ImgCard'
import AddImgItem from 'components/common/AddImgItem'

export default {
    name: 'resource-page',
    components: {
        'image-card': ImgCard,
        'add-img-item': AddImgItem,
    },
    data() {
        return {
            content: '内容',
            resourceList: [],
            imgList: []
        }
    },
    computed: {
        preUrl: function() {
            return sessionStorage.getItem('imageUrl')
        }
    },
    methods: {
        getList(val) {
            this.content = val
            let obj = {
                groupName: val
            }
            api_resource.list(obj).then(res => {
                this.imgList = res.data.data
            })
        },
        getGroupList() {
            api_resource.groupList().then(res => {
                this.resourceList = res.data.data
            })
        },
        deleteItem(val) {
            this.$confirm('删除后不能恢复，是否确定删除').then(() => {
                api_resource.delete({
                    id: val
                }).then(res => {
                    if (res.data.code == 0) {
                        this.$message.success('删除成功')
                        this.getList(this.content)
                    }
                })
            }).catch(() => {
                return
            })
        }
    },
    mounted() {
        this.getGroupList()
    }
}
</script>




<style scoped>
.img_pane {
    display: flex;
    flex-wrap: wrap;
}

.img_item {
    margin: 10px;
}

.header_part {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
