
import Swal from "sweetalert2";



export const NotifyTimer = (timer: number, title: string) => {
    let timerInterval:any;

    return Swal.fire({
        title: title,
        html: 'I will close in <b></b> milliseconds.',
        background: "#e84393",
        color: "#fff",
        
        timer: timer,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b:any = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
        }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
        })
}
