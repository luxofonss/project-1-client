import { Button, Col, Row, Space, Table, Tag, Modal, notification } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { REQUEST_STATE } from '~/app-configs';
import { IconEdit, IconTrash } from '~/assets/svgs';
import AppButton from '~/components/AppButton/AppButton';
import {
    CATEGORY_CREATE,
    CATEGORY_CREATE_RESET,
    CATEGORY_LIST_REQUEST,
} from '~/containers/app/screens/Category/redux/action';
import styles from './Category.module.sass';

const cx = classNames.bind(styles);

function Category(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reLoad, setReLoad] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(CATEGORY_LIST_REQUEST({ offset: page * 10, limit: limit }));
    }, [page, limit]);
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('test', pagination);
        setPage(pagination.current - 1);
        setLimit(pagination.pageSize);
        console.log('params', pagination, pageSize, filters, sorter, extra);
    };
    const categoryData = useSelector((state) => state.category?.categoryList);
    const categoryCreate = useSelector((state) => state.category.categoryCreate);

    console.log(categoryData);

    useEffect(() => {
        if (categoryCreate.state == REQUEST_STATE.SUCCESS) {
            setReLoad(true);
            notification.success({
                message: 'Success',
                description: 'Add category successfully!',
            });
            dispatch(CATEGORY_LIST_REQUEST());
        }
        if (categoryCreate?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Fail',
                description: 'Email or password is incorrect!',
            });
        }
        dispatch(CATEGORY_CREATE_RESET());
    }, [categoryCreate?.state]);

    const dataSource = categoryData?.data?.data
        ? categoryData?.data?.data.rows.map((category, index) => {
              return {
                  ...category,
                  status: category.categoryProducts.length > 0 ? ['Available'] : ['Unavailable'],
                  key: index + 1,
                  createdAt: category.createdAt.slice(0, 10),
                  total: category.categoryProducts.length ? category.categoryProducts.length : 0,
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
        console.log('submit');
        console.log(data);
        dispatch(CATEGORY_CREATE(data));

        dispatch(CATEGORY_LIST_REQUEST());
        handleCancel();
    };

    const handleDeleteCategory = (id) => {
        setIsModalOpen(true);
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
            dataIndex: 'id',
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
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => {
                console.log(Date.parse(b.createdAt) - Date.parse(a.createdAt));
                return Date.parse(a.createdAt) - Date.parse(b.createdAt);
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
                <div style={{ display: 'flex', justifyContent: 'center', alignItem: 'center', gap: '8px' }}>
                    <Link to={`/admin/category/edit/${id}`}>
                        <Space size="middle">
                            <div className={cx('edit-wrapper')}>
                                <IconEdit width={15} height={10} />
                            </div>
                        </Space>
                    </Link>
                    <div className={cx('edit-wrapper')}>
                        <IconTrash onClick={handleDeleteCategory(id)} width={15} height={10} />
                    </div>
                </div>
            ),
        },
    ];

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        // setLoading(true);
        // setLoading(false);
        // setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const showModalConfirm = () => {
        setIsModalOpen(true);
    };

    const handleOkConfirm = () => {
        setIsModalOpen(false);
    };

    const handleCancelConfirm = () => {
        setIsModalOpen(false);
    };
    return (
        <div className={cx('wrapper')}>
            <Table
                className={cx('table')}
                columns={columns}
                pagination={{
                    total: categoryData?.data?.data?.count ? categoryData?.data?.data?.count : 10,
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30'],
                }}
                dataSource={dataSource}
                onChange={onChange}
            />
            <AppButton onClick={showModal}>Add</AppButton>

            <Modal
                width={500}
                title="Add new category"
                visible={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                        <AppButton key="back" onClick={handleCancel}>
                            Return
                        </AppButton>
                        <AppButton
                            key="submit"
                            type="primary"
                            form="addCategoryForm"
                            loading={loading}
                            onClick={handleOk}
                        >
                            Submit
                        </AppButton>
                    </div>
                }
            >
                {/* <h3>Add new category</h3> */}
                <form id="addCategoryForm" onSubmit={handleSubmit(onSubmit)} className={cx('form-wrapper')}>
                    <Row gutter={24}>
                        <Col xs={24}>
                            <div className={cx('form-item')}>
                                <label className={cx('label')} htmlFor="categoryId">
                                    Mã danh mục
                                </label>
                                <input
                                    className={cx('input')}
                                    id="categoryId"
                                    {...register('id', { required: true })}
                                    type="text"
                                    defaultValue=""
                                ></input>
                            </div>
                        </Col>
                        <Col xs={24}>
                            <div className={cx('form-item')}>
                                <label className={cx('label')} htmlFor="name">
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
                                <label className={cx('label')} htmlFor="description">
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
                    {/* <AppButton type="submit">Add</AppButton> */}
                </form>
            </Modal>
        </div>
    );
}

export default Category;
