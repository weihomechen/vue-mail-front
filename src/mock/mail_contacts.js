import Mock from 'mockjs';
import { param2Obj } from 'utils';

let list = [];
const count = 100;

for (let i = 0; i < count - 5; i++) {
    list.push(Mock.mock({
        id: '@increment',
        name: '@cname',
        mail: '@email("abc.com")',
        avatarUrl: 'http://or7rpa0sk.bkt.clouddn.com/avatar.jpg'
    }));
}
list = list.concat([
    {
        id: '-1',
        name: '曾艳芬',
        mail: 'zengyanfen@snh48.com',
        avatarUrl: 'http://or7rpa0sk.bkt.clouddn.com/avatar.jpg'
    },
    {
        id: '-2',
        name: '鞠婧祎',
        mail: 'jujingyi@snh48.com',
        avatarUrl: 'http://or7rpa0sk.bkt.clouddn.com/avatar.jpg'
    },
    {
        id: '-2',
        name: '黄婷婷',
        mail: 'huangtingting@snh48.com',
        avatarUrl: 'http://or7rpa0sk.bkt.clouddn.com/avatar.jpg'
    },
    {
        id: '-3',
        name: '冯薪朵',
        mail: 'fengxinduo@snh48.com',
        avatarUrl: 'http://or7rpa0sk.bkt.clouddn.com/avatar.jpg'
    },
    {
        id: '-4',
        name: '陆婷',
        mail: 'luting@snh48.com',
        avatarUrl: 'http://or7rpa0sk.bkt.clouddn.com/avatar.jpg'
    }
]);

export default {
    getList: config => {
        const { name, mail, groupId, page, limit } = param2Obj(config.url);
        let mockList = list.filter(item => {
            if (name && item.name.indexOf(name) < 0) return false;
            if (mail && item.mail.indexOf(mail) < 0) return false;
            if (groupId && item.groupId !== groupId) return false;
            return true;
        });
        if (page) {
            mockList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1));
        }
        return {
            total: list.length,
            contacts: mockList
        }
    }
};