import app from 'flarum/admin/app';
import EditTagModal from 'flarum/tags/admin/components/EditTagModal';
import { extend } from 'flarum/common/extend';
import Stream from 'flarum/common/utils/Stream';

export default function () {
  extend(EditTagModal.prototype, 'oninit', function () {
    this.richExcerpts = new Stream(this.tag.richExcerpts());
    this.excerptLength = new Stream(this.tag.excerptLength());
  });

  extend(EditTagModal.prototype, 'submitData', function (data) {
    data.richExcerpts = this.richExcerpts();
    data.excerptLength = this.excerptLength();

    return data;
  });

  extend(EditTagModal.prototype, 'fields', function (items) {
    items.add(
      'synopsis-excerpt-length',
      <div className="Form-group">
        <label>{app.translator.trans('ianm-synopsis.admin.settings.excerpt-length.label')}</label>
        <input className="FormControl" type="number" min="0" bidi={this.excerptLength} />
        <div>{app.translator.trans('ianm-synopsis.admin.settings.excerpt-length.help')}</div>
      </div>,
      5
    );

    items.add(
      'synopsis-rich-excerpts',
      <div className="Form-group">
        <div>
          <label className="checkbox">
            <input type="checkbox" bidi={this.richExcerpts} />
            {app.translator.trans('ianm-synopsis.admin.settings.rich-excerpts.label')}
          </label>
        </div>
        <div>{app.translator.trans('ianm-synopsis.admin.settings.rich-excerpts.help')}</div>
      </div>,
      5
    );
  });
}
