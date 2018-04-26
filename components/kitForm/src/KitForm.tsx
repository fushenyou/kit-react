/**
 * @author fusy 2018年04月02日
 */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classnames from 'classnames';

import { Form, Row, Col } from 'antd';
import { WrappedFormUtils, ValidationRule } from 'antd/lib/form/Form';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { ColProps } from 'antd/lib/col';
const FormItem = Form.Item;

export type componentProps = {
    style?: React.CSSProperties;
    className?: string;
    value?: any;
    defaultValue?: any;
    disabled?: boolean;
    [propName: string]: any;
};

export type layout = {
    isNewline?: boolean;
    col?: ColProps;
    [propName: string]: any;
};

export type config = {
    id: string;
    label?: React.ReactNode;
    component: React.ReactNode | string;
    initialValue?: string | number | [any] | object;
    componentProps?: componentProps;
    warpperProps?: FormItemProps;
    visible?: boolean;
    rules?: ValidationRule;
    layout?: layout;
};

export interface KitFormProps {
    config: [config];
    colLength?: number;
    form?: WrappedFormUtils;
    className?: string;
}

// @Form.create()
export default class KitForm extends React.Component<KitFormProps, any> {
    static propTypes = {
        config: PropTypes.array,
        form: PropTypes.object,
        colLength: PropTypes.number
    };

    static defaultProps = {
        colLength: 2,
        config: []
    };

    constructor(props: KitFormProps) {
        super(props);
    }

    getLayout = (item: config) => {
        const { colLength = 2 } = this.props;
        const { layout = {}, warpperProps = {} } = item;
        const { labelCol = {}, wrapperCol = {} } = warpperProps;
        const { col = {} } = layout;
        let defaultLayout, _labelCol, _wrapperCol;
        defaultLayout = {
            xs: 24,
            sm: 24,
            md: col.span || 24 / colLength
        };
        _labelCol = {
            xs: { span: 24 },
            sm: { span: 10 },
            md: { span: labelCol.span || [6, 8, 10][colLength - 1] }
        };
        _wrapperCol = {
            xs: { span: 24 },
            sm: { span: 14 },
            md: { span: wrapperCol.span || [18, 16, 14][colLength - 1] }
        };

        if (!item.label) {
            _labelCol = { span: 0 };
            _wrapperCol = { span: 24 };
        }

        const formItemLayout = {
            labelCol: _labelCol,
            wrapperCol: _wrapperCol
        };

        return {
            defaultLayout: defaultLayout,
            formItemLayout: formItemLayout
        };
    };

    /**
     * 创建表单选项
     */
    createItem = (item: config, index: number) => {
        const { children } = this.props;
        // const { getFieldDecorator } = form;
        const { layout = {}, warpperProps = {}, visible } = item;
        const { defaultLayout, formItemLayout } = this.getLayout(item);
        const { labelCol, wrapperCol, ...warpperPropsReset } = warpperProps;

        // const component = typeof item.component === "string" ? types[item.component] : item.component;
        const visibleStyle: React.CSSProperties = visible ? { display: 'none' } : {};

        return (
            <Col {...defaultLayout} key={index} {...layout.col}>
                <FormItem style={visibleStyle} label={item.label} {...formItemLayout} {...warpperPropsReset}>
                    {children}
                    {/* {getFieldDecorator(item.id, { rules: item.rules, initialValue: item.initialValue })(
                        createElement(component, item.componentProps)
                    )} */}
                </FormItem>
            </Col>
        );
    };

    /**
     * 创建表单
     */
    create = (options: [config]) => {
        const { colLength = 2 } = this.props;
        const arr: any = [];
        let _list: any = [];
        let index = 0;
        options.forEach((item, i) => {
            const { layout = {} } = item;
            if (!(index % colLength) || layout.isNewline) {
                index = 0;
                _list = [];
                arr.push(
                    <Row gutter={20} key={i}>
                        {_list}
                    </Row>
                );
            }
            index++;
            _list.push(this.createItem(item, i));
        });
        return arr;
    };

    render() {
        const { config, className = '' } = this.props;
        const cls = classnames('kitform', className);
        return <Form className={cls}>{this.create(config)}</Form>;
    }
}
