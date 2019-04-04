import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import BoardPage from '../components/BoardPage'
import { asyncActionDispatcher, asyncFetchFragmentColumnsAction, asyncInitCurretnBoardAction,
    asyncMoveFragmentAction, asyncMoveInFragmentColumnsAction, asyncPushInFragmentColumnsAction } from '../redux/actions'
import IBoard from '../schemas/IBoard'
import IFragmentColumn from '../schemas/IFragmentColumn'

const mapStateToProps = (store: any, props: any) => {
    return {
        bgImageTimestamp: store.app.get('bgImageTimestamp'),
        boardList: store.board.get('list'),
        boardLowdb: store.board.get('lowdb'),
        currentBoard: store.board.get('current'),
        fragmentColumns: store.board.get('fragmentColumns'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    asyncFetchFragmentColumns: () => dispatch(asyncFetchFragmentColumnsAction()),
    asyncInitCurretnBoard: (board: IBoard | null) => dispatch(asyncInitCurretnBoardAction(board)),
    asyncMoveFragment: (fromColumnTitle: string, fromColumnIndex: number, toColumnTitle: string, toColumnIndex: number) => asyncActionDispatcher<boolean>(dispatch,
        asyncMoveFragmentAction, fromColumnTitle, fromColumnIndex, toColumnTitle, toColumnIndex),
    asyncMoveInFragmentColumns: (from: number, to: number) => dispatch(asyncMoveInFragmentColumnsAction(from, to)),
    asyncPushInFragmentColumns: (fragmentColumn: IFragmentColumn) => dispatch(asyncPushInFragmentColumnsAction(fragmentColumn)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardPage)
