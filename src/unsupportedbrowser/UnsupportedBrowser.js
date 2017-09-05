import React from 'react'

export default () =>
  <div className="absolute bg-danger w-100 z-1 flex mxa cxc mt3">
    <p className="white tc ph3">
      Transactions are only supported on Chrome & Firefox at the moment.
    </p>
    <div>
      <button className="white ba br3 b--white ttc mv3 bg-danger bg-white-hover danger-hover">
        Use Firefox
      </button>
    </div>

    <div>
      <button className="white ba br3 b--white ttc mv3 bg-danger bg-white-hover danger-hover">
        Use Chrome
      </button>
    </div>
  </div>
