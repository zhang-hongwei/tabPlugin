function changeTab(container, defaultIndex) {
    var $box = $(container);
    var $fir = $box.children(':first'),
        $lis = $fir.children(),
        $divs = $box.children('div');
    defaultIndex = defaultIndex || 0;
    var st = defaultIndex || 0;
    $lis[defaultIndex].className = 'select';
    $divs[defaultIndex].className = 'select';

    function change(index) {

        $lis[st].className = null;
        $divs[st].className = null;
        $lis[index].className = 'select';
        $divs[index].className = 'select';
        st = index;
    }

    for (var i = 0; i < $lis.length; i++) {
        $lis[i].index = i;

        $lis[i].onclick = function () {
            change(this.index);

        }
    }
}

changeTab('#tabBox1', 0);
changeTab('#tabBox2', 0);
changeTab('#tabBox3', 0);