import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import DiscussionListState from 'flarum/forum/states/DiscussionListState';
import DiscussionListItem from 'flarum/forum/components/DiscussionListItem';
import ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';
import Excerpt from './components/Excerpt';

export default function addSummaryExcerpt() {
  extend(DiscussionListState.prototype, 'requestParams', function (params) {
    if (typeof params.include === 'string') {
      params.include = [params.include];
    } else {
      params.include = params.include || [];
    }

    if (app.forum.attribute<string>('synopsis.excerpt_type') === 'first') {
      params.include.push('firstPost');
    } else {
      params.include.push('lastPost');
    }
  });

  extend(DiscussionListItem.prototype, 'infoItems', function (items: ItemList<Mithril.Children>) {
    // Skip if we are searching to preserve most relevant post content as excerpt,
    // that way we also preserve highlighting of search terms in the most relevant post.
    // @ts-expect-error
    if (app.forum.attribute('synopsis.disable_when_searching') && app.discussions.params.q) return;

    const discussion = this.attrs.discussion;

    if (app.session.user && !app.session.user.preferences()?.showSynopsisExcerpts) {
      return;
    }

    const tags = discussion.tags();
    let tag;
    if (tags) {
      tag = tags[tags.length - 1];
    }

    const excerptPost = app.forum.attribute<string>('synopsis.excerpt_type') === 'first' ? discussion.firstPost() : discussion.lastPost();
    const excerptLength = typeof tag?.excerptLength() === 'number' ? tag?.excerptLength() : app.forum.attribute<number>('synopsis.excerpt_length');
    const richExcerpt = typeof tag?.richExcerpts() === 'number' ? tag?.richExcerpts() : app.forum.attribute<boolean>('synopsis.rich_excerpts');
    const onMobile = app.session.user ? app.session.user.preferences()?.showSynopsisExcerptsOnMobile : false;

    // A length of zero means we don't want a synopsis for this discussion, so do nothing.
    if (excerptLength === 0) {
      return;
    }

    if (excerptPost) {
      const excerpt = <Excerpt post={excerptPost} length={excerptLength} richExcerpt={richExcerpt} />;

      items.add(onMobile ? 'excerptM' : 'excerpt', excerpt, -100);
    }
  });
}
