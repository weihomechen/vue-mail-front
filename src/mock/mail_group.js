import Mock from 'mockjs';

const list = [];
const count = 6;

for (let i = 0; i < count; i++) {
    list.push(Mock.mock({
        id: '@increment',
        name: '@ctitle',
        contacts: [
            {
                name: '曾艳芬',
                mail: 'zengyanfen@snh48.com'
            },
            {
                name: '鞠婧祎',
                mail: 'jujingyi@snh48.com'
            },
            {
                name: '黄婷婷',
                mail: 'huangtingting@snh48.com'
            },
            {
                name: '冯薪朵',
                mail: 'fengxinduo@snh48.com'
            },
            {
                name: '陆婷',
                mail: 'luting@snh48.com'
            }
        ]
    }));
}

export default {
    getList: () => {
        return {
            total: list.length,
            groupList: list
        }
    }
};