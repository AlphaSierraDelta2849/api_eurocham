"use strict";
const KTAuthNewPassword = (function () {
    let form,
        btn_submit,
        validator,
        pwd_meter,
        a = function () {
            return 100 === pwd_meter.getScore();
        };
    return {
        init: function () {
            (form = document.querySelector("#kt_new_password_form")),
            (btn_submit = document.querySelector("#kt_new_password_submit")),
            (pwd_meter = KTPasswordMeter.getInstance(form.querySelector('[data-kt-password-meter="true"]'))),
            (validator = FormValidation.formValidation(form, {
                fields: {
                    password: {
                        validators: {
                            notEmpty: {
                                message: "Le mot de passe est requis !"
                            },
                            /*callback: {
                                message: "Veuillez entrer un mot de passe valide !",
                                callback: function (ipt) {
                                    if (ipt.value.length > 0) return a();
                                }
                            }*/
                        }
                    },
                    password_confirmation: {
                        validators: {
                            notEmpty: {
                                message: "Veuillez répéter le mot de passe !"
                            },
                            identical: {
                                compare: function () {
                                    return form.querySelector('[name="password"]').value;
                                },
                                message: "Les deux mots de passe ne sont pas identiques !"
                            }
                        }
                    },
                    toc: {
                        validators: {
                            notEmpty: {
                                message: "Vous devez accepter les Termes et Conditions !"
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger({
                        event: { password: !1 }
                    }),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            })),
            btn_submit.addEventListener("click", function (e) {
                e.preventDefault(),
                validator.revalidateField("password"),
                validator.validate().then(function (status) {
                    (("Valid" == status) ?
                        (   // Show loading indication
                            btn_submit.setAttribute("data-kt-indicator", "on"),
                            // Disable button to avoid multiple click
                            (btn_submit.disabled = true),
                            setTimeout(function () {
                                // Remove loading indication
                                btn_submit.removeAttribute("data-kt-indicator");
                                // Show block ui loading indication
                                const ui_blocker = new KTBlockUI(document.querySelector('body'), {
                                    message: '<div class="blockui-message"><span class="spinner-border spinner-border-sm align-middle ms-2 text-primary"></span>Loading...</div>'
                                });
                                ui_blocker.block();
                                // Submit form
                                form.submit();
                                // Enable button
                                btn_submit.disabled = false;
                                // ui_blocker.release();
                            }, 1e3))
                        : Swal.fire({
                            html: '<div class="fw-semibold text-dark fs-6 ms-5">Veuillez remplir tous les champs et/ou suivre les instructions indiquées.</div>',
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "D'accord, j'ai compris !",
                            customClass: {
                                confirmButton: "btn btn-danger"
                            }
                        })
                    );
                });
            }),
            form.querySelector('input[name="password"]')
            .addEventListener("input", function () {
                this.value.length > 0 && validator.updateFieldStatus("password", "NotValidated");
            });
        }
    };
})();
KTUtil.onDOMContentLoaded(function () {
  KTAuthNewPassword.init();
});
