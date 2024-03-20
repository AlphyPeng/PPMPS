toastr.options.closeButton = true;
toastr.options.positionClasss = 'toast-top-right';
toastr.options.newsOnTop = true;
toastr.options.preventDuplicates = true;
toastr.options.onclick = null;
toastr.options.showEasing = 'swing';
toastr.options.hideEasing = 'linear';
toastr.options.timeout = 1000;
toastr.options.extendedTimeout = 1000;
toastr.options.showMethod = 'fadeIn';
toastr.options.hideMethod = 'fadeOut';

function notification(type, message, title) {
    if (type == 'success') {
        toastr.success(message, title);
    } else if (type == 'error') {
        toastr.error(message, title);
    } else if (type == 'warning') {
        toastr.warning(message, title);
    } else if (type == 'warning') {
        toastr.info(message, title);
    }
}