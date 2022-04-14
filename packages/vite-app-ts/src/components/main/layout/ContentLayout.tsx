import React from 'react';
import { Layout } from 'antd';

function ContentLayout({ title, description, children }: any) {
  return (
    <>
      <Layout.Header>
        <div className={'pageInfos'}>
          <div className={'pageTitle'}>{title}</div>
          <div className={'pageDescription'}>{description}</div>
        </div>
      </Layout.Header>
      <main>{children}</main>
    </>
  );
}

export default ContentLayout;
