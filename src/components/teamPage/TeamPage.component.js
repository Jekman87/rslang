import Component from '../../core/Component';
import createAboutTeamHTML from './teamPage.template';

export default class Team extends Component {
  static className = 'Team';

  constructor($root, options) {
    super($root, {
      name: 'Team',
      listeners: [],
      ...options,
    });
  }

  toHTML() {
    return createAboutTeamHTML().trim();
  }
}
