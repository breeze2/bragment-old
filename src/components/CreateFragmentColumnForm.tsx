import { Button, Icon } from 'antd'
import React, { PureComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import TextInputChanger from '../components/TextInputChanger'

import '../styles/CreateFragmentColumnForm.less'

interface ICreateFragmentColumnFormProps {
    onSuccess: (title: string) => any
}

class CreateFragmentColumnForm extends PureComponent<ICreateFragmentColumnFormProps> {
    private _refChanger: React.RefObject<TextInputChanger>
    public constructor(props: ICreateFragmentColumnFormProps) {
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
    public resetChangerInputValue () {
        const changer = this._refChanger.current
        if (changer) {
            changer.resetInputValue()
        }
    }
    public render() {
        return (
            <div className="create-fragment-column-form">
                <TextInputChanger ref={this._refChanger} bluredInputHide
                    onInputSubmit={this.handleChangerInputSubmit}
                    inputValue="" status="text"
                    textValue={
                        <span><Icon type="plus" /> <FormattedMessage id="addAnotherList" /></span>
                } inputStatusAddon={
                    <div className="form-action">
                        <Button type="primary" onClick={this.handleChangerSubmitClick}><FormattedMessage id="addList" /></Button>
                        <Icon type="close" className="handler" />
                    </div>
                }/>
            </div>
        )
    }
}

export default CreateFragmentColumnForm
