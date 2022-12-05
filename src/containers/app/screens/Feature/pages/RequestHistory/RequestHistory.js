import { Space, Table, Tag } from 'antd';
import classNames from 'classnames/bind';
import styles from './RequestHistory.module.sass';

const cx = classNames.bind(styles);

const columns = [
    {
        title: 'Số thứ tự',
        width: '120px',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: 'Loại yêu cầu',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: 'Nội dung',
        dataIndex: 'content',
        key: 'content',
        render: (text) => <a>{text}</a>,
        // cho nay se tao 1 modal
    },
    {
        title: 'Trạng thái',
        key: 'status',
        dataIndex: 'status',
        render: (tags) => (
            <span>
                {tags.map((tag) => {
                    let color;
                    if (tag === 'Pending') {
                        color = 'orange';
                    } else if (tag === 'Rejected') {
                        color = 'red';
                    } else if (tag === 'Success') {
                        color = 'green';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </span>
        ),
    },
    {
        title: '',
        key: 'action',
        render: () => (
            <Space size="middle">
                <a>Cancel</a>
            </Space>
        ),
    },
];
const data = [
    {
        key: '1',
        type: 'Yêu cầu gia hạn hợp đồng',
        createdAt: '20-11-2022',
        content: 'Chúng tôi muốn gia hạn hợp đồng thêm 100 năm nữa',
        status: ['Rejected'],
    },
    {
        key: '2',
        type: 'Yêu cầu gia hạn hợp đồng',
        createdAt: '20-11-2022',
        content: 'Chúng tôi muốn gia hạn hợp đồng thêm 100 năm nữa',
        status: ['Pending'],
    },
    {
        key: '3',
        type: 'Yêu cầu gia hạn hợp đồng',
        createdAt: '20-11-2022',
        content: 'Chúng tôi muốn gia hạn hợp đồng thêm 100 năm nữa',
        status: ['Success'],
    },
    {
        key: '4',
        type: 'Yêu cầu gia hạn hợp đồng',
        createdAt: '20-11-2022',
        content: 'Chúng tôi muốn gia hạn hợp đồng thêm 100 năm nữa',
        status: ['Pending'],
    },
];

function RequestHistory(props) {
    return (
        <div className={cx('contract-manager')}>
            <Table className={cx('table')} columns={columns} pagination="bottomRight" dataSource={data} />
        </div>
    );
}

export default RequestHistory;
