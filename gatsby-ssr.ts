import React from 'react';
import url from 'url';
import type { GatsbySSR } from 'gatsby';

interface PluginOptions {
  siteUrl?: string;
  stripQueryString?: boolean;
}

export const onRenderBody: GatsbySSR['onRenderBody'] = (
  { setHeadComponents, pathname = `/` },
  pluginOptions: PluginOptions = {}
) => {
  if (pluginOptions && pluginOptions.siteUrl) {
    const siteUrl = pluginOptions.siteUrl.replace(/\/$/, ``);
    const parsed = url.parse(`${siteUrl}${pathname}`);
    const stripQueryString =
      typeof pluginOptions.stripQueryString !== `undefined`
        ? pluginOptions.stripQueryString
        : false;

    let pageUrl = ``;

    if (stripQueryString) {
      pageUrl = `${parsed.protocol}//${parsed.host}${parsed.pathname}`;
    } else {
      pageUrl = parsed.href;
    }

    setHeadComponents([
      React.createElement('link', {
        rel: 'canonical',
        key: pageUrl,
        href: pageUrl,
        'data-baseprotocol': parsed.protocol,
        'data-basehost': parsed.host,
      }),
    ]);
  }
};
