import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import BoardPage from '../components/BoardPage'
import { asyncActionDispatcher, asyncCreateFragmentColumnAction, asyncFetchFragmentColumnsAction, asyncInitCurrentBoardAction,
    asyncMoveFragmentAction, asyncMoveFragmentColumnAction } from '../redux/actions'
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
    asyncCreateFragmentColumn: (fragmentColumn: IFragmentColumn) => dispatch(asyncCreateFragmentColumnAction(fragmentColumn)),
    asyncFetchFragmentColumns: () => dispatch(asyncFetchFragmentColumnsAction()),
    asyncInitCurrentBoard: (board: IBoard | null) => dispatch(asyncInitCurrentBoardAction(board)),
    asyncMoveFragment: (fromColumnTitle: string, fromColumnIndex: number, toColumnTitle: string, toColumnIndex: number) => asyncActionDispatcher<boolean>(dispatch,
        asyncMoveFragmentAction, fromColumnTitle, fromColumnIndex, toColumnTitle, toColumnIndex),
    asyncMoveFragmentColumn: (from: number, to: number) => dispatch(asyncMoveFragmentColumnAction(from, to)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardPage)
