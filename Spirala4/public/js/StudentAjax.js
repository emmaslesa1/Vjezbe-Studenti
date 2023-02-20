const StudentAjax = (function() {

    var dodajStudenta = function(student,callbackFja) {
        $.ajax({
            url: "http://localhost:3000/student",
            type: "POST",
            data: JSON.stringify(student),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                callbackFja(null,JSON.stringify(data));
            },
            error: function(err) {
                callbackFja(JSON.stringify(err),null);
            }
        })
    }

    var postaviGrupu = function(index,grupa,callbackFja) {
        $.ajax({
            url: "http://localhost:3000/student/" + index,
            type: "PUT",
            data: JSON.stringify({grupa: grupa}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                callbackFja(null,JSON.stringify(data));
            },
            error: function(err) {
                callbackFja(JSON.stringify(err),null);
            }
        })
    }

    var dodajBatch = function(csvStudenti,callbackFja) {
        $.ajax({
            url: "http://localhost:3000/batch/student",
            type: "POST",
            data: csvStudenti,
            contentType: "text/csv; charset=utf-8",
            success: function(data) {
                callbackFja(null,JSON.stringify(data));
            },
            error: function(err) {
                callbackFja(JSON.stringify(err),null);
            }
        })
    }

    return {
        dodajStudenta: dodajStudenta,
        postaviGrupu: postaviGrupu,
        dodajBatch: dodajBatch
    }
}());
