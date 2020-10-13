var DatatablesBasicBasic={
    init:function(){
        $("#tableUsers").DataTable({
            columnDefs: [
                { orderable: true, className: 'reorder', targets: [0, 1, 2, 3, 4] },
                { orderable: false, targets: '_all' }
            ]
        })
    }
};
jQuery(document).ready(
    function(){
        DatatablesBasicBasic.init()
    }
);