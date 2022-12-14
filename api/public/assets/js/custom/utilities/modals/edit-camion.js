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
            (e = document.querySelector("#kt_modal_edit_camion")) &&
                (new bootstrap.Modal(e),
                (t = document.querySelector("#kt_modal_edit_expedition_stepper")),
                (o = document.querySelector("#kt_modal_edit_camion_form")),
                (r = t.querySelector("#submit_form_update_camion")),
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
                                         Swal.fire({
                                            text: "Veuillez remplir tous les champs !",
                                            icon: "error",
                                            buttonsStyling: !1,
                                            confirmButtonText: "D'accord, j'ai compris !",
                                            customClass: {
                                                confirmButton: "btn btn-primary",
                                            },
                                        }).then(function () {});
                                        //   i.goNext();
                                        //   $("#kt_modal_create_expedition").modal("hide");
                                        //   $("#kt_modal_send_expedition").modal("show");
                                        updateCamion();
                                  }, 2e3))
                                : Swal.fire({
                                      text: "Désolé il semble qu'il y ait quelques erreurs. Veuillez respecter les consignes",
                                      icon: "error",
                                      buttonsStyling: !1,
                                      confirmButtonText: "D'accord, j'ai compris !",
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
                                        message: "Le type du véhicule est requis !",
                                    },
                                },
                            },
                            marque_camion: {
                                validators: {
                                    notEmpty: {
                                        message: "Vous devez indiquer la marque du véhicule !",
                                    },
                                },
                            },
                            poids_a_vide: {
                                validators: {
                                    notEmpty: {
                                        message: "Veuillez indiquer le poids net de votre camion !",
                                    },
                                },
                            },
                            capacite: {
                                validators: {
                                    notEmpty: {
                                        message: "Veuillez indiquer la capacité de votre véhicule !",
                                    },
                                },
                            },
                            date_mise_en_circulation: {
                                validators: {
                                    notEmpty: {
                                        message: "Veuillez indiquer la date  de mise en circulation !",
                                    },
                                },
                            },
                            immatriculation1: {
                                validators: {
                                    regexp: {
                                        regexp: /^([A-Za-z]){2}$/,
                                        message: "Veuillez saisir un format valide !"
                                    },
                                    notEmpty: {
                                        message: "Le numéro d'immatriculation est obligatoire !",
                                    },
                                },
                            },
                            immatriculation2: {
                                validators: {
                                    regexp: {
                                        regexp: /^([0-9]){3}$/,
                                        message: "Veuillez saisir un format valide !"
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
                                        message: "Veuillez saisir un format valide !"
                                    },
                                    /*notEmpty: {
                                        message: "Le numéro de téléphone est obligatoire !",
                                    },*/
                                },
                            }
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
                )
            );
        },
    };
})();
KTUtil.onDOMContentLoaded(function () {
    KTCreateExpedition.init();
    $('.select_camion').select2({
        dropdownParent: $('#kt_modal_edit_camion')
    });
    $(".select_marque_camion").trigger('change');
});

/**
 *
 */

/**
 *
 */
function updateCamion()
{
    $('#kt_modal_edit_camion_form').submit();
    $("#kt_modal_edit_camion").modal("hide");
}
