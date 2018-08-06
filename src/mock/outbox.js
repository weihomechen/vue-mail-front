import Mock from 'mockjs';
import { param2Obj } from 'utils';

const list = [];
const count = 100;

for (let i = 0; i < count; i++) {
    list.push(Mock.mock({
        id: '@increment',
        'isStar|1': true,
        'isHaveFile|1': true,
        'isHaveAudio|1': true,
        receiveList: [],
        labelList: [
            {
                guid: '1',
                name: '标签1'
            },
            {
                guid: '2',
                name: '标签2'
            },
            {
                guid: '3',
                name: '标签3'
            }
        ],
        title: '@ctitle(10, 40)',
        sendDate: +Mock.Random.date('T')
    }));
    for (let r = 0; r < 5; r++) {
        list[i].receiveList.push(Mock.mock({
            name: '@cname',
            mail: '@email'
        }))
    }
}

export default {
    getList: config => {
        const { title, receiveName, receiveMail, page, limit, sort, order } = param2Obj(config.url);
        const mockList = list.filter(item => {
            if (title && item.title.indexOf(title) < 0) return false;
            if (receiveName && item.receiveList.every(receive => receive.name.indexOf(receiveName) < 0)) return false;
            if (receiveMail && item.receiveList.every(receive => receive.mail.indexOf(receiveMail) < 0)) return false;
            return true;
        });
        function orderFunc(a, b) {
            if (order === 'ascending') {
                return a[sort] - b[sort];
            } else {
                return b[sort] - a[sort];
            }
        }
        sort && mockList.sort(orderFunc);
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1));
        return {
            total: mockList.length,
            items: pageList
        }
    }
};