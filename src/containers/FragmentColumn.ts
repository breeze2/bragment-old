import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import FragmentColumn from '../components/FragmentColumn'
import { asyncActionDispatcher, asyncCreateFragmentAction } from '../redux/actions'

const mapStateToProps = (store: any, props: any) => {
    return {
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    asyncCreateFragment: (columnTitle: string, fragmentTitle: string) => asyncActionDispatcher<boolean>(dispatch,
        asyncCreateFragmentAction(columnTitle, fragmentTitle)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FragmentColumn)
