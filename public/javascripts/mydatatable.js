function CreateDataTable(id,url,columns) {
    var data_table= $(id).dataTable({
        "scrollX": true,
        "columnDefs": [
            { "orderable": false, "targets": 0 }
        ],
        "order": [[ 1, "desc" ]],
        "language": {
            "url": "/dist/i18n/Chinese.json"
        },
        "autoWidth": true,
        "ajax": url, 
        "columns":columns,
        "pagingType": "full_numbers", 
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
    });
    return data_table;
}

function ExportDataTable(id,url,columns) {
    var data_table= $(id).dataTable({
        "scrollX": true,
        "columnDefs": [
            { "orderable": false, "targets": 0 },
            { "orderData": true, "targets": 1 },
        ],
        "language": {
            "url": "/dist/i18n/Chinese.json"
        },
        "autoWidth": true,
        "ajax": url, 
        "columns":columns,
        "pagingType": "full_numbers", 
        "lengthMenu": [[-1], ["ALL"]]  
    });
    return data_table;
}