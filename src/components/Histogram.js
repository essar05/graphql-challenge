import React, { Component } from 'react';
import { GET_POSTS } from '../queries/Posts';
import { graphql } from 'react-apollo';
import BarGraph from './BarGraph'

class Histogram extends Component {

  state = {
    postsCount: []
  };

  componentDidUpdate(prevProps) {
    if(prevProps.data.loading !== this.props.data.loading) {
      this.computeHistogramData();
    }
  }

  computeHistogramData() {
    const {loading: isLoading, allPosts: posts} = this.props.data;
    if(isLoading) {
      return;
    }

    const postsCount = [];

    posts.forEach((post) => {
      const dateCreated = new Date(post.createdAt);
      const year = dateCreated.getFullYear();
      const month = dateCreated.getMonth();

      let index = postsCount.findIndex((value) => value.year === year && value.month === month);

      if(index === -1) {
        postsCount.push({
          year: year,
          month: month,
          count: 0
        });
        index = postsCount.length - 1;
      }

      postsCount[index].count++;
    });

    postsCount.sort((a, b) => {
      if(a.year < b.year) {
        return -1;
      }
      if(a.year > b.year) {
        return 1;
      }
      if(a.year === b.year) {
        if(a.month < b.month) {
          return -1;
        }
        if(a.month > b.month) {
          return 1;
        }
      }

      return 0;
    });

    this.setState({
      ...this.state,
      postsCount: postsCount
    });
  }

  render() {
    const {data} = this.props;

    if(data.loading) {
      return (
        <div>Loading...</div>
      );
    }

    console.log(this.state.postsCount);

    return (
        <div className="histogram-container">
          <div className="histogram">
            <BarGraph width={800} height={500} data={this.state.postsCount} />
          </div>
        </div>
    );
  }
}

export default graphql(GET_POSTS, {
  options: ({postsCount}) => ({
    variables: {
      count: postsCount
    },
  }),
})(Histogram);
