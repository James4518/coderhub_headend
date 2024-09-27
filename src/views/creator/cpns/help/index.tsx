import React, { memo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { Collapse, CollapseProps, Tabs, TabsProps } from 'antd';
import { HelpWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const Help: FC<IProps> = () => {
  const [activeTab, setActiveTab] = useState<string>('exposed');
  const [currentKey, setCurrentKey] = useState<string[]>(['exposedRule']);
  const auditItems: CollapseProps['items'] = [
    {
      key: 'auditReson',
      label: (
        <span
          className={classNames({ active: currentKey.includes('auditReson') })}
        >
          为什么会有审核？
        </span>
      ),
      children: (
        <ol>
          <li>
            根据国家相关法律法规规定，保障平台内容安全：过滤涉黄、涉暴、涉毒、赌博等安全底线问题。
          </li>
          <li>
            保障用户体验，有助于提升平台长期价值：打击低俗、辱骂、广告等低质内容。
          </li>
        </ol>
      )
    },
    {
      key: 'auditStatus',
      label: (
        <span
          className={classNames({ active: currentKey.includes('auditStatus') })}
        >
          审核状态有哪些？
        </span>
      ),
      children: (
        <ol>
          <li>
            审核中：内容发布后将进入审核状态，有相关的标签提示你的内容正在审核中。
          </li>
          <li>
            审核不通过（自见）：内容审核不通过，系统会有消息提醒，请参考消息中的社区规范，进行内容调整，内容修改并提交后，会再次进入审核。
          </li>
          <li>审核通过：审核通过后的文章会发布成功并可能获得被推荐机会。</li>
          <li>
            内容被删除：如果你发布的内容不符合相关法律法规要求，会直接删除，同时会有系统消息发送给你。
          </li>
          <li>
            申诉渠道：审核未通过的内容，如果作者自查后，仍无法感知到问题所在，请访问沸点话题「反馈&建议」提交你的问题和文章链接，掘金官方将在排查后给你留言反馈相关调整策略。
          </li>
        </ol>
      )
    }
  ];
  const exposedItems: CollapseProps['items'] = [
    {
      key: 'exposedRule',
      label: (
        <span
          className={classNames({ active: currentKey.includes('exposedRule') })}
        >
          推荐规则是什么？
        </span>
      ),
      children: (
        <p>
          更多详见
          <a href="" target="_blank" rel="noopener noreferrer">
            详细规则
          </a>
        </p>
      )
    },
    {
      key: 'exposedHot',
      label: (
        <span
          className={classNames({ active: currentKey.includes('exposedHot') })}
        >
          什么样的动态会被推荐？
        </span>
      ),
      children: (
        <ol>
          <li>内容形式：对他人有启发性且必须原创或者本人翻译的文章。</li>
          <li>排版要求：行文排版优雅。</li>
          <li>
            题材要求：原则上不限制具体题材，但是文章要符合与开发相关的技术细节、技巧干货、开源工具介绍、实践总结、行业见解、职业选择等方向；
          </li>
          <li>
            符合标准的引流规范：coderhub作为一个帮助开发者成长的技术社区，我们原则上不支持这一行为，但是本着服务用户的原则我们也不禁止这一行为。为了帮助用户拥有更好的阅读体验，我们现对张贴公众号行为作出以下规范：可以是文字引导用户关注公众号，但是对于添加个人微信账号、引导用户进群、推广产品等威胁用户信息安全的行为一律禁止。
          </li>
        </ol>
      )
    }
  ];
  const tabItems: TabsProps['items'] = [
    {
      key: 'exposed',
      label: '内容曝光',
      children: (
        <Collapse
          accordion
          items={exposedItems}
          bordered={false}
          defaultActiveKey={['exposedRule']}
          activeKey={currentKey}
          onChange={(key) => {
            setCurrentKey(key as string[]);
          }}
        />
      )
    },
    {
      key: 'audit',
      label: '内容审核',
      children: (
        <Collapse
          accordion
          items={auditItems}
          bordered={false}
          defaultActiveKey={['auditReson']}
          activeKey={currentKey}
          onChange={(key) => {
            setCurrentKey(key as string[]);
          }}
        />
      )
    }
  ];
  const handleTabChange = (key: string) => {
    setActiveTab(key);
    if (key === 'exposed') {
      setCurrentKey(['exposedRule']);
    } else {
      setCurrentKey(['auditReson']);
    }
  };
  return (
    <HelpWrapper>
      <Tabs
        defaultActiveKey="exposed"
        activeKey={activeTab}
        onChange={handleTabChange}
        items={tabItems}
      />
    </HelpWrapper>
  );
};

export default memo(Help);
