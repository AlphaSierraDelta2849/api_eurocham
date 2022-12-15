"use strict";

var KTCreateExpedition = (function () {
    var e,
        t,
        o,
        r,
        a,
        i,
        n = [];
    return {
        init: function () {
            (e = document.querySelector("#kt_modal_create_camion")) &&
                (new bootstrap.Modal(e),
                (t = document.querySelector(
                    "#kt_modal_create_expedition_stepper"
                )),
                (o = document.querySelector("#kt_modal_create_camion_form")),
                (r = t.querySelector("#submit_form_ajout_camion")),
                // (a = t.querySelector('[data-kt-stepper-action="next"]')),
                // (i = new KTStepper(t)).on("kt.stepper.changed", function (e) {
                //     1 === i.getCurrentStepIndex()
                //         ? (r.classList.remove("d-none"),
                //           r.classList.add("d-inline-block"),
                //           a.classList.add("d-none"))
                //         : 6 === i.getCurrentStepIndex()
                //         ? (r.classList.add("d-none"), a.classList.add("d-none"))
                //         : (r.classList.remove("d-inline-block"),
                //           r.classList.remove("d-none"),
                //           a.classList.remove("d-none"));
                // }),
                // i.on("kt.stepper.next", function (e) {
                //     console.log("stepper.next");
                //     var t = n[e.getCurrentStepIndex() - 1];
                //     t
                //         ? t.validate().then(function (t) {
                //               console.log("validated!"),
                //                   "Valid" == t
                //                       ? e.goNext()
                //                       : Swal.fire({
                //                             text: "Veuillez remplir tous les champs !",
                //                             icon: "error",
                //                             buttonsStyling: !1,
                //                             confirmButtonText: "D'accord, j'ai compris !",
                //                             customClass: {
                //                                 confirmButton: "btn btn-primary",
                //                             },
                //                         }).then(function () {});
                //           })
                //         : (e.goNext(), KTUtil.scrollTop());
                // }),
                // i.on("kt.stepper.previous", function (e) {
                //     console.log("stepper.previous"),
                //         e.goPrevious(),
                //         KTUtil.scrollTop();
                // }),
                r.addEventListener("click", function (e) {
                    n[0].validate().then(function (t) {
                        console.log("validated!"),
                            "Valid" == t
                                ? (e.preventDefault(),
                                  (r.disabled = !0),
                                  r.setAttribute("data-kt-indicator", "on"),
                                  setTimeout(function () {
                                      r.removeAttribute("data-kt-indicator"),
                                          (r.disabled = !1),
                                          //   i.goNext();
                                          //   $("#kt_modal_create_expedition").modal("hide");
                                          //   $("#kt_modal_send_expedition").modal("show");
                                          createCamion();
                                  }, 2e3))
                                : Swal.fire({
                                      text: "Veuillez renseigner tout les champs",
                                      icon: "error",
                                      buttonsStyling: !1,
                                      confirmButtonText:
                                          "D'accord, j'ai compris !",
                                      customClass: {
                                          confirmButton: "btn btn-primary",
                                      },
                                  }).then(function () {
                                      KTUtil.scrollTop();
                                  });
                    });
                }),
                $(o.querySelector('[name="card_expiry_month"]')).on(
                    "change",
                    function () {
                        n[3].revalidateField("card_expiry_month");
                    }
                ),
                $(o.querySelector('[name="card_expiry_year"]')).on(
                    "change",
                    function () {
                        n[3].revalidateField("card_expiry_year");
                    }
                ),
                n.push(
                    FormValidation.formValidation(o, {
                        fields: {
                            type_camion: {
                                validators: {
                                    notEmpty: {
                                        message:
                                            "Veuillez selectionner le type du véhicule!",
                                    },
                                },
                            },
                            marque_camion: {
                                validators: {
                                    notEmpty: {
                                        message:
                                            "Veuillez selectionner la marque du véhicule !",
                                    },
                                },
                            },
                            modele_vehicule: {
                                validators: {
                                    notEmpty: {
                                        message:
                                            "Veuillez selectionner le modèle du véhicule !",
                                    },
                                },
                            },
                            poids_a_vide: {
                                validators: {
                                    notEmpty: {
                                        message:
                                            "Veuillez indiquer le poids du véhicule !",
                                    },
                                },
                            },
                            capacite: {
                                validators: {
                                    notEmpty: {
                                        message:
                                            "Veuillez entrer la capacité du véhicule !",
                                    },
                                },
                            },
                            date_mise_en_circulation: {
                                validators: {
                                    notEmpty: {
                                        message:
                                            "Veuillez entrer la date de mise en circulation !",
                                    },
                                },
                            },
                            immatriculation1: {
                                validators: {
                                    regexp: {
                                        regexp: /^([A-Za-z]){2}$/,
                                        message:
                                            "Veuillez saisir un format valide !",
                                    },
                                    notEmpty: {
                                        message:
                                            "Le numéro d'immatriculation est obligatoire !",
                                    },
                                },
                            },
                            immatriculation2: {
                                validators: {
                                    regexp: {
                                        regexp: /^([0-9]){3}$/,
                                        message:
                                            "Veuillez saisir un format valide !",
                                    },
                                    /*notEmpty: {
                                        message: "Le numéro de téléphone est obligatoire !",
                                    },*/
                                },
                            },
                            immatriculation3: {
                                validators: {
                                    regexp: {
                                        regexp: /^([A-Za-z]){2}$/,
                                        message:
                                            "Veuillez saisir un format valide !",
                                    },
                                    /*notEmpty: {
                                        message: "Le numéro de téléphone est obligatoire !",
                                    },*/
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
                    })
                ));
        },
    };
})();
KTUtil.onDOMContentLoaded(function () {
    KTCreateExpedition.init();

    $(".select_camion").select2({
        dropdownParent: $("#kt_modal_create_camion"),
    });
    $(".select_marque_camion").trigger("change");
});

/**
 *
 */

/**
 *
 */
function createCamion() {
    $("#kt_modal_create_camion_form").submit();
    $("#kt_modal_create_camion").modal("hide");
}
