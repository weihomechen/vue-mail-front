import fetch from 'utils/fetch';
import { Observable } from 'rxjs/Observable';

export function fetchList() {
    return fetch({
        url: '/mail_group/list',
        method: 'get'
    });
}

export function add(groupDTO) {
    return Observable.create(observer => {
        setTimeout(observer.next(), 100);
    })
}

export function edit(groupDTO) {
    return Observable.create(observer => {
        setTimeout(observer.next(), 100);
    })
}

export function del(id) {
    return Observable.create(observer => {
        setTimeout(observer.next(), 20);
    })
}