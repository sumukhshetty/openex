import React from 'react';

const HTMLStyles = (props) => {
  return (
    <div className='bg-smoke'>
      <div className='w-75 center pv5'>
        <header>
          <h1>HTML Styles</h1>
          <p><span className='hidden'>Subtitle:</span>Every default HTML element in one place. Zero CSS classes.</p>
          <div>Published on <time datetime='2017-01-01'>01/01/2017</time></div>
        </header>
        <nav>
          <ul>
            <li> <a href='#' title='Home'>Home</a> </li>
            <li> <a href='#' title='About'>About</a> </li>
            <li> <a href='#' title='Sign Up'>Sign Up</a> </li>
            <li> <a href='#' title='Contact'>Contact</a> </li>
            <li> <a href='#' title='Careers'>Careers</a> </li>
          </ul>
        </nav>
        <hr />
        <main id='main'>
          <article>
            <h2>Semantics, Tables, Lists, Links and Formatting</h2>
            <p>
          This page contains every <abbr>HTML5</abbr> element as ofJanuary 2017.
        </p>
            <p>
          This page is useful for creating a <strong>CSS pattern library</strong>.
          <br />
          Style the html elements for your project, <em>attach your style sheet to this page</em> and you can see which ones still need to be styled for a complete pattern library.
          <wbr />
          The idea was inspired by <a href='https://github.com/mrmrs/html'>Adam Morse</a> but I wanted to include every possibel html elemnet and I wanted to include a few best practices I've learned from Heydon Pickering's book on <cite><a href='https://www.google.co.in/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&cad=rja&uact=8&ved=0ahUKEwiiyK_T-7vRAhUHso8KHUJwAegQFggjMAE&url=https%3A%2F%2Fshop.smashingmagazine.com%2Fproducts%2Five-design-patterns&usg=AFQjCNGXBrGehe35Bg9AdVGF-lYhtwpX6Q&sig2=QBCNcrf5W2vH1p96QcZ4jw'>Inclusive Design Patterns</a></cite>.
          It can also be used to learn more about what different kinds of HTML elements do. The source code for this document is heavily commented with explanations and best practices. For more information on each element, refer to the <a href='http://w3c.github.io/html/index.html#contents'>HTML Docs</a>.
        </p>
            <blockquote>
              <p>
            The web is about information. Make it easy to find and stay out of the way.
          </p>
              <a href='https://github.com/jxnblk/principles'>- Brent Jackson</a>
            </blockquote>
            <q>It seems to me that developer ergonomics should be less important than our users’ needs.</q><a href='https://aerotwist.com/blog/react-plus-performance-equals-what/'>— Paul Lewis</a>
          </article>

          <aside>
            <h3>Code examples</h3>
            <code>
              <pre>
      sudo ipfw pipe 1 config bw 256KByte/s
      sudo ipfw add 1 pipe 1 src-port 3000
    </pre>
            </code>
            <samp>
              <pre>
          /Sites/html master  ☠ ☢
          $                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <kbd>ls -gto</kbd>

          total 104
          -rw-r--r--   1   10779 Jun  5 16:24 index.html
          -rw-r--r--   1    1255 Jun  5 16:00 _config.yml
          drwxr-xr-x  11     374 Jun  5 15:57 _site
          -rw-r--r--   1    1597 Jun  5 14:16 README.md
          drwxr-xr-x   5     170 Jun  5 14:15 _sass
          -rw-r--r--   1     564 Jun  4 15:59 Rakefile
          drwxr-xr-x   6     204 Jun  4 15:59 _includes
          drwxr-xr-x   4     136 Jun  4 15:59 _layouts
          drwxr-xr-x   3     102 Jun  4 15:59 _resources
          drwxr-xr-x   3     102 Jun  4 15:59 css
          -rw-r--r--   1    1977 Jun  4 15:59 favicon.icns
          -rw-r--r--   1    6518 Jun  4 15:59 favicon.ico
          -rw-r--r--   1    1250 Jun  4 15:59 touch-icon-ipad-precomposed.png
          -rw-r--r--   1    2203 Jun  4 15:59 touch-icon-ipad-retina-precomposed.png
          -rw-r--r--   1    1046 Jun  4 15:59 touch-icon-iphone-precomposed.png
          -rw-r--r--   1    1779 Jun  4 15:59 touch-icon-iphone-retina-precomposed.png
        </pre>
            </samp>
            <h4>When picking a typeface, ask yourself:</h4>
            <ul>
              <li>Does it have any ornamentation that gets in the way of comprehension?</li>
              <li><mark>Are the metrics (such as x-height)16 consistent between letterforms?</mark></li>
              <li>Are individual letterforms distinct in shape or can they be confused with others?</li>
              <li>Does the typeface support all of the characters and font styles that are needed?</li>
            </ul>
            <h5>Writing Paragraphs</h5>
            <ol>
              <li> Write short paragraphs, sentences and words.
“I purchased a mammalian companion of the canine variety” is never better than “I bought a dog.”
</li>
              <li>Be wary of passive sentences. They can often be replaced by a more direct alternative. There’s no need to say the convoluted, “a pork pie was eaten by Harry” when you can just as well say, “Harry ate a pork pie.”</li>
              <li>Eliminate redundancy. It’s rarely worth saying the same thing twice in different ways. Avoid repetition. (See what I did there?)</li>
              <li>Vary the length of sentences and paragraphs. This reduces monotony, encouraging focus</li>
              <li><del>Fifth</del></li>
            </ol>
            <h6>Definition list</h6>
            <dl>
              <dt>
        Kick
        </dt>
              <dd>
        808
        </dd>
              <dt>
        Snare
        </dt>
              <dd>
        909
        </dd>
            </dl>
            <dl>
              <dt> Maine </dt>
              <dd> Augusta </dd>
              <dt> California </dt>
              <dd> Sacremento </dd>
              <dt> Oregon </dt>
              <dd> Salem </dd>
              <dt> New York </dt>
              <dd> Albany </dd>
            </dl>
            <dl>
              <dt> Ascender </dt>
              <dd> The part of certain lowercase letters that extends above the x-height of a font.</dd>
              <dt> Font </dt>
              <dd> Traditionally, a complete set of characters for one typeface at
        one particular type size. Often used more loosely as a synonym for
        "typeface".
        </dd>
              <dt> Golden Section </dt>
              <dd>
        The ideal proportion according to the ancient Greeks. It is visualized as the
        division of a line into two unequal segments in such a way that the ratio of the
        smaller segment to the larger segment is equal to the ratio of the larger to the
        whole. It is usually defined as 21:34, that is, 21/34 and 34/(21+34) both equal
        approximately 0.618. A rectangle whose sides are of this proportion is called a
        "golden rectangle". Golden rectangles can be found in the proportions of the
        Parthenon and many medieval manuscripts.
        </dd>
            </dl>

            <progress value='80' max='100'>80 %</progress>
            <p>We are this close to the goal: <meter min='0' max='1000' value='824'>$824</meter>.</p>
            {/*  The HTML <meter> element represents either a scalar value within a known range or a fractional value. */}
            {/*  <p>Heat the oven to <meter min="200" max="500"
      value="350">350 degrees</meter>.</p> */}
            <small>This is for things like copyright info</small>
            <s>Content that isnt accurate or relevant anymore.</s>
            <span>Generic span wrapper</span>
            <p>This is inline text with <sub>subscript</sub> and <sup>superscript</sup> elements.</p>
            <p>
              <var>f</var>(<var>x</var>) = <var>a</var><sub>0</sub> + <var>a</var><sub>1</sub><var>x</var> +
        <var>a</var><sub>2</sub><var>x</var><sup>2</sup>, where <var>a</var><sup>2</sup> ≠ 0
      </p>
          </aside>
          <section>
            <header>
              {/*  A header element is intended to usually contain the section's heading (an h1–h6 element or an hgroup element), but this is not required. The header element can also be used to wrap a section's table of contents, a search form, or any relevant logos. */}
              {/*  For cases where an developer wants to nest a header or footer within another header: The header element can only contain a header or footer if they are themselves contained within sectioning content. */}
              <h2 title="I'm a little tool tip">HTML Entities</h2>
              <details>
                <summary>What is an entity?</summary>
                <p>Some characters are reserved in HTML.If you use the less than or greater than signs in your text, the browser might mix them with tags. So instead of <b>&</b> you write <b>&amp;amp;</b>.</p>
              </details>
            </header>
            <table>
              <caption>All the HTML5 Entities</caption>
              <colgroup>
                {/*  The <colgroup> tag is useful for applying styles to entire columns, instead of repeating the styles for each cell, for each row. */}
                {/*  The <colgroup> tag must be a child of a <table> element, after any <caption> elements and before any <thead>, <tbody>, <tfoot>, and <tr> elements. */}
                <col span='4' />
              </colgroup>
              <thead>
                <tr>
                  <th>Result</th>
                  <th>Description</th>
                  <th>Entity Name</th>
                  <th>Entity Number</th>
                </tr>
              </thead>
              <tfoot>
                {/*
            From the HTML spec (http://www.w3.org/TR/html401/struct/tables.html)
            TFOOT must appear before TBODY within a TABLE definition so that user agents can
            render the foot before receiving all of the (potentially numerous) rows of data.
            */}
                <tr>
                  <td>There are also a bunch of symbols you can use <a href='http://www.w3schools.com/html/html_symbols.asp'>here</a>.</td>
                </tr>
              </tfoot>
              <tbody>
                {/*  The TBODY start tag is always required except when the table contains only one table body and no table head or foot sections. The TBODY end tag may always be safely omitted. */}
                <tr>
                  <td />
                  <td>non-breaking space</td>
                  <td>&amp;nbsp;</td>
                  <td>&amp;#160;</td>
                </tr>
                <tr>
                  <td>&amp;lt;</td>
                  <td>less than</td>
                  <td>&amp;lt;</td>
                  <td>&amp;#60;</td>
                </tr>
                <tr>
                  <td>></td>
                  <td>greater than</td>
                  <td>&amp;gt;</td>
                  <td>&amp;#62;</td>
                </tr>
                <tr>
                  <td>&amp;</td>
                  <td>ampersand</td>
                  <td>&amp;amp;</td>
                  <td>&amp;#38;</td>
                </tr>
                <tr>
                  <td />
                  <td>double quotation mark</td>
                  <td>&amp;quot;</td>
                  <td>&amp;#34</td>
                </tr>
                <tr>
                  <td>&amp;apos;</td>
                  <td>single quotation mark (apostrophe)</td>
                  <td>&amp;apos;</td>
                  <td>&amp;#39;</td>
                </tr>
                <tr>
                  <td>&cent;</td>
                  <td>cent</td>
                  <td>&amp;cent;</td>
                  <td>&amp;#162;</td>
                </tr>
                <tr>
                  <td>&pound;</td>
                  <td>pound</td>
                  <td>&amp;pound;</td>
                  <td>&amp;#163;</td>
                </tr>
                <tr>
                  <td>&yen;</td>
                  <td>yen</td>
                  <td>&amp;yen;</td>
                  <td>&amp;#165</td>
                </tr>
                <tr>
                  <td>&euro;</td>
                  <td>euro</td>
                  <td>&amp;euro;</td>
                  <td>&amp;#165</td>
                </tr>
                <tr>
                  <td>&copy;</td>
                  <td>copyright</td>
                  <td>&amp;copy;</td>
                  <td>&amp;#169</td>
                </tr>
                <tr>
                  <td>&reg;</td>
                  <td>registered trademark</td>
                  <td>&amp;reg;</td>
                  <td>&amp;#174</td>
                </tr>
              </tbody>
            </table>
          </section>
          <hr />
          <section>
            <h2>Forms, Inputs and Buttons</h2>
            <form>
              <fieldset>

                <legend>Legend Example</legend>

                <div>
                  <label>Text Input Label</label>
                  <input type='text' placeholder='placeholder text' />
                  <small>Helper text if necessary.</small>
                </div>

                <div>
                  <label>Password</label>
                  <input type='password' />

                  <p>Error messages when appropriate.</p>
                </div>

                <div>
                  <label for='first-name'>First Name</label>
                  <input type='text' id='first-name' />
                </div>

                <div>
                  <label for='last-name'>Last Name</label>
                  <input type='text' id='last-name' />
                </div>

                <div>
                  <label for='email'>Browser</label>
                  <input type='email' id='email' />
                  <datalist id='browsers'>
                    <option value='Chrome' />
                    <option value='Firefox' />
                    <option value='Internet Explorer' />
                    <option value='Opera' />
                    <option value='Safari' />
                    <option value='Microsoft Edge' />
                  </datalist>
                </div>
                <div>
                  <label for='gender'>Dropdown</label>
                  <select>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                    <optgroup label='Swedish Cars'>
                      <option value='volvo'>Volvo</option>
                      <option value='saab'>Saab</option>
                    </optgroup>
                    <optgroup label='German Cars'>
                      <option value='mercedes'>Mercedes</option>
                      <option value='audi'>Audi</option>
                    </optgroup>
                  </select>
                </div>
                <div>
                  <label>Radio Buttons</label>
                  <ul>
                    <li><label><input type='radio' /> Label 1</label></li>
                    <li><label><input type='radio' /> Label 2</label></li>
                    <li><label><input type='radio' /> Label 3</label></li>
                  </ul>
                </div>
                <div>
                  <label for='url'>URL Input</label>
                  <input type='url' placeholder='http://joshpitzalis.com' />
                </div>
                <br />
                <div>
                  <label>Text area</label>
                  <textarea />
                </div>

                <div>
                  <label><input type='checkbox' /> This is a checkbox.</label>
                </div>

                <div>
                  <input type='submit' value='Submit' />
                </div>

              </fieldset>
            </form>
            <form oninput='result.value=parseInt(a.value)+parseInt(b.value)'>
              <input type='range' name='b' value='50' /> +
          <input type='number' name='a' value='10' /> =
          <output name='result'>60</output>
            </form>
            <button>A Button</button>
          </section>

          <section>
            <figure>
              <img src='http://fillmurray.com/960/320' alt='Bill Murray' />
              {/*  Always add the "alt" attribute to images. This attribute is important when the image for some reason cannot be displayed. Also, always define image width and height. It reduces flickering because the browser can reserve space for the image before loading. */}
              <figcaption>
        Much Fill. Very Murray.
              </figcaption>
            </figure>
          </section>
        </main>
        <footer>
          <small>© 2014 Some company name</small>
          <address>
        UNIVERSITY INTERSCHOLASTIC LEAGUE<br />
      1701 Manor Road, Austin, TX 78722<br />
        Tel: (512) 471-5883 | Fax: (512) 471-5908
        </address>
        </footer>
      </div>
    </div>
  );
};

export default HTMLStyles;
