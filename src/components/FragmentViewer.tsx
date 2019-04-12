import React, { PureComponent } from 'react'

import '../styles/FragmentViewer.less'

interface IFragmentViewerProps {
    value: string
}

interface IFragmentViewerState {
    title: string
    content: string
}

class FragmentViewer extends PureComponent<IFragmentViewerProps> {
    public state: IFragmentViewerState
    private _ref: HTMLDivElement | null
    public constructor(props: IFragmentViewerProps) {
        super(props)
        this.state = {
            content: '',
            title: '',
        }
        this._ref = null
    }
    public assignRef = (div: HTMLDivElement) => {
        this._ref = div
    }
    public setValue(value: string) {
        
    }
    public render() {
        return (
            <div className="fragment-viewer" ref={this.assignRef} >
            df
            </div>
        )
    }
}

export default FragmentViewer
