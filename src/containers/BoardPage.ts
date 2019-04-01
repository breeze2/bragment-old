import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import BoardPage from '../pages/Board'
import { asyncInitCurretnBoard, setCurrentBoard } from '../redux/actions'
import IBoard from '../schemas/IBoard'

const mapStateToProps = (store: any, props: any) => {
    return {
        boardList: store.board.get('list'),
        boardLowdb: store.board.get('lowdb'),
        currentBoard: store.board.get('current'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    asyncInitCurretnBoard: (board: IBoard | null) => dispatch(asyncInitCurretnBoard(board)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardPage)
