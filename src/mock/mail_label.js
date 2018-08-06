import Mock from 'mockjs';

const list = [];
const count = 6;

for (let i = 0; i < count; i++) {
    list.push(Mock.mock({
        id: '@increment',
        name: '@ctitle',
        color: '@rgba'
    }));
}

export default {
    getList: () => {
        return {
            total: list.length,
            labelList: list
        }
    }
};