$(document).ready(function() {

    const overview_widget = document.querySelector("#expeditions_overview_widget");

    $(overview_widget.querySelectorAll('#expeditions_overview_nav .nav-link')).on(
        "click, focus",
        function (e) {
            e.preventDefault();

            const tab_widget_id = this.getAttribute('href');
            const tab_widget = overview_widget.querySelector(tab_widget_id);

            const data_text = tab_widget.getAttribute('data-text');
            const data_number = tab_widget.getAttribute('data-number');
            const text = (((0 === parseInt(data_number)) ? 'Aucune' : data_number) + ' ' + data_text);

            overview_widget.querySelector('.card-header .card-title span:last-child').textContent = text;
        }
    );
});
