"use strict";
const KTAppPostulantsAllListing = (function () {
    let table,
        d_table,
        flatpickr_object,
        date_start,
        date_end,
        a = (e, n, a) => {
            (date_start = e[0] ? new Date(e[0]) : null),
            (date_end = e[1] ? new Date(e[1]) : null),
            $.fn.dataTable.ext.search.push(function (e, t, n) {
                let a = date_start,
                    c = date_end,
                    l = new Date(moment($(t[3]).text(), "DD/MM/YYYY")),
                    u = new Date(moment($(t[3]).text(), "DD/MM/YYYY"));
                return (
                    (null === a && null === c) ||
                    (null === a && c >= u) ||
                    (a <= l && null === c) ||
                    (a <= l && c >= u)
                  );
            }),
            d_table.draw();
        };
    return {
        init: function () {
            (table = document.querySelector("#kt_postulants_all_table")) &&
            (   (d_table = $(table).DataTable({
                    info: !1,
                    order: [],
                    pageLength: 10,
                    responsive: {
                        details: {
                            // type: 'column'
                            renderer: function(api, rowIndex, columns) {
                                const data = $.map(columns, function(col, i) {
                                    return col.hidden ?
                                        '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
                                            '<td class="text-start text-gray-500 fw-bold fs-7 text-uppercase text-truncate gs-0 w-125px" scope="row">' + col.title + '</td>' +
                                            '<td class="text-start fw-semibold text-gray-700 text-truncate">' + col.data + '</td>' +
                                        '</tr>' :
                                        '';
                                }).join('');
                                return data ? $('<table class="table table-sm align-middle" />').append(data) : false;
                            }
                        }
                    },
                    columnDefs: [
                        {
                            orderable: !1,
                            targets: 4
                        },
                        {
                            visible: false,
                            targets: 0
                        }
                    ],
                    rowGroup: {
                        dataSrc: 0,
                        className: 'fs-5'
                    },
                    /*drawCallback: function(settings) {
                        const api = this.api();
                        const rows = api.rows({
                            page: "current"
                        }).nodes();
                        const last = null;

                        api.column(0, {
                            page: "current"
                        }).data().each(function(group, i) {
                            if (last !== group) {
                                $(rows).eq(i).before(
                                    "<tr class=\"group fs-5 fw-bolder\"><td colspan=\"5\">" + group + "</td></tr>"
                                );
                                // last = group;
                            }
                        });
                    }*/
                }))/*,
                (() => {
                    const e = document.querySelector("#kt_expeditions_effectuees_flatpickr");
                    flatpickr_object = $(e).flatpickr({
                        altInput: !0,
                        altFormat: "d-m-Y",
                        dateFormat: "Y-m-d",
                        mode: "range",
                        onChange: function (e, t, n) {
                            a(e, t, n);
                        }
                    });
                })(),
                document.querySelector('[data-kt-expeditions-made-filter="search"]')
                .addEventListener("keyup", function (e) {
                    d_table.search(e.target.value).draw();
                }),
                (() => {
                    const order_filter_matiere = document.querySelector('[data-kt-expeditions-made-filter="matiere"]');
                    $(order_filter_matiere).on("change", (e) => {
                        let value = e.target.value;
                        "all" === value && (value = ""),
                        d_table.column(0).search(value).draw();
                    });
                })(),
                document.querySelector("#kt_expeditions_effectuees_flatpickr_clear")
                .addEventListener("click", (e) => {
                    flatpickr_object.clear();
                })*/
            );
        }
    };
})();
KTUtil.onDOMContentLoaded(function () {
    KTAppPostulantsAllListing.init();
});
