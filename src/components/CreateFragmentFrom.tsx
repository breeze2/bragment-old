import { Button, Icon, Input } from 'antd'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import TextInputChanger from '../components/TextInputChanger'

import '../styles/CreateFragmentForm.less'

interface ICreateFragmentFormProps {
    onSuccess: (title: string) => any
}

class CreateFragmentForm extends Component<ICreateFragmentFormProps> {
    private _refChanger: React.RefObject<TextInputChanger>
    public constructor(props: ICreateFragmentFormProps) {
        super(props)
        this._refChanger = React.createRef<TextInputChanger>()
    }
    public handleChangerSubmitClick = () => {
        const changer = this._refChanger.current
        if (changer) {
            this.handleChangerInputSubmit(changer.state.innerInputValue)
        }
    }
    public handleChangerInputSubmit = (value: string) => {
        const title = value.trim()
        this.props.onSuccess(title)
    }
    public resetChangerInputValue() {
        const changer = this._refChanger.current
        if (changer) {
            changer.resetInputValue()
        }
    }
    public render() {
        return (
            <div className="create-fragment-form">
                <TextInputChanger ref={this._refChanger} bluredInputHide
                    onInputSubmit={this.handleChangerInputSubmit}
                    inputValue="" status="text"
                    textValue={
                        <span><Icon type="plus" /> <FormattedMessage id="addAnotherCard" /></span>
                    } inputStatusAddon={
                        <div className="form-action">
                            <Button type="primary" onClick={this.handleChangerSubmitClick}><FormattedMessage id="addCard" /></Button>
                            <Icon type="close" className="handler" />
                        </div>
                    } />
            </div>
        )
    }
}

export default CreateFragmentForm
