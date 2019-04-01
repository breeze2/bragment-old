import { Icon } from 'antd'
import React, { Component } from 'react'

import CreateFragmentFrom from './CreateFragmentFrom'

interface IFragmentColumnFooterProps {
}

class FragmentColumnFooter extends Component<IFragmentColumnFooterProps> {
    public handleCreateFragmentSuccess = () => {

    }
    public render() {
        return (
            <div className="fragment-column-footer" >
                {/* <div className="footer-left">
                    <Icon type="plus" />
                </div>
                <p className="footer-action">{'dsfsfsdfsd'}</p> */}
                <CreateFragmentFrom onSuccess={this.handleCreateFragmentSuccess} />
            </div>
        )
    }
}

export default FragmentColumnFooter
