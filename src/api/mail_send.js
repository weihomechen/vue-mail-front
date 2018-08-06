import { Observable } from 'rxjs/Observable';

export function sendMail(mailDTO) {
    // 观察formData格式的mailDTO是否正确
    // $.ajax({
    //     url: 'https://httpbin/post',
    //     type: 'POST',
    //     processData: false,    // 不处理发送的数据
    //     contentType: false,    // 不设置Content-Type请求头
    //     enctype: 'multipart/form-data',
    //     data: mailDTO
    // })
    return Observable.create(observer => {
        setTimeout(() => observer.next(), 2000);
    })
}

export function saveAsDraft(mailDTO) {
    return Observable.create(observer => {
        setTimeout(() => observer.next(), 1000);
    })
}