"use strict";
const KRViewExpediteurExpeditions = (function () {
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
        },
        c = () => {
            table.querySelectorAll('[data-kt-expeditions-in-progress-order-filter="delete_row"]')
            .forEach((element) => {
                element.addEventListener("click", function (e) {
                    e.preventDefault();
                    const tr = e.target.closest("tr"),
                          text = tr.querySelector('[data-kt-expeditions-in-progress-order-filter="order_id"]').innerText;
                    Swal.fire({
                        text: "Are you sure you want to delete order: " + text + "?",
                        icon: "warning",
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: "Yes, delete!",
                        cancelButtonText: "No, cancel",
                        customClass: {
                            confirmButton: "btn fw-bold btn-danger",
                            cancelButton: "btn fw-bold btn-active-light-primary"
                        }
                    }).then(function (e) {
                        ((e.value) ?
                            Swal.fire({
                                text: "You have deleted " + text + "!.",
                                icon: "success",
                                buttonsStyling: !1,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                    confirmButton: "btn fw-bold btn-primary"
                                }
                            }).then(function () {
                                d_table.row($(tr)).remove().draw();
                            })
                            :
                            "cancel" === e.dismiss &&
                            Swal.fire({
                                text: text + " was not deleted.",
                                icon: "error",
                                buttonsStyling: !1,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                    confirmButton: "btn fw-bold btn-primary"
                                }
                            })
                        );
                    });
                });
            });
        };
    return {
        init: function () {
            (table = document.querySelector("#kt_expeditions_en_cours_table")) &&
                ((d_table = $(table).DataTable({
                    info: !1,
                    order: [],
                    pageLength: 10,
                    columnDefs: [
                        { orderable: !1, targets: 2 },
                        { orderable: !1, targets: 3 },
                        { orderable: !1, targets: 5 },
                    ],
                    responsive: true
                })).on("draw", function () {
                    c();
                }),
                (() => {
                    const e = document.querySelector("#kt_expeditions_en_cours_flatpickr");
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
                document.querySelector('[data-kt-expeditions-in-progress-order-filter="search"]')
                .addEventListener("keyup", function (e) {
                    d_table.search(e.target.value).draw();
                }),
                (() => {
                    const order_filter_matiere = document.querySelector('[data-kt-expeditions-in-progress-order-filter="matiere"]');
                    $(order_filter_matiere).on("change", (e) => {
                        let value = e.target.value;
                        "all" === value && (value = ""),
                        d_table.column(2).search(value).draw();
                    });
                })(),
                c(),
                document.querySelector("#kt_expeditions_en_cours_flatpickr_clear")
                .addEventListener("click", (e) => {
                    flatpickr_object.clear();
                }));
        }
    };
})();
KTUtil.onDOMContentLoaded(function () {
    KRViewExpediteurExpeditions.init();
});
