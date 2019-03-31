import { Button, Icon, Input, message as Message, Modal } from 'antd'
import { List } from 'immutable'
import React, { ChangeEvent, Component } from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl, intlShape } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import SelectBackgroundPopover, { IBackground } from './SelectBackgroundPopover'

import Api from '../api'
import IUnsplashPhoto from '../schemas/IUnsplashPhoto'
import Utils from '../utils'

import '../styles/CreateBoardModal.less'

interface ICreateBoardModalProps extends InjectedIntlProps, RouteComponentProps {
    bgColors: List<string>
    bgImages: List<IUnsplashPhoto>
    visible: boolean
    asyncFetchBoardList: () => any
    asyncFetchStandbyBgImages: () => any
    onOk: (e: any) => any
    onCancel: (e: any) => any
}

interface InterfaceCreateBoardModalState {
    selectedBgColor: string
    selectedBgImage: IUnsplashPhoto | null
    path: string
    title: string
    isSubmitting: boolean
}

class CreateBoardModal extends Component<ICreateBoardModalProps> {
    public static propTypes: React.ValidationMap<any> = {
        intl: intlShape.isRequired,
    }
    public state: InterfaceCreateBoardModalState
    public constructor(props: ICreateBoardModalProps) {
        super(props)
        this.state = { path: '', title: '', selectedBgColor: '', selectedBgImage: null, isSubmitting: false }
    }
    public componentDidMount() {
        this.props.asyncFetchStandbyBgImages()
    }
    public componentWillReceiveProps(props: ICreateBoardModalProps) {
        if (props.bgImages.size === 0) {
            this.setState({ selectedBgColor: this.props.bgColors.get(0), selectedBgImage: null })
        } else if (props.bgImages !== this.props.bgImages) {
            const image = props.bgImages.get(0)
            if (image) {
                this.setState({ selectedBgColor: image.color, selectedBgImage: image })
            }
        }
        // if (props.visible && !this.props.visible) {}
    }
    public hanleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ title: e.target.value })
    }
    public handleFolderIconClick = () => {
        const paths = Api.electron.openDirectoryDialog()
        if (paths && paths.length) {
            const path = paths[0]
            const basename = Utils.getPathBasename(path)
            if (this.state.title.trim() === '') {
                this.setState({path, title: basename})
            } else {
                this.setState({ path })
            }
        }
    }
    public handleBackgroundSelect = (param: IBackground) => {
        this.setState({
            selectedBgColor: param.color,
            selectedBgImage: param.image,
        })
    }
    public handleSubmit = () => {
        const path = this.state.path.trim()
        const title = this.state.title.trim()
        if (!path || !title) {
            return
        }
        this.setState({ isSubmitting: true })
        Api.board.createBoard({
            color: this.state.selectedBgColor,
            image: this.state.selectedBgImage ? this.state.selectedBgImage.urls.regular : '',
            path,
            title,
        }).then((response) => {
            this.props.onOk(response)
            this.props.asyncFetchBoardList()
            this.props.asyncFetchStandbyBgImages()
            this.props.history.push(`/board/${response.id}`)
        }).finally(() => {
            this.setState({ isSubmitting: false })
        })
    }
    public render() {
        return (
            <Modal className="create-board-modal"
                footer={null} closable={false} maskClosable={false}
                visible={this.props.visible}
                bodyStyle={{
                    backgroundColor: this.state.selectedBgColor ? this.state.selectedBgColor : '',
                    backgroundImage: this.state.selectedBgImage ? `url(${this.state.selectedBgImage.urls.small})` : '',
                }}
            >
                <div className="modal-body">
                    <div className="modal-body-top">
                        <Icon type="close" className="close-icon handler" onClick={this.props.onCancel} />
                    </div>
                    <div className="board-field-wrap board-title-wrap">
                        <Input className="board-title-input" value={this.state.title}
                            onChange={this.hanleTitleChange}
                            placeholder={this.props.intl.formatMessage({ id: 'addBoardTitle' })} />
                        <SelectBackgroundPopover onSelect={this.handleBackgroundSelect}
                            selectedColor={this.state.selectedBgColor} selectedImage={this.state.selectedBgImage}
                            colors={this.props.bgColors} images={this.props.bgImages} />
                    </div>
                    <div className="board-field-wrap board-path-wrap">
                        <Input className="board-path-input" value={this.state.path} disabled
                            placeholder={this.props.intl.formatMessage({ id: 'selectLocalPath' })}
                        />
                        <Icon type="folder" className="folder-icon handler" onClick={this.handleFolderIconClick} />
                    </div>
                    <div className="modal-body-bottom">
                        <Button type="primary" onClick={this.handleSubmit} loading={this.state.isSubmitting}><FormattedMessage id="createBoard" /></Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default injectIntl(CreateBoardModal)
