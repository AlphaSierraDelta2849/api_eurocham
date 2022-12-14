"use strict";
const KTAppAvailableExpeditionsListing = (function () {
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
                    l = new Date(moment($(t[5]).text(), "DD/MM/YYYY")),
                    u = new Date(moment($(t[5]).text(), "DD/MM/YYYY"));
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
            (table = document.querySelector("#kt_expeditions_disponibles_table")) &&
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
                            targets: 6
                        }
                    ]
                })),
                (() => {
                    const e = document.querySelector("#kt_available_expeditions_flatpickr");
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
                document.querySelector('[data-kt-available-expeditions-filter="search"]')
                .addEventListener("keyup", function (e) {
                    d_table.search(e.target.value).draw();
                }),
                (() => {
                    const order_filter_matiere = document.querySelector('[data-kt-available-expeditions-filter="matiere"]');
                    $(order_filter_matiere).on("change", (e) => {
                        let value = e.target.value;
                        "all" === value && (value = ""),
                        d_table.column(1).search(value).draw();
                    });
                })(),
                document.querySelector("#kt_available_expeditions_flatpickr_clear")
                .addEventListener("click", (e) => {
                    flatpickr_object.clear();
                })
                ,
                document.querySelector('[href="#kt_tab_available_expeditions"]')
                .addEventListener("click", function (e) {
                    // d_table.responsive.recalc().columns.adjust();
                    d_table.responsive.recalc();
                    // d_table.columns.responsive.recalc();
                })
                // ,
                // d_table.on('responsive-resize', function () {
                //     // e.stopPropagation();

                //     if (d_table.responsive.hasHidden()) {
                //         //Some columns are hidden, so, hide the controls
                //         d_table.columns( [0] ).visible( false );
                //     }
                //     else {
                //         //No columns are hidden, so, show the controls
                //         d_table.columns( [0] ).visible( true );
                //     }
                //     d_table.draw();
                // })
            );
        }
    };
})();
KTUtil.onDOMContentLoaded(function () {
    KTAppAvailableExpeditionsListing.init();
});
