"use strict";
var admin_expediteur_profile = (function () {
    var e, t, form;
    return {
        init: function () {
            (form = document.querySelector("#admin_expediteur_profile")),
                (e = form.querySelector("#admin__profile_submit")),
                (t = FormValidation.formValidation(form, {
                    fields: {
                        prenom: {
                            validators: {
                                notEmpty: { message: "Name is required" },
                            },
                        },
                        nom: {
                            validators: {
                                notEmpty: { message: "Name is required" },
                            },
                        },
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        bootstrap: new FormValidation.plugins.Bootstrap5({
                            rowSelector: ".fv-row",
                            eleInvalidClass: "",
                            eleValidClass: "",
                        }),
                    },
                })),
                e.addEventListener("click", function (i) {
                    i.preventDefault(),
                        t &&
                            t.validate().then(function (t) {
                                console.log("validated!"),
                                    "Valid" == t
                                        ? (e.setAttribute(
                                              "data-kt-indicator",
                                              "on"
                                          ),
                                          (e.disabled = !0),
                                          setTimeout(function () {
                                              e.removeAttribute(
                                                  "data-kt-indicator"
                                              ),
                                          form.submit(),
                                                  Swal.fire({
                                                      text: "Your profile has been saved!",
                                                      icon: "success",
                                                      buttonsStyling: !1,
                                                      confirmButtonText:
                                                          "Ok, got it!",
                                                      customClass: {
                                                          confirmButton:
                                                              "btn btn-primary",
                                                      },
                                                  }).then(function (t) {
                                                      t.isConfirmed &&
                                                          (e.disabled = !1);
                                                  });
                                          }, 2e3))
                                        : Swal.fire({
                                              text: "Sorry, looks like there are some errors detected, please try again.",
                                              icon: "error",
                                              buttonsStyling: !1,
                                              confirmButtonText: "Ok, got it!",
                                              customClass: {
                                                  confirmButton:
                                                      "btn btn-primary",
                                              },
                                          });
                            });
                });
        },
    };
})();
KTUtil.onDOMContentLoaded(function () {
    admin_expediteur_profile.init();
});
