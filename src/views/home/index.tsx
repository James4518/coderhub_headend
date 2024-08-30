import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState
} from 'react';
import type { FC, ReactNode } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Divider, List, message, Skeleton } from 'antd';
import { LikeOutlined, StarOutlined } from '@ant-design/icons';
import moment, { Moment } from 'moment';
import { BASE_URL } from '@/network/request/config';
import IconText from '@/base-ui/IconText';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import {
  fetchMomentListAction,
  resetMomentListAction,
  updateMomentListAction
} from '@/store/modules/moment';
import { IPraise } from '@/network/features/praise/type';
import { HomeWrapper } from './style';
import { fetchPraiseAction, updatePraiseAction } from '@/store/modules/praise';
import reducer from './reducer';
import { IAction, IState } from './reducer/type';
import { IMoment } from '@/network/features/moment/type';

interface IProps {
  children?: ReactNode;
}

const Home: FC<IProps> = () => {
  const pageSize = 10;
  const dispatch = useAppDispatch();
  const [listHeight, setListHeight] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement>(null);
  const { username, totalCount, momentList, likes, collects } = useAppSelector(
    (state) => ({
      username: state.user.name,
      totalCount: state.moment.totalCount,
      momentList: state.moment.momentList,
      likes: state.praise.likes,
      collects: state.praise.collects
    }),
    useAppShallowEqual
  );
  const [state, updateState] = useReducer<React.Reducer<IState, IAction>>(
    reducer,
    {
      like: likes,
      collect: collects
    }
  );
  useEffect(() => {
    loadMoreData();
    return () => {
      dispatch(resetMomentListAction());
    };
  }, []);
  useEffect(() => {
    username.length > 0 && dispatch(fetchPraiseAction());
  }, [username]);
  useLayoutEffect(() => {
    const handleResize = () => {
      if (listRef.current) {
        setListHeight(listRef.current.clientHeight);
      }
    };
    const resizeObserver = new ResizeObserver(handleResize);
    if (listRef.current) {
      resizeObserver.observe(listRef.current);
    }
    return () => {
      if (listRef.current) {
        resizeObserver.unobserve(listRef.current);
      }
    };
  }, [momentList]);
  const getAvatarUrl = useCallback((id: number) => {
    return `${BASE_URL}/user/avatar/${id}`;
  }, []);
  const loadMoreData = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    await dispatch(
      fetchMomentListAction({
        offset: currentPage * pageSize,
        size: pageSize
      })
    );
    setCurrentPage((prev) => prev + 1);
    setLoading(false);
  }, [currentPage]);
  const formartDate = useCallback((dateStr: string) => {
    const date: Moment = moment(dateStr);
    return date.format('YYYY-MM-DD HH:mm:ss');
  }, []);
  const handleLike = async (item: number, success: boolean) => {
    updateState({
      type: success ? 'ADD_LIKE' : 'DEL_LIKE',
      payload: item
    });
  };
  const handleCollect = async (item: number, success: boolean) => {
    updateState({
      type: success ? 'ADD_COLLECT' : 'DEL_COLLECT',
      payload: item
    });
  };
  const updateMomentList = (
    momentList: IMoment[],
    targetId: number,
    action: IPraise,
    isLike: boolean,
    isCollect: boolean
  ) => {
    return momentList.map((momentItem) => {
      if (momentItem.id === targetId) {
        return {
          ...momentItem,
          likeCount:
            action === 'likeMoment'
              ? isLike
                ? momentItem.likeCount + 1
                : momentItem.likeCount - 1
              : momentItem.likeCount,
          collectCount:
            action === 'collect'
              ? isCollect
                ? momentItem.collectCount + 1
                : momentItem.collectCount - 1
              : momentItem.collectCount
        };
      }
      return momentItem;
    });
  };
  const handleIconClick = useCallback(
    async (action: IPraise, targetId: number) => {
      const isLiked = state.like.includes(targetId);
      const isCollected = state.collect.includes(targetId);
      const shouldLike = action === IPraise.likeMoment ? !isLiked : isLiked;
      const shouldCollect =
        action === IPraise.Collect ? !isCollected : isCollected;
      const res = await dispatch(updatePraiseAction({ action, targetId }));
      if (fetchPraiseAction.fulfilled.match(res)) {
        if (action === IPraise.likeMoment) {
          handleLike(targetId, shouldLike);
        }
        if (action === IPraise.Collect) {
          handleCollect(targetId, shouldCollect);
        }
        const updatedMomentList = updateMomentList(
          momentList,
          targetId,
          action,
          shouldLike,
          shouldCollect
        );
        dispatch(updateMomentListAction(updatedMomentList));
        message.success('操作成功~');
      }
      if (fetchPraiseAction.rejected.match(res)) {
        if (action === IPraise.likeMoment) handleLike(targetId, isLiked);
        if (action === IPraise.Collect) handleCollect(targetId, isCollected);
        message.error('操作失败~');
      }
    },
    [state.like, state.collect, momentList]
  );
  return (
    <HomeWrapper>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p>List height: {listHeight}px</p>
      <div id="scrollContent">
        <InfiniteScroll
          dataLength={momentList.length}
          next={loadMoreData}
          hasMore={currentPage * pageSize < totalCount}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <div ref={listRef} className="momentList">
            <List
              dataSource={momentList}
              itemLayout="vertical"
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <IconText
                      icon={LikeOutlined}
                      text={item.likeCount}
                      action={IPraise.likeMoment}
                      isActive={
                        likes.includes(item.id) || state.like.includes(item.id)
                      }
                      targetId={item.id}
                      iconClick={handleIconClick}
                      key={item.id}
                    />,
                    <IconText
                      icon={StarOutlined}
                      text={item.collectCount}
                      isActive={
                        collects.includes(item.id) ||
                        state.collect.includes(item.id)
                      }
                      action={IPraise.Collect}
                      targetId={item.id}
                      iconClick={handleIconClick}
                      key={item.id}
                    />
                  ]}
                  key={item.id}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={getAvatarUrl(item.author.id)} />}
                    title={item.author.username}
                    description={formartDate(item.createAt)}
                  />
                  <p className="content">{item.content}</p>
                </List.Item>
              )}
            />
          </div>
        </InfiniteScroll>
      </div>
    </HomeWrapper>
  );
};

export default memo(Home);
