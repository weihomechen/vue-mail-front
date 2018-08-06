import fetch from 'utils/fetch';
import { Observable } from 'rxjs/Observable';

export function fetchList(query) {
    return fetch({
        url: '/mail_list',
        method: 'get',
        params: query
    });
}

export function delMail(idArr) {
    const idStr = String(idArr);
    console.log('要删除的邮件id:' + idStr);
    return Observable.create(observer => {
        setTimeout(() => { observer.next(true); }, 500);
    });
}

export function unDoDelMail(idArr) {
    const idStr = String(idArr);
    console.log('要撤销删除的邮件id:' + idStr);
    return Observable.create(observer => {
        setTimeout(() => { observer.next(true); }, 500);
    });
}
