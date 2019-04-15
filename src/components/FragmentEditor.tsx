import { editor as MonacoEditor, IScrollEvent } from 'monaco-editor'
import React, { PureComponent } from 'react'
import Api from '../api'
import Utils from '../utils'

import '../styles/FragmentEditor.less'

interface IFragmentEditorProps {
    value: string
    onChange?: (content: string) => any
    onScroll?: (lineNumber: number) => any
}

interface IFragmentEditorState {
    title: string
    content: string
}

class FragmentEditor extends PureComponent<IFragmentEditorProps> {
    public state: IFragmentEditorState
    public emitValueChange = Utils.debounce(this._emitValueChange, 100)
    public emitEditorScroll = Utils.debounce(this._emitEditorScroll, 400)
    private _ref: HTMLDivElement | null = null
    private _editor: MonacoEditor.IStandaloneCodeEditor | null = null
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
    public isMouseHover() {
        if (this._ref && this._ref.matches(':hover')) {
            return true
        }
        return false
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
    public setScrollLine(lineNumber: number) {
        if (this._editor) {
            const editor = this._editor
            return Utils.asyncSmoothScrollWrapper((top) => editor.setScrollTop(top),
                this._editor.getScrollTop(), lineNumber * 21 - 21, 380)
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
    private _emitEditorScroll(e: IScrollEvent) {
        if (this.props.onScroll) {
            const lineNumber = Math.round(e.scrollTop / 21)
            this.props.onScroll(lineNumber + 1)
        }
    }
    private _initEditor() {
        if (this._ref) {
            this._editor = Api.createMonacoEditor(this._ref)
            this._editor.onDidChangeModelContent((e: MonacoEditor.IModelContentChangedEvent) => {
                this.emitValueChange()
            })
            this._editor.onDidScrollChange((e: IScrollEvent) => {
                this.emitEditorScroll(e)
            })
        }
    }
}

export default FragmentEditor
