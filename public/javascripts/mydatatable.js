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
        "lengthMenu": [[15, 30, 50, -1], [15, 30, 50, "All"]],
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
        "pagingType": "numbers", 
        "lengthMenu": [[-1], ["ALL"]]  
    });
    return data_table;
}

function CourseDataTable(id,url,columns) {
    var data_table= $(id).dataTable({
        "scrollX": true,
        "ordering": false,
        "language": {
            "url": "/dist/i18n/Chinese.json"
        },
        "paging": false,
        "autoWidth": true,
        "ajax": url, 
        "columns":columns
    });
    return data_table;
}

function CultureDataTable(id,url,columns) {
    var data_table= $(id).dataTable({
        "scrollX": true,
        "columnDefs": [
            { "orderable": false, "targets": [0,1,2,3,5,6,7] }
        ],
        "order": [[ 4, "asc" ]],
        "language": {
            "url": "/dist/i18n/Chinese.json"
        },
        "autoWidth": true,
        "ajax": url, 
        "columns":columns,
        "pagingType": "full_numbers", 
        "lengthMenu": [[15, 30, 50, -1], [15, 30, 50, "All"]],
    });
    return data_table;
}