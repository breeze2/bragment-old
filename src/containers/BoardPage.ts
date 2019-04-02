import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import BoardPage from '../components/BoardPage'
import { asyncFetchFragmentColumns, asyncInitCurretnBoard, asyncMoveInFragmentColumns, asyncPushInFragmentColumns } from '../redux/actions'
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
    asyncFetchFragmentColumns: () => dispatch(asyncFetchFragmentColumns()),
    asyncInitCurretnBoard: (board: IBoard | null) => dispatch(asyncInitCurretnBoard(board)),
    asyncMoveInFragmentColumns: (from: number, to: number) => dispatch(asyncMoveInFragmentColumns(from, to)),
    asyncPushInFragmentColumns: (fragmentColumn: IFragmentColumn) => dispatch(asyncPushInFragmentColumns(fragmentColumn)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardPage)
