import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import BoardPage from '../pages/Board'
import { asyncFetchFragmentColumns, asyncInitCurretnBoard, asyncPushInFragmentColumns } from '../redux/actions'
import IBoard from '../schemas/IBoard'
import IFragmentColumn from '../schemas/IFragmentColumn'

const mapStateToProps = (store: any, props: any) => {
    return {
        boardList: store.board.get('list'),
        boardLowdb: store.board.get('lowdb'),
        currentBoard: store.board.get('current'),
        fragmentColumns: store.board.get('fragmentColumns'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    asyncFetchFragmentColumns: () => dispatch(asyncFetchFragmentColumns()),
    asyncInitCurretnBoard: (board: IBoard | null) => dispatch(asyncInitCurretnBoard(board)),
    asyncPushInFragmentColumns: (fragmentColumn: IFragmentColumn) => dispatch(asyncPushInFragmentColumns(fragmentColumn))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardPage)
