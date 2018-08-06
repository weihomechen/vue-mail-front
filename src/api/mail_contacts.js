import fetch from 'utils/fetch';
import { Observable } from 'rxjs/Observable';

export function fetchList(query) {
    return fetch({
        url: '/mail_contacts/list',
        method: 'get',
        params: query
    });
}

export function add(contactsDTO) {
    return Observable.create(observer => {
        setTimeout(observer.next(), 100);
    })
}

export function edit(contactsDTO) {
    return Observable.create(observer => {
        setTimeout(observer.next(), 100);
    })
}

export function del(idArr) {
    return Observable.create(observer => {
        setTimeout(observer.next(), 20);
    })
}


 