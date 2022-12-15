@php
    use App\Models\EtatExpedition;
@endphp
<!--begin::Sidebar-->
<div class="flex-column flex-lg-row-auto w-100 w-xl-350px mb-10">
    <!--begin::Card-->
    <div class="card mb-5 mb-xl-8">
        <!--begin::Card body-->
        <div class="card-body pt-15">
            <!--begin::Summary-->
            <div class="d-flex flex-center flex-column mb-5">
                <!--begin::Avatar-->
                <div class="symbol symbol-150px symbol-circle  mb-7">
                    @if ($entreprise->hasAvatar())
                        <div class="symbol-label">
                            <img class="w-125px h-125px" src="{{ $avatar }}" alt="{{ $entreprise->name }}">
                        </div>
                    @else
                        <img src={{ URL::asset('assets/media/svg/avatars/blank.svg') }} alt="avatar" />
                    @endif
                </div>
                <!--end::Avatar-->
                <!--begin::Name-->
                <a href="#"
                    class="fs-3 text-gray-800 text-hover-primary fw-bold mb-1">{{ $entreprise->name }}</a>
                <!--end::Name-->
                <!--begin::Email-->

                <a href="#"
                    class="fs-5 fw-semibold text-muted text-hover-primary mb-6">{{ $entreprise->email }}</a>
                <!--end::Email-->
            </div>
            <!--end::Summary-->
            <!--begin::Details toggle-->
            <div class="d-flex flex-stack fs-4 py-3">
                <div class="fw-bold">Details</div>
                <!--begin::Badge-->
                <div class="badge badge-light-info d-inline">
                    Premium user
                </div>
                <!--begin::Badge-->
            </div>
            <!--end::Details toggle-->
            <div class="separator separator-dashed my-3"></div>
            <!--begin::Details content-->
            <div class="pb-5 fs-6">
                <!--begin::Details item-->
                <div class="fw-bold mt-5">Type de compte</div>
                    Particulier
                <!--begin::Details item-->
                <!--begin::Details item-->
                <div class="fw-bold mt-5">Téléphone</div>
                <div class="text-gray-600">
                        <a href="#" class="text-gray-600 text-hover-primary">{{ $entreprise->phone }}</a>
                </div>
                <!--begin::Details item-->
                <!--begin::Details item-->
                <div class="fw-bold mt-5">Siege</div>
                <div class="text-gray-600">
                    {{ $entreprise->siege }}
                </div>
                <!--begin::Details item-->
                <!--begin::Details item-->
                <div class="fw-bold mt-5">Site web</div>
                    <div class="text-gray-600">{{ $entreprise->siteweb }}</div>
                <!--begin::Details item-->
                <!--begin::Details item-->
                <div class="fw-bold mt-5">Nombre de posts</div>
                <div class="text-gray-600">
                    <span
                        class="text-gray-600 text-hover-primary">{{ $entreprise->posts->count() }}
                        terminées</span>
                </div>
                <!--begin::Details item-->
                <!--begin::Details item-->
                <div class="fw-bold mt-5">Date de création de compte</div>
                <div class="text-gray-600">
                    <span class="text-gray-600 text-hover-primary">{{ $entreprise->created_at }}</span>
                </div>
                <!--begin::Details item-->
            </div>
            <!--end::Details content-->
        </div>
        <!--end::Card body-->
    </div>
    <!--end::Card-->
</div>
<!--end::Sidebar-->
