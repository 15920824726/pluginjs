(function (window, undefined) {
    var module = {};//定义组件
    //插件1:警告框
    var popAlert = function (opt) {
        this.opt = opt || {};
    };
    popAlert.prototype.show = function () {
        var oDiv = document.createElement("div"),
            that = this,
            aClose;
        this.opt['class'] ?
            oDiv.classList.add('alert', this.opt['class'])
            : oDiv.classList.add('alert', "alert-info");
        oDiv.innerHTML = "<button  class='close'>x</button>";
        oDiv.innerHTML += this.opt['content'] || '请添加内容';
        document.body.appendChild(oDiv);
        var that = this;
        aClose = document.querySelectorAll(".alert > .close");
        aClose.forEach(function (ele) {
            ele.addEventListener('click', function () {
                that.hide(this.parentNode);
            });
        });
    };
    popAlert.prototype.hide = function (obj) {
        obj.style.display = 'none';
    };
    //插件2：模态框
    var popModal = function (opt) {
        this.opt = opt || {};
    };
    //显示
    popModal.prototype.show = function () {
        var that = this;
        var modalHtml = "<div class='modal fade'>";//进入的方式：飞入
        modalHtml += "<div class='modal-dialog'>";//布局
        modalHtml += "<div class='modal-content'>";//模态框盒子
        //标题
        modalHtml += "<div class='modal-header'>";
        modalHtml += "<button type='button' class='close'>x</button>";
        modalHtml += "<h4 class='modal-title'>" + (this.opt['title'] || '可定制title标题') + "</h4>"
        modalHtml += "</div>";
        //内容
        modalHtml += "<div class='modal-body'>";
        modalHtml += this.opt['content'] || '可定制content内容';
        modalHtml += "</div>";
        // 底部内容
        modalHtml += "<div class='modal-footer'>";
        modalHtml += this.opt['footer'] || '可定制footer底部内容';
        modalHtml += "</div>";
        //尾部标签
        modalHtml += "</div>";
        modalHtml += "</div>";
        modalHtml += "</div>";
        //按钮
        modalHtml += "<h2>";
        modalHtml += this.opt['tip'] || "可定制tip提示信息";
        modalHtml += "</h2><button class='btn btn-primary btn-lg' data-toggle='modal' data-target='#myModal'>";
        modalHtml += this.opt['btn'] || "可定制btn按钮文本";
        //输出到bady
        var oldHTML = document.body.innerHTML;    //保存旧的文档
        /*
             注意edwin 经过改变了 因为 document.body.innerHTML = oldHTML + modalHtml 会使popAlert中的监听click事件失效
         */
        // document.body.innerHTML = oldHTML + modalHtml;//添加插件
        var parentDiv = document.createElement('div');
        parentDiv.classList.add['parent'];
        parentDiv.innerHTML = modalHtml
        document.body.appendChild(parentDiv);

        //绑定x点击事件 关闭框
        var that = this;
        var oClose = document.querySelector(".modal .close")
        oClose.addEventListener("click", function () {
            that.hide(this);
        });
        //绑定显示事件
        var open = document.querySelector(".btn[data-toggle=modal]");
        open.onclick = function () {
            var oModal = document.querySelector(".modal");
            oModal.style.display = 'block';
            oModal.classList.add('in');
            //遮罩层
            var backdrop = document.createElement("div"); //新建一个div
            backdrop.setAttribute('class', 'modal-backdrop in');    //为div添加类名
            document.body.appendChild(backdrop);
        }
    }

    popModal.prototype.hide = function (obj) {
        var objParents = findNode(obj, "modal"); //当前.close的父辈元素 .modal
        objParents.style.display = 'none';//隐藏模态
        document.body.removeChild(document.querySelector(".modal-backdrop"));
        // document.querySelector(".modal-backdrop").style.display = "none";
    }
    //公共的方法:
    //找到关闭按钮的指定父节点
    function findNode(obj, classname) {
        var aClass;
        var regExp = new RegExp(classname);
        while (obj = obj.parentNode) {
            aClass = Array.prototype.slice.call(obj.classList); //类数组--->数组
            if (aClass.length && regExp.test(aClass[0]) && aClass[0].length == 5) {
                break;
            }
        }
        return obj;
    }
    //把插件存入组件
    module = {
        popAlert: popAlert,
        popModal: popModal
    };

    window.module = module;//把组件暴露到外部

})(window, undefined);