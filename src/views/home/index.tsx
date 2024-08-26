import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import type { FC, ReactNode } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Divider, List, Skeleton } from 'antd';
import { LikeOutlined, StarOutlined } from '@ant-design/icons';
import { BASE_URL } from '@/network/request/config';
import IconText from '@/base-ui/IconText';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import { fetchMomentListAction } from '@/store/modules/moment';
import { HomeWrapper } from './style';
import myRequest from '@/network';

interface IProps {
  children?: ReactNode;
}

const Home: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const [listHeight, setListHeight] = useState<number>(0);
  const pageSize = 10;
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
  const handleIconClick = (action: string, targetId: number) => {
    myRequest.post({ url: `/praise/${action}/${targetId}` });
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
                    <IconText icon={LikeOutlined} text={item.likeCount} />,
                    <IconText icon={StarOutlined} text={item.collectCount} />
                  ]}
                  key={item.id}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={getAvatarUrl(item.author.id)} />}
                    title={item.author.username}
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
