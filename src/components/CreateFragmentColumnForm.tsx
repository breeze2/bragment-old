import { Button, Icon, Input } from 'antd'
import React, { Component } from 'react'
import TextInputChanger from '../components/TextInputChanger'

import '../styles/CreateFragmentColumnForm.less'

class CreateFragmentColumnForm extends Component {
    private _refChanger: React.RefObject<TextInputChanger>
    public constructor(props: any) {
        super(props)
        this._refChanger = React.createRef<TextInputChanger>()
    }
    public handleButtonClikc = () => {
        console.log(111)
        const changer = this._refChanger.current
        if (changer) {
            console.log(changer, changer.state)
        }
    }
    public render() {
        return (
            <div className="create-fragment-column-form">
                <TextInputChanger ref={this._refChanger} bluredInputHide inputValue="" status="text" textValue={
                    <span><Icon type="plus" /> Add another list</span>
                } inputStatusAddon={
                    <div className="form-action">
                        <Button type="primary" onClick={this.handleButtonClikc}>sdfsfs</Button>
                        <Icon type="close" className="handler" />
                    </div>
                }/>
            </div>
        )
    }
}

export default CreateFragmentColumnForm
