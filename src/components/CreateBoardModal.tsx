import { Input, message as Message, Modal } from 'antd'
import React, { Component } from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl, intlShape } from 'react-intl'

import '../styles/CreateBoardModal.less'

interface InterfaceCreateBoardModalProps {
    visible: boolean
    onOk: (e: any) => any
    onCancel: (e: any) => any
}

interface InterfaceCreateBoardModalState {
    readonly title: string
}

class CreateBoardModal extends Component<InterfaceCreateBoardModalProps & InjectedIntlProps, {}> {
    public static propTypes: React.ValidationMap<any> = {
        intl: intlShape.isRequired,
    }
    public state: InterfaceCreateBoardModalState
    public constructor(props: any) {
        super(props)
        this.state = {
            title: '',
        }
    }
    public handleSummit = (e: any) => {
        const title = this.state.title
        const a = window.document.createElement('a')
        a.href = title

        if (a.host && (a.host !== window.location.host) &&
            ((a.protocol === 'http:') || (a.protocol === 'https:'))) {
            this.props.onOk(title)
        } else {
            Message.warning(this.props.intl.formatMessage({ id: 'invalidtitle' }))
        }
    }
    public handleChange = (e: any) => {
        this.setState({
            title: e.target.value,
        })
    }
    public componentWillReceiveProps() {
        this.setState({
            title: '',
        })
    }
    public componentDidUpdate() {
        if (this.props.visible) {
            setTimeout(() => {
                const input: any = document.querySelector('.input-feed-url')
                if (input) {
                    input.focus()
                }
            }, 100)
        }
    }
    public render() {
        return (
            <Modal className="add-board-modal"
                title={<FormattedMessage id="createBoard" />}
                width={376}
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                onOk={this.handleSummit}
            >
                <Input className="input-feed-url"
                    placeholder={this.props.intl.formatMessage({ id: 'addBoardTitle' })}
                    value={this.state.title} onChange={this.handleChange}
                    onPressEnter={this.handleSummit} />
            </Modal>
        )
    }
}

export default injectIntl(CreateBoardModal)
