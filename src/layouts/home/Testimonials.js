import React, { Component} from 'react'
import face from '../../images/face1.png'

const Review = ({testimonial, name, bio, active}) =>
  <div className={`flex col x mv2 tc ${active ? 'db' : 'dn'}`}>
    <p className='flarge '>"{testimonial}"</p>
    <p className='pt3 '>{name}</p>
    <p className='ftiny'>{bio}</p>
  </div>

class Testimonials extends Component {

  constructor (props) {
    super(props)
    this.state = {
      review1: true,
      review2: false,
      review3: false,
      review4: false
    }
  }

  select (reviewNumber) {
    // this feels hacky but I struggled to find a cleaner way to make all state elemnets false before making teh slected item true. Suggestions most welcome, please ping @joshpitzalis
    this.setState({
      review1: false,
      review2: false,
      review3: false,
      review4: false,
      [reviewNumber]: true
    })
  }

  render () {
    return (
      <div className='w-100'>
        <h2 className='tc w-100 pv3'>What They Say About Us</h2>
        <div className='flex col mxc pv3'>
          <Review
            testimonial={'The best way to buy and sell ether in India.'}
            name={'Gurmeet'}
            bio={'Founder  @Blacksmith'}
            active={this.state.review1}
          />
          <Review
            testimonial={'The two best way to buy and sell ether in India.'}
            name={'Gurmeet'}
            bio={'Founder  @Blacksmith'}
            active={this.state.review2}

          />
          <Review
            testimonial={'The three best way to buy and sell ether in India.'}
            name={'Gurmeet'}
            bio={'Founder  @Blacksmith'}
            active={this.state.review3}
          />
          <Review
            testimonial={'The four best way to buy and sell ether in India.'}
            name={'Gurmeet'}
            bio={'Founder  @Blacksmith'}
            active={this.state.review4}
          />
          <div className='flex mxc mv3'>
            <img src={face}
              alt=''
              onClick={() => this.select('review1')}
              className={`mh2 pointer ${!this.state.review1 && 'o-50'}`} />
            <img
              src={face}
              alt=''
              onClick={() => this.select('review2')}
              className={`mh2 pointer ${!this.state.review2 && 'o-50'}`} />
            <img
              src={face}
              alt=''
              onClick={() => this.select('review3')}
              className={`mh2 pointer ${!this.state.review3 && 'o-50'}`} />
            <img
              src={face}
              alt=''
              onClick={() => this.select('review4')}
              className={`mh2 pointer ${!this.state.review4 && 'o-50'}`} />
          </div>
        </div>
      </div>
    )
  }
}

Testimonials.propTypes = {}
Testimonials.defaultProps = {}

export default Testimonials
