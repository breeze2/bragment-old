import mermaid from 'mermaid'
import React, { PureComponent } from 'react'
import Api from '../api'
import Utils from '../utils'

import 'github-markdown-css/github-markdown.css'
import 'katex/dist/katex.css'
import '../styles/FragmentViewer.less'


interface IFragmentViewerProps {
    value: string
}

interface IFragmentViewerState {
    innerHtml: string
}

class FragmentViewer extends PureComponent<IFragmentViewerProps> {
    public state: IFragmentViewerState
    public parseMdContent = Utils.debounce(this._parseMdContent, 100)
    private _ref: HTMLDivElement | null = null
    public constructor(props: IFragmentViewerProps) {
        super(props)
        this.state = {
            innerHtml: '',
        }
    }
    public componentDidUpdate() {
        mermaid.init('.mermaid')
    }
    public assignRef = (div: HTMLDivElement) => {
        this._ref = div
    }
    public setValue(value: string) {
        this.parseMdContent(value)
    }
    public render() {
        return (
            <div className="fragment-viewer" ref={this.assignRef}>
                <div className="markdown-body" dangerouslySetInnerHTML={{__html: this.state.innerHtml}}/>
            </div>
        )
    }
    public _parseMdContent(content: string) {
        let html = Api.mdParser(content)
        console.log(html, Date.now())
        html = Api.htmlSecureParser(html)
        console.log(html, Date.now())
        this.setState({
            innerHtml: html,
        })
    }
}

export default FragmentViewer
