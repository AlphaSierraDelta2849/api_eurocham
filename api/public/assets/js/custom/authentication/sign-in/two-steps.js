"use strict";
var KTSigninTwoSteps = (function () {
    let form, btn_submit;
    return {
        init: function () {
            let ipt_1, ipt_2, ipt_3, ipt_4, ipt_5, ipt_6;
            (form = document.querySelector("#kt_sing_in_two_steps_form")),
            (btn_submit = document.querySelector("#kt_sing_in_two_steps_submit"))
            .addEventListener("click", function (e) {
                e.preventDefault();
                let i = !0,
                    o = [].slice.call(form.querySelectorAll('input[maxlength="1"]'));
                o.map(function (n) {
                    ("" !== n.value && 0 !== n.value.length) || (i = !1);
                }),
                (!0 === i) ?
                // Show loading indication
                (btn_submit.setAttribute("data-kt-indicator", "on"),
                // Disable button to avoid multiple click
                (btn_submit.disabled = true),
                setTimeout(function () {
                    // call function
                    validateCodeSended();
                }, 1e3)) :
                Swal.fire({
                    html: '<div class="fw-semibold text-dark fs-6 ms-5">Veuillez saisir un code de sécurité valide et réessayer.</div>',
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "D'accord, j'ai compris !",
                    customClass: {
                        confirmButton: "btn btn-danger",
                    },
                }).then(function () {
                    KTUtil.scrollTop();
                });
            }),
            (ipt_1 = form.querySelector("[name=code_1]")),
            (ipt_2 = form.querySelector("[name=code_2]")),
            (ipt_3 = form.querySelector("[name=code_3]")),
            (ipt_4 = form.querySelector("[name=code_4]")),
            (ipt_5 = form.querySelector("[name=code_5]")),
            (ipt_6 = form.querySelector("[name=code_6]")),
            ipt_1.focus(),
            ipt_1.addEventListener("keyup", function () {
                1 === this.value.length && ipt_2.focus();
            }),
            ipt_2.addEventListener("keyup", function () {
                1 === this.value.length && ipt_3.focus();
            }),
            ipt_3.addEventListener("keyup", function () {
                1 === this.value.length && ipt_4.focus();
            }),
            ipt_4.addEventListener("keyup", function () {
                1 === this.value.length && ipt_5.focus();
            }),
            ipt_5.addEventListener("keyup", function () {
                1 === this.value.length && ipt_6.focus();
            }),
            ipt_6.addEventListener("keyup", function () {
                1 === this.value.length && ipt_6.blur();
            });
        }
    };
})();
KTUtil.onDOMContentLoaded(function () {
    KTSigninTwoSteps.init();
    render();
    document.querySelector("#kt_send_verification_code_submit")
    .addEventListener("click", function () {
        sendVerificationCode();
    });
    // Show modal
    $("#kt_modal_send_verification_code").modal("show");
});

/**
 *
 */
const firebaseConfig = {
    apiKey: "AIzaSyD1olKL99I_mV7pbmldR2nF4k8WkD_v8XU",
    authDomain: "yonima-8b9af.firebaseapp.com",
    projectId: "yonima-8b9af",
    storageBucket: "yonima-8b9af.appspot.com",
    messagingSenderId: "468307143948",
    appId: "1:468307143948:web:f1286886fefaf95e2c2d29",
    measurementId: "G-K33XPD5LYQ",
};
firebase.initializeApp(firebaseConfig);

/**
 *
 */
function render()
{
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    recaptchaVerifier.render();
}

/**
 *
 */
function sendVerificationCode()
{
    const btn_submit = document.querySelector("#kt_send_verification_code_submit");
    const phone_number = ("+221" + document.querySelector("input[name=phone]").value);

    firebase.auth()
    .signInWithPhoneNumber(phone_number, window.recaptchaVerifier)
    .then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
        // Show loading indication
        btn_submit.setAttribute("data-kt-indicator", "on"),
        // Disable button to avoid multiple click
        (btn_submit.disabled = true),
        setTimeout(function () {
            // Remove loading indication
            btn_submit.removeAttribute("data-kt-indicator"),
            // Enable button
            (btn_submit.disabled = false),
            Swal.fire({
                html: ('<div class="fw-semibold text-dark fs-6 ms-5">Nous avons envoyé le code de vérification au ' + phone_number + '.</div>'),
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "D'accord !",
                customClass: {
                    confirmButton: "btn btn-success"
                }
            }).then(function (status) {
                if (status.isConfirmed) {
                    // Hide modal
                    $("#kt_modal_send_verification_code").modal("hide");
                    $('#code_1').focus();
                }
            });
        }, 1500);
    }).catch(function (error) {
        // Remove loading indication
        btn_submit.removeAttribute("data-kt-indicator"),
        // Enable button
        (btn_submit.disabled = false),
        Swal.fire({
            html: ('<div class="fw-semibold text-dark fs-6 ms-5">' + error.message + '.</div>'),
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "D'accord, j'ai compris !",
            customClass: {
                confirmButton: "btn btn-danger"
            }
        });
    });
}

/**
 *
 */
function validateCodeSended()
{
    let code = '';
    const btn_submit = document.querySelector("#kt_sing_in_two_steps_submit");

    for (let i = 1; i < 7; i++) {
        code += document.querySelector("#code_" + i).value;
    }
    window.confirmationResult
    .confirm(code)
    .then(function (res) {
        setTimeout(function () {
            // Remove loading indication
            btn_submit.removeAttribute("data-kt-indicator"),
            // Enable button
            (btn_submit.disabled = false),
            Swal.fire({
                html: '<div class="fw-semibold text-dark fs-6 ms-5">Vérification effectuée avec succès !</div>',
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "D'accord !",
                customClass: {
                    confirmButton: "btn btn-success"
                }
            }).then(function (status) {
                if (status.isConfirmed) {
                    // Show block ui loading indication
                    const ui_blocker = new KTBlockUI(document.querySelector('body'), {
                        message: '<div class="blockui-message"><span class="spinner-border spinner-border-sm align-middle ms-2 text-primary"></span>Loading...</div>'
                    });
                    ui_blocker.block();
                    const form = document.querySelector("#kt_sing_in_two_steps_form");
                    // Submit form
                    form.submit();
                    // ui_blocker.release();
                }
            });
        }, 1e3);
    }).catch(function (error) {
        // Remove loading indication
        btn_submit.removeAttribute("data-kt-indicator"),
        // Enable button
        (btn_submit.disabled = false),
        Swal.fire({
            html: ('<div class="fw-semibold text-dark fs-6 ms-5">' + error.message + '.</div>'),
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "D'accord, j'ai compris !",
            customClass: {
                confirmButton: "btn btn-danger"
            }
        });
    });
}
