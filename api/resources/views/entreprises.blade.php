<x-app-layout>

<html>

<head>
    {{-- begin::Favicon --}}
    <link type="image/x-icon" rel="shortcut icon" href={{ URL::asset('assets/media/logos/favicon.ico') }} />
    {{-- end::Favicon --}}

    {{-- begin::Fonts --}}
    <link rel="stylesheet" href={{ URL::asset('https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700') }} />
    {{-- end::Fonts --}}

    {{-- begin::Global Stylesheets Bundle(used by all pages) --}}
    <link type="text/css" rel="stylesheet" href={{ URL::asset('assets/plugins/global/plugins.bundle.css') }} />

    <link type="text/css" rel="stylesheet" href={{ URL::asset('assets/css/style.bundle.css') }} />
    {{-- end::Global Stylesheets Bundle --}}

    <link href={{ URL::asset('assets/plugins/custom/fullcalendar/fullcalendar.bundle.css') }} rel="stylesheet"
        type="text/css" />

    <link type="text/css" rel="stylesheet"
        href={{ URL::asset('assets/plugins/custom/datatables/datatables.bundle.css') }}>
</head>

<body>
        {{-- <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">
                       
                        @include('entreprises.liste')
                    </div>
                </div>
            </div> --}}
        <div class="d-flex flex-xxl flex-row flex-column-fluid mt-10">
            <div class="d-flex flex-row-fluid flex-row-auto flex-center">
                @include('entreprises.liste')
            </div>

            {{-- <div class="d-flex flex-row-auto w-200px bg-warning flex-center">
                    <span class="text-white">Fixed Width</span>
                </div> --}}
        </div>


</body>
{{-- @section('scripts') --}}
<script language="text/javascript">
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
<script>
    var hostUrl = "assets/";
</script>
{{-- begin::Global Javascript Bundle(used by all pages) --}}
<script src={{URL::asset("assets/plugins/global/plugins.bundle.js")}}></script>
<script src={{URL::asset("assets/js/scripts.bundle.js")}}></script>
{{-- end::Global Javascript Bundle --}}

{{-- begin::Page Vendors Javascript(used by this page) --}}
<script src={{URL::asset("assets/plugins/custom/datatables/datatables.bundle.js")}}></script>
<script type="text/javascript" src={{URL::asset("assets/js/custom/apps/expediteurs/liste/listing.js")}}></script>
</html>
</x-app-layout>

