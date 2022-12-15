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
    <x-app-layout>

        {{-- <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">
                       
                        @include('entreprises.liste')
                    </div>
                </div>
            </div> --}}
        <div class="d-flex flex-row flex-column-fluid">
            <div class="d-flex flex-row-fluid bg-dark flex-center">
                <span class="text-white">@include('entreprises.liste')</span>
            </div>

            {{-- <div class="d-flex flex-row-auto w-200px bg-warning flex-center">
                    <span class="text-white">Fixed Width</span>
                </div> --}}
        </div>

    </x-app-layout>

</body>

</html>
