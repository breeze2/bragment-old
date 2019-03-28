import { Icon, Input, message as Message, Modal } from 'antd'
import React, { ChangeEvent, Component } from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl, intlShape } from 'react-intl'
import SelectBackgroundPopover, { InterfaceBackground } from './SelectBackgroundPopover'

import Api from '../api'

import '../styles/CreateBoardModal.less'

interface InterfaceCreateBoardModalProps extends InjectedIntlProps {
    visible: boolean
    onOk: (e: any) => any
    onCancel: (e: any) => any
}

interface InterfaceCreateBoardModalState {
    selectedType: string
    selectedIndex: number
    colors: string[]
    images: string[]
    path: string
    title: string
}

class CreateBoardModal extends Component<InterfaceCreateBoardModalProps> {
    public static propTypes: React.ValidationMap<any> = {
        intl: intlShape.isRequired,
    }
    public state: InterfaceCreateBoardModalState
    public constructor(props: InterfaceCreateBoardModalProps) {
        super(props)
        Api.unsplash.getRandomPhoto().then(res => { console.log(res) })
        this.state = { colors: Api.board.colors, images: [], path: '', selectedIndex: 0, selectedType: 'color', title: '' }
    }
    public componentWillReceiveProps(props: InterfaceCreateBoardModalProps) {
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
    public handleBackgroundSelect = (param: InterfaceBackground) => {
        this.setState({
            selectedIndex: param.index,
            selectedType: param.type,
        })
    }
    public render() {
        return (
            <Modal className="create-board-modal"
                title={<FormattedMessage id="createBoard" />}
                width={494}
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                // onOk={this.handleSummit}
            >
                <div className="board-field-wrap board-title-wrap">
                    <Input className="board-title-input" value={this.state.title}
                        onChange={this.hanleTitleChange}
                        placeholder={this.props.intl.formatMessage({ id: 'addBoardTitle' })} />
                    <SelectBackgroundPopover onSelect={this.handleBackgroundSelect}
                        selectedType={this.state.selectedType} selectedIndex={this.state.selectedIndex}
                        colors={this.state.colors} images={this.state.images} />
                </div>

                <div className="board-field-wrap board-path-wrap">
                    <Input className="board-path-input" value={this.state.path}
                        onChange={this.hanlePathChange}
                        placeholder={this.props.intl.formatMessage({ id: 'inputLocalPath' })}
                    />
                    <Icon type="folder" className="folder-icon" onClick={this.handleFolderIconClick} />
                </div>
            </Modal>
        )
    }
}

export default injectIntl(CreateBoardModal)
