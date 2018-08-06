import Mock from 'mockjs';
import { param2Obj } from 'utils';

function mockReceiveMail(mailId) {
    return Mock.mock({
        id: mailId,
        title: `编号为 ${mailId} 的收件`,
        content: '<p>我是收件测试数据我是收件测试数据</p><p><img class="wscnph" src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943" data-wscntype="image" data-wscnh="300" data-wscnw="400" data-mce-src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>"',
        sender: '@cname',
        sendMail: '@email',
        receiveDate: +Mock.Random.date('T'),
        'isStar|1': true,
        target: [
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
                name: '李艺彤',
                mail: 'liyitong@snh48.com'
            },
            {
                name: '冯薪朵',
                mail: 'fengxinduo@snh48.com'
            }
        ],
        copy: [
            {
                name: '陆婷',
                mail: 'luting@snh48.com'
            },
            {
                name: '万丽娜',
                mail: 'wanlina@snh48.com'
            },
            {
                name: '易嘉爱',
                mail: 'yijiaai@snh48.com'
            },
            {
                name: '林思意',
                mail: 'linsiyi@snh48.com'
            },
            {
                name: '赵粤',
                mail: 'zhaoyue@snh48.com'
            }
        ],
        oldFileList: [
            {
                name: '第四届年度总选',
                url: 'http://onh4i9vxw.bkt.clouddn.com/bq.jpg'
            },
            {
                name: '第四届年度总选',
                url: 'http://onh4i9vxw.bkt.clouddn.com/bq.jpg'
            }
        ],
        oldAudioList: [
            {
                name: '三无MarBlue - 星星和雨的夜.mp3',
                url: 'http://or7rpa0sk.bkt.clouddn.com/%E4%B8%89%E6%97%A0MarBlue%20-%20%E6%98%9F%E6%98%9F%E5%92%8C%E9%9B%A8%E7%9A%84%E5%A4%9C.mp3'
            },
            {
                name: '三无MarBlue - 星星和雨的夜.mp3',
                url: 'http://or7rpa0sk.bkt.clouddn.com/%E4%B8%89%E6%97%A0MarBlue%20-%20%E6%98%9F%E6%98%9F%E5%92%8C%E9%9B%A8%E7%9A%84%E5%A4%9C.mp3'
            }
        ],
        labelList: [
            {
                id: '1',
                name: '标签1',
                color: '#00ADB5'
            },
            {
                id: '2',
                name: '标签2',
                color: '#F08A5D'
            },
            {
                id: '3',
                name: '标签3',
                color: '#F38181'
            }
        ]
    });
}

function mockSendMail(mailId) {
    return Mock.mock({
        id: mailId,
        title: `编号为 ${mailId} 的发件`,
        content: '<p>我是发件测试数据我是发件测试数据</p><p><img class="wscnph" src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943" data-wscntype="image" data-wscnh="300" data-wscnw="400" data-mce-src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>"',
        sender: 'admin',
        sendMail: 'admin@admin.com',
        sendDate: +Mock.Random.date('T'),
        target: [
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
                name: '李艺彤',
                mail: 'liyitong@snh48.com'
            },
            {
                name: '冯薪朵',
                mail: 'fengxinduo@snh48.com'
            }
        ],
        copy: [
            {
                name: '陆婷',
                mail: 'luting@snh48.com'
            },
            {
                name: '万丽娜',
                mail: 'wanlina@snh48.com'
            },
            {
                name: '易嘉爱',
                mail: 'yijiaai@snh48.com'
            },
            {
                name: '林思意',
                mail: 'linsiyi@snh48.com'
            },
            {
                name: '赵粤',
                mail: 'zhaoyue@snh48.com'
            }
        ],
        oldFileList: [
             {
                name: '第四届年度总选',
                url: 'http://onh4i9vxw.bkt.clouddn.com/bq.jpg'
            },
            {
                name: '第四届年度总选',
                url: 'http://onh4i9vxw.bkt.clouddn.com/bq.jpg'
            }
        ],
        oldAudioList: [
            {
                name: '三无MarBlue - 星星和雨的夜.mp3',
                url: 'http://or7rpa0sk.bkt.clouddn.com/%E4%B8%89%E6%97%A0MarBlue%20-%20%E6%98%9F%E6%98%9F%E5%92%8C%E9%9B%A8%E7%9A%84%E5%A4%9C.mp3'
            },
            {
                name: '三无MarBlue - 星星和雨的夜.mp3',
                url: 'http://or7rpa0sk.bkt.clouddn.com/%E4%B8%89%E6%97%A0MarBlue%20-%20%E6%98%9F%E6%98%9F%E5%92%8C%E9%9B%A8%E7%9A%84%E5%A4%9C.mp3'
            }
        ],
        labelList: [
            {
                id: '1',
                name: '标签1',
                color: '#00ADB5'
            },
            {
                id: '2',
                name: '标签2',
                color: '#F08A5D'
            },
            {
                id: '3',
                name: '标签3',
                color: '#F38181'
            }
        ]
    });
}

function mockDraft(mailId) {
    return Mock.mock({
        id: mailId,
        title: `编号为 ${mailId} 的草稿`,
        content: '<p>我是草稿测试数据我是草稿测试数据</p><p><img class="wscnph" src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943" data-wscntype="image" data-wscnh="300" data-wscnw="400" data-mce-src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
        target: [
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
                name: '李艺彤',
                mail: 'liyitong@snh48.com'
            },
            {
                name: '冯薪朵',
                mail: 'fengxinduo@snh48.com'
            }
        ],
        copy: [
            {
                name: '陆婷',
                mail: 'luting@snh48.com'
            },
            {
                name: '万丽娜',
                mail: 'wanlina@snh48.com'
            },
            {
                name: '易嘉爱',
                mail: 'yijiaai@snh48.com'
            },
            {
                name: '林思意',
                mail: 'linsiyi@snh48.com'
            },
            {
                name: '赵粤',
                mail: 'zhaoyue@snh48.com'
            }
        ],
        oldFileList: [
             {
                name: '第四届年度总选',
                url: 'http://onh4i9vxw.bkt.clouddn.com/bq.jpg'
            },
            {
                name: '第四届年度总选',
                url: 'http://onh4i9vxw.bkt.clouddn.com/bq.jpg'
            }
        ],
        oldAudioList: [
            {
                name: '三无MarBlue - 星星和雨的夜.mp3',
                url: 'http://or7rpa0sk.bkt.clouddn.com/%E4%B8%89%E6%97%A0MarBlue%20-%20%E6%98%9F%E6%98%9F%E5%92%8C%E9%9B%A8%E7%9A%84%E5%A4%9C.mp3'
            },
            {
                name: '三无MarBlue - 星星和雨的夜.mp3',
                url: 'http://or7rpa0sk.bkt.clouddn.com/%E4%B8%89%E6%97%A0MarBlue%20-%20%E6%98%9F%E6%98%9F%E5%92%8C%E9%9B%A8%E7%9A%84%E5%A4%9C.mp3'
            }
        ]
    });
}

export default {
    getDetail: query => {
        const { mailId, mailType } = param2Obj(query.url);
        if (mailType === 'receive') {
            return mockReceiveMail(mailId);
        } else if (mailType === 'send') {
            return mockSendMail(mailId);
        } else {
            return mockDraft(mailId);
        }
    }
}