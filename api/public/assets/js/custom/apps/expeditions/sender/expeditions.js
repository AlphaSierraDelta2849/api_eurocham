/**
 * 
 */

$(document).ready(function() {
    /**
     * 
     */
    document.addEventListener('click', function (e) {
        const element = e.target;

        if(element.classList.contains('btn_submit_form_cancel_expedition')) {
            Swal.fire({
                html: ('<div class="fw-semibold text-dark fs-6 ms-5">Voulez-vous vraiment annuler cette expédition ?</div>'),
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
                    const expedition_id = element.getAttribute('data-expedition-id');
                    // Submit form
                    const form = document.querySelector('#form_cancel_expedition');
                    form.querySelector('#expedition_id').value = expedition_id;
                    form.submit();
                    // ui_blocker.release(); 
                }
            });
        }
    }, false);
});
