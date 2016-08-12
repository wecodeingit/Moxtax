'use strict';

function HeaderCtrl() {
    var vm = this;
    vm.showSideNav = function() {
        $('#cbp-spmenu-s1').toggleClass('cbp-spmenu-open');
    };

}

module.exports = HeaderCtrl;
