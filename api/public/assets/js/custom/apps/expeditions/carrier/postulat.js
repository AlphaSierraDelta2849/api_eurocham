/**
 * 
 */

function editPostulat()
{
    $("#montant_form_edit").show();
    $("#btn_edit_postulat").hide();
    $("#btn_update_postulat").show();
}

/**
 * 
 * @param {*} postulant 
 */

function showPostulat(postulant)
{
    document.querySelector('#date_modification_postulat').innerHTML = new Date(postulant.updated_at).toLocaleString();
    document.getElementById('montant_postulat').innerHTML = postulant.montant_propose;
    document.querySelector('#postulant_id').value = postulant.id
    $('#modal_voir_postulat').modal('show');
}

/**
 * 
 */

function submitFormPostulat()
{
    const montant_postulat = parseInt(document.querySelector('#ipt_montant_postulat').value);

    if(isNaN(montant_postulat) || montant_postulat <= 0) {
        const text = (montant_postulat === 0) ? 'montant' : 'montant valide';

        Swal.fire({
            html: ('<div class="fw-semibold text-dark fs-6 ms-5">Veuillez saisir un ' + text + ' d\'abord !</div>'),
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "D'accord !",
            customClass: {
                confirmButton: "btn btn-danger"
            }
        });
    }
    else {
        // Hide modal
        $('#kt_modal_postulat').modal('hide');
        // Show block ui loading indication
        const ui_blocker = new KTBlockUI(document.querySelector('body'), {
            message: '<div class="blockui-message"><span class="spinner-border spinner-border-sm align-middle ms-2 text-primary"></span>Loading...</div>'
        });
        ui_blocker.block();
        const btn_id = document.querySelector('#ipt_btn_form_postulat_id').value,
        btn_submit = document.querySelector('#' + btn_id),
        expedition_id = btn_submit.getAttribute('data-expedition-id'),
        transporteur_id = btn_submit.getAttribute('data-transporteur-id');
        // Submit form
        const form = document.querySelector('#form_postulat');
        form.querySelector('#montant_propose').value = montant_postulat;
        form.querySelector('#expedition_id').value = expedition_id;
        form.querySelector('#transporteur_id').value = transporteur_id;
        form.submit();
        // ui_blocker.release();
    }
}

/**
 * 
 * @param {*} postulant_id 
 */

function update_postulat(postulant_id)
{
    // alert(document.querySelector('#postulant_id'));
    document.querySelector('#form_update_postulant').submit();
}

/**
 * 
 */

$(document).ready(function() {

    /**
     * 
     */
    document.addEventListener('click', function (e) {
        const element = e.target;

        if (element.classList.contains('btn_submit_form_postulat')) {
            // alert(element.getAttribute('id'));
            const btn_id = element.getAttribute('id'),
            modal = $('#kt_modal_postulat');
            modal.find('#ipt_btn_form_postulat_id').val(btn_id);
            modal.modal('show');
        }
        else if(element.classList.contains('btn_submit_form_cancel_postulat')) {
            Swal.fire({
                html: ('<div class="fw-semibold text-dark fs-6 ms-5">Voulez-vous vraiment annuler votre postulat ?</div>'),
                icon: "warning",
                buttonsStyling: false,
                showCancelButton: true,
                confirmButtonText: "Oui",
                cancelButtonText: 'Non',
                customClass: {
                    confirmButton: "btn btn-warning",
                    cancelButton: 'btn btn-secondary'
                }
            }).then(function (action) {
                if(action.isConfirmed){
                    // Show block ui loading indication
                    const ui_blocker = new KTBlockUI(document.querySelector('body'), {
                        message: '<div class="blockui-message"><span class="spinner-border spinner-border-sm align-middle ms-2 text-primary"></span>Loading...</div>'
                    });
                    ui_blocker.block();
                    const postulant_id = element.getAttribute('data-postulant-id');
                    // Submit form
                    const form = document.querySelector('#form_cancel_postulat');
                    form.querySelector('#postulant_id').value = postulant_id;
                    form.submit();
                    // ui_blocker.release(); 
                }
            });
        }
    }, false);
    /**
     * 
     */
    document.querySelector('#btn_submit_modal_postulat').addEventListener('click', function(e){
        e.preventDefault();
        submitFormPostulat();
    });
    /**
     * 
     */
    document.querySelector('#btn_cancel_modal_postulat').addEventListener('click', function(e){
        e.preventDefault();
        document.querySelector('#ipt_montant_postulat').value = null;
    });
    /**
     * 
     */
    $('#kt_modal_postulat').on('shown.bs.modal', function () {
        $(this).find('#ipt_montant_postulat').focus();
    })
});
