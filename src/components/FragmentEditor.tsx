import React, { PureComponent } from 'react'
import monaco, { LANGUAGE_ID } from '../editor/monaco'

import '../styles/FragmentEditor.less'

interface IFragmentEditorProps {
    value: string
}

interface IFragmentEditorState {
    title: string
    content: string
}

class FragmentEditor extends PureComponent<IFragmentEditorProps> {
    public state: IFragmentEditorState
    private _ref: HTMLDivElement | null
    private _editor: monaco.editor.IStandaloneCodeEditor | null
    public constructor(props: IFragmentEditorProps) {
        super(props)
        this.state = {
            content: '',
            title: '',
        }
        this._ref = null
        this._editor = null
    }
    public componentDidMount() {
        if (this._ref) {
            this._editor = monaco.editor.create(this._ref, {
                fontSize: 14,
                language: LANGUAGE_ID,
                minimap: {
                    enabled: false,
                },
                value: this.props.value,
            })
        }
    }
    public getValue() {
        if (this._editor) {
            this._editor.getValue()
        }
        return ''
    }
    public setValue(value: string) {
        if (this._editor) {
            this._editor.setValue(value)
        }
    }
    public assignRef = (div: HTMLDivElement) => {
        this._ref = div
    }
    public render() {
        return (
            <div ref={this.assignRef} className="fragment-editor" />
        )
    }
}

export default FragmentEditor
