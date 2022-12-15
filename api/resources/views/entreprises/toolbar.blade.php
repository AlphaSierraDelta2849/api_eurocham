{{-- <!--begin::Search Box Wrapper--> --}}
<div class="search_box_wrapper">
    {{-- <!--begin::Search--> --}}
    <div class="d-flex align-items-center position-relative my-1 col">
        {{-- <!--begin::Svg Icon | path: icons/duotune/general/gen021.svg--> --}}
        <span class="svg-icon svg-icon-1 position-absolute ms-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
                <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
            </svg>
        </span>
        {{-- <!--end::Svg Icon--> --}}
        <input type="text" class="form-control form-control-solid w-250px ps-14"
            placeholder="Search Order" data-kt-expeditions-in-progress-order-filter="search">
    </div>
    {{-- <!--end::Search--> --}}
</div>
{{-- <!--end::Search Box Wrapper--> --}}
{{-- <!--begin::Filters Wrapper--> --}}
<div class="filters_wrapper">
    <div class="d-flex flex-row-fluid flex-wrap align-items-center gap-5">
        {{-- <!--begin::Flatpickr--> --}}
        <div class="input-group w-250px">
            <input id="kt_expeditions_en_cours_flatpickr"
                class="form-control form-control-solid rounded rounded-end-0" placeholder="Pick date range">
            <button id="kt_expeditions_en_cours_flatpickr_clear" class="btn btn-icon btn-light">
                {{-- <!--begin::Svg Icon | path: icons/duotune/arrows/arr088.svg--> --}}
                <span class="svg-icon svg-icon-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                        <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                    </svg>
                </span>
                {{-- <!--end::Svg Icon--> --}}
            </button>
        </div>
        {{-- <!--end::Flatpickr--> --}}
        <div class="input-group w-250px">
            {{-- <!--begin::Select2--> --}}
            <select class="form-select form-select-solid"
                data-control="select2" data-hide-search="false" data-allow-clear="true"
                data-placeholder="Matière" data-kt-expeditions-in-progress-order-filter="matiere" aria-controls="kt_expeditions_en_cours_table">
                <option></option>
                <option value="all">Tout</option>
                {{-- @foreach ($matieres as $matiere)
                    <option value={{$matiere->type}}>{{$matiere->type}}</option> 
                @endforeach --}}
            </select>
            {{-- <!--end::Select2--> --}}
        </div>
    </div>
</div>
{{-- <!--end::Filters Wrapper--> --}}
