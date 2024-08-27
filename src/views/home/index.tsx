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
import { fetchMomentListAction } from '@/store/modules/moment';
import { IPraise } from '@/network/features/praise/type';
import { HomeWrapper } from './style';
import { fetchPraiseAction } from '@/store/modules/praise';
import reducer from './reducer';

interface IProps {
  children?: ReactNode;
}

const Home: FC<IProps> = () => {
  const pageSize = 10;
  const dispatch = useAppDispatch();
  const [listHeight, setListHeight] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const [state, updateState] = useReducer(reducer, {
    like: new Map(),
    collect: new Map()
  });
  const { totalCount, momentList } = useAppSelector(
    (state) => ({
      totalCount: state.moment.totalCount,
      momentList: state.moment.momentList
    }),
    useAppShallowEqual
  );
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
  }, [momentList]);
  const getAvatarUrl = useCallback((id: number) => {
    return `${BASE_URL}/user/avatar/${id}`;
  }, []);
  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    await dispatch(
      fetchMomentListAction({
        offset: currentPage * pageSize,
        size: pageSize
      })
    );
    setCurrentPage((prev) => {
      console.log(prev, prev + 1);
      return prev + 1;
    });
    setLoading(false);
  };
  const formartDate = useCallback((dateStr: string) => {
    const date: Moment = moment(dateStr);
    return date.format('YYYY-MM-DD HH:mm:ss');
  }, []);
  const addLike = (key: number, value: number) => {
    updateState({
      type: 'ADD_LIKE',
      payload: { key, value }
    });
  };
  const deleteLike = (key: number) => {
    updateState({
      type: 'DEL_LIKE',
      payload: { key }
    });
  };
  const addCollect = (key: number, value: number) => {
    updateState({
      type: 'ADD_COLLECT',
      payload: { key, value }
    });
  };
  const deleteCollect = (key: number) => {
    updateState({
      type: 'DEL_COLLECT',
      payload: { key }
    });
  };
  const handleIconClick = async (action: IPraise, targetId: number) => {
    const res = await fetchPraiseAction({ action, targetId });
    if (fetchPraiseAction.fulfilled.match(res)) {
      message.success('操作成功~');
    }
    if (fetchPraiseAction.rejected.match(res)) {
      message.error('操作失败~');
    }
  };
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
                      isActive={}
                      targetId={item.id}
                      iconClick={handleIconClick}
                    />,
                    <IconText
                      icon={StarOutlined}
                      text={item.collectCount}
                      isActive={}
                      action={IPraise.Collect}
                      targetId={item.id}
                      iconClick={handleIconClick}
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
