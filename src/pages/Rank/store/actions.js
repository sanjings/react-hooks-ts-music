import { SET_LOADING, SET_RANK_DATA } from './actionTypes'
import { getRankListRequest } from '../../../apis/requests/rank'

export const changeLoading = payload => {
  return {
    type: SET_LOADING,
    payload
  }
}

export const changeRankData = payload => {
  return {
    type: SET_RANK_DATA,
    payload
  }
}

/**
 * 获取榜单数据
 */
export const getRankListAction = () => {
  return async (dispatch) => {
    dispatch(changeLoading(true))
    const resp = await getRankListRequest()

    const list = resp.list,
          globalList = list.filter(item => !item.tracks.length),
          officailList = list.filter(item => item.tracks.length);

    dispatch(changeRankData({globalList, officailList}))
  }
}