import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'

import './index.css'

class BlogsList extends Component {
  state = {blogsData: [], isLoading: true}

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const updatedData = data.map(e => ({
      id: e.id,
      title: e.title,
      imageUrl: e.image_url,
      avatarUrl: e.avatar_url,
      author: e.author,
      topic: e.topic,
    }))

    this.setState({blogsData: updatedData})
    this.setState({isLoading: false})
    console.log(updatedData)
  }

  render() {
    const {blogsData, isLoading} = this.state
    return (
      <div className="blog-list-container">
        {isLoading ? (
          <Loader type="Tailspin" color="#00BFFF" height={50} width={50} />
        ) : (
          blogsData.map(e => <BlogItem blogData={e} key={e.id} />)
        )}
      </div>
    )
  }
}

export default BlogsList
