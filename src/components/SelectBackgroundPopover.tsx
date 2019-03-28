import { Col, Icon, Popover, Row } from 'antd'
import React, { Component } from 'react'

import '../styles/SelectBackgroundPopover.less'

export interface IBackground {
    type: string,
    index: number,
}

interface ISelectBackgroundPopoverProps {
    colors: string[]
    images: string[]
    selectedType: string,
    selectedIndex: number,
    onSelect: (param: IBackground) => any
}

class SelectBackgroundPopover extends Component<ISelectBackgroundPopoverProps> {
    public constructor(props: ISelectBackgroundPopoverProps) {
        super(props)
    }
    public handleContentClick = (e: any) => {
        const i = e.target.closest('.anticon')
        if (i) {
            this.props.onSelect({
                index: parseInt(i.dataset.index, 10),
                type: i.dataset.type,
            })
        }
    }

    public render() {
        const selectedImage = this.props.selectedType === 'image' ? this.props.images[this.props.selectedIndex] : undefined
        const selectedColor = this.props.selectedType === 'color' ? this.props.colors[this.props.selectedIndex] : undefined
        return (
            <Popover overlayClassName="select-background-popver" trigger="click" content={<div className="select-background-content" onClick={this.handleContentClick} >
                <Row gutter={16}>
                    {this.props.colors.map((color, i) => {
                        return (
                            <Col span={6} key={color}>
                                <Icon type="check" data-type="color" data-index={i}
                                className={`color-icon ${color}-background-color ${selectedColor === color ? 'selected' : ''}`} />
                            </Col>
                        )
                    })}
                </Row>
            </div>}>
                <Icon type="edit" className={`edit-icon ${selectedColor ? selectedColor + '-background-color' : ''}`} />
            </Popover>
        )
    }
}

export default SelectBackgroundPopover
