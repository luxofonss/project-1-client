import { Space, Table, Tag } from 'antd';
import classNames from 'classnames/bind';
import styles from './Category.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { CATEGORY_LIST_REQUEST } from '~/redux/actions/category';
import { IconEdit, ThreeDot } from '~/assets/svgs';
import DropdownSelect from '~/components/DropdownSelect/DropdownSelect';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const columns = [
    {
        title: 'Số thứ tự',
        width: '95px',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: 'Mã BST',
        width: '85ipx',
        dataIndex: 'cate_code',
        key: 'cate_code',
    },
    {
        title: 'Tên bộ sưu tập',
        dataIndex: 'name',
        key: 'name',
    },

    {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'created_at',
        key: 'createdAt',
    },
    {
        title: 'Số sản phẩm',
        width: '120px',
        dataIndex: 'total',
        key: 'total',
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
        dataIndex: 'id',
        render: (id) => (
            <Link to={`/category/edit?id=${id}`}>
                <Space size="middle">
                    <div className={cx('edit-wrapper')}>
                        <IconEdit width={15} height={10} />
                    </div>
                </Space>
            </Link>
        ),
    },
];
function Category(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(CATEGORY_LIST_REQUEST());
    }, []);
    const categoryData = useSelector((state) => state.categories);
    console.log(categoryData?.categories.data);
    const dataSource = categoryData?.categories?.data
        ? categoryData?.categories?.data.map((category, index) => {
              return {
                  ...category,
                  status: category.total_prod > 0 ? ['Pending'] : ['Rejected'],
                  key: index,
                  created_at: category.created_at.slice(0, 10),
                  total: category.total_prod ? category.total_prod : 0,
                  id: category.id,
              };
          })
        : [];

    console.log(dataSource, 'dataSource');

    return (
        <div className={cx('wrapper')}>
            <Table className={cx('table')} columns={columns} pagination="bottomRight" dataSource={dataSource} />
        </div>
    );
}

export default Category;
