new Vue({
    el: '#app',
    data: {
        myform: {},
        model: {
            name: '',
            phone: '',
            identity: '',
            onephone: false,
            oneidentity: false,
            newtag: '',
            csrf_token:''
        }
    },
    methods: {
        add: function () {
            $.ajax({
                type: "POST",
                url: "/api/addtag",
                data: {
                    tagname: this.newtag,
                    _token:this.csrf_token
                },
                success: function (data) {
                    this.data.newtag = '';
                    alert('添加成功');
                }
            });
        },
        onephone: function () {
            this.$http.get('/api/onephone/' + this.model.phone.trim(), function (data, status, request) {
                if (data == 0) {
                    this.model.onephone = false;
                }
                if (data == 1) {
                    console.log(data);
                    this.model.onephone = true;
                }
            }).error(function (data, status, request) {
            });
        },
        oneidentity: function () {
            this.$http.get('/api/oneidentity/' + this.model.identity.trim(), function (data, status, request) {

                if (data == 0) {
                    this.model.oneidentity = false;
                }
                if (data == 1) {
                    this.model.oneidentity = true;
                }
            }).error(function (data, status, request) {
            });
        },
        onSubmit: function () {
            if (this.myform.$valid == true) {
                $('#myform').submit();
            } else {
                swal('No', '有一些没输入', 'error');
            }

        },

    }
});

