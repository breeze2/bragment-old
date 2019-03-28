import { Icon, Input, message as Message, Modal } from 'antd'
import { List } from 'immutable'
import React, { ChangeEvent, Component } from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl, intlShape } from 'react-intl'
import SelectBackgroundPopover, { IBackground } from './SelectBackgroundPopover'

import Api from '../api'
import IUnsplashPhoto from '../schemas/IUnsplashPhoto'

import '../styles/CreateBoardModal.less'

interface ICreateBoardModalProps extends InjectedIntlProps {
    bgColors: List<string>
    bgImages: List<IUnsplashPhoto>
    visible: boolean
    asyncFetchStandbyBgImages: () => any
    onOk: (e: any) => any
    onCancel: (e: any) => any
}

interface InterfaceCreateBoardModalState {
    selectedBgColor: string
    selectedBgImage: IUnsplashPhoto | null
    path: string
    title: string
}

class CreateBoardModal extends Component<ICreateBoardModalProps> {
    public static propTypes: React.ValidationMap<any> = {
        intl: intlShape.isRequired,
    }
    public state: InterfaceCreateBoardModalState
    public constructor(props: ICreateBoardModalProps) {
        super(props)
        this.state = { path: '', selectedBgColor: '', selectedBgImage: null, title: '' }
    }
    public componentDidMount() {
        this.props.asyncFetchStandbyBgImages()
    }
    public componentWillReceiveProps(props: ICreateBoardModalProps) {
        if (props.bgImages !== this.props.bgImages) {
            const image = props.bgImages.get(0)
            if (image) {
                this.setState({ selectedBgColor: image.color, selectedBgImage: image})
            } else {
                this.setState({ selectedBgColor: this.props.bgColors.get(0), selectedBgImage: null})
            }
        }
        if (props.visible && !this.props.visible) {}
    }
    public hanleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ title: e.target.value })
    }
    public hanlePathChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ path: e.target.value })
    }
    public handleFolderIconClick = () => {
        const path = Api.electron.openDirectoryDialog()
        this.setState({ path })
    }
    public handleBackgroundSelect = (param: IBackground) => {
        this.setState({
            selectedBgColor: param.color,
            selectedBgImage: param.image,
        })
    }
    public render() {
        return (
            <Modal className="create-board-modal"
                // title={<FormattedMessage id="createBoard" />}
                footer={null}
                closable={false}
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                // onOk={this.handleSummit}
                bodyStyle={{
                    backgroundColor: this.state.selectedBgColor ? this.state.selectedBgColor : '',
                    backgroundImage: this.state.selectedBgImage ? `url(${this.state.selectedBgImage.urls.small})` : '',
                }}
            >
                <div className="create-board-modal-body">
                    <div className="board-field-wrap board-title-wrap">
                        <Input className="board-title-input" value={this.state.title}
                            onChange={this.hanleTitleChange}
                            placeholder={this.props.intl.formatMessage({ id: 'addBoardTitle' })} />
                        <SelectBackgroundPopover onSelect={this.handleBackgroundSelect}
                            selectedColor={this.state.selectedBgColor} selectedImage={this.state.selectedBgImage}
                            colors={this.props.bgColors} images={this.props.bgImages} />
                    </div>

                    <div className="board-field-wrap board-path-wrap">
                        <Input className="board-path-input" value={this.state.path}
                            onChange={this.hanlePathChange}
                            placeholder={this.props.intl.formatMessage({ id: 'inputLocalPath' })}
                        />
                        <Icon type="folder" className="folder-icon" onClick={this.handleFolderIconClick} />
                    </div>
                </div>
            </Modal>
        )
    }
}

export default injectIntl(CreateBoardModal)
