function showSweetAlert(type, title, message) {
    Swal.fire({
        allowOutsideClick: false,
        title: title,
        text: message,
        icon: type,
    });
}

function sweetAlertConfirmation(title, message, icon, buttonText, resulttitle,resultText,resultIcon, callback) {
    Swal.fire({
        title: title,
        Text: message,
        icon: icon,
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: buttonText
    }).then((result => {
        if (result.isConfirmed) {
            Swal.fire({
                allowOutsideClick: false,
                title: resulttitle,
                Text: resultText,
                icon: resultIcon
            })
            callback(result.isConfirmed);
        }
    }))
}
