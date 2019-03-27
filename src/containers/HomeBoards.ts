import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import HomeBoards from '../components/HomeBoards'
import { setCreateBoardModalVisible } from '../redux/actions'

const mapStateToProps = (store: any, props: any) => {
    return {
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    setCreateBoardModalVisible: (visible: boolean) => dispatch(setCreateBoardModalVisible(visible)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeBoards)
