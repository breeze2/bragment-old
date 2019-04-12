import React, { PureComponent } from 'react'
import monaco, { LANGUAGE_ID } from '../api/monaco-editor'
import Utils from '../utils'

import '../styles/FragmentEditor.less'

interface IFragmentEditorProps {
    value: string
    onChange?: (content: string) => any
}

interface IFragmentEditorState {
    title: string
    content: string
}

class FragmentEditor extends PureComponent<IFragmentEditorProps> {
    public state: IFragmentEditorState
    public emitValueChange = Utils.debounce(this._emitValueChange, 100)
    private _ref: HTMLDivElement | null = null
    private _editor: monaco.editor.IStandaloneCodeEditor | null = null
    public constructor(props: IFragmentEditorProps) {
        super(props)
        this.state = {
            content: '',
            title: '',
        }
    }

    public componentDidMount() {
        this._initEditor()
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
    private _emitValueChange() {
        if (this.props.onChange && this._editor) {
            this.props.onChange(this._editor.getValue())
        }
    }
    private _initEditor() {
        if (this._ref) {
            this._editor = monaco.editor.create(this._ref, {
                fontSize: 14,
                language: LANGUAGE_ID,
                minimap: {
                    enabled: false,
                },
                value: this.props.value,
                wordWrap: 'off',
            })
            this._editor.onDidChangeModelContent((e: monaco.editor.IModelContentChangedEvent) => {
                this.emitValueChange()
            })
        }
    }
}

export default FragmentEditor
