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
        'type|1': ['receive', 'send'],
        sendName: '@cname',
        sendMail: '@email',
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
        title: '@ctitle(10, 30)',
        date: +Mock.Random.date('T')
    }));
}

export default {
    getList: config => {
        const { type, title, startDate, stopDate, page, limit, routeQuery, sort, order } = param2Obj(config.url);
        const mockList = list.filter(item => {
            if (type && item.type !== type) return false;
            if (title && item.title.indexOf(title) < 0) return false;
            if (startDate && item.date < startDate) return false;
            if (stopDate && item.date > stopDate) return false;
            // if (routeQuery) {
            //     // 路由查询参数
            //     for (const field in routeQuery) {
            //         if (item[field] === routeQuery[field]) {
            //             return true;
            //         }
            //     }
            // }
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