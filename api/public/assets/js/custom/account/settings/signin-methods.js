"use strict";
const KTAccountSettingsSigninMethods = {
    init: function () {
        !(function () {
            const signin_pwd = document.getElementById("kt_signin_password");
            if (signin_pwd) {
                const   pwd_edit = document.getElementById("kt_signin_password_edit"),
                        pwd_btn = document.getElementById("kt_signin_password_button"),
                        pwd_cancel = document.getElementById("kt_password_cancel");
                pwd_btn.querySelector("button")
                .addEventListener("click", function () {
                    d();
                });
                pwd_cancel.addEventListener("click", function () {
                    d();
                });
                const d = function () {
                    signin_pwd.classList.toggle("d-none"),
                    pwd_btn.classList.toggle("d-none"),
                    pwd_edit.classList.toggle("d-none");
                };
            }
        })(),
        (function () {
            let validator,
                pwd_form = document.getElementById("kt_signin_change_password"),
                pwd_submit_form = pwd_form.querySelector("#kt_password_submit"),
                pwd_meter,
                a = function () {
                    return 100 === pwd_meter.getScore();
                };
            pwd_form &&
            ((pwd_meter = KTPasswordMeter.getInstance(pwd_form.querySelector('[data-kt-password-meter="true"]'))),
            (validator = FormValidation.formValidation(pwd_form, {
                fields: {
                    current_password: {
                        validators: {
                            notEmpty: {
                                message: "Le mot de passe actuel est requis !"
                            }
                        }
                    },
                    new_password: {
                        validators: {
                            notEmpty: {
                                message: "Le nouveau mot de passe est requis !"
                            },
                            /*callback: {
                                message: "Veuillez entrer un mot de passe valide !",
                                callback: function (ipt) {
                                    if (ipt.value.length > 0) return a();
                                }
                            }*/
                        }
                    },
                    new_password_confirmation: {
                        validators: {
                            notEmpty: {
                                message: "Veuillez répéter le nouveau mot de passe !"
                            },
                            identical: {
                                compare: function () {
                                    return pwd_form.querySelector('[name="new_password"]').value;
                                },
                                message: "Le nouveau mot de passe et sa répétition ne sont pas identiques !"
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            })),
            pwd_submit_form.addEventListener("click", function (e) {
                e.preventDefault(),
                console.log("click"),
                validator.validate().then(function (status) {
                    (("Valid" == status) ?
                        (   // Show loading indication
                            pwd_submit_form.setAttribute('data-kt-indicator', 'on'),
                            // Disable button to avoid multiple click
                            (pwd_submit_form.disabled = true),
                            setTimeout(function () {
                                // Remove loading indication
                                pwd_submit_form.removeAttribute("data-kt-indicator");
                                // Show block ui loading indication
                                const ui_blocker = new KTBlockUI(document.querySelector('body'), {
                                    message: '<div class="blockui-message"><span class="spinner-border spinner-border-sm align-middle ms-2 text-primary"></span>Loading...</div>'
                                });
                                ui_blocker.block();
                                // Submit form
                                pwd_form.submit();
                                //Reset form
                                pwd_form.reset();
                                validator.resetForm();
                                // ui_blocker.release();
                                // Enable button
                                pwd_submit_form.disabled = false;
                            }, 800)
                        ) :
                        swal.fire({
                            html: '<div class="fw-semibold text-dark fs-6 ms-5">Veuillez remplir tous les champs et/ou suivre les instructions indiquées.</div>',
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "D'accord, j'ai compris !",
                            customClass: {
                                confirmButton: "btn font-weight-bold btn-danger"
                            }
                        })
                    );
                });
            }));
        })();
    }
};
KTUtil.onDOMContentLoaded(function () {
    KTAccountSettingsSigninMethods.init();
});
