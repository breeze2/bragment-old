import { Button, Icon, Input } from 'antd'
import React, { Component } from 'react'
import TextInputChanger from '../components/TextInputChanger'

import Utils from '../utils'

import '../styles/CreateFragmentColumnForm.less'

interface ICreateFragmentColumnFormProps {
    boardPath: string
    onSuccess: (title: string) => any
}

class CreateFragmentColumnForm extends Component<ICreateFragmentColumnFormProps> {
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
        if (this.props.boardPath && title) {
            Utils.createSubDirectoryRecursively(this.props.boardPath, title).then((title) => {
                this.resetChangerInputValue()
                this.props.onSuccess(title)
            }).catch(error => {
                console.error(error)
            })
        }
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
                    <span><Icon type="plus" /> Add another list</span>
                } inputStatusAddon={
                    <div className="form-action">
                        <Button type="primary" onClick={this.handleChangerSubmitClick}>sdfsfs</Button>
                        <Icon type="close" className="handler" />
                    </div>
                }/>
            </div>
        )
    }
}

export default CreateFragmentColumnForm
