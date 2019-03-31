import { Col, Icon, Popover, Row } from 'antd'
import { List } from 'immutable'
import React, { Component } from 'react'

import IUnsplashPhoto from '../schemas/IUnsplashPhoto'

import '../styles/SelectBackgroundPopover.less'

export interface IBackground {
    color: string
    image: IUnsplashPhoto | null
}

interface ISelectBackgroundPopoverProps {
    colors: List<string>
    images: List<IUnsplashPhoto>
    selectedImage: IUnsplashPhoto | null,
    selectedColor: string,
    onSelect: (param: IBackground) => any
}

class SelectBackgroundPopover extends Component<ISelectBackgroundPopoverProps> {
    public constructor(props: ISelectBackgroundPopoverProps) {
        super(props)
    }
    public handleContentClick = (e: any) => {
        const i: HTMLElement = e.target.closest('.anticon')
        if (i && i.dataset.index && i.dataset.type) {
            const index = parseInt(i.dataset.index, 10)
            const type = i.dataset.type
            if (type === 'image') {
                const image = this.props.images.get(index)
                if (image) {
                    return this.props.onSelect({ color: image.color, image })
                }
            }
            if (type === 'color') {
                const color = this.props.colors.get(index)
                if (color) {
                    return this.props.onSelect({ color, image: null })
                }
            }
        }
    }

    public render() {
        return (
            <Popover overlayClassName="select-background-popver" trigger="click" content={
            <div className="select-background-content" onClick={this.handleContentClick} >
                <Row gutter={16}>
                    {this.props.images.map((image: IUnsplashPhoto, i) => {
                        return (
                            <Col span={6} key={image.id}>
                                <Icon type="check" data-type="image" data-index={i} style={{
                                    backgroundColor: image.color,
                                    backgroundImage: `url(${image.urls.thumb})`,
                                }} className={`handler image-icon ${this.props.selectedImage === image ? 'selected' : ''}`} />
                            </Col>
                        )
                    })}
                </Row>
                <Row gutter={16}>
                    {this.props.colors.map((color, i) => {
                        return (
                            <Col span={6} key={color}>
                                <Icon type="check" data-type="color" data-index={i} style={{
                                    backgroundColor: color,
                                }} className={`handler color-icon ${this.props.selectedColor === color ? 'selected' : ''}`} />
                            </Col>
                        )
                    })}
                </Row>
            </div>}>
                <Icon type="edit" className="handler edit-icon" style={{
                    backgroundColor: this.props.selectedColor,
                    backgroundImage: this.props.selectedImage ? `url(${this.props.selectedImage.urls.thumb})` : undefined,
                }} />
            </Popover>
        )
    }
}

export default SelectBackgroundPopover
