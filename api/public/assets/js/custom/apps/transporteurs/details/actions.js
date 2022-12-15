function approuver_camion(id){
    form=document.querySelector("#form_approuver_camion"+id);
    alert(form.id);
    Swal.fire({
        text:
            "Voulez-vous vraiment approuver ce camion"+
            "?",
        icon: "warning",
        showCancelButton: !0,
        buttonsStyling: !1,
        confirmButtonText: "Oui, approuver!",
        cancelButtonText: "Non, annuler",
        customClass: {
            confirmButton: "btn fw-bold btn-active-light-success",
            cancelButton:
                "btn fw-bold btn-active-light-danger",
        },
    }).then(function (e) {
        if(e.value){
            alert(form)
            form.submit();
        }
    })
}