<!--begin:::Tab pane-->
<div class="tab-pane fade" id="kt_ecommerce_customer_general" role="tabpanel">
    <!--begin::Card-->
    <div class="card pt-4 mb-6 mb-xl-9">
        <!--begin::Card header-->
        <div class="card-header border-0">
            <!--begin::Card title-->
            <div class="card-title">
                <h2>Profile</h2>
            </div>
            <!--end::Card title-->
        </div>
        <!--end::Card header-->
        <!--begin::Card body-->
        <div class="card-body pt-0 pb-5">
            <!--begin::Form-->
            <form class="form" action="{{route('updateProfile')}}" enctype="multipart/form-data"
                id="admin_transporteur_profile" method="POST">
                @csrf
                <input type="hidden" name="id" value="{{$entreprise->id}}">
                <!--begin::Input group-->
                <div class="mb-7">
                    <!--begin::Label-->
                    <label class="fs-6 fw-semibold mb-2">
                        <span>Update Avatar</span>
                        <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"
                            title="Allowed file types: png, jpg, jpeg."></i>
                    </label>
                    <!--end::Label-->
                    <!--begin::Image input wrapper-->
                    <div class="mt-1">
                        <!--begin::Image input placeholder-->
                        <style>
                            .image-input-placeholder {
                                background-image: url({{ URL::asset('assets/media/svg/avatars/blank.svg') }});
                            }

                            [data-theme="dark"] .image-input-placeholder {
                                background-image: url({{ URL::asset('assets/media/svg/avatars/blank.svg') }});
                            }
                        </style>
                        <!--end::Image input placeholder-->
                        <!--begin::Image input-->
                        <div class="image-input image-input-outline image-input-placeholder" data-kt-image-input="true">
                            <!--begin::Preview existing avatar-->
                            <div class="image-input-wrapper w-125px h-125px"
                                style="background-image: url('{{ $avatar }}'); ">
                            </div>
                            <!--end::Preview existing avatar-->
                            <!--begin::Edit-->
                            <label class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                                data-kt-image-input-action="change" data-bs-toggle="tooltip" title="Changer d'avatar">
                                <i class="bi bi-pencil-fill fs-7"></i>
                                <!--begin::Inputs-->
                                <input type="file" name="avatar" accept=".png, .jpg, .jpeg"
                                    value="{{ $has_avatar ? $avatar : old('avatar') }}" />
                                <input type="hidden" name="avatar_remove" id="remove_avatar" />
                                <input type="hidden" name="avatar_input_action" id="avatar_input_action" value="none"
                                    required>
                                <!--end::Inputs-->
                            </label>
                            <!--end::Edit-->
                            <!--begin::Cancel-->
                            <span class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                                data-kt-image-input-action="cancel" data-bs-toggle="tooltip" title="Annuler avatar">
                                <i class="bi bi-x fs-2"></i>
                            </span>
                            <!--end::Cancel-->
                            <!--begin::Remove-->
                            <span class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                                data-kt-image-input-action="remove" data-bs-dismiss="click" data-bs-toggle="tooltip"
                                title="Supprimer l'avatar">
                                <i class="bi bi-x fs-2"></i>
                            </span>
                            <!--end::Remove-->
                        </div>
                        <!--end::Image input-->
                    </div>
                    <!--end::Image input wrapper-->
                </div>
                <!--end::Input group-->
                <!--begin::Input group-->
                <div class="row row-cols-1 row-cols-md-2 mb-7">
                    <div class="col">
                        <!--begin::Label-->
                        <label class="fs-6 fw-semibold mb-2 required">Nom</label>
                        <!--end::Label-->
                        <!--begin::Input-->
                        <input type="text" class="form-control form-control-solid" placeholder="" name="name"
                            id="nom" value="{{ $entreprise->name }}" />
                        <!--end::Input-->
                    </div>
                    <!--begin::Col-->
                    <div class="col">
                        <!--begin::Input group-->
                        <div class="fv-row mb-7">
                            <!--begin::Label-->
                            <label class="fs-6 fw-semibold mb-2">
                                <span>Téléphone</span>
                                <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"
                                    title=""></i>
                            </label>
                            <!--end::Label-->
                            <!--begin::Input-->
                            <input type="text" class="form-control form-control-solid" placeholder="" name="phone"
                                id="phone" value="{{ $entreprise->phone }}" />
                            <!--end::Input-->
                        </div>
                        <!--end::Input group-->
                    </div>
                    <!--end::Col-->
                </div>
                <!--end::Input group-->
                <!--begin::Row-->
                <div class="row row-cols-1 row-cols-md-2">
                    <!--begin::Col-->
                    <div class="col">
                        <!--begin::Input group-->
                        <div class="fv-row mb-7">
                            <!--begin::Label-->
                            <label class="fs-6 fw-semibold mb-2">
                                <span class="required">Site web
                                </span>
                                <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"
                                    title="Email address must be active"></i>
                            </label>
                            <!--end::Label-->
                            <!--begin::Input-->
                            <input type="text" class="form-control form-control-solid" placeholder="" name="siteweb"
                                id="siteweb" value="{{ $entreprise->siteweb }}" />
                            <!--end::Input-->
                        </div>
                        <!--end::Input group-->
                    </div>
                    <!--end::Col-->
                    
                    <!--begin::Input group-->
                    <div class="fv-row mb-7">
                        <!--begin::Label-->
                        <label class="fs-6 fw-semibold mb-2">
                            <span>Adresse siège principal</span>
                            <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"
                                title=""></i>
                        </label>
                        <!--end::Label-->
                        <!--begin::Input-->
                        <input type="text" class="form-control form-control-solid" placeholder="" name="siege"
                            id="adresse" value="{{ $entreprise->siege }}" />
                        <!--end::Input-->
                    </div>
                    <!--end::Input group-->
                </div>
                <!--end::Row-->
                <div class="d-flex justify-content-end">
                    <!--begin::Button-->
                    <button type="submit" id="admin_transporteur_profile_submit" class="btn btn-light-primary">
                        <span class="indicator-label">Save</span>
                        <span class="indicator-progress">Please wait...
                            <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                    </button>
                    <!--end::Button-->
                </div>
            </form>
            <!--end::Form-->
        </div>
        <!--end::Card body-->
    </div>
    <!--end::Card-->
</div>
<!--end:::Tab pane-->
