# 程序注意事项

## 命名规范

### views 下的文件夹命名

views 下面的文件夹代表着模块的名字

由名词组成（car、order、cart）

单词只能有一个（good: car order cart）（bad: carInfo carpage）

尽量是名词（good: car）（bad: greet good）

以小写开头（good: car）（bad: Car）

### views 下的 vue 文件命名

views 下面的 vue 文件代表着页面的名字

放在模块文件夹之下

只有一个文件的情况下不会出现文件夹，而是直接放在 views 目录下面，如 Login Home

尽量是名词

大写开头，开头的单词就是所属模块名字（CarDetail、CarEdit、CarList）

名字至少两个单词（good: CarDetail）（bad: Car）

常用结尾单词有（Detail、Edit、List、Info、Report）

以 Item 结尾的代表着组件（CarListItem、CarInfoItem）

### vue 方法放置顺序

1. components
2. props
3. data
4. created
5. mounted
6. activited
7. update
8. beforeRouteUpdate
9. methods
10. filter
11. computed
12. watch

### method 自定义方法命名

动宾短语
1. good：jumpPage、openCarInfoDialog
2. bad：go、nextPage、show、open、login
3. ajax 方法以 get、post 开头，以 data 结尾
    1. good：getListData、postFormData
    2. bad：takeData、confirmData、getList、postForm
4. 事件方法以 on 开头
    1. onTypeChange、onUsernameInput
    2. init、refresh 单词除外
5. 尽量使用常用单词开头（set、get、open、close、jump）
6. 驼峰命名
    1. good: getListData
    2. bad: get_list_data、getlistData

### data props 方法注意点

1. 使用 data 里的变量时请先在 data 里面初始化
2. props 指定类型，也就是 type
3. props 改变父组件数据 基础类型用 $emit ，复杂类型直接改
4. ajax 请求数据用上 isLoading、isError 变量
5. 不命名多余数据，现在是详情页、你的数据是 ajax 请求的，那就直接声明一个对象叫 d，而不是每个字段都声明
6. 表单数据请包裹一层 form
7. 生命周期方法注意点: 不在 mounted、created 之类的方法写逻辑，取 ajax 数据，
8. 在 created 里面监听 Bus 事件

### 文件路径

```
src
    assets
        ...
    components
        ...
    views
        car
            CarEdit.vue
            CarList.vue
            CarDetai.vue
        user
            UserDetail.vue
            UserEdit.vue
            UserPasswordRest.vue
        customer
            CustomerCardItem.vue
            CustomerList.vue

```

example: 

```vue
// CarList.vue
<template>
    <div class="container">
        <ul>
            <li v-for="car in carList" :key="car.id">
                <img src="car.logo" alt="">
                <p>{{car.name | empty}}</p>
            </li>
        </ul>
        <button @click="loadNextPage">下一页</button>
        <div class="last" v-show="isLast">已经没有更多了...</div>
        <div class="loading" v-show="isLoading">正在加载...</div>
        <div class="error" v-show="isError" @click="getCarListData">加载错误，点击 <span class="font-blue">这里</span> 重试</div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                carList: [],
                totalPage: 1, // 总页数
                page: 0, // 当前页数
                isLoading: false, // 是否正在加载
                isError: false // 是否加载错误
            }
        },
        mounted() {
            this.loadNextPage();
        },
        methods: {
            // 获取列表数据
            getCarListData() {
                let data = {
                    page: this.page, // 当前页数
                    pageSize: 10 // 每页条数 
                }

                this.isLoading = true;
                this.isError = false;
                this.$ajaxGet('/car/list', data).then(data => {
                    // 加载成功
                    this.carList.concat(data.list);
                    this.page = data.page;
                    this.totalPage = data.totalPage
                    
                    this.isLoading = false;
                }).catch(() => {
                     //  加载列表失败
                    this.isLoading = false;
                    this.isError = true;
                });
            },
            // 下一页
            loadNextPage() {
                if(this.page <= this.totalPage) {
                    this.page ++;
                    this.getCarListData();
                }
            }
        },
        filters: {
            empty(value) {
                return value || '未知';
            }
        },
        computed: {
            // 是否是最后一条
            isLast() {
                return !this.isLoading && this.carList.length > 10 && !this.isError && this.page >= this.totalPage;
            }
        }
    }
</script>
```
## 参考资料

本项目命名规范来自于
https://segmentfault.com/a/1190000009805187

参考
https://github.com/PanJiaChen/vue-element-admin

公司内网可以在这个地址查看
http://139.217.129.2:7592/#/login?redirect=%2Fdashboard

