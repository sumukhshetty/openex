import React from 'react'
import ResponsiveEmbed from 'react-responsive-embed'
// usage docs for youtube component https://github.com/troybetz/react-youtube

const YouAreFirst = () => (
  <div className='tc'>
    <h1>It Seems like you are the first one here from your country.</h1>
    <h2>How to Use the Site...</h2>
    <div className="tc center ma3 w-50-l w-100">
      <ResponsiveEmbed src="https://www.youtube.com/embed/bFy4yC0cGfk" />
    </div>
    <div className='mv3'>
      {/* <!-- Sharingbutton Facebook --> */}
      <a className='resp-sharing-button__link' href='https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Fsharingbuttons.io' target='_blank' aria-label='Share on Facebook'>
        <div className='resp-sharing-button resp-sharing-button--facebook resp-sharing-button--large'><div aria-hidden='true' className='resp-sharing-button__icon resp-sharing-button__icon--solid'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z' /></svg>
        </div>Share on Facebook</div>
      </a>

      {/* <!-- Sharingbutton Twitter --> */}
      <a className='resp-sharing-button__link' href='https://twitter.com/intent/tweet/?text=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;url=http%3A%2F%2Fsharingbuttons.io' target='_blank' aria-label='Share on Twitter'>
        <div className='resp-sharing-button resp-sharing-button--twitter resp-sharing-button--large'><div aria-hidden='true' className='resp-sharing-button__icon resp-sharing-button__icon--solid'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z' /></svg>
        </div>Share on Twitter</div>
      </a>

      {/* <!-- Sharingbutton Google+ --> */}
      <a className='resp-sharing-button__link' href='https://plus.google.com/share?url=http%3A%2F%2Fsharingbuttons.io' target='_blank' aria-label='Share on Google+'>
        <div className='resp-sharing-button resp-sharing-button--google resp-sharing-button--large'><div aria-hidden='true' className='resp-sharing-button__icon resp-sharing-button__icon--solid'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M11.37 12.93c-.73-.52-1.4-1.27-1.4-1.5 0-.43.03-.63.98-1.37 1.23-.97 1.9-2.23 1.9-3.57 0-1.22-.36-2.3-1-3.05h.5c.1 0 .2-.04.28-.1l1.36-.98c.16-.12.23-.34.17-.54-.07-.2-.25-.33-.46-.33H7.6c-.66 0-1.34.12-2 .35-2.23.76-3.78 2.66-3.78 4.6 0 2.76 2.13 4.85 5 4.9-.07.23-.1.45-.1.66 0 .43.1.83.33 1.22h-.08c-2.72 0-5.17 1.34-6.1 3.32-.25.52-.37 1.04-.37 1.56 0 .5.13.98.38 1.44.6 1.04 1.84 1.86 3.55 2.28.87.23 1.82.34 2.8.34.88 0 1.7-.1 2.5-.34 2.4-.7 3.97-2.48 3.97-4.54 0-1.97-.63-3.15-2.33-4.35zm-7.7 4.5c0-1.42 1.8-2.68 3.9-2.68h.05c.45 0 .9.07 1.3.2l.42.28c.96.66 1.6 1.1 1.77 1.8.05.16.07.33.07.5 0 1.8-1.33 2.7-3.96 2.7-1.98 0-3.54-1.23-3.54-2.8zM5.54 3.9c.33-.38.75-.58 1.23-.58h.05c1.35.05 2.64 1.55 2.88 3.35.14 1.02-.08 1.97-.6 2.55-.32.37-.74.56-1.23.56h-.03c-1.32-.04-2.63-1.6-2.87-3.4-.13-1 .08-1.92.58-2.5zM23.5 9.5h-3v-3h-2v3h-3v2h3v3h2v-3h3' /></svg>
        </div>Share on Google+</div>
      </a>

    </div>

  </div>
  )

export default YouAreFirst