import React, { Component } from 'react';
import { GET_POSTS } from '../queries/Posts';
import { graphql } from "react-apollo";

class Histogram extends Component {

  state = {
    postsCount: {}
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

    const postsCount = {};

    posts.forEach((post) => {
      const dateCreated = new Date(post.createdAt);
      const year = dateCreated.getFullYear();
      const month = dateCreated.getMonth();

      if(!postsCount.hasOwnProperty(year)) {
        postsCount[year] = {
          [month]: 0
        };
      }

      if(!postsCount[year].hasOwnProperty(month)) {
        postsCount[year][month] = 0;
      }

      postsCount[year][month]++;

      this.setState({
        ...this.state,
        postsCount: postsCount
      });
    });
  }

  render() {
    const {data} = this.props;

    if(data.loading) {
      return (
        <div>Loading...</div>
      )
    }

    return (
        <div>{data.allPosts.length}</div>
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
