import Component from '../../core/Component';
import createAboutTeamHTML from './teamPage.template';

export default class Team extends Component {
  static className = 'AboutTeam';

  constructor($root, options) {
    super($root, {
      name: 'AboutTeam',
      listeners: [],
      ...options,
    });
  }

  toHTML() {
    return createAboutTeamHTML().trim();
  }
}
