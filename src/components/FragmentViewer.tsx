import mermaid from 'mermaid'
import React, { PureComponent } from 'react'
import Api from '../api'
import Utils from '../utils'

import 'github-markdown-css/github-markdown.css'
import 'katex/dist/katex.css'
import '../styles/FragmentViewer.less'

interface IFragmentViewerProps {
    value: string
    onScroll?: (lineNumber: number) => any
}

interface IFragmentViewerState {
    innerHtml: string
}

class FragmentViewer extends PureComponent<IFragmentViewerProps> {
    public state: IFragmentViewerState
    public parseMdContent = Utils.debounce(this._parseMdContent, 100)
    public emitEditorScroll = Utils.debounce(this._emitViewerScroll, 400)
    private _ref: HTMLDivElement | null = null
    private _lineNodes: NodeListOf<HTMLElement> | null = null
    public constructor(props: IFragmentViewerProps) {
        super(props)
        this.state = {
            innerHtml: '',
        }
    }
    public componentDidUpdate() {
        mermaid.init('.mermaid')
        if (this._ref) {
            this._lineNodes = this._ref.querySelectorAll('[data-source-line]')
        }
    }
    public assignRef = (div: HTMLDivElement) => {
        this._ref = div
    }
    public isMouseHover() {
        if (this._ref && this._ref.matches(':hover')) {
            return true
        }
        return false
    }
    public setValue(value: string) {
        this.parseMdContent(value)
    }
    public setScrollLine(lineNumber: number) {
        if (this._ref && this._lineNodes) {
            let toTop: number | null = null
            const viewer = this._ref
            const lineNodes = this._lineNodes
            const length = lineNodes.length
            for (let i = 1; i < length; i++) {
                const line = parseInt(lineNodes[i].dataset.sourceLine || '0', 10)
                if (line >= lineNumber) {
                    const line0 = parseInt(lineNodes[i - 1].dataset.sourceLine || '0', 10)
                    const line1 = parseInt(lineNodes[i].dataset.sourceLine || '0', 10)
                    const offsetTop0 = lineNodes[i - 1].offsetTop
                    const offsetTop1 = lineNodes[i].offsetTop
                    const diff0 = lineNumber - line0
                    const diff1 = line1 - lineNumber
                    toTop = Math.round(offsetTop0 + (offsetTop1 - offsetTop0) * diff0 / (diff0 + diff1))
                    break
                }
            }
            toTop = toTop === null ? viewer.scrollHeight : toTop
            return Utils.asyncSmoothScrollWrapper((top: number) => {
                viewer.scrollTop = top
            }, viewer.scrollTop, toTop, 380)
        }
    }
    public render() {
        return (
            <div className="fragment-viewer" ref={this.assignRef} onScroll={() => this.emitEditorScroll()}>
                <div className="markdown-body" dangerouslySetInnerHTML={{__html: this.state.innerHtml}}/>
            </div>
        )
    }
    public _parseMdContent(content: string) {
        let html = Api.mdParser(content)
        html = Api.htmlSecureParser(html)
        this.setState({
            innerHtml: html,
        })
    }
    private _emitViewerScroll() {
        if (this.props.onScroll && this._ref && this._lineNodes) {
            const lineNodes = this._lineNodes
            const scrollTop = this._ref.scrollTop
            const length = lineNodes.length
            let lineNumber = 0
            for (let i = 1; i < length; i++) {
                if (lineNodes[i].offsetTop >= scrollTop) {
                    const diff0 = scrollTop - lineNodes[i - 1].offsetTop
                    const diff1 = lineNodes[i].offsetTop - scrollTop
                    const line0 = parseInt(lineNodes[i - 1].dataset.sourceLine || '0', 10)
                    const line1 = parseInt(lineNodes[i].dataset.sourceLine || '0', 10)
                    lineNumber = Math.round(line0 + (line1 - line0) * diff0 / (diff0 + diff1))
                    break
                }
            }
            this.props.onScroll(lineNumber)
        }
    }
}

export default FragmentViewer
