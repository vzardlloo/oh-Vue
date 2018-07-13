Vue.component('tabs', {
    template: '\
    <div class="tabs"> \
        <div class="tabs-bar"> \
            <!-- 标签页标题，使用v-for -->\
            <div \
            :class="tabCls(item)" \
            v-for="(item,index) in navList" \
            @click="handleChange(index)">\
            {{ item.label }} \
            </div>\
        </div> \
        <div class="tabs-content"> \
            <!-- 这里的slot是嵌套的pane --> \
            <slot></slot> \
        </div> \
    </div>',
    props: {
        // 这里的value是为了可以使用v-model
        value: {
            type: [String, Number]
        }
    },
    data: function () {
        return {
            // 用来渲染tabs标题
            navList: [],
            currentValue: this.value
        }
    },
    methods: {
        //更改样式
        tabCls: function (item) {
            return [
                'tabs-tab',
                {
                    'tabs-tab-active': item.name === this.currentValue
                }
            ]
        },
        // 获取所有组件
        getTabs: function () {
            // 获取子组件中所有的pane组件
            return this.$children.filter(function (t) {
                return t.$options.name === 'pane';
            });
        },
        updateNav: function () {
            this.navList = [];

            var _this = this;

            this.getTabs().forEach(function (pane, index) {
                _this.navList.push({
                    label: pane.label,
                    name: pane.name || index
                });

                if (!pane.name) pane.name = index;
                if (index === 0) {
                    if (!_this.currentValue) {
                        _this.currentValue = pane.name || index;
                    }
                }
            });

            this.updateStatus();
        },

        updateStatus() {
            var tabs = this.getTabs();
            var _this = this;
            // 显示当前选中的tab对应的pane组件，隐藏没有选中的组件
            tabs.forEach(function (tab) {
                return tab.show = tab.name === _this.currentValue;
            })
        },
        handleChange: function (index) {
            var nav = this.navList[index];
            var name = nav.name;
            //改变当前选中的tab,并触发下面的watch
            this.currentValue = name;
            // 更新value
            this.$emit('input', name);
            //触发一个自定义事件，供父级使用
            this.$emit('on-click', name);
        },
    },
    watch: {
        value: function (val) {
            this.currentValue = val;
        },
        currentValue: function () {
            this.updateStatus();
        }

    }


})