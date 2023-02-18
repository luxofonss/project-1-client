import React from 'react';
import styles from './HomePage.module.sass';
import classNames from 'classnames/bind';
import { Col, Row, Carousel } from 'antd';
import AppButton from '~/components/AppButton/AppButton';
import background from '~/assets/images/background.png';
import { IconStar } from '~/assets/svgs';

const cx = classNames.bind(styles);

function HomePage(props) {
    const contentStyle = {
        margin: 0,
        width: '10px',
        height: '50px',
        color: 'black',
        lineHeight: '20px',
        textAlign: 'center',
        background: 'green',
    };

    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };
    return (
        <div className={cx('container')}>
            <section
                className={cx('top-section')}
                style={{
                    backgroundImage: `url(${background})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <Row>
                    <Col xs={12}>
                        <div className={cx('left')}>
                            <div className={cx('header')}>Summer collection 2023</div>
                            <div className={cx('description')}>
                                Method allows developers to make bank transfers, move money, and pay debts on behalf of
                                their users all through a single API
                            </div>
                            <div className={cx('button')}>
                                <AppButton>Shop now</AppButton>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12}>
                        <div className={cx('carousel')}>
                            <Carousel autoplay afterChange={onChange}>
                                <div className={cx('item')}>
                                    <img
                                        alt="image"
                                        src="https://w7.pngwing.com/pngs/323/773/png-transparent-sneakers-basketball-shoe-sportswear-nike-shoe-outdoor-shoe-running-sneakers-thumbnail.png"
                                    />
                                </div>

                                <div className={cx('item')}>
                                    <img
                                        alt="image"
                                        src="https://i.pinimg.com/736x/de/c0/3b/dec03b93de57672923b7f7d3dd5d204a.jpg"
                                    />
                                </div>
                                <div className={cx('item')}>
                                    <img
                                        alt="image"
                                        src="https://w7.pngwing.com/pngs/323/773/png-transparent-sneakers-basketball-shoe-sportswear-nike-shoe-outdoor-shoe-running-sneakers-thumbnail.png"
                                    />
                                </div>
                                <div className={cx('item')}>
                                    <img
                                        alt="image"
                                        src="https://i.pinimg.com/736x/de/c0/3b/dec03b93de57672923b7f7d3dd5d204a.jpg"
                                    />
                                </div>
                            </Carousel>
                        </div>
                    </Col>
                </Row>
            </section>
            <section className={cx('popular')}>
                <header className={cx('header')}>
                    Popular <header>Product</header>
                </header>
                <div className={cx('product-container')}>
                    <div className={cx('item')}>
                        <div
                            style={{
                                backgroundImage:
                                    'url("https://w7.pngwing.com/pngs/323/773/png-transparent-sneakers-basketball-shoe-sportswear-nike-shoe-outdoor-shoe-running-sneakers-thumbnail.png")',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}
                            className={cx('image')}
                        ></div>
                        <div className={cx('star')}>
                            <IconStar width={20} height={18} /> (5)
                        </div>
                        <div className={cx('name')}>Nike abcxyz</div>
                        <div className={cx('footer')}>
                            <div className={cx('price')}>$19.99</div>
                            <div className={cx('button')}>
                                <AppButton
                                    style={{
                                        height: '32px',
                                        padding: '0 8px',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                    }}
                                >
                                    Add to cart
                                </AppButton>
                            </div>
                        </div>
                    </div>
                    <div className={cx('item')}>
                        <div
                            style={{
                                backgroundImage:
                                    'url("https://w7.pngwing.com/pngs/323/773/png-transparent-sneakers-basketball-shoe-sportswear-nike-shoe-outdoor-shoe-running-sneakers-thumbnail.png")',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}
                            className={cx('image')}
                        ></div>
                        <div className={cx('star')}>
                            <IconStar width={20} height={18} /> (5)
                        </div>
                        <div className={cx('name')}>Nike abcxyz</div>
                        <div className={cx('footer')}>
                            <div className={cx('price')}>$19.99</div>
                            <div className={cx('button')}>
                                <AppButton
                                    style={{
                                        height: '32px',
                                        padding: '0 8px',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                    }}
                                >
                                    Add to cart
                                </AppButton>
                            </div>
                        </div>
                    </div>
                    <div className={cx('item')}>
                        <div
                            style={{
                                backgroundImage:
                                    'url("https://w7.pngwing.com/pngs/323/773/png-transparent-sneakers-basketball-shoe-sportswear-nike-shoe-outdoor-shoe-running-sneakers-thumbnail.png")',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}
                            className={cx('image')}
                        ></div>
                        <div className={cx('star')}>
                            <IconStar width={20} height={18} /> (5)
                        </div>
                        <div className={cx('name')}>Nike abcxyz</div>
                        <div className={cx('footer')}>
                            <div className={cx('price')}>$19.99</div>
                            <div className={cx('button')}>
                                <AppButton
                                    style={{
                                        height: '32px',
                                        padding: '0 8px',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                    }}
                                >
                                    Add to cart
                                </AppButton>
                            </div>
                        </div>
                    </div>
                    <div className={cx('item')}>
                        <div
                            style={{
                                backgroundImage:
                                    'url("https://w7.pngwing.com/pngs/323/773/png-transparent-sneakers-basketball-shoe-sportswear-nike-shoe-outdoor-shoe-running-sneakers-thumbnail.png")',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}
                            className={cx('image')}
                        ></div>
                        <div className={cx('star')}>
                            <IconStar width={20} height={18} /> (5)
                        </div>
                        <div className={cx('name')}>Nike abcxyz</div>
                        <div className={cx('footer')}>
                            <div className={cx('price')}>$19.99</div>
                            <div className={cx('button')}>
                                <AppButton
                                    style={{
                                        height: '32px',
                                        padding: '0 8px',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                    }}
                                >
                                    Add to cart
                                </AppButton>
                            </div>
                        </div>
                    </div>
                    <div className={cx('item')}>
                        <div
                            style={{
                                backgroundImage:
                                    'url("https://w7.pngwing.com/pngs/323/773/png-transparent-sneakers-basketball-shoe-sportswear-nike-shoe-outdoor-shoe-running-sneakers-thumbnail.png")',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}
                            className={cx('image')}
                        ></div>
                        <div className={cx('star')}>
                            <IconStar width={20} height={18} /> (5)
                        </div>
                        <div className={cx('name')}>Nike abcxyz</div>
                        <div className={cx('footer')}>
                            <div className={cx('price')}>$19.99</div>
                            <div className={cx('button')}>
                                <AppButton
                                    style={{
                                        height: '32px',
                                        padding: '0 8px',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                    }}
                                >
                                    Add to cart
                                </AppButton>
                            </div>
                        </div>
                    </div>
                    <div className={cx('item')}>
                        <div
                            style={{
                                backgroundImage:
                                    'url("https://w7.pngwing.com/pngs/323/773/png-transparent-sneakers-basketball-shoe-sportswear-nike-shoe-outdoor-shoe-running-sneakers-thumbnail.png")',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}
                            className={cx('image')}
                        ></div>
                        <div className={cx('star')}>
                            <IconStar width={20} height={18} /> (5)
                        </div>
                        <div className={cx('name')}>Nike abcxyz</div>
                        <div className={cx('footer')}>
                            <div className={cx('price')}>$19.99</div>
                            <div className={cx('button')}>
                                <AppButton
                                    style={{
                                        height: '32px',
                                        padding: '0 8px',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                    }}
                                >
                                    Add to cart
                                </AppButton>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
