import { Col, Row, Space, Table, Tag } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IconEdit } from '~/assets/svgs';
import Modal from '~/components/Modal/Modal';
import PrimaryButton from '~/components/PrimaryButton/PrimaryButton';
import { CATEGORY_LIST_REQUEST } from '~/redux/actions/category';
import styles from './Category.module.sass';

const cx = classNames.bind(styles);

function Category(props) {
    const [modalEdit, setModalEdit] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(CATEGORY_LIST_REQUEST());
    }, []);
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    const categoryData = useSelector((state) => state.categories);

    console.log(categoryData);
    const dataSource = categoryData?.data?.data
        ? categoryData?.data?.data.map((category, index) => {
              return {
                  ...category,
                  status: category.total_prod > 0 ? ['Available'] : ['Unavailable'],
                  key: index,
                  created_at: category.created_at.slice(0, 10),
                  total: category.total_prod ? category.total_prod : 0,
                  id: category.id,
              };
          })
        : [];

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };
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
            sorter: (a, b) => {
                console.log(Date.parse(b.created_at) - Date.parse(a.created_at));
                return Date.parse(a.created_at) - Date.parse(b.created_at);
            },
            sortDirections: ['descend'],
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
                        } else if (tag === 'Unavailable') {
                            color = 'red';
                        } else if (tag === 'Available') {
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
            filters: [
                {
                    text: 'Available',
                    value: 'Available',
                },
                {
                    text: 'Unavailable',
                    value: 'Unavailable',
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
        {
            title: '',
            key: 'action',
            dataIndex: 'id',
            render: (id) => (
                <Link to={`/category/edit/${id}`}>
                    <Space size="middle">
                        <div className={cx('edit-wrapper')}>
                            <IconEdit width={15} height={10} />
                        </div>
                    </Space>
                </Link>
            ),
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <Table
                className={cx('table')}
                columns={columns}
                pagination="bottomRight"
                dataSource={dataSource}
                onChange={onChange}
            />

            <Modal
                width={500}
                submitBtn={<PrimaryButton>submit</PrimaryButton>}
                triggerBtn={<PrimaryButton>Add</PrimaryButton>}
            >
                <h3>Add new category</h3>
                <form onSubmit={handleSubmit(onSubmit)} className={cx('form-wrapper')}>
                    <Row gutter={24}>
                        <Col xs={24}>
                            <div className={cx('form-item')}>
                                <label className={cx('label')} for="cate_code">
                                    Mã danh mục
                                </label>
                                <input
                                    className={cx('input')}
                                    id="cate_code"
                                    {...register('cate_code', { required: true })}
                                    type="text"
                                    defaultValue=""
                                ></input>
                            </div>
                        </Col>
                        <Col xs={24}>
                            <div className={cx('form-item')}>
                                <label className={cx('label')} for="name">
                                    Tên danh mục
                                </label>
                                <input
                                    className={cx('input')}
                                    id="name"
                                    {...register('name', { required: true })}
                                    type="text"
                                    defaultValue=""
                                ></input>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24}>
                            <div className={cx('form-item')}>
                                <label className={cx('label')} for="description">
                                    Mô tả
                                </label>
                                <textarea
                                    className={cx('input', 'description')}
                                    id="description"
                                    {...register('description', { required: true })}
                                    type="text"
                                    defaultValue=""
                                ></textarea>
                            </div>
                        </Col>
                    </Row>
                </form>
            </Modal>
        </div>
    );
}

export default Category;
