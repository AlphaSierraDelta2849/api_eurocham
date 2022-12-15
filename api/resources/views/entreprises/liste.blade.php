
{{-- @section('component-body-content') --}}
<div class="d-block">
    {{-- <!--begin::Expeditions--> --}}
    <div class="card mb-5 mb-xl-10">
        {{-- <!--begin::Card header--> --}}
        <div class="card-header">
            {{-- <!--begin::Card title--> --}}
            <div class="card-title">
                <h3 class="fw-bold">Liste des Entreprises</h3>
            </div>
            {{-- <!--end::Card title--> --}}
        </div>
        {{-- <!--end::Card header--> --}}
        {{-- <!--begin::Card body--> --}}
        <div class="card-body">
            <div class="tab-content">
                {{-- <!--begin::Expeditions En Cours--> --}}
                <div id="kt_tab_expeditions_in_progress">
                    @include('entreprises.view')
                </div>
                {{-- <!--end::Expeditions En Cours--> --}}
            </div>
            {{-- <!--end::Content--> --}}
        </div>
        {{-- <!--end::Card body--> --}}
    </div>
    {{-- <!--end::Expeditions--> --}}
</div>
{{-- @endsection --}}

