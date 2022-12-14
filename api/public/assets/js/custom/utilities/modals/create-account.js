"use strict";
const KTCreateAccount = (function () {
    let modal,
        stepper_element,
        form,
        btn_submit,
        btn_next,
        stepper_object,
        step_validators = [],
        pwd_meter,
        a = function () {
            return (100 === pwd_meter.getScore());
        };
        const swal_options = {
            html: '<div class="fw-semibold text-dark fs-6 ms-5">Veuillez remplir tous les champs et/ou suivre les instructions indiquées.</div>',
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "D'accord, j'ai compris !",
            customClass: {
                confirmButton: "btn btn-danger"
            }
        };
    return {
        init: function () {
            (modal = document.querySelector("#kt_modal_create_account")) &&
            new bootstrap.Modal(modal),
            (stepper_element = document.querySelector("#kt_create_account_stepper")) &&
            (   (form = stepper_element.querySelector("#kt_create_account_form")),
                (pwd_meter = KTPasswordMeter.getInstance(form.querySelector('[data-kt-password-meter="true"]'))),
                (btn_submit = stepper_element.querySelector('[data-kt-stepper-action="submit"]')),
                (btn_next = stepper_element.querySelector('[data-kt-stepper-action="next"]')),
                (stepper_object = new KTStepper(stepper_element)).on("kt.stepper.changed",
                    function (e) {
                        ((4 === stepper_object.getCurrentStepIndex()) ?
                            (   btn_submit.classList.remove("d-none"),
                                btn_submit.classList.add("d-inline-block"),
                                btn_next.classList.add("d-none")
                            ) :
                            (   btn_submit.classList.remove("d-inline-block"),
                                btn_submit.classList.remove("d-none"),
                                btn_next.classList.remove("d-none")
                            )
                        );
                    }
                ),
                stepper_object.on("kt.stepper.next", function (stepper) {
                    console.log("stepper.next");
                    let step_validator = step_validators[stepper.getCurrentStepIndex() - 1];
                    (step_validator ?
                        step_validator.validate().then(function (status) {
                            console.log("validated!"),
                            (("Valid" == status) ?
                                (stepper.goNext(), KTUtil.scrollTop()) :
                                Swal.fire(swal_options).then(function () {
                                    KTUtil.scrollTop();
                                })
                            );
                        }) :
                        (stepper.goNext(), KTUtil.scrollTop())
                    );
                }),
                stepper_object.on("kt.stepper.previous", function (stepper) {
                    console.log("stepper.previous"),
                    stepper.goPrevious(),
                    KTUtil.scrollTop();
                }),
                step_validators.push(
                    FormValidation.formValidation(form, {
                        fields: {
                            account_type: {
                                validators: {
                                    notEmpty: {
                                        message: "Le type de compte est requis !"
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
                    })
                ),
                step_validators.push(
                    FormValidation.formValidation(form, {
                        fields: {
                            prenom: {
                                validators: {
                                    notEmpty: {
                                        message: "Le prénom est requis !"
                                    },
                                    regexp: {
                                        regexp: /^[\p{L}]+[\p{L} ]*$|^[\p{L} ]+[\p{L}]+[\p{L} ]*$/u,
                                        message: 'Le prénom doit être composé de lettres alphabétiques avec ou sans espaces !'
                                    }
                                }
                            },
                            nom: {
                                validators: {
                                    notEmpty: {
                                        message: "Le nom est requis !"
                                    },
                                    regexp: {
                                        regexp: /^[\p{L}]+[\p{L} ]*$|^[\p{L} ]+[\p{L}]+[\p{L} ]*$/u,
                                        message: 'Le nom doit être composé de lettres alphabétiques avec ou sans espaces !'
                                    }
                                }
                            },
                            adresse: {
                                validators: {
                                    notEmpty: {
                                        message: "L'adresse est requis !"
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
                    })
                ),
                step_validators.push(
                    FormValidation.formValidation(form, {
                        fields: {
                            email: {
                                validators: {
                                    regexp: {
                                        regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Veuillez saisir une adresse e-mail valide !'
                                    }
                                }
                            },
                            siteweb: {
                                validators: {
                                    uri: {
                                        protocol: 'http,https',
                                        allowLocal: false,
                                        allowEmptyProtocol: true,
                                        message: "L'adresse du site n'est pas valide !",
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
                    })
                ),
                step_validators.push(
                    FormValidation.formValidation(form, {
                        fields: {
                            phone: {
                                validators: {
                                    regexp: {
                                        regexp: /(^3[3]|^7[5-80])[ ]?[0-9]{3}([ ]?[0-9]{2}){2}$/,
                                        message: "Veuillez saisir un numéro de téléphone valide !"
                                    },
                                    notEmpty: {
                                        message: "Le numéro de téléphone est requis !"
                                    }
                                }
                            },
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
                                            return stepper_element.querySelector('[name="password"]').value;
                                        },
                                        message: "Les deux mots de passe ne sont pas identiques !"
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
                    })
                ),
                btn_submit.addEventListener("click", function (e) {
                    step_validators[3].validate().then(function (status) {
                        console.log("validated!"),
                        (("Valid" == status) ?
                            (   e.preventDefault(),
                                // Show loading indication
                                btn_submit.setAttribute("data-kt-indicator", "on"),
                                // Disable button to avoid multiple click
                                (btn_submit.disabled = true),
                                setTimeout(function () {
                                    // Remove loading indication
                                    btn_submit.removeAttribute("data-kt-indicator"),
                                    // call function
                                    submitCreateAccountForm();
                                    // Enable button
                                    btn_submit.disabled = false;
                                }, 1e3)
                            ) :
                            Swal.fire(swal_options).then(function () {
                                KTUtil.scrollTop();
                            })
                        );
                    });
                }),
                form.querySelector('input[name="password"]')
                .addEventListener("input", function () {
                    this.value.length > 0 && step_validators[2].updateFieldStatus("password", "NotValidated");
                }),
                form.querySelector('input[name="phone"]')
                .addEventListener("input", function () {
                    if(/(^3[3]|^7[5-80])[ ]?[0-9]{3}([ ]?[0-9]{2}){2}$/.test(this.value)) {
                        this.value = this.value.replace(/\s+/g, '').replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
                    }
                })
            );
        }
    };
})();
KTUtil.onDOMContentLoaded(function () {
    KTCreateAccount.init();
});

/**
 *
 */
function submitCreateAccountForm()
{
    // Show block ui loading indication
    const ui_blocker = new KTBlockUI(document.querySelector('body'), {
        message: '<div class="blockui-message"><span class="spinner-border spinner-border-sm align-middle ms-2 text-primary"></span>Loading...</div>'
    });
    ui_blocker.block();
    // format phone number
    const ipt_phone = document.querySelector("input[name=phone]");
    ipt_phone.value = ipt_phone.value.replace(/\s+/g, "");
    // Submit form
    document.querySelector("#kt_create_account_form").submit();
    // ui_blocker.release();
}
