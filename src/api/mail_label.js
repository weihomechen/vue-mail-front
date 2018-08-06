import fetch from 'utils/fetch';
import { Observable } from 'rxjs/Observable';

export function fetchList() {
    return fetch({
        url: '/mail_label/list',
        method: 'get'
    });
}

export function add(labelDTO) {
    return Observable.create(observer => {
        setTimeout(observer.next(), 100);
    })
}

export function edit(labelDTO) {
    return Observable.create(observer => {
        setTimeout(observer.next(), 100);
    })
}

export function del(id) {
    return Observable.create(observer => {
        setTimeout(observer.next(), 20);
    })
}

export function toggleStar(idArr) {
    return Observable.create(observer => {
        setTimeout(observer.next(), 20)
    })
}

export function markLabel(idArr) {
    return Observable.create(observer => {
        setTimeout(observer.next(), 20);
    })
}

