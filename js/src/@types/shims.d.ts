import Tag from 'flarum/tags/common/models/Tag';
import SettingsPage from 'flarum/forum/components/SettingsPage';
import ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';
import EditTagModal from 'flarum/tags/admin/components/EditTagModal';
import Stream from 'flarum/common/utils/Stream';

declare module 'flarum/tags/common/models/Tag' {
  export default interface Tag {
    richExcerpts(): boolean;
    excerptLength(): number;
  }
}

declare module 'flarum/forum/components/SettingsPage' {
  export default interface SettingsPage {
    summariesItems(): ItemList<Mithril.Children>;
    showSynopsisExcerpts: Stream<boolean>;
    showSynopsisExcerptsOnMobile: Stream<boolean>;
    showSynopsisExcerptsLoading: boolean;
    showSynopsisExcerptsOnMobileLoading: boolean;
  }
}

declare module 'flarum/tags/admin/components/EditTagModal' {
  export default interface EditTagModal {
    richExcerpts: Stream<boolean>;
    excerptLength: Stream<number>;
  }
}
