import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import classNames from 'classnames/bind';
import styles from './DropdownSelect.module.scss';

const cx = classNames.bind(styles);

const DropdownSelect = ({ options, children, ...props }) => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <div className={cx('IconButton')} aria-label="Customise options">
                    {children}
                </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content className={cx('DropdownMenuContent')} sideOffset={4}>
                    {options.map((option) => (
                        <DropdownMenu.Item className={cx('DropdownMenuItem')} disabled={option.isDisable}>
                            {option}
                        </DropdownMenu.Item>
                    ))}
                    {/* <DropdownMenu.Item className={cx('DropdownMenuItem')}>New Tab</DropdownMenu.Item>
                    <DropdownMenu.Item className={cx('DropdownMenuItem')}>New Window</DropdownMenu.Item>
                    <DropdownMenu.Item className={cx('DropdownMenuItem')} disabled>
                        New Private Window
                    </DropdownMenu.Item> */}
                    <DropdownMenu.Arrow className={cx('DropdownMenuArrow')} />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default DropdownSelect;
