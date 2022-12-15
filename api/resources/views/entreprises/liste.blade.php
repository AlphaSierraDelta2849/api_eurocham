
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

{{-- @section('scripts') --}}
<script>
    $(document).ready(function() {
        @if (Session::has('success'))
            toastr.options.timeOut = 7000;
            toastr.options.closeButton = true;
            toastr.options.progressBar = false;
            toastr.options.showMethod = "fadeIn";
            toastr.options.hideMethod = "fadeOut";
            toastr.options.positionClass = "toastr-top-right";
            toastr.options.preventDuplicates = false;
            toastr.success("{{ Session::get('success') }}");
        @endif
    });
</script>
{{-- <script src={{URL::asset("assets/plugins/custom/datatables/datatables.bundle.js")}}></script> --}}
{{-- <script src={{URL::asset("assets/js/widgets.bundle.js")}}></script>
<script src={{URL::asset("assets/js/custom/widgets.js")}}></script>
<script src={{URL::asset("assets/js/custom/utilities/modals/users-search.js")}}></script> --}}
<script src={{URL::asset("assets/js/custom/apps/expediteurs/liste/listing.js")}}></script>

{{-- @endsection --}}