import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import FragmentPage from '../components/FragmentPage'
import { asyncActionDispatcher, asyncFetchFragmentInfoAction, asyncSaveFragmentContentAction } from '../redux/actions'
import IFragmentInfo from '../schemas/IFragmentInfo'

const mapStateToProps = (store: any, props: any) => {
    return {
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    asyncFetchFragmentInfo: (boardId: string, columnTitle: string, fragmentTitle: string) => asyncActionDispatcher<IFragmentInfo>(dispatch,
        asyncFetchFragmentInfoAction, boardId, columnTitle, fragmentTitle),
    asyncSaveFragmentContent: (fragmentPath: string, fragmentContent: string) => asyncActionDispatcher<true>(dispatch,
        asyncSaveFragmentContentAction, fragmentPath, fragmentContent),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FragmentPage)
