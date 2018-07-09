var app = new Vue({
    el: '#app',
    data: {

        list: [
            {
                id: 1,
                name: 'iPhone7',
                price: 6188,
                count: 1,
                checked: false
            },
            {
                id: 2,
                name: 'iPad Pro',
                price: 5888,
                count: 1,
                checked: false
            },
            {
                id: 3,
                name: 'MacBook Pro',
                price: 21488,
                count: 1,
                checked: false
            }
        ]
    },
    computed: {
        totalPrice: function () {
            var total = 0;
            this.list.forEach(function (t) {
                if (t.checked) {
                    total += t.price * t.count;
                }
            })

            console.log(total)
            //格式化成千分制
            return total.toString().replace(/\B(?=(\d{3})+S)/g, ',');
        },
        selectAll: {
            get: function () {
                return this.selectCount == this.list.length;
            },
            set: function (value) {
                this.list.forEach(function (t) {
                    t.checked = value;
                });
                return value;
            }
        },
        selectCount: {
            get: function () {
                var count = 0;
                this.list.forEach(function (t) {
                    console.log(t.checked);
                    if (t.checked) {
                        count++;

                    }
                });
                console.log(count);
                return count;
            }
        },




    },
    methods: {
        handleReduce: function (index) {
            if (this.list[index].count === 1) return;
            this.list[index].count--;
        },
        handleAdd: function (index) {
            this.list[index].count++;
        },
        handleRemove: function (index) {
            this.list.splice(index, 1);
        }


    }


})

