import React, { memo, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { renderRoutes } from 'react-router-config';
import { forceCheck } from 'react-lazyload';

import Scroll from '../../components/Scroll'
import Loading from '../../components/Loading'
import Carousel from '../../components/Carousel'
import ModuleTitle from '../../components/ModuleTitle'
import SongList from '../../components/SongList'
import RecommendList from './List'

import { actions } from './store';

const {
  getBannersAction,
  getRecommendListAction,
  getRecommendNewSongsAction
} = actions;

const Recommend = props => {
  const loading = useSelector(state => state.recommend.loading),
        banners = useSelector(state => state.recommend.banners),
        recommendList = useSelector(state => state.recommend.recommendList),
        newSongs = useSelector(state => state.recommend.recommendNewSongs),
        playList = useSelector(state => state.player.playList);

  const scrollRef = useRef(null)

  const dispatch = useDispatch()

  /**
   * 获取banner、recommend数据
   */
  useEffect(() => {
    dispatch(getBannersAction(2))
    dispatch(getRecommendListAction(12))
    dispatch(getRecommendNewSongsAction())
  }, []);

  /**
   * 根据播放状态动态改变滚动高度
   */
  const wrapperStyle = {
    flex: 1,
    overflow: 'hidden',
    marginBottom: playList.length ? '60px' : 0
  }

  return (
    <div style={wrapperStyle}>
      <Scroll ref={scrollRef} direction="vertical" onScroll={forceCheck}>
        <div className="recommend">
          {/* 轮播图 */}
          <Carousel banners={banners} />

          {/* 推荐歌单列表 */}
          <ModuleTitle title="推荐歌单" symbol></ModuleTitle>
          <RecommendList listData={recommendList} />

          {/* 最新音乐 */}
          <ModuleTitle title="最新音乐" symbol></ModuleTitle>
          <SongList listData={newSongs}></SongList>
        </div>
      </Scroll>
      
      { renderRoutes(props.route.routes)}

      {/* loading */}
      { loading && <Loading /> }
    </div>
  )
}


export default memo(Recommend)