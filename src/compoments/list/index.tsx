import React, {
  memo,
  Reducer,
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState
} from 'react';
import type { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider, List, message, Skeleton } from 'antd';
import { LikeOutlined, StarOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import moment, { Moment } from 'moment';
import IconText from '@/base-ui/IconText';
import { BASE_URL } from '@/network/request/config';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import PopoverAvatar from '@/base-ui/popover-avatar';
import { formatCount } from '@/utils/common';
import useProtectedOperation from '@/hooks/useProtectedOperation';
import reducer from './reducer';
import { updateMomentListAction } from '@/store/modules/moment';
import { IAction, IState } from './reducer/type';
import { fetchPraiseAction, updatePraiseAction } from '@/store/modules/praise';
import { IPraise } from '@/network/features/praise/type';
import { IMoment } from '@/network/features/moment/type';
import { MyListWrapper } from './style';

interface IProps {
  children?: ReactNode;
  dataList: IMoment[];
  fetchAction: ({}) => any;
}

const MyList: FC<IProps> = ({ dataList, fetchAction }) => {
  const pageSize = 10;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [listHeight, setListHeight] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement>(null);
  const { username, totalCount, likes, collects } = useAppSelector(
    (state) => ({
      username: state.user.name,
      totalCount: state.moment.totalCount,
      likes: state.praise.likes,
      collects: state.praise.collects
    }),
    useAppShallowEqual
  );
  const [state, updateState] = useReducer<Reducer<IState, IAction>>(reducer, {
    like: likes,
    collect: collects
  });
  useEffect(() => {
    username.length > 0 && dispatch(fetchPraiseAction());
  }, [username]);
  const loadMoreData = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    await dispatch(
      fetchAction({
        offset: currentPage * pageSize,
        size: pageSize
      })
    );
    setCurrentPage((prev) => prev + 1);
    setLoading(false);
  }, [currentPage]);
  useEffect(() => {
    loadMoreData();
  }, []);
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
  }, [dataList]);
  const getAvatarUrl = useCallback((id: number) => {
    return `${BASE_URL}/user/avatar/${id}`;
  }, []);
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
  const handleIconClick: (action: IPraise, targetId: number) => Promise<void> =
    useCallback(
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
            dataList,
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
      [state.like, state.collect, dataList]
    );
  const checkClick = useProtectedOperation(
    (action: IPraise, targetId: number) => handleIconClick(action, targetId)
  );
  const labelClick = (labelName: string) => {
    navigate;
  };
  return (
    <MyListWrapper>
      <p>list height: {listHeight}</p>
      <div id="scrollContent">
        <InfiniteScroll
          dataLength={dataList?.length || 0}
          next={loadMoreData}
          hasMore={currentPage * pageSize < totalCount}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          {/* {
              dataList.map(item => {
                return (
                  <div className="top">
                    <a href=''><img src={getAvatarUrl(item.author.id)} alt="avatar" /></a>
                  </div>
                )
              })
            } */}
          <div ref={listRef} className="momentList">
            <List
              dataSource={dataList}
              itemLayout="vertical"
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <IconText
                      icon={LikeOutlined}
                      text={formatCount(item.likeCount)}
                      action={IPraise.likeMoment}
                      isActive={
                        likes.includes(item.id) || state.like.includes(item.id)
                      }
                      targetId={item.id}
                      iconClick={checkClick}
                      key={item.id}
                    />,
                    <IconText
                      icon={StarOutlined}
                      text={formatCount(item.collectCount)}
                      isActive={
                        collects.includes(item.id) ||
                        state.collect.includes(item.id)
                      }
                      action={IPraise.Collect}
                      targetId={item.id}
                      iconClick={checkClick}
                      key={item.id}
                    />
                  ]}
                  key={item.id}
                >
                  <List.Item.Meta
                    avatar={
                      <PopoverAvatar
                        user={{
                          userId: item.author.id,
                          username: item.author.username,
                          avatarUrl: getAvatarUrl(item.author.id)
                        }}
                      />
                    }
                    title={item.author.username}
                    description={formartDate(item.createAt)}
                  />
                  <p className="content">{item.content}</p>
                  <p className="labels">
                    {item.labels?.map((label: string) => (
                      <a href={`/labels/${label}`} target="_blank">
                        <span className="label" key={label}>
                          {label}
                        </span>
                      </a>
                    ))}
                  </p>
                </List.Item>
              )}
            />
          </div>
        </InfiniteScroll>
      </div>
    </MyListWrapper>
  );
};

export default memo(MyList);
