import { connect } from "react-redux"

//fetches from reducer! 
const mapStateToProps = state => {
    return { stopsHistory: state.stopsHistory}
}

const StopsHistoryList = connect(mapStateToProps)

export default StopsHistoryList