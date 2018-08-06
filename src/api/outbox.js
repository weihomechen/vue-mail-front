import fetch from 'utils/fetch';
import { Observable } from 'rxjs/Observable';

export function fetchList(query) {
    return fetch({
        url: '/outbox/list',
        method: 'get',
        params: query
    });
}

export function delSendMail(idArr) {
    const idStr = String(idArr);
    console.log('要删除的发件id:' + idStr);
    return Observable.create(observer => {
        setTimeout(() => { observer.next(true); }, 1000);
    });
}