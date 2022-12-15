
<table id="kt_expeditions_en_cours_table" class="kt_expeditions_table table align-middle table-row-dashed fs-6 gy-5">
    {{-- <!--begin::Table head--> --}}
    <thead>
        {{-- <!--begin::Table row--> --}}
        <tr class="text-center text-gray-400 fw-bold fs-7 text-uppercase gs-0">
            <th class="text-center min-w-175px">Expéditeurs</th>
            <th class="text-center min-w-70px">Expéditions</th>
            <th class="text-center min-w-70px">Adresse</th>
            <th class="text-center min-w-100px">Téléphone</th>
            <th class="text-center min-w-100px">Date création de compte</th>
            <th class="text-center min-w-70px">Actions</th>
        </tr>
        {{-- <!--end::Table row--> --}}
    </thead>
    {{-- <!--end::Table head--> --}}
    {{-- <!--begin::Table body--> --}}
    <tbody class="fw-semibold text-gray-600">
        {{-- @foreach ($expediteurs as $expediteur) --}}
            {{-- <!--begin::Table row--> --}}
            <tr>
                {{-- <!--begin::Expéditeur--> --}}
                <td data-order="">
                    <div class="d-flex align-items-center justify-content-start">
                        {{-- <!--begin:: Avatar--> --}}
                        <div class="symbol symbol-circle symbol-50px overflow-hidden me-3">
                            <a href="../../demo1/dist/apps/user-management/users/view.html">
                                {{-- @php
                                    $color_class = $t_colors_classes[\mt_rand(0, 4)];
                                @endphp --}}
                                @if(1)
                                    <div class="symbol-label">
                                        <img class="w-100" src="" alt="">
                                    </div>
                                @else
                                    {{-- <div class="symbol-label fs-3 bg-light-{{$color_class}} text-{{$color_class}}">{{\mb_substr('abcd', 0, 1)}}</div> --}}
                                @endif
                            </a>
                        </div>
                        {{-- <!--end::Avatar--> --}}
                        {{-- <!--begin::Title--> --}}
                        <div class="ms-5">
                            <a class="text-gray-800 text-hover-primary fs-5 fw-bold"
                                href="../../demo1/dist/apps/user-management/users/view.html">
                                </a>
                        </div>
                        {{-- <!--end::Title--> --}}
                    </div>
                </td>
                {{-- <!--end::Expéditeur--> --}}
                {{-- <!--begin::Matière Type--> --}}
                <td class="text-center">
                    <span class="fw-bold"></span>
                </td>
                {{-- <!--end::Matière Type--> --}}
                {{-- <!--begin::Poids Matière--> --}}
                <td class="text-center" data-order="">
                    <span class="fw-bold"></span>
                </td>
                {{-- <!--end::Poids Type--> --}}
                {{-- <!--begin::Adresse Départ--> --}}
                <td class="text-center">
                    <span class="fw-bold"></span>
                </td>
                {{-- <!--end::Adresse Départ--> --}}
                {{-- <!--begin::Date--> --}}
                <td class="text-center" data-order="">
                    <span class="fw-bold"></span>
                </td>
                {{-- <!--end::Date--> --}}
                {{-- <!--begin::Actions--> --}}
                <td class="text-center">
                    <a class="btn btn-light-info btn-sm" href="/">Voir</a>
                </td>
                {{-- <!--end::Actions--> --}}
            </tr>
            {{-- <!--end::Table row--> --}}
        {{-- @endforeach --}}
    </tbody>
{{-- <!--end::Table body--> --}}
</table>