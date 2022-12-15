/**
 * 
 */
$(() => {
    /**
     * 
     */
    $('.postulant_title, .postulant_avatar').click(e => {
        const ui_blocker = new KTBlockUI(document.querySelector('body'), {
            message: '<div class="blockui-message"><span class="spinner-border spinner-border-sm align-middle ms-2 text-primary"></span>Loading...</div>'
        });
        ui_blocker.block();
        const that = e.currentTarget;
        e.preventDefault();
        $.ajax({
            method: $(that).attr('data-method'),
            url: $(that).attr('data-route'),
            data: $(that).serialize()
        })
        .done((data) => {
            const modal_wrapper = $('#modal_details_postulant_wrapper');
            modal_wrapper.html(data);
            ui_blocker.release();
            ui_blocker.destroy();
            modal_wrapper.find('#modal_details_transporteur').modal('show');
        })
        .fail((data) => {
            console.log(data);
        });
    });
    /**
     * 
     */
    $('#kt_postulants_all_table .btn_select_postulant, #kt_postulants_one_table .btn_select_postulant').click(e => {
        e.preventDefault();
        const btn = e.currentTarget;
        const postulant_id = $(btn).attr('data-postulant-id');
        const form = $('#form_select_postulant');
        form.find('input[name="postulant_id"]').val(postulant_id);
        form.submit();
    });
});
