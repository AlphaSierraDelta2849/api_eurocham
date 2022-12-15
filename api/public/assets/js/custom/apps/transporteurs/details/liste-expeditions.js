"use strict";
var KRViewTranporteurExpeditions = (function () {
    var t,
        e = document.querySelector("#table_liste_expeditions");
    return {
        init: function () {
            e &&
                (e.querySelectorAll("tbody tr").forEach((t) => {
                    const e = t.querySelectorAll("td"),
                        n = moment(e[0].innerHTML, "DD MMM YYYY, LT").format();
                    e[0].setAttribute("data-order", n);
                }),
                (t = $(e).DataTable({
                    info: !1,
                    order: [],
                    pageLength: 6,
                    lengthChange: !1,
                    columnDefs: [{ orderable: !1, targets: 5 }],
                    responsive: true
                })),
                e
                    .querySelectorAll(
                        '[data-kt-customer-table-filter="delete_row"]'
                    )
                    .forEach((e) => {
                        e.addEventListener("click", function (e) {
                            e.preventDefault();
                            const n = e.target.closest("tr"),
                                o = n.querySelectorAll("td")[0].innerText;
                            Swal.fire({
                                text:
                                    "Are you sure you want to delete " +
                                    o +
                                    "?",
                                icon: "warning",
                                showCancelButton: !0,
                                buttonsStyling: !1,
                                confirmButtonText: "Yes, delete!",
                                cancelButtonText: "No, cancel",
                                customClass: {
                                    confirmButton: "btn fw-bold btn-danger",
                                    cancelButton:
                                        "btn fw-bold btn-active-light-primary",
                                },
                            }).then(function (e) {
                                e.value
                                    ? Swal.fire({
                                          text: "You have deleted " + o + "!.",
                                          icon: "success",
                                          buttonsStyling: !1,
                                          confirmButtonText: "Ok, got it!",
                                          customClass: {
                                              confirmButton:
                                                  "btn fw-bold btn-primary",
                                          },
                                      })
                                          .then(function () {
                                              t.row($(n)).remove().draw();
                                          })
                                          .then(function () {
                                              toggleToolbars();
                                          })
                                    : "cancel" === e.dismiss &&
                                      Swal.fire({
                                          text:
                                              customerName +
                                              " was not deleted.",
                                          icon: "error",
                                          buttonsStyling: !1,
                                          confirmButtonText: "Ok, got it!",
                                          customClass: {
                                              confirmButton:
                                                  "btn fw-bold btn-primary",
                                          },
                                      });
                            });
                        });
                    }));
        },
    };
})();
KTUtil.onDOMContentLoaded(function () {
    KRViewTranporteurExpeditions.init();
});
