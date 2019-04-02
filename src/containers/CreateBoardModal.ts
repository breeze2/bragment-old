import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import CreateBoardModal from '../components/CreateBoardModal'
import { asyncActionDispatcher, asyncCreateBoard, asyncFetchStandbyBgImages } from '../redux/actions'
import { IBoardBase } from '../schemas/IBoard'

const mapStateToProps = (store: any, props: any) => {
    return {
        bgColors: store.board.get('standbyBgColors'),
        bgImages: store.board.get('standbyBgImages'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    asyncCreateBoard: (board: IBoardBase) => asyncActionDispatcher<string>(dispatch, asyncCreateBoard, board),
    asyncFetchStandbyBgImages: () => dispatch(asyncFetchStandbyBgImages()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateBoardModal)
