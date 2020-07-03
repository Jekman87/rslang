import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import createAboutTeamHTML from './teamPage.template';

export default class Team extends Component {
  static className = 'AboutTeam';

  constructor($root, options) {
    super($root, {
      name: 'Settings',
      listeners: ['click'],
      ...options,
    });
  }

  onClick(event) {
    const clickedElement = $$(event.target);
    console.log('AboutTeamPage onClick', clickedElement);
  }

  toHTML() {
    return createAboutTeamHTML().trim();
  }
}
