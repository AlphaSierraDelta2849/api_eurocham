"use strict";

const KTAccountSettingsProfileDetails = (function () {
    let form, btn_submit, avatar_input, avatar_input_action, validator;
    return {
        init: function () {
            (form = document.getElementById("kt_account_profile_details_form")),
            (btn_submit = form.querySelector("#kt_account_profile_details_submit")),
            (avatar_input = KTImageInput.getInstance(form.querySelector("#kt_avatar_input"))),
            (avatar_input_action = form.querySelector("#avatar_input_action")),
            (validator = FormValidation.formValidation(form, {
                fields: {
                    avatar: {
                        validators: {
                            /*notEmpty: {
                                message: 'Veuillez sélectionner une image !'
                            },*/
                            file: {
                                extension: 'jpg,jpeg,png',
                                type: 'image/jpeg,image/png',
                                maxSize: 1024000,
                                message: "Le fichier sélectionné est trop volumineux (plus de 1 Mo) ou son extension n'est pas prise en charge !"
                            }
                        }
                    },
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
                    },
                    email: {
                        validators: {
                            regexp: {
                                regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Veuillez saisir une adresse e-mail valide !'
                            }
                        }
                    },
                    /*entreprise: {
                        validators: {
                            notEmpty: {
                                message: "Company name is required"
                            }
                        }
                    },*/
                    siteweb: {
                        validators: {
                            uri: {
                                protocol: 'http,https',
                                allowLocal: false,
                                allowEmptyProtocol: true,
                                message: "L'adresse du site n'est pas valide !",
                            }
                            /*regexp: {
                                regexp: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                                message: "L'adresse du site n'est pas valide !"
                            }*/
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // submitButton: new FormValidation.plugins.SubmitButton(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            })),
            btn_submit.addEventListener("click", function (e) {
                e.preventDefault(),
                console.log("click"),
                validator.validate().then(function (status) {
                    (("Valid" == status) ?
                        (   // Show loading indication
                            btn_submit.setAttribute('data-kt-indicator', 'on'),
                            // Disable button to avoid multiple click
                            (btn_submit.disabled = true),
                            setTimeout(function () {
                                // Show confirmation modal
                                $('#kt_modal_confirm_profile_details').modal('show');
                                // Remove loading indication
                                btn_submit.removeAttribute('data-kt-indicator');
                                // Enable button
                                btn_submit.disabled = false;
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
            }),
            document.querySelector('#btn_edit_profile')
            .addEventListener('click', function(e){
                e.preventDefault();
                document.querySelector('a[href="#kt_tab_account_settings"]').click();
            }),
            avatar_input.on("kt.imageinput.changed", function() {
                avatar_input_action.value = 'changed';
                console.log("avatar changed");
            }),
            avatar_input.on("kt.imageinput.removed", function() {
                avatar_input_action.value = 'removed';
                console.log("avatar removed");
            }),
            document.querySelector("#kt_modal_confirm_profile_details #btn_confirm")
            .addEventListener("click", function (e) {
                e.preventDefault();
                // call function
                sendChangesProfileDetails(form);
            }),
            document.querySelector("#kt_modal_confirm_profile_details #btn_cancel")
            .addEventListener("click", function (e) {
                e.preventDefault();
            }),
            $('#kt_modal_confirm_profile_details').on('shown.bs.modal', function () {
                $(this).find('#password_confirmation').focus();
            });
        }
    };
})();
KTUtil.onDOMContentLoaded(function () {
    KTAccountSettingsProfileDetails.init();
});

/**
 *
 */
function sendChangesProfileDetails(form)
{
    CONFIRM_PASSWORD_VALIDATOR.validate().then(function (status) {
        (("Valid" == status) ?
            setTimeout(function () {
                // Hide confirmation modal
                $('#kt_modal_confirm_profile_details').modal('hide');
                // Show block ui loading indication
                const ui_blocker = new KTBlockUI(document.querySelector('body'), {
                    message: '<div class="blockui-message"><span class="spinner-border spinner-border-sm align-middle ms-2 text-primary"></span>Loading...</div>'
                });
                ui_blocker.block();
                // Submit form
                form.submit();
                // ui_blocker.release();
            }, 0) :
            swal.fire({
                html: '<div class="fw-semibold text-dark fs-6 ms-5">Vous devez saisir votre mot de passe pour confirmer les modifications !</div>',
                icon: "error",
                buttonsStyling: false,
                confirmButtonText: "D'accord, j'ai compris !",
                customClass: {
                    confirmButton: "btn font-weight-bold btn-danger"
                }
            })
        );
    });
}

/**
 *
 */
const CONFIRM_PASSWORD_VALIDATOR = FormValidation.formValidation(document.querySelector("#kt_account_profile_details_form"), {
    fields: {
        password_confirmation: {
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
});
