import { Input } from 'antd'
import React, { Component } from 'react'

import '../styles/TextInputChanger.less'

interface ITextInputChangerProps {
    textValue: React.ReactNode
    inputValue: string
    status: 'text' | 'input'
    useTextarea?: boolean
    placeholder?: string
    className?: string
    bluredInputHide?: boolean
    inputStatusAddon?: React.ReactNode
    onInputSubmit?: (value: string) => any
    onStatusChange?: (status: 'text' | 'input') => any
}
interface ITextInputChangerState {
    innerStatus: 'text' | 'input'
    innerInputValue: string
    innerTextValue: React.ReactNode
}

class TextInputChanger extends Component<ITextInputChangerProps> {
    public state: ITextInputChangerState
    private _shouldInputFocus: boolean = false
    private _ref: React.RefObject<HTMLDivElement>
    public constructor(props: ITextInputChangerProps) {
        super(props)
        this.state = {
            innerInputValue: props.inputValue,
            innerStatus: props.status,
            innerTextValue: props.textValue,
        }
        this._ref = React.createRef<HTMLDivElement>()
    }
    public componentWillReceiveProps(props: ITextInputChangerProps) {
        this.setState({
            innerInputValue: props.inputValue,
            innerTextValue: props.textValue,
        })
    }
    public componentDidUpdate() {
        if (this._shouldInputFocus) {
            this._shouldInputFocus = false
            const div = this._ref.current
            if (div) {
                const input = div.querySelector('.changer-input') as HTMLInputElement
                if (input) {
                    input.focus()
                }
            }
        }
    }
    public handleTextClick = () => {
        this.setState({
            innerStatus: 'input',
        })
        this._shouldInputFocus = true
    }
    public handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement
        if (this.props.bluredInputHide) {
            setTimeout(() => {
                this.setState({
                    innerStatus: 'text',
                })
            }, 100)
        }
    }
    public handleInputSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement
        if (this.props.onInputSubmit) {
            this.props.onInputSubmit(input.value)
        }
        this.setState({
            innerStatus: 'text',
        })
    }
    public handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement
        this.setState({
            innerInputValue: input.value,
        })
    }
    public render() {
        return (
            <div className={`text-input-changer ${this.state.innerStatus}-status ${this.props.className || ''}`} ref={this._ref}>
                <p onClick={this.handleTextClick} className="changer-text">
                    {this.props.textValue}
                </p>
                <Input value={this.state.innerInputValue} placeholder={this.props.placeholder}
                    onPressEnter={this.handleInputSubmit} onChange={this.handleInputChange}
                    onBlur={this.handleInputBlur}
                    className="changer-input" />
                <div className='changer-input-addon'>
                    {this.props.inputStatusAddon}
                </div>
            </div>
        )
    }
}

export default TextInputChanger
