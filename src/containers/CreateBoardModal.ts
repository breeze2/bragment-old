import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import CreateBoardModal from '../components/CreateBoardModal'
import { asyncFetchBoardList, asyncFetchStandbyBgImages } from '../redux/actions'

const mapStateToProps = (store: any, props: any) => {
    return {
        bgColors: store.board.get('standbyBgColors'),
        bgImages: store.board.get('standbyBgImages'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    asyncFetchBoardList: () => dispatch(asyncFetchBoardList()),
    asyncFetchStandbyBgImages: () => dispatch(asyncFetchStandbyBgImages()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateBoardModal)
