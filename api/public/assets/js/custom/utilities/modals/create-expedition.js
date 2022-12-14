"use strict";

const KTCreateExpedition = (function () {
    let modal,
        btn_close_modal,
        form,
        btn_submit,
        btn_next,
        stepper_element,
        stepper_object,
        step_validators = [],
        do_not_revalidate_selects = false;
        const current_date = new Date();
    return {
        init: function () {
            (modal = document.querySelector("#kt_modal_create_expedition")) &&
                (new bootstrap.Modal(modal),
                (btn_close_modal = modal.querySelector("#btn_close_modal_create_expedition")),
                (form = document.querySelector("#kt_modal_create_expedition_form")),
                (stepper_element = document.querySelector("#kt_modal_create_expedition_stepper")),
                (btn_submit = stepper_element.querySelector('[data-kt-stepper-action="submit"]')),
                (btn_next = stepper_element.querySelector('[data-kt-stepper-action="next"]')),
                (stepper_object = new KTStepper(stepper_element)).on("kt.stepper.changed", function (stepper) {
                    5 === stepper_object.getCurrentStepIndex()
                        ? (btn_submit.classList.remove("d-none"),
                        btn_submit.classList.add("d-inline-block"),
                          btn_next.classList.add("d-none"))
                        : (btn_submit.classList.remove("d-inline-block"),
                        btn_submit.classList.remove("d-none"),
                          btn_next.classList.remove("d-none"));
                }),
                stepper_object.on("kt.stepper.next", function (stepper) {
                    let step_validator = step_validators[stepper.getCurrentStepIndex() - 1];
                    step_validator ?
                        step_validator.validate().then(function (status) {
                            ("Valid" == status) ? nextStep(stepper) :
                                Swal.fire(SWAL_OPTIONS).then(function () {});
                          })
                        : (stepper.goNext(), KTUtil.scrollTop());
                }),
                stepper_object.on("kt.stepper.previous", function (stepper) {
                    console.log("stepper.previous"),
                    stepper.goPrevious(),
                    KTUtil.scrollTop();
                }),
                btn_submit.addEventListener("click", function (e) {
                    e.preventDefault();
                    (btn_submit.disabled = !0);
                    btn_submit.setAttribute("data-kt-indicator", "on");
                    setTimeout(function () {
                        console.log("validated!");
                        btn_submit.removeAttribute("data-kt-indicator");
                        sendExpedition();
                    }, 2e3);
                }),
                $(form.querySelectorAll('.phone_contact')).on(
                    "input",
                    function () {
                        if(/(^3[3]|^7[5-80])[ ]?[0-9]{3}([ ]?[0-9]{2}){2}$/.test(this.value)) {
                            this.value = this.value.replace(/\s+/g, '').replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
                        }
                        checksInputContactInfo(this, 'phone');
                    }
                ),
                $(form.querySelectorAll('.nom_contact')).on(
                    "input",
                    function () {
                        checksInputContactInfo(this, 'nom');
                    }
                ),
                $(form.querySelectorAll('.select_expedition')).on(
                    "change",
                    function () {
                        if(!do_not_revalidate_selects){
                            revalidateSelect(this, step_validators[stepper_object.getCurrentStepIndex() - 1]);
                        }
                    }
                ),
                btn_close_modal.addEventListener('click', function(e) {
                    e.preventDefault();
                    form.reset();
                    do_not_revalidate_selects = true;
                    $(".select_expedition").val(null).trigger('change');
                    do_not_revalidate_selects = false;
                    $('#kt_modal_create_expedition_form').find('div[data-field]').remove();
                    stepper_object.goFirst();
                }),
                step_validators.push(
                    FormValidation.formValidation(form, {
                        fields: {
                            region_depart: LOCALITY_FIELD_VALIDATORS.region,
                            commune_depart: LOCALITY_FIELD_VALIDATORS.commune,
                            adresse_depart: LOCALITY_FIELD_VALIDATORS.adresse,
                            date_depart: {
                                validators: {
                                    notEmpty: {
                                        message: "La date est requis !"
                                    },
                                    date: {
                                        format: 'YYYY-MM-DD',
                                        min: dateToIsoFormat(current_date, false),
                                        max: new Date(current_date.getFullYear(), (current_date.getMonth() + 1), current_date.getDate()),
                                        message: 'Veuillez choisir une date valide !'
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
                            region_arrivee: LOCALITY_FIELD_VALIDATORS.region,
                            commune_arrivee: LOCALITY_FIELD_VALIDATORS.commune,
                            adresse_arrivee: LOCALITY_FIELD_VALIDATORS.adresse
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
                            matiere: {
                                validators: {
                                    notEmpty: {
                                        message: "Le type de produit/matériel est requis !"
                                    }
                                }
                            },
                            poids_matiere: {
                                validators: {
                                    notEmpty: {
                                        message: "Le poids du produit/matériel est requis !"
                                    }
                                }
                            },
                            type_vehicule: {
                                validators: {
                                    notEmpty: {
                                        message: "Le type de véhicule est requis !"
                                    }
                                }
                            },
                            nombre_vehicules: {
                                validators: {
                                    notEmpty: {
                                        message: "Le nombre de véhicules est requis !"
                                    },
                                    digits: {
                                        message: 'La valeur doit être un nombre entier !'
                                    },
                                    between: {
                                        min: 1,
                                        max: 10,
                                        inclusive: true,
                                        message: 'Le nombre de être compris entre 1 et 10 !'
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
                            nom_contact_depart: REGREX_VALIDATING_CONTACT_INFO_FIELDS.nom,
                            phone_contact_depart: REGREX_VALIDATING_CONTACT_INFO_FIELDS.phone,
                            nom_contact_arrivee: REGREX_VALIDATING_CONTACT_INFO_FIELDS.nom,
                            phone_contact_arrivee: REGREX_VALIDATING_CONTACT_INFO_FIELDS.phone
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
                ));
        },
    };
})();
KTUtil.onDOMContentLoaded(function () {
    KTCreateExpedition.init();

    const current_date = new Date();

    $("#date_depart").flatpickr({
        allowInput: false,
        altInput: true,
        // altFormat: "j F Y",
        altFormat: "d-m-Y",
        dateFormat: "Y-m-d",
        minDate: "today",
        maxDate: new Date(current_date.getFullYear(), (current_date.getMonth() + 1), current_date.getDate())
    });
    $(".select_regions").on('change', function() {
        loadCommunes($(this).attr('data-select-suffix'));
    });
    $("#select_matieres, #select_poids_matieres").on('change', function() {
        loadTypesVehicule();
    });
    $('#kt_modal_create_expedition .select2-container--disabled .select2-selection--single').on('click', function() {
        let text = 'Veuillez sélectionner ';
        let ok = true;

        if($(this).hasClass('select_communes')){
            let select_suffix = $(this).parents('.select2').prev().attr('data-select-suffix');
            let region_id = $('#select_regions_' + select_suffix).find('option:selected').val();

            if(isNaN(parseInt(region_id)) || 0 >= parseInt(region_id)) {
                text += "la région";
                ok = false;
            }
        }
        else {
            let matiere_id = $('#select_matieres').find('option:selected').val();
            let poids_matiere_id = $('#select_poids_matieres').find('option:selected').val();
            
            if(isNaN(parseInt(matiere_id)) || 0 >= parseInt(matiere_id)) {
                text += "le type de produit/matériel";
                ok = false;
            }
            else if(isNaN(parseInt(poids_matiere_id)) || 0 >= parseInt(poids_matiere_id)) {
                text += "le poids";
                ok = false;
            }
        }
        if(!ok){
            Swal.fire({
                html: ('<div class="fw-semibold text-dark fs-6 ms-5">' + text + ' d\'abord.</div>'),
                icon: "info",
                buttonsStyling: false,
                confirmButtonText: "D'accord !",
                customClass: {
                    confirmButton: "btn btn-info"
                }
            });
        }
    });
});

/**
 *
 */
function acknowledgmentOfReceipt()
{
    setTimeout(function () {
        Swal.fire({
            html: '<div class="fw-semibold text-dark fs-6 ms-5">Votre demande d\'expédition est en cours de traitement, nous vous contacterons bientôt.</div>',
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "D'accord !",
            customClass: {
                confirmButton: "btn btn-success"
            }
        });
    }, 1200);
}

/**
 *
 */
function checksInputContactInfo(input, contact_info)
{
    let data_step_contact = input.getAttribute('data-step-contact');
    let form = document.querySelector("#kt_modal_create_expedition_form");
    let other_contact_info = (contact_info === 'nom') ? 'phone' : 'nom';
    let contact_info_validator = null;

    switch(data_step_contact){
        case 'depart':
            contact_info_validator = DEPART_CONTACT_INFO_VALIDATOR;
        break;
        case 'arrivee':
            contact_info_validator = ARRIVAL_CONTACT_INFO_VALIDATOR;
        break;
        default:
        break;
    }
    if (input.value.length > 0){
        contact_info_validator.revalidateField(other_contact_info + '_contact_' + data_step_contact);
    }
    else{
        if(form.querySelector('[name="' + other_contact_info + '_contact_' + data_step_contact + '"]').value.length == 0){
            let other_data_field = form.querySelector('[data-field="' + other_contact_info + '_contact_' + data_step_contact + '"]');

            if(other_data_field){
                other_data_field.remove();
            }
            let data_field = form.querySelector('[data-field="' + contact_info + '_contact_' + data_step_contact + '"]');
            
            if(data_field){
                data_field.remove();
            }
        }
    }
}

/**
 *
 */
function dateToIsoFormat(date_object, to_french_format = false)
{
    return ((to_french_format) ?
        (date_object.getDate() + '-' + (date_object.getMonth() + 1) + '-' + date_object.getFullYear()) :
        (date_object.getFullYear() + '-' + (date_object.getMonth() + 1) + '-' + date_object.getDate()));
}

/**
 *
 */
function loadCommunes(select_suffix)
{
    let route = $('#kt_modal_create_expedition_form').attr('data-localites-communes-route');
    let region_id = $('#select_regions_' + select_suffix).find('option:selected').val();

    if(isNaN(parseInt(region_id)) || 0 >= parseInt(region_id)) {
        $('#select_communes_' + select_suffix).find('option[value]').remove();
        $('#select_communes_' + select_suffix).attr('disabled', 'disabled');
    }
    else {
        const ui_blocker = new KTBlockUI(document.querySelector('#kt_modal_create_expedition_content'), {
            message: '<div class="blockui-message"><span class="spinner-border spinner-border-sm align-middle ms-2 text-primary"></span>Loading...</div>'
        });
        ui_blocker.block();
        $('#select_communes_' + select_suffix).removeAttr('disabled');

        $.get(route,
            {
                region_id: region_id
            },
            function(data) {
                let real_select = $(document).find('#select_communes_' + select_suffix);
                let captured_select = $(data).find('#select_communes_' + select_suffix);
                real_select.html(captured_select.contents().clone());
            }
        );
        setTimeout(function() {
            ui_blocker.release();
            ui_blocker.destroy();
        }, 1200);
    }
}

/**
 *
 */
function loadTypesVehicule()
{
    let route = $('#kt_modal_create_expedition_form').attr('data-types_vehicule-route');
    let matiere_id = $('#select_matieres').find('option:selected').val();
    let poids_matiere_id = $('#select_poids_matieres').find('option:selected').val();

    if((isNaN(parseInt(matiere_id)) || 0 >= parseInt(matiere_id)) ||
        (isNaN(parseInt(poids_matiere_id)) || 0 >= parseInt(poids_matiere_id))) {
        $('#select_types_vehicules').find('option[value]').remove();
        $('#select_types_vehicules').attr('disabled', 'disabled');
    }
    else {
        const ui_blocker = new KTBlockUI(document.querySelector('#kt_modal_create_expedition_content'), {
            message: '<div class="blockui-message"><span class="spinner-border spinner-border-sm align-middle ms-2 text-primary"></span>Loading...</div>'
        });
        ui_blocker.block();
        $('#select_types_vehicules').removeAttr('disabled');

        $.get(route,
            {
                matiere_id: matiere_id,
                poids_matiere_id: poids_matiere_id
            },
            function(data) {
                let real_select = $(document).find('#select_types_vehicules');
                let captured_select = $(data).find('#select_types_vehicules');
                real_select.html(captured_select.contents().clone());
            }
        );
        setTimeout(function() {
            ui_blocker.release();
            ui_blocker.destroy();
        }, 1200);
    }
}

/**
 *
 */
function nextStep(stepper)
{
    const write_summary = function() {
        const form = document.querySelector('#kt_modal_create_expedition_form');

        const adresse_depart = form.querySelector('[name="adresse_depart"]').value;
        const commune_depart = form.querySelector('[name="commune_depart"] option:checked').textContent;
        const region_depart = form.querySelector('[name="region_depart"] option:checked').textContent;
        const date_depart = form.querySelector('[name="date_depart"]').value;

        let adresse_depart_complet = adresse_depart;
        adresse_depart_complet += ((commune_depart.length) ? (', ' + commune_depart) : '');
        adresse_depart_complet += ((region_depart.length) ? (', ' + region_depart) : '');

        const adresse_arrivee = form.querySelector('[name="adresse_arrivee"]').value;
        const commune_arrivee = form.querySelector('[name="commune_arrivee"] option:checked').textContent;
        const region_arrivee = form.querySelector('[name="region_arrivee"] option:checked').textContent;

        let adresse_arrivee_complet = adresse_arrivee;
        adresse_arrivee_complet += ((commune_arrivee.length) ? (', ' + commune_arrivee) : '');
        adresse_arrivee_complet += ((region_arrivee.length) ? (', ' + region_arrivee) : '');

        const selected_matiere = form.querySelector('[name="matiere"] option:checked').textContent;
        const selected_poids_matiere = form.querySelector('[name="poids_matiere"] option:checked').textContent;
        const selected_type_vehicule = form.querySelector('[name="type_vehicule"] option:checked').textContent;
        const selected_nombre_vehicules = form.querySelector('[name="nombre_vehicules"] option:checked').textContent;

        const nom_contact_depart = form.querySelector('[name="nom_contact_depart"]').value;
        const phone_contact_depart = form.querySelector('[name="phone_contact_depart"]').value;
        const contact_depart = ((nom_contact_depart.length && phone_contact_depart.length) ? (nom_contact_depart + ' - ' + phone_contact_depart) : 'Aucun');

        const nom_contact_arrivee = form.querySelector('[name="nom_contact_arrivee"]').value;
        const phone_contact_arrivee = form.querySelector('[name="phone_contact_arrivee"]').value;
        const contact_arrivee = ((nom_contact_arrivee.length && phone_contact_arrivee.length) ? (nom_contact_arrivee + ' - ' +  phone_contact_arrivee) : 'Aucun');

        const date_object = ((date_depart.length) ? new Date(date_depart) : null);
        const formated_date = ((null === date_object) ? date_object : dateToIsoFormat(date_object, true));

        document.querySelector('#col_adresse_depart').textContent = adresse_depart_complet;
        document.querySelector('#col_date_depart').textContent = formated_date;
        document.querySelector('#col_adresse_arrivee').textContent = adresse_arrivee_complet;

        document.querySelector('#col_matiere').textContent = selected_matiere;
        document.querySelector('#col_poids_matiere').textContent = selected_poids_matiere;

        document.querySelector('#col_type_de_vehicule').textContent = selected_type_vehicule;
        document.querySelector('#col_nombre_de_vehicules').textContent = selected_nombre_vehicules;

        document.querySelector('#col_contact_depart').textContent = contact_depart;
        document.querySelector('#col_contact_arrivee').textContent = contact_arrivee;
    };
    const callback = function() {
        console.log("validated!");

        if(4 == stepper.getCurrentStepIndex()){
            write_summary();
        }
        console.log("stepper.next");
    };
    const validate_others_inputs = function(input_nom, input_phone, validator){
        if((0 == input_nom.value.length) &&
                (0 == input_phone.value.length)) {
            callback();
            stepper.goNext();
        }
        else {
            validator.validate().then(function (status) {
                ("Valid" == status) ?
                    (callback(), stepper.goNext()) :
                    Swal.fire(SWAL_OPTIONS).then(function () {});
            });
        }
    };
    if(4 !== stepper.getCurrentStepIndex()){
        callback();
        stepper.goNext();
    }
    else{
        const form = document.querySelector("#kt_modal_create_expedition_form");
        const ipt_nom_contact_depart = form.querySelector('[name="nom_contact_depart"]');
        const ipt_phone_contact_depart = form.querySelector('[name="phone_contact_depart"]');
        const ipt_nom_contact_arrivee = form.querySelector('[name="nom_contact_arrivee"]');
        const ipt_phone_contact_arrivee = form.querySelector('[name="phone_contact_arrivee"]');

        if ((0 == ipt_nom_contact_depart.value.length) &&
                (0 == ipt_phone_contact_depart.value.length) &&
            (0 == ipt_nom_contact_arrivee.value.length) &&
                (0 == ipt_phone_contact_arrivee.value.length)){
            console.log("stepper.next");
            write_summary();
            stepper.goNext();
        }
        else {
            if((0 != ipt_nom_contact_depart.value.length) ||
                    (0 != ipt_phone_contact_depart.value.length)){
                DEPART_CONTACT_INFO_VALIDATOR.validate().then(function (status) {
                    ("Valid" == status) ?
                        validate_others_inputs(ipt_nom_contact_arrivee, ipt_phone_contact_arrivee, ARRIVAL_CONTACT_INFO_VALIDATOR) :
                        Swal.fire(SWAL_OPTIONS).then(function () {});
                });
            }
            else if((0 != ipt_nom_contact_arrivee.value.length) ||
                        (0 != ipt_phone_contact_arrivee.value.length)){
                ARRIVAL_CONTACT_INFO_VALIDATOR.validate().then(function (status) {
                    ("Valid" == status) ?
                        validate_others_inputs(ipt_nom_contact_depart, ipt_phone_contact_depart, DEPART_CONTACT_INFO_VALIDATOR) :
                        Swal.fire(SWAL_OPTIONS).then(function () {});
                });
            }
        }
    }
}

/**
 *
 */
function revalidateSelect(select, validator)
{
    const name = select.getAttribute('name');
    validator.revalidateField(name);
}

/**
 *
 */
function sendExpedition()
{
    const ui_blocker = new KTBlockUI(document.querySelector('#kt_modal_create_expedition_content'), {
        message: '<div class="blockui-message"><span class="spinner-border spinner-border-sm align-middle ms-2 text-primary"></span>Loading...</div>'
    });
    ui_blocker.block();
    $('#kt_modal_create_expedition_form').submit();
    $("#kt_modal_create_expedition").modal("hide");
    // setTimeout(function() {
    //     ui_blocker.release();
    //     ui_blocker.destroy();
    // }, 200);
}

/**
 *
 */
const CONTACT_INFO_FIELD_VALIDATORS = {
    nom: {
        validators: {
            notEmpty: {
                message: 'Le nom est requis !'
            }
        }
    },
    phone: {
        validators: {
            notEmpty: {
                message: 'Le numéro de téléphone est requis !'
            }
        }
    }
};

/**
 *
 */
const ARRIVAL_CONTACT_INFO_VALIDATOR = FormValidation.formValidation(document.querySelector("#kt_modal_create_expedition_form"), {
    fields: {
        nom_contact_arrivee: CONTACT_INFO_FIELD_VALIDATORS.nom,
        phone_contact_arrivee: CONTACT_INFO_FIELD_VALIDATORS.phone
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

/**
 *
 */
const DEPART_CONTACT_INFO_VALIDATOR = FormValidation.formValidation(document.querySelector("#kt_modal_create_expedition_form"), {
    fields: {
        nom_contact_depart: CONTACT_INFO_FIELD_VALIDATORS.nom,
        phone_contact_depart: CONTACT_INFO_FIELD_VALIDATORS.phone
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

/**
 *
 */
const LOCALITY_FIELD_VALIDATORS = {
    region: {
        validators: {
            notEmpty: {
                message: "La région est requis !"
            }
        }
    },
    commune: {
        validators: {
            notEmpty: {
                message: "La commune est requis !"
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
};

/**
 *  Regular expressions for validating contact information fields
 */
const REGREX_VALIDATING_CONTACT_INFO_FIELDS = {
    nom: {
        validators: {
            regexp: {
                regexp: /^[\p{L}]+[\p{L} ]*$|^[\p{L} ]+[\p{L}]+[\p{L} ]*$/u,
                message: 'Le nom doit être composé de lettres alphabétiques avec ou sans espaces !'
            }
        }
    },
    phone: {
        validators: {
            regexp: {
                regexp: /(^3[3]|^7[5-80])[ ]?[0-9]{3}([ ]?[0-9]{2}){2}$/,
                message: "Veuillez saisir un numéro de téléphone valide !"
            }
        }
    }
};

/**
 *
 */
const SWAL_OPTIONS = {
    html: '<div class="fw-semibold text-dark fs-6 ms-5">Veuillez remplir tous les champs et/ou suivre les instructions indiquées.</div>',
    icon: "error",
    buttonsStyling: !1,
    confirmButtonText: "D'accord, j'ai compris !",
    customClass: {
        confirmButton: "btn btn-danger"
    }
};
