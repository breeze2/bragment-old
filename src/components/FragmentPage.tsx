import React, { PureComponent } from 'react'
import { Link, Route, RouteComponentProps } from 'react-router-dom'
import monaco from '../editor/monaco'

import '../styles/FragmentPage.less'

interface IFragmentPageRouteParams {
    boradId: string
    columnTitle: string
    title: string
}

interface IFragmentPageProps extends RouteComponentProps<IFragmentPageRouteParams> {
    selectedMenuKey: string
}

interface IFragmentPageState {
    title: string
    content: string
}

class FragmentPage extends PureComponent<IFragmentPageProps> {
    public state: IFragmentPageState
    public constructor(props: IFragmentPageProps) {
        super(props)
        this.state = {
            content: '',
            title: '',
        }
    }
    public componentWillMount() {
        this.setState({
            title: this.props.match.params.title,
        })
    }
    public componentDidMount() {
        const div = document.getElementById('editor')
        console.log(div)
        if (div) {
            monaco.editor.create(div, {
                fontSize: 14,
                language: 'markdown',
                minimap: {
                    enabled: false,
                },
                value: '',
            })
        }
    }
    public render() {
        return (
            <div className="fragment-page">
                <div className="page-header">
                    <div className="page-label">
                        {this.state.title}
                    </div>
                </div>
                <div className="page-content">
                    <div className="content-left">
                        <div id="editor" style={{
                            height: '100%',
                            width: '100%',
                        }} />
                    </div>
                    <div className="content-right">
                        sdfsd
                    </div>
                </div>
            </div>
        )
    }
}

export default FragmentPage
