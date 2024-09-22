import Component, { ComponentAttrs } from 'flarum/common/Component';
import Post from 'flarum/common/models/Post';
import { truncate } from 'flarum/common/utils/string';
import type Mithril from 'mithril';

export interface ExcerptAttrs extends ComponentAttrs {
  post: Post;
  length: number;
  richExcerpt: boolean;
}

export default class Excerpt extends Component<ExcerptAttrs> {
  post!: Post;
  length!: number;
  richExcerpt!: boolean;

  oninit(vnode: Mithril.Vnode<ExcerptAttrs, this>) {
    super.oninit(vnode);

    this.post = this.attrs.post;
    this.length = this.attrs.length;
    this.richExcerpt = this.attrs.richExcerpt;
  }

  view() {
    return <div>{m.trust(this.getContent())}</div>;
  }

  getContent(): string {
    return this.richExcerpt ? truncate(this.contentRich() ?? '', this.length) : truncate(this.contentPlain() ?? '', this.length);
  }

  contentRich() {
    return this.post.contentHtml();
  }

  contentPlain() {
    return this.post.contentPlain();
  }
}
