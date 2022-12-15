<x-app-layout>
    <html>

    <head>
        {{-- begin::Favicon --}}
        <link type="image/x-icon" rel="shortcut icon" href={{ URL::asset('assets/media/logos/favicon.ico') }} />
        {{-- end::Favicon --}}

        {{-- begin::Fonts --}}
        <link rel="stylesheet"
            href={{ URL::asset('https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700') }} />
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
        <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
            <!--begin::Content wrapper-->
            <div class="d-flex flex-column flex-column-fluid">
                @include('detailEntreprise.toolbar')
                @include('detailEntreprise.content_view')
            </div>
            <!--end::Content wrapper-->
        </div>
        <!--end:::Main-->


    </body>
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
    <script src={{ URL::asset('assets/plugins/global/plugins.bundle.js') }}></script>
    <script src={{ URL::asset('assets/js/scripts.bundle.js') }}></script>
    {{-- end::Global Javascript Bundle --}}

    {{-- begin::Page Vendors Javascript(used by this page) --}}
    <script src={{ URL::asset('assets/plugins/custom/datatables/datatables.bundle.js') }}></script>
    <!--begin::Custom Javascript(used by this page)-->
    <script src={{ URL::asset('assets/js/custom/apps/transporteurs/details/liste-expeditions.js') }}></script>
    <script src={{ URL::asset('assets/js/custom/apps/transporteurs/details/liste-vehicules.js') }}></script>
    <script src={{ URL::asset('assets/js/custom/apps/transporteurs/details/actions.js') }}></script>
    <script src={{ URL::asset('assets/js/custom/apps/ecommerce/customers/details/add-auth-app.js') }}></script>
    <script src={{ URL::asset('assets/js/custom/apps/ecommerce/customers/details/add-address.js') }}></script>
    <script src={{ URL::asset('assets/js/custom/apps/ecommerce/customers/details/add-one-time-password.js') }}></script>
    <script src={{ URL::asset('assets/js/custom/apps/ecommerce/customers/details/update-password.js') }}></script>
    <script src={{ URL::asset('assets/js/custom/apps/ecommerce/customers/details/update-phone.js') }}></script>
    <script src={{ URL::asset('assets/js/custom/apps/ecommerce/customers/details/update-address.js') }}></script>
    <script src={{ URL::asset('assets/js/custom/apps/ecommerce/customers/details/update-profile.js') }}></script>
    <script src={{ URL::asset('assets/js/widgets.bundle.js') }}></script>
    <script src={{ URL::asset('assets/js/custom/widgets.js') }}></script>
    <script src={{ URL::asset('assets/js/custom/apps/chat/chat.js') }}></script>
    <script src={{ URL::asset('assets/js/custom/utilities/modals/upgrade-plan.js') }}></script>
    <script src={{ URL::asset('assets/js/custom/utilities/modals/create-app.js') }}></script>
    <script src={{ URL::asset('assets/js/custom/utilities/modals/new-card.js') }}></script>
    <script src={{ URL::asset('assets/js/custom/utilities/modals/users-search.js') }}></script>
    <!--end::Custom Javascript-->

    </html>

</x-app-layout>
