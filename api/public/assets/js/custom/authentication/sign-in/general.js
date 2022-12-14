"use strict";
const KTSigninGeneral = (function () {
    let form, btn_submit, validator;
    return {
        init: function () {
            (form = document.querySelector("#kt_sign_in_form")),
            (btn_submit = document.querySelector("#kt_sign_in_submit")),
            (validator = FormValidation.formValidation(form, {
                fields: {
                    phone: {
                        validators: {
                            regexp: {
                                regexp: /(^3[3]|^7[5-80])[ ]?[0-9]{3}([ ]?[0-9]{2}){2}$/,
                                message: "Veuillez saisir un numéro de téléphone valide !"
                            },
                            notEmpty: {
                                message: "Le numéro de téléphone est obligatoire !"
                            }
                        }
                    },
                    password: {
                        validators: {
                            notEmpty: {
                                message: "Le mot de passe est obligatoire !"
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
            btn_submit.addEventListener("click", function (e) {
                e.preventDefault(),
                validator.validate().then(function (status) {
                    (("Valid" == status) ?
                            // Show loading indication
                        (   btn_submit.setAttribute("data-kt-indicator", "on"),
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
                                // format phone number
                                let ipt_phone = form.querySelector("#phone");
                                ipt_phone.value = ipt_phone.value.replace(/\s+/g, "");
                                // Enable button
                                btn_submit.disabled = false;
                                // Submit form
                                form.submit();
                                // ui_blocker.release();
                            }, 1200)
                        ) :
                        Swal.fire({
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
            form.querySelector("#phone")
            .addEventListener("input", function () {
                if(/(^3[3]|^7[5-80])[ ]?[0-9]{3}([ ]?[0-9]{2}){2}$/.test(this.value)) {
                    this.value = this.value.replace(/\s+/g, '').replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
                }
            });
        }
    };
})();
KTUtil.onDOMContentLoaded(function () {
    KTSigninGeneral.init();
});
