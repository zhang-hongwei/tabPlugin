


var box1 = document.getElementById('tabBox1'),
    box2 = document.getElementById('tabBox2'),
    box3 = document.getElementById('tabBox3');

function ChangeTab(container, defaultIndex) {
    this.init(container, defaultIndex);

}

ChangeTab.prototype = {
    constructor: ChangeTab,
    // 手动修改回原来的构造函数

    children: function (ele, tag) {

        var ary = [],
            nodeList = ele.childNodes;
        for (var i = 0; i < nodeList.length; i++) {
            var cur = nodeList[i];
            if (cur.nodeType === 1) {
                if (typeof tag !== 'undefined') {
                    cur.tagName.toUpperCase() === tag.toUpperCase() ? ary.push(cur) : null
                    continue;
                } else {

                    ary.push(cur);

                }
            }
        }
        return ary;
    },
    // 获取兄弟节点

    firstChild: function (ele) {
        var f = ele.firstChild;
        while (f && f.nodeType !== 1) {
            f = f.nextSibling;
        }
        return f;
    },
    // 获取第一个子节点

    addClass: function (ele, strClass) {


        strClass = strClass.replace(/^\s+|\s+$/g, '').split(/\s+/g);
        for (var i = 0; i < strClass.length; i++) {
            var item = strClass[i];
            if (this.hasClass(ele, item)) continue;
            ele.className += ' ' + item;

        }
        ele.className = ele.className.replace(/^\s+|\s+$/g, '').replace(/s\+/g, ' ');

    },
    //增加样式类名

    removeClass: function (curEle, strClass) {

        strClass = strClass.replace(/^\s+|\s+$/g, '').split(/\s+/g);
        var originalClass = curEle.className.replace(/\s+/g, '  ');
        for (var i = 0; i < strClass.length; i++) {
            var item = strClass[i],
                reg = new RegExp('(^| )' + item + '( |$)', 'g');
            reg.test(originalClass) ? originalClass = originalClass.replace(reg, ' ') : null;
        }
        curEle.className = originalClass.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
    },
    // 移除样式类名

    hasClass: function (curEle, strClass) {
        strClass = strClass.replace(/^\s+|\s+$/g, '').split(/\s+/g);
        var isMatch = true,
            originalClass = curEle.className;
        for (var i = 0; i < strClass.length; i++) {
            var item = strClass[i];
            var reg = new RegExp('(^| +)' + item + '( +|$)');
            if (!reg.test(originalClass)) {
                isMatch = false;
                break;
            }
        }
        return isMatch;
    },
    // 检查是否有给定的样式名

    defaultIndexEven: function () {
        this.oLis[this.defaultIndex].className = 'select';
        this.divList[this.defaultIndex].className = 'select'

    },
    //默认选中项

    index: function (curEle) {
        return this.prevAll(curEle).length;
    },
    //获取当前项的索引

    prevAll: function prevAll(curEle) {
        var ary = [],
            p = curEle.previousSibling;
        while (p) {
            if (p.nodeType === 1) {
                ary.unshift(p);
            }
            p = p.previousSibling;
        }
        return ary;
    },
    // 获取当前项的所有哥哥节点

    liveClick: function () {
        var _this = this;

        this.fir.onclick = function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (target.tagName.toLowerCase() === 'li') {
                _this.change(e.target);

            }
        }
    },
    // 绑定点击事件

    change: function (ele) {
        // 切换选项
        this.removeClass(this.oLis[this.st],'select');
        this.removeClass(this.divList[this.st],'select');


        this.addClass(ele, 'select');
        this.addClass(this.divList[this.index(ele)],'select');

        this.st = this.index(ele);


    },


    init: function init(container, defaultIndex) {
        // 初始化，该项目为插件的唯一入口
        this.container = container || null;
        this.defaultIndex = defaultIndex || 0;
        this.st = defaultIndex || 0;  // 用来记录上一次的样式
        this.fir = this.firstChild(this.container);
        this.oLis = this.children(this.fir);
        this.divList = this.children(this.container, 'div');
        this.defaultIndexEven();
        this.liveClick();
    }
};


var f1 = new ChangeTab(box1, 0);
var f2 = new ChangeTab(box2, 2);
var f3 = new ChangeTab(box3, 1);







