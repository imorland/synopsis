import Component, { ComponentAttrs } from 'flarum/common/Component';
import Post from 'flarum/common/models/Post';
import type Mithril from 'mithril';
export interface ExcerptAttrs extends ComponentAttrs {
    post: Post;
    length: number;
    richExcerpt: boolean;
}
export default class Excerpt extends Component<ExcerptAttrs> {
    post: Post;
    length: number;
    richExcerpt: boolean;
    oninit(vnode: Mithril.Vnode<ExcerptAttrs, this>): void;
    view(): JSX.Element;
    getContent(): string;
    contentRich(): string | null | undefined;
    contentPlain(): string | null | undefined;
}
