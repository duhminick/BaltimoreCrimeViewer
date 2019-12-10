import React, { Component } from 'react';
import { DateRangeInput } from '@blueprintjs/datetime';
import moment from 'moment';
import './filter.css';

class DateFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      from: null,
      to: null,
    };
  }

  render() {
    const { title } = this.props;

    return (
      <div className="select-filter">
        {title &&
          <span className="select-filter-title">{title}:</span>
        }

        <DateRangeInput
          formatDate={date => moment(date).format('YYYY-MM-DD')}
          parseDate={date => new Date(date)}
          onChange={range => {
            const start = range[0];
            const end = range[1];
            let format = (date) => {
              return moment(date).format('YYYY-MM-DD');
            };
            if (start && end) {
              this.setState({from: format(start), to: format(end)});
            }
          }}
        />
      </div>
    );
  }
}

export default DateFilter;