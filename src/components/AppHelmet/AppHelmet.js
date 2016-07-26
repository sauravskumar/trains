/**
 * Created by saurav on 26/7/16.
 */
import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';

export default class AppHelmet extends Component {
  static propTypes= {
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
    url: PropTypes.string,
  };
  render() {
    const {title, description, keywords, url} = this.props;
    return (
      <Helmet title={title} meta={[
        {name: 'description', content: description},
        {name: 'keywords', content: keywords},
        {name: 'og:title', content: title},
        {name: 'og:description', content: description},
        {name: 'og:url', content: 'https://www.atmed.co' + url}
      ]}/>
    );
  }
}
